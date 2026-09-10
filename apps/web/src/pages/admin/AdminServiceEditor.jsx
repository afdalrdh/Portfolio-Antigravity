import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { adminApi } from '../../lib/api';
import CloudinaryUploadWidget from '../../components/admin/CloudinaryUploadWidget';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import { FiArrowLeft, FiAlertCircle, FiPlus, FiTrash2 } from 'react-icons/fi';

export default function AdminServiceEditor() {
    const { id } = useParams();
    const navigate = useNavigate();
    const isEditing = Boolean(id);

    const [title, setTitle] = useState('');
    const [slug, setSlug] = useState('');
    const [shortDescription, setShortDescription] = useState('');
    const [description, setDescription] = useState('');
    const [scopeText, setScopeText] = useState('');
    const [processList, setProcessList] = useState([]); // [{ title, description }]
    const [faqList, setFaqList] = useState([]); // [{ question, answer }]
    const [heroImageUrl, setHeroImageUrl] = useState('');
    const [heroImageId, setHeroImageId] = useState('');
    const [published, setPublished] = useState(true);
    const [seoTitle, setSeoTitle] = useState('');
    const [seoDescription, setSeoDescription] = useState('');

    const [loading, setLoading] = useState(isEditing);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState('');
    const [errorMsg, setErrorMsg] = useState('');

    useEffect(() => {
        if (isEditing) {
            adminApi.getService(id)
                .then((service) => {
                    setTitle(service.title || '');
                    setSlug(service.slug || '');
                    setShortDescription(service.shortDescription || '');
                    setDescription(service.description || '');
                    setScopeText(Array.isArray(service.scope) ? service.scope.join('\n') : (service.scope || ''));
                    setProcessList(Array.isArray(service.process) ? service.process : []);
                    setFaqList(Array.isArray(service.faq) ? service.faq : []);
                    setHeroImageUrl(service.heroImageUrl || '');
                    setHeroImageId(service.heroImageId || '');
                    setPublished(service.published !== undefined ? service.published : true);
                    setSeoTitle(service.seoTitle || '');
                    setSeoDescription(service.seoDescription || '');
                })
                .catch(err => setErrorMsg('Gagal memuat detail layanan: ' + err.message))
                .finally(() => setLoading(false));
        }
    }, [id, isEditing]);

    const generateSlug = (text) => text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

    const handleAddProcess = () => setProcessList([...processList, { title: '', description: '' }]);
    const handleRemoveProcess = (idx) => setProcessList(processList.filter((_, i) => i !== idx));
    const handleUpdateProcess = (idx, field, value) => {
        const updated = [...processList];
        updated[idx] = { ...updated[idx], [field]: value };
        setProcessList(updated);
    };

    const handleAddFaq = () => setFaqList([...faqList, { question: '', answer: '' }]);
    const handleRemoveFaq = (idx) => setFaqList(faqList.filter((_, i) => i !== idx));
    const handleUpdateFaq = (idx, field, value) => {
        const updated = [...faqList];
        updated[idx] = { ...updated[idx], [field]: value };
        setFaqList(updated);
    };

    const handleSave = async (isPub) => {
        const targetPublished = isPub !== undefined ? isPub : published;

        if (!title.trim()) {
            setErrorMsg('⚠️ Judul Layanan wajib diisi!');
            return;
        }

        if (targetPublished && !heroImageUrl.trim()) {
            if (!confirm('⚠️ Layanan ini belum memiliki Hero Image. Apakah Anda yakin ingin menerbitkannya tanpa Hero Image?')) {
                return;
            }
        }

        setSaving(true);
        setMessage('');
        setErrorMsg('');

        const scopeArray = scopeText
            .split('\n')
            .map(s => s.trim())
            .filter(Boolean);

        const data = {
            title,
            slug: slug.trim() || generateSlug(title),
            shortDescription,
            description,
            scope: scopeArray,
            process: processList,
            faq: faqList,
            heroImageUrl,
            heroImageId,
            published: targetPublished,
            seoTitle: seoTitle.trim() || title,
            seoDescription: seoDescription.trim() || shortDescription || description.substring(0, 160),
        };

        try {
            if (isEditing) {
                await adminApi.updateService(id, data);
                setMessage('✅ Layanan berhasil diperbarui!');
            } else {
                const created = await adminApi.createService(data);
                setMessage('✅ Layanan baru berhasil dibuat!');
                navigate(`/admin/services/${created.id}/edit`, { replace: true });
            }
            setTimeout(() => setMessage(''), 4000);
        } catch (err) {
            setErrorMsg('❌ Gagal menyimpan layanan: ' + err.message);
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <LoadingSpinner />;

    return (
        <div className="admin-project-editor">
            <div className="editor-top-bar">
                <div className="top-bar-left">
                    <Link to="/admin/services" className="btn-cms btn-cms-outline">
                        <FiArrowLeft size={16} style={{ marginRight: '6px' }} />
                        Kembali ke Layanan
                    </Link>
                    <h3 className="editor-title">{isEditing ? 'Edit Layanan' : 'Tambah Layanan Baru'}</h3>
                </div>
                <div className="top-bar-actions">
                    <button className="btn-cms btn-cms-outline" onClick={() => handleSave(false)} disabled={saving}>
                        Simpan Draft
                    </button>
                    <button className="btn-cms btn-cms-primary" onClick={() => handleSave(true)} disabled={saving}>
                        {saving ? 'Menyimpan...' : 'Simpan & Terbitkan'}
                    </button>
                </div>
            </div>

            {message && <div className="alert-box success-alert">{message}</div>}
            {errorMsg && <div className="alert-box error-alert">{errorMsg}</div>}

            {!heroImageUrl && (
                <div className="role-warning-callout" style={{ background: '#fffbe6', borderColor: '#ffe58f', color: '#873800' }}>
                    <div className="warning-icon"><FiAlertCircle size={24} color="#d46b08" /></div>
                    <div className="warning-content">
                        <strong>HERO IMAGE BELUM DIUNGGAH (RECOMMENDED):</strong>
                        <p>Setiap layanan resmi yang diterbitkan disarankan memiliki Hero Image berkualitas tinggi untuk ditampilkan di banner halaman layanan.</p>
                    </div>
                </div>
            )}

            <div className="editor-main-grid">
                <div className="editor-col-left">
                    {/* Basic Info */}
                    <div className="form-panel">
                        <h4 className="panel-heading">1. Informasi Layanan</h4>

                        <div className="form-group">
                            <label className="form-label required">Judul Layanan</label>
                            <input 
                                type="text" 
                                className="form-input text-lg" 
                                value={title} 
                                onChange={(e) => { setTitle(e.target.value); if (!isEditing) setSlug(generateSlug(e.target.value)); }}
                                placeholder="Contoh: Konstruksi Bangunan Industri & Gudang"
                            />
                        </div>

                        <div className="form-group">
                            <label className="form-label">Deskripsi Ringkas (Short Description)</label>
                            <input 
                                type="text" 
                                className="form-input" 
                                value={shortDescription} 
                                onChange={(e) => setShortDescription(e.target.value)}
                                placeholder="Ringkasan 1-2 kalimat untuk kartu layanan..."
                            />
                        </div>

                        <div className="form-group">
                            <label className="form-label">Deskripsi Lengkap Layanan</label>
                            <textarea 
                                className="form-input" 
                                rows="5" 
                                value={description} 
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="Jelaskan detail spesifikasi, keunggulan, dan standar mutu Arsi Karya..."
                            />
                        </div>
                    </div>

                    {/* Scope & Process */}
                    <div className="form-panel">
                        <h4 className="panel-heading">2. Lingkup & Alur Kerja (Process)</h4>

                        <div className="form-group">
                            <label className="form-label">Lingkup Pekerjaan (Satu item per baris)</label>
                            <textarea 
                                className="form-input" 
                                rows="4" 
                                value={scopeText} 
                                onChange={(e) => setScopeText(e.target.value)}
                                placeholder="Struktur Utama Baja&#10;Pekerjaan Sipil & Pondasi&#10;Instalasi MPE..."
                            />
                        </div>

                        <div className="form-group">
                            <div className="panel-heading-row" style={{ border: 'none', padding: 0 }}>
                                <label className="form-label" style={{ margin: 0 }}>Tahapan Proses Kerja</label>
                                <button type="button" onClick={handleAddProcess} className="btn-cms btn-cms-outline" style={{ padding: '4px 10px', fontSize: '0.8rem' }}>
                                    <FiPlus size={14} style={{ marginRight: '4px' }} /> Tambah Tahap
                                </button>
                            </div>

                            {processList.map((proc, idx) => (
                                <div key={idx} className="gallery-item-card" style={{ marginTop: '10px' }}>
                                    <span style={{ fontWeight: 700, fontSize: '0.9rem', color: '#6b7280' }}>#{idx + 1}</span>
                                    <div className="gallery-item-inputs">
                                        <input 
                                            type="text" 
                                            className="form-input form-input-sm" 
                                            value={proc.title || ''} 
                                            onChange={(e) => handleUpdateProcess(idx, 'title', e.target.value)}
                                            placeholder="Nama Tahap (misal: Konsultasi & Perencanaan)"
                                        />
                                        <input 
                                            type="text" 
                                            className="form-input form-input-sm" 
                                            value={proc.description || ''} 
                                            onChange={(e) => handleUpdateProcess(idx, 'description', e.target.value)}
                                            placeholder="Penjelasan singkat tahap..."
                                        />
                                    </div>
                                    <button type="button" onClick={() => handleRemoveProcess(idx)} className="btn-icon text-danger">
                                        <FiTrash2 size={14} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* FAQ Panel */}
                    <div className="form-panel">
                        <div className="panel-heading-row">
                            <h4 className="panel-heading" style={{ margin: 0 }}>3. Pertanyaan Sering Diajukan (FAQ)</h4>
                            <button type="button" onClick={handleAddFaq} className="btn-cms btn-cms-outline" style={{ padding: '4px 10px', fontSize: '0.8rem' }}>
                                <FiPlus size={14} style={{ marginRight: '4px' }} /> Tambah FAQ
                            </button>
                        </div>

                        {faqList.map((faq, idx) => (
                            <div key={idx} className="gallery-item-card" style={{ marginTop: '10px' }}>
                                <div className="gallery-item-inputs">
                                    <input 
                                        type="text" 
                                        className="form-input form-input-sm" 
                                        value={faq.question || ''} 
                                        onChange={(e) => handleUpdateFaq(idx, 'question', e.target.value)}
                                        placeholder="Pertanyaan (misal: Berapa lama estimasi pengerjaan?)"
                                    />
                                    <textarea 
                                        className="form-input form-input-sm" 
                                        rows="2"
                                        value={faq.answer || ''} 
                                        onChange={(e) => handleUpdateFaq(idx, 'answer', e.target.value)}
                                        placeholder="Jawaban penjelasan..."
                                    />
                                </div>
                                <button type="button" onClick={() => handleRemoveFaq(idx)} className="btn-icon text-danger">
                                    <FiTrash2 size={14} />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="editor-col-right">
                    {/* Hero Image */}
                    <div className="form-panel">
                        <h4 className="panel-heading">Hero Image Banner</h4>
                        <p className="field-help" style={{ marginBottom: '12px' }}>Gambar header halaman layanan resmi.</p>

                        {heroImageUrl ? (
                            <div className="cover-preview-wrap">
                                <img src={heroImageUrl} alt="Hero Preview" className="cover-img-preview" />
                                <button type="button" className="btn-remove-cover" onClick={() => setHeroImageUrl('')}>
                                    Ganti Hero Image
                                </button>
                            </div>
                        ) : (
                            <div className="cover-upload-placeholder">
                                <CloudinaryUploadWidget onUploadSuccess={setHeroImageUrl} />
                                <span style={{ marginTop: '8px', fontSize: '0.8rem', color: '#9ca3af' }}>Unggah Hero Image</span>
                            </div>
                        )}
                        <input 
                            type="url" 
                            className="form-input" 
                            style={{ marginTop: '12px' }}
                            value={heroImageUrl} 
                            onChange={(e) => setHeroImageUrl(e.target.value)} 
                            placeholder="atau paste URL gambar..." 
                        />
                    </div>

                    {/* Publish Settings */}
                    <div className="form-panel">
                        <h4 className="panel-heading">Status & URL</h4>

                        <div className="form-group">
                            <label className="form-label">URL Slug Layanan</label>
                            <input 
                                type="text" 
                                className="form-input" 
                                value={slug} 
                                onChange={(e) => setSlug(e.target.value)} 
                            />
                            <small className="field-help">https://arsikarya.com/layanan/{slug || 'slug-layanan'}</small>
                        </div>

                        <div className="form-group">
                            <label className="form-label">Status Terbit</label>
                            <select 
                                className="form-input" 
                                value={published ? 'published' : 'draft'} 
                                onChange={(e) => setPublished(e.target.value === 'published')}
                            >
                                <option value="published">Terbit (Publik)</option>
                                <option value="draft">Draft (Disembunyikan)</option>
                            </select>
                        </div>
                    </div>

                    {/* SEO */}
                    <div className="form-panel">
                        <h4 className="panel-heading">SEO Metadata</h4>
                        
                        <div className="form-group">
                            <label className="form-label">SEO Title</label>
                            <input 
                                type="text" 
                                className="form-input" 
                                value={seoTitle} 
                                onChange={(e) => setSeoTitle(e.target.value)} 
                                placeholder={title || 'Judul SEO'} 
                            />
                        </div>

                        <div className="form-group">
                            <label className="form-label">SEO Description</label>
                            <textarea 
                                className="form-input" 
                                rows="3" 
                                value={seoDescription} 
                                onChange={(e) => setSeoDescription(e.target.value)} 
                                placeholder="Deskripsi meta untuk Google search..." 
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
