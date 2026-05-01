import { useState, useEffect } from 'react';
import { adminApi } from '../../lib/api';
import './AdminProjectEditor.css';

export default function AdminHomeEditor() {
    const [profileImageUrl, setProfileImageUrl] = useState('');
    const [heroHeadline, setHeroHeadline] = useState('');
    const [ctaText, setCtaText] = useState('');
    const [ctaUrl, setCtaUrl] = useState('');
    const [socials, setSocials] = useState([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState('');

    useEffect(() => {
        adminApi.getHome()
            .then((data) => {
                if (data.page) {
                    setProfileImageUrl(data.page.profileImageUrl || '');
                    setHeroHeadline(data.page.heroHeadline || '');
                    setCtaText(data.page.ctaText || '');
                    setCtaUrl(data.page.ctaUrl || '');
                }
                setSocials(data.socialLinks || []);
            })
            .catch(console.error)
            .finally(() => setLoading(false));
    }, []);

    const moveItemUp = (arr, setArr, index) => {
        if (index === 0) return;
        const newArr = [...arr];
        [newArr[index - 1], newArr[index]] = [newArr[index], newArr[index - 1]];
        setArr(newArr);
    };

    const moveItemDown = (arr, setArr, index) => {
        if (index === arr.length - 1) return;
        const newArr = [...arr];
        [newArr[index + 1], newArr[index]] = [newArr[index], newArr[index + 1]];
        setArr(newArr);
    };

    const addSocial = () => setSocials([...socials, { id: Date.now(), name: '', url: '' }]);
    const removeSocial = (index) => setSocials(socials.filter((_, i) => i !== index));
    const updateSocial = (index, field, value) => {
        const updated = [...socials];
        updated[index] = { ...updated[index], [field]: value };
        setSocials(updated);
    };

    const handleSave = async () => {
        setSaving(true);
        setMessage('');
        try {
            await adminApi.updateHome({
                profileImageUrl,
                heroHeadline,
                ctaText,
                ctaUrl,
                socialLinks: socials.map(s => ({ name: s.name, url: s.url })),
            });
            setMessage('✅ Saved successfully!');
            setTimeout(() => setMessage(''), 3000);
        } catch (err) {
            setMessage('❌ Failed to save: ' + err.message);
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return <div style={{ padding: '40px', textAlign: 'center' }}><p className="text-secondary">Loading...</p></div>;
    }

    return (
        <div className="admin-project-editor">
            <div className="editor-header-bar">
                <div className="header-left">
                    <h3 className="section-title">Home Page CMS</h3>
                    {message && <span style={{ marginLeft: '16px', fontSize: '0.9rem' }}>{message}</span>}
                </div>
                <div className="header-actions">
                    <button className="btn-primary" onClick={handleSave} disabled={saving}>
                        {saving ? 'Saving...' : 'Save Changes'}
                    </button>
                </div>
            </div>

            <div className="editor-layout" style={{ gridTemplateColumns: '1fr' }}>
                <div className="editor-panel animate-fade-in">
                    <h4 className="panel-title">Hero Profile</h4>
                    <div className="form-group" style={{ marginBottom: '24px' }}>
                        <label>Profile Picture URL</label>
                        <input type="url" className="form-input" value={profileImageUrl} onChange={(e) => setProfileImageUrl(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label>Hero Headline (HTML Supported)</label>
                        <textarea className="form-input text-lg" rows="3" value={heroHeadline} onChange={(e) => setHeroHeadline(e.target.value)} />
                    </div>
                    <div className="form-group-grid" style={{ marginTop: '24px' }}>
                        <div className="form-group">
                            <label>Call to Action Link Text</label>
                            <input type="text" className="form-input" value={ctaText} onChange={(e) => setCtaText(e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label>Call to Action Target URL</label>
                            <input type="text" className="form-input" value={ctaUrl} onChange={(e) => setCtaUrl(e.target.value)} placeholder="/contact" />
                        </div>
                    </div>
                </div>

                <div className="editor-panel animate-fade-in delay-100">
                    <h4 className="panel-title">Social Media Icons</h4>
                    <p className="text-secondary" style={{ marginBottom: '16px', fontSize: '0.9rem' }}>Used to map the exact icons and links displayed under your Hero section.</p>
                    <div className="blocks-list">
                        {socials.map((social, index) => (
                            <div key={social.id || index} className="editor-block">
                                <div className="block-header">
                                    <span className="block-type-badge">Social Link {index + 1}</span>
                                    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                                        <button type="button" onClick={() => moveItemUp(socials, setSocials, index)} disabled={index === 0} className="btn-icon" title="Move Up" style={{ opacity: index === 0 ? 0.3 : 1, cursor: index === 0 ? 'not-allowed' : 'pointer' }}>↑</button>
                                        <button type="button" onClick={() => moveItemDown(socials, setSocials, index)} disabled={index === socials.length - 1} className="btn-icon" title="Move Down" style={{ opacity: index === socials.length - 1 ? 0.3 : 1, cursor: index === socials.length - 1 ? 'not-allowed' : 'pointer' }}>↓</button>
                                        <button type="button" onClick={() => removeSocial(index)} className="btn-icon text-danger" title="Remove">&times;</button>
                                    </div>
                                </div>
                                <div className="block-body" style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '16px' }}>
                                    <div className="form-group">
                                        <label>Platform Name (or React-Icon code)</label>
                                        <input type="text" className="form-input" value={social.name} onChange={(e) => updateSocial(index, 'name', e.target.value)} placeholder="e.g. LinkedIn or SiLinkedin" />
                                    </div>
                                    <div className="form-group">
                                        <label>Target URL</label>
                                        <input type="text" className="form-input" value={social.url} onChange={(e) => updateSocial(index, 'url', e.target.value)} placeholder="https://" />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <button type="button" onClick={addSocial} className="btn-outline" style={{ marginTop: '16px' }}>+ Add Social Link</button>
                </div>
            </div>
        </div>
    );
}
