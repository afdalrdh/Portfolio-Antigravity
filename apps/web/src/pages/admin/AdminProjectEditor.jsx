import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { adminApi } from '../../lib/api';
import './AdminProjectEditor.css';

export default function AdminProjectEditor() {
    const { id } = useParams();
    const navigate = useNavigate();
    const isEditing = Boolean(id);

    const [title, setTitle] = useState('');
    const [slug, setSlug] = useState('');
    const [company, setCompany] = useState('');
    const [year, setYear] = useState('');
    const [liveLink, setLiveLink] = useState('');
    const [coverImageUrl, setCoverImageUrl] = useState('');
    const [visibility, setVisibility] = useState('draft');
    const [blocks, setBlocks] = useState([]);
    const [loading, setLoading] = useState(isEditing);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState('');

    useEffect(() => {
        if (isEditing) {
            adminApi.getProject(id)
                .then((project) => {
                    setTitle(project.title || '');
                    setSlug(project.slug || '');
                    setCompany(project.company || '');
                    setYear(project.year || '');
                    setLiveLink(project.liveLink || '');
                    setCoverImageUrl(project.coverImageUrl || '');
                    setVisibility(project.visibility || 'draft');
                    setBlocks(project.blocks || []);
                })
                .catch(console.error)
                .finally(() => setLoading(false));
        }
    }, [id, isEditing]);

    const generateSlug = (text) => text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

    const addBlock = (type) => {
        setBlocks([...blocks, { id: Date.now(), type, title: '', text: '', imageUrl: '', imageUrl2: '', fontFamily: '', colors: [] }]);
    };

    const removeBlock = (index) => setBlocks(blocks.filter((_, i) => i !== index));

    const moveBlockUp = (index) => {
        if (index === 0) return;
        const newBlocks = [...blocks];
        [newBlocks[index - 1], newBlocks[index]] = [newBlocks[index], newBlocks[index - 1]];
        setBlocks(newBlocks);
    };

    const moveBlockDown = (index) => {
        if (index === blocks.length - 1) return;
        const newBlocks = [...blocks];
        [newBlocks[index + 1], newBlocks[index]] = [newBlocks[index], newBlocks[index + 1]];
        setBlocks(newBlocks);
    };

    const updateBlock = (index, field, value) => {
        const updated = [...blocks];
        updated[index] = { ...updated[index], [field]: value };
        setBlocks(updated);
    };

    const handleSave = async (vis) => {
        setSaving(true);
        setMessage('');
        const data = {
            title,
            slug: slug || generateSlug(title),
            company,
            year,
            liveLink,
            coverImageUrl,
            visibility: vis || visibility,
            blocks: blocks.map(b => ({
                type: b.type,
                title: b.title,
                text: b.text,
                imageUrl: b.imageUrl,
                imageUrl2: b.imageUrl2,
                fontFamily: b.fontFamily,
                colors: b.colors,
            })),
        };

        try {
            if (isEditing) {
                await adminApi.updateProject(id, data);
                setMessage('✅ Project updated!');
            } else {
                const created = await adminApi.createProject(data);
                setMessage('✅ Project created!');
                navigate(`/admin/projects/${created.id}/edit`, { replace: true });
            }
            setTimeout(() => setMessage(''), 3000);
        } catch (err) {
            setMessage('❌ Failed: ' + err.message);
        } finally {
            setSaving(false);
        }
    };

    const renderBlockEditor = (block, index) => (
        <div key={block.id || index} className="editor-block">
            <div className="block-header">
                <span className="block-type-badge">{block.type.replace('_', ' ')}</span>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                    <button type="button" onClick={() => moveBlockUp(index)} disabled={index === 0} className="btn-icon" title="Move Up" style={{ opacity: index === 0 ? 0.3 : 1, cursor: index === 0 ? 'not-allowed' : 'pointer' }}>↑</button>
                    <button type="button" onClick={() => moveBlockDown(index)} disabled={index === blocks.length - 1} className="btn-icon" title="Move Down" style={{ opacity: index === blocks.length - 1 ? 0.3 : 1, cursor: index === blocks.length - 1 ? 'not-allowed' : 'pointer' }}>↓</button>
                    <button type="button" onClick={() => removeBlock(index)} className="btn-icon text-danger" title="Remove">&times;</button>
                </div>
            </div>
            <div className="block-body">
                {block.type === 'narrative' && (
                    <>
                        <div className="form-group">
                            <label>Section Title</label>
                            <input type="text" className="form-input" value={block.title || ''} onChange={(e) => updateBlock(index, 'title', e.target.value)} placeholder="e.g. The Challenge" />
                        </div>
                        <div className="form-group">
                            <label>Narrative Text</label>
                            <textarea className="form-input" rows="4" value={block.text || ''} onChange={(e) => updateBlock(index, 'text', e.target.value)} placeholder="Write the narrative here..." />
                        </div>
                    </>
                )}
                {block.type === 'image_main' && (
                    <div className="form-group">
                        <label>Image URL</label>
                        <input type="text" className="form-input" value={block.imageUrl || ''} onChange={(e) => updateBlock(index, 'imageUrl', e.target.value)} placeholder="https://..." />
                    </div>
                )}
                {block.type === 'image_grid' && (
                    <div className="form-group-grid">
                        <div className="form-group">
                            <label>Image 1 URL</label>
                            <input type="text" className="form-input" value={block.imageUrl || ''} onChange={(e) => updateBlock(index, 'imageUrl', e.target.value)} placeholder="https://..." />
                        </div>
                        <div className="form-group">
                            <label>Image 2 URL</label>
                            <input type="text" className="form-input" value={block.imageUrl2 || ''} onChange={(e) => updateBlock(index, 'imageUrl2', e.target.value)} placeholder="https://..." />
                        </div>
                    </div>
                )}
                {block.type === 'design_system' && (
                    <>
                        <div className="form-group">
                            <label>Primary Font Family</label>
                            <input type="text" className="form-input" value={block.fontFamily || ''} onChange={(e) => updateBlock(index, 'fontFamily', e.target.value)} placeholder="e.g. Inter" />
                        </div>
                        <div className="form-group">
                            <label>Color Swatches (comma-separated hex)</label>
                            <input type="text" className="form-input" value={(block.colors || []).join(', ')} onChange={(e) => updateBlock(index, 'colors', e.target.value.split(',').map(c => c.trim()).filter(Boolean))} placeholder="#3b8cfc, #ff9500, ..." />
                        </div>
                    </>
                )}
            </div>
        </div>
    );

    if (loading) return <div style={{ padding: '40px', textAlign: 'center' }}><p className="text-secondary">Loading...</p></div>;

    return (
        <div className="admin-project-editor">
            <div className="editor-header-bar">
                <div className="header-left">
                    <button onClick={() => navigate('/admin')} className="btn-back">&larr; Back</button>
                    <h3 className="section-title">{isEditing ? 'Edit Project' : 'New Project'}</h3>
                    {message && <span style={{ marginLeft: '16px', fontSize: '0.9rem' }}>{message}</span>}
                </div>
                <div className="header-actions">
                    <button className="btn-outline text-secondary" onClick={() => handleSave('draft')} disabled={saving}>Save Draft</button>
                    <button className="btn-primary" onClick={() => handleSave('public')} disabled={saving}>
                        {saving ? 'Saving...' : 'Publish Project'}
                    </button>
                </div>
            </div>

            <div className="editor-layout">
                <div className="editor-main-col">
                    <div className="editor-panel container-fade-in">
                        <h4 className="panel-title">Basic Information</h4>
                        <div className="form-group">
                            <label>Project Title</label>
                            <input type="text" className="form-input text-lg" value={title} onChange={(e) => { setTitle(e.target.value); if (!isEditing) setSlug(generateSlug(e.target.value)); }} />
                        </div>
                        <div className="form-group-grid">
                            <div className="form-group">
                                <label>Company / Client</label>
                                <input type="text" className="form-input" value={company} onChange={(e) => setCompany(e.target.value)} />
                            </div>
                            <div className="form-group">
                                <label>Year Completed</label>
                                <input type="text" className="form-input" value={year} onChange={(e) => setYear(e.target.value)} />
                            </div>
                        </div>
                        <div className="form-group">
                            <label>Live Link</label>
                            <input type="url" className="form-input" value={liveLink} onChange={(e) => setLiveLink(e.target.value)} placeholder="https://..." />
                        </div>
                        <div className="form-group">
                            <label>Cover Image URL (for homepage card)</label>
                            <input type="url" className="form-input" value={coverImageUrl} onChange={(e) => setCoverImageUrl(e.target.value)} placeholder="https://..." />
                        </div>
                    </div>

                    <div className="blocks-container">
                        <h4 className="panel-title">Content Blocks</h4>
                        <p className="text-secondary mb-4">Build your project layout exactly how it will appear on the frontend.</p>

                        <div className="blocks-list">
                            {blocks.map((block, index) => renderBlockEditor(block, index))}
                        </div>

                        <div className="add-block-panel">
                            <p className="add-block-label">Add a new block:</p>
                            <div className="add-block-buttons">
                                <button type="button" onClick={() => addBlock('narrative')} className="btn-add-block">📝 Narrative</button>
                                <button type="button" onClick={() => addBlock('image_main')} className="btn-add-block">🖼 Main Image</button>
                                <button type="button" onClick={() => addBlock('image_grid')} className="btn-add-block">🪟 Image Grid</button>
                                <button type="button" onClick={() => addBlock('design_system')} className="btn-add-block">✨ Design System</button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="editor-sidebar-col">
                    <div className="editor-panel">
                        <h4 className="panel-title">Publish Settings</h4>
                        <div className="form-group">
                            <label>Slug</label>
                            <input type="text" className="form-input" value={slug} onChange={(e) => setSlug(e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label>Visibility</label>
                            <select className="form-input" value={visibility} onChange={(e) => setVisibility(e.target.value)}>
                                <option value="public">Public</option>
                                <option value="draft">Draft</option>
                                <option value="private">Private</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
