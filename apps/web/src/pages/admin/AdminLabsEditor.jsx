import { useState, useEffect } from 'react';
import { adminApi } from '../../lib/api';
import CloudinaryUploadWidget from '../../components/admin/CloudinaryUploadWidget';

export default function AdminLabsEditor() {
    const [creations, setCreations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState('');
    
    // Form state
    const [isEditing, setIsEditing] = useState(false);
    const [currentId, setCurrentId] = useState(null);
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const data = await adminApi.getCreations();
            setCreations(data || []);
            const catData = await adminApi.getCategories();
            setCategories(catData || []);
        } catch (error) {
            console.error('Error fetching labs data:', error);
            setMessage('❌ Failed to load data');
        } finally {
            setLoading(false);
        }
    };

    const resetForm = () => {
        setIsEditing(false);
        setCurrentId(null);
        setTitle('');
        setCategory('');
        setImageUrl('');
    };

    const handleEdit = (creation) => {
        setIsEditing(true);
        setCurrentId(creation.id);
        setTitle(creation.title);
        setCategory(creation.category);
        setImageUrl(creation.imageUrl);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this creation?')) return;
        try {
            await adminApi.deleteCreation(id);
            setMessage('✅ Creation deleted');
            fetchData();
        } catch (error) {
            setMessage('❌ Failed to delete');
        }
    };

    const handleSave = async (e) => {
        e.preventDefault();
        if (!title || !category || !imageUrl) {
            setMessage('❌ Please fill all fields and upload an image');
            return;
        }

        try {
            const payload = { title, category, imageUrl };
            if (isEditing) {
                await adminApi.updateCreation(currentId, payload);
                setMessage('✅ Creation updated successfully!');
            } else {
                await adminApi.createCreation(payload);
                setMessage('✅ Creation added successfully!');
            }
            resetForm();
            fetchData();
            setTimeout(() => setMessage(''), 3000);
        } catch (error) {
            setMessage('❌ Failed to save creation');
        }
    };

    if (loading) return <p>Loading editor...</p>;

    return (
        <div className="admin-editor animate-fade-in">
            {message && <div className={`admin-message ${message.includes('❌') ? 'error' : 'success'}`}>{message}</div>}

            <div className="editor-section">
                <h3 className="section-title">{isEditing ? 'Edit Creation' : 'Add New Creation'}</h3>
                <div className="editor-panel">
                    <form onSubmit={handleSave}>
                        <div className="form-group-grid">
                            <div className="form-group">
                                <label>Title</label>
                                <input 
                                    type="text" 
                                    className="form-input" 
                                    value={title} 
                                    onChange={(e) => setTitle(e.target.value)} 
                                    placeholder="e.g. Design Mobile Apps First Lesson" 
                                />
                            </div>
                            <div className="form-group">
                                <label>Category</label>
                                <input 
                                    type="text" 
                                    className="form-input" 
                                    value={category} 
                                    onChange={(e) => setCategory(e.target.value)} 
                                    placeholder="e.g. UI Kit or 3D Design" 
                                    list="category-suggestions"
                                />
                                <datalist id="category-suggestions">
                                    {categories.map((cat, idx) => (
                                        <option key={idx} value={cat} />
                                    ))}
                                </datalist>
                                <p className="text-secondary" style={{fontSize: '0.8rem', marginTop: '4px'}}>Categories are automatically added when you type a new one.</p>
                            </div>
                        </div>

                        <div className="form-group">
                            <label>Creation Image</label>
                            {imageUrl && (
                                <div style={{ marginBottom: '16px' }}>
                                    <img src={imageUrl} alt="Preview" style={{ maxWidth: '200px', borderRadius: '8px', border: '1px solid var(--border-color)' }} />
                                </div>
                            )}
                            <CloudinaryUploadWidget 
                                folder="labs"
                                onUploadSuccess={(url) => setImageUrl(url)}
                            />
                        </div>

                        <div style={{ display: 'flex', gap: '12px', marginTop: '24px' }}>
                            <button type="submit" className="btn-primary">
                                {isEditing ? 'Update Creation' : 'Save Creation'}
                            </button>
                            {isEditing && (
                                <button type="button" className="btn-outline" onClick={resetForm}>
                                    Cancel
                                </button>
                            )}
                        </div>
                    </form>
                </div>
            </div>

            <div className="editor-section" style={{ marginTop: '40px' }}>
                <h3 className="section-title">All Creations</h3>
                <div className="blocks-list" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '16px' }}>
                    {creations.map((item) => (
                        <div key={item.id} className="editor-block" style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
                            <div style={{ width: '100%', height: '120px', borderRadius: '4px', overflow: 'hidden', marginBottom: '12px' }}>
                                <img src={item.imageUrl} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            </div>
                            <h4 style={{ fontSize: '0.9rem', marginBottom: '4px', fontWeight: 600 }}>{item.title}</h4>
                            <span className="badge" style={{ fontSize: '0.75rem', marginBottom: '12px' }}>{item.category}</span>
                            <div style={{ display: 'flex', gap: '8px', width: '100%' }}>
                                <button onClick={() => handleEdit(item)} className="btn-outline" style={{ flex: 1, padding: '6px' }}>Edit</button>
                                <button onClick={() => handleDelete(item.id)} className="btn-outline text-danger" style={{ flex: 1, padding: '6px' }}>Delete</button>
                            </div>
                        </div>
                    ))}
                    {creations.length === 0 && (
                        <p className="text-secondary" style={{ gridColumn: '1 / -1' }}>No creations found. Add some above!</p>
                    )}
                </div>
            </div>
        </div>
    );
}
