import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { adminApi } from '../../lib/api';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import { FiArrowLeft, FiPhoneCall, FiMail, FiCopy, FiCheckCircle, FiClock, FiTrash2 } from 'react-icons/fi';
import './AdminInquiries.css';

export default function AdminInquiryDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [inquiry, setInquiry] = useState(null);
    const [loading, setLoading] = useState(true);
    const [copied, setCopied] = useState(false);

    const fetchInquiry = () => {
        setLoading(true);
        adminApi.getInquiry(id)
            .then(data => setInquiry(data))
            .catch(err => console.error('Failed to fetch inquiry:', err))
            .finally(() => setLoading(false));
    };

    useEffect(() => {
        fetchInquiry();
    }, [id]);

    const handleStatusChange = async (newStatus) => {
        try {
            await adminApi.updateInquiryStatus(id, newStatus);
            fetchInquiry();
        } catch (err) {
            alert('Gagal mengubah status: ' + err.message);
        }
    };

    const handleDelete = async () => {
        if (!confirm(`Apakah Anda yakin ingin menghapus pengajuan dari "${inquiry.nama}"?`)) return;
        try {
            await adminApi.deleteInquiry(id);
            navigate('/admin/inquiries');
        } catch (err) {
            alert('Gagal menghapus pengajuan: ' + err.message);
        }
    };

    const copyWhatsApp = () => {
        if (!inquiry?.whatsapp) return;
        navigator.clipboard.writeText(inquiry.whatsapp);
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
    };

    if (loading) return <LoadingSpinner />;
    if (!inquiry) return <div style={{ padding: '60px 0', textAlign: 'center' }}>Pengajuan tidak ditemukan.</div>;

    const formattedPhone = inquiry.whatsapp?.replace(/[^0-9]/g, '');
    const waUrl = `https://wa.me/${formattedPhone?.startsWith('0') ? '62' + formattedPhone.slice(1) : formattedPhone}?text=Halo%20Bpk/Ibu%20${encodeURIComponent(inquiry.nama)},%20terima%20kasih%20telah%20menghubungi%20Arsi%20Karya.`;

    return (
        <div className="admin-inquiry-detail-page">
            <div className="editor-top-bar">
                <div className="top-bar-left">
                    <Link to="/admin/inquiries" className="btn-cms btn-cms-outline">
                        <FiArrowLeft size={16} style={{ marginRight: '6px' }} />
                        Kembali ke Daftar Pengajuan
                    </Link>
                    <h3 className="editor-title">Detail Pengajuan: {inquiry.nama}</h3>
                </div>
                <div className="top-bar-actions">
                    <button onClick={handleDelete} className="btn-cms btn-action-sm delete" style={{ padding: '8px 14px' }}>
                        <FiTrash2 size={16} style={{ marginRight: '6px' }} />
                        Hapus Pengajuan
                    </button>
                </div>
            </div>

            <div className="inquiry-detail-grid">
                {/* Main Content */}
                <div className="detail-col-left">
                    <div className="form-panel">
                        <h4 className="panel-heading">Pesan & Kebutuhan Proyek</h4>
                        <div className="pesan-box">
                            {inquiry.pesan || 'Tidak ada catatan pesan tambahan.'}
                        </div>

                        <div className="inquiry-meta-grid">
                            <div className="meta-item">
                                <span className="meta-label">Jenis Kerja Sama</span>
                                <span className="meta-val">{inquiry.jenisKerjasama || '-'}</span>
                            </div>
                            <div className="meta-item">
                                <span className="meta-label">Jenis Proyek</span>
                                <span className="meta-val">{inquiry.jenisProyek || '-'}</span>
                            </div>
                            <div className="meta-item">
                                <span className="meta-label">Lokasi Proyek</span>
                                <span className="meta-val">{inquiry.lokasi || '-'}</span>
                            </div>
                            <div className="meta-item">
                                <span className="meta-label">Estimasi Budget</span>
                                <span className="meta-val">{inquiry.budget || '-'}</span>
                            </div>
                            <div className="meta-item">
                                <span className="meta-label">Halaman Asal (Source)</span>
                                <span className="meta-val">{inquiry.sourcePage || '/kontak'}</span>
                            </div>
                            <div className="meta-item">
                                <span className="meta-label">Waktu Masuk</span>
                                <span className="meta-val">{new Date(inquiry.createdAt).toLocaleString('id-ID')}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Sidebar Actions & Contact Info */}
                <div className="detail-col-right">
                    {/* Client Quick Contact Card */}
                    <div className="form-panel">
                        <h4 className="panel-heading">Kontak Klien</h4>

                        <div className="client-info-block">
                            <h5 className="client-name">{inquiry.nama}</h5>
                            <span className="client-company">{inquiry.perusahaan || 'Individu / Perorangan'}</span>
                        </div>

                        <div className="quick-actions-list">
                            <a href={waUrl} target="_blank" rel="noreferrer" className="btn-cms btn-wa-action">
                                <FiPhoneCall size={16} />
                                <span>Chat WhatsApp Langsung</span>
                            </a>

                            <button onClick={copyWhatsApp} className="btn-cms btn-cms-outline">
                                <FiCopy size={16} />
                                <span>{copied ? 'Nomor Berhasil Dikitip!' : 'Salin Nomor WhatsApp'}</span>
                            </button>

                            <a href={`mailto:${inquiry.email}`} className="btn-cms btn-cms-outline">
                                <FiMail size={16} />
                                <span>Kirim Email Klien</span>
                            </a>
                        </div>
                    </div>

                    {/* Status Management Panel */}
                    <div className="form-panel">
                        <h4 className="panel-heading">Ubah Status Pengajuan</h4>
                        <p className="field-help" style={{ marginBottom: '12px' }}>Perbarui status untuk melacak alur follow up tim Arsi Karya.</p>

                        <div className="status-button-grid">
                            <button 
                                onClick={() => handleStatusChange('new')} 
                                className={`btn-status-option ${inquiry.status === 'new' ? 'active status-new' : ''}`}
                            >
                                Baru
                            </button>

                            <button 
                                onClick={() => handleStatusChange('reviewing')} 
                                className={`btn-status-option ${inquiry.status === 'reviewing' ? 'active status-reviewing' : ''}`}
                            >
                                Ditinjau
                            </button>

                            <button 
                                onClick={() => handleStatusChange('contacted')} 
                                className={`btn-status-option ${inquiry.status === 'contacted' ? 'active status-contacted' : ''}`}
                            >
                                Sudah Dihubungi
                            </button>

                            <button 
                                onClick={() => handleStatusChange('qualified')} 
                                className={`btn-status-option ${inquiry.status === 'qualified' ? 'active status-qualified' : ''}`}
                            >
                                Qualified
                            </button>

                            <button 
                                onClick={() => handleStatusChange('closed')} 
                                className={`btn-status-option ${inquiry.status === 'closed' ? 'active status-closed' : ''}`}
                            >
                                Selesai
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
