import { useState, useEffect } from 'react';
import { adminApi } from '../../lib/api';
import './AdminProjectEditor.css';

export default function AdminAboutEditor() {
    const [bioDescription, setBioDescription] = useState('');
    const [tools, setTools] = useState([]);
    const [experiences, setExperiences] = useState([]);
    const [licenses, setLicenses] = useState([]);
    const [activities, setActivities] = useState([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState('');

    useEffect(() => {
        adminApi.getAbout()
            .then((data) => {
                if (data.page) {
                    setBioDescription(data.page.bioDescription || '');
                }
                setTools(data.tools || []);
                setExperiences(data.experiences || []);
                setLicenses(data.certifications || []); // Using certifications from API to match public API
                setActivities(data.galleryImages || []); // Using galleryImages to match public API
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

    // Tool helpers
    const addTool = () => setTools([...tools, { id: Date.now().toString(), name: '', iconCode: '' }]);
    const removeTool = (index) => setTools(tools.filter((_, i) => i !== index));
    const updateTool = (index, field, value) => {
        const updated = [...tools];
        updated[index] = { ...updated[index], [field]: value };
        setTools(updated);
    };

    // Experience helpers
    const addExperience = () => setExperiences([...experiences, { id: Date.now().toString(), logoUrl: '', title: '', company: '', dateStart: '', dateEnd: '', type: '' }]);
    const removeExperience = (index) => setExperiences(experiences.filter((_, i) => i !== index));
    const updateExperience = (index, field, value) => {
        const updated = [...experiences];
        updated[index] = { ...updated[index], [field]: value };
        setExperiences(updated);
    };

    // License helpers
    const addLicense = () => setLicenses([...licenses, { id: Date.now().toString(), logoUrl: '', title: '', issuer: '', dateStart: '', dateEnd: '' }]);
    const removeLicense = (index) => setLicenses(licenses.filter((_, i) => i !== index));
    const updateLicense = (index, field, value) => {
        const updated = [...licenses];
        updated[index] = { ...updated[index], [field]: value };
        setLicenses(updated);
    };

    // Activity helpers
    const addActivity = () => setActivities([...activities, { id: Date.now().toString(), imageUrl: '', url: '' }]);
    const removeActivity = (index) => setActivities(activities.filter((_, i) => i !== index));
    const updateActivity = (index, field, value) => {
        const updated = [...activities];
        updated[index] = { ...updated[index], [field]: value, url: value }; // Keep both imageUrl and url consistent
        setActivities(updated);
    };

    const handleSave = async () => {
        setSaving(true);
        setMessage('');
        try {
            await adminApi.updateAbout({
                page: { bioDescription },
                tools,
                experiences,
                certifications: licenses,
                galleryImages: activities
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
                    <h3 className="section-title">About Page CMS</h3>
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
                    <h4 className="panel-title">Overview Description</h4>
                    <div className="form-group">
                        <label>About Description (HTML supported)</label>
                        <textarea className="form-input" rows="5" value={bioDescription} onChange={(e) => setBioDescription(e.target.value)} placeholder="I research user behaviors and design intuitive digital experiences..."></textarea>
                    </div>
                </div>

                <div className="editor-panel animate-fade-in delay-100">
                    <h4 className="panel-title">Tools & Skills Icons</h4>
                    <p className="text-secondary" style={{ marginBottom: '16px', fontSize: '0.9rem' }}>Use typical React-Icons codes (e.g. 'SiFigma', 'FaWordpress'). Refer to react-icons directory.</p>
                    <div className="blocks-list" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '16px' }}>
                        {tools.map((tool, index) => (
                            <div key={tool.id || index} className="editor-block">
                                <div className="block-header">
                                    <span className="block-type-badge">Tool {index + 1}</span>
                                    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                                        <button type="button" onClick={() => moveItemUp(tools, setTools, index)} disabled={index === 0} className="btn-icon" title="Move Up" style={{ opacity: index === 0 ? 0.3 : 1, cursor: index === 0 ? 'not-allowed' : 'pointer' }}>↑</button>
                                        <button type="button" onClick={() => moveItemDown(tools, setTools, index)} disabled={index === tools.length - 1} className="btn-icon" title="Move Down" style={{ opacity: index === tools.length - 1 ? 0.3 : 1, cursor: index === tools.length - 1 ? 'not-allowed' : 'pointer' }}>↓</button>
                                        <button type="button" onClick={() => removeTool(index)} className="btn-icon text-danger" title="Remove">&times;</button>
                                    </div>
                                </div>
                                <div className="block-body">
                                    <div className="form-group">
                                        <label>Tool Name</label>
                                        <input type="text" className="form-input" value={tool.name} onChange={(e) => updateTool(index, 'name', e.target.value)} />
                                    </div>
                                    <div className="form-group" style={{ marginBottom: 0 }}>
                                        <label>React-Icon Code</label>
                                        <input type="text" className="form-input" value={tool.iconCode} onChange={(e) => updateTool(index, 'iconCode', e.target.value)} placeholder="SiFigma" />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <button type="button" onClick={addTool} className="btn-outline" style={{ marginTop: '16px' }}>+ Add Tool Icon</button>
                </div>

                <div className="editor-panel animate-fade-in delay-100">
                    <h4 className="panel-title">Experience</h4>
                    <div className="blocks-list">
                        {experiences.map((exp, index) => (
                            <div key={exp.id || index} className="editor-block">
                                <div className="block-header">
                                    <span className="block-type-badge">Experience {index + 1}</span>
                                    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                                        <button type="button" onClick={() => moveItemUp(experiences, setExperiences, index)} disabled={index === 0} className="btn-icon" title="Move Up" style={{ opacity: index === 0 ? 0.3 : 1, cursor: index === 0 ? 'not-allowed' : 'pointer' }}>↑</button>
                                        <button type="button" onClick={() => moveItemDown(experiences, setExperiences, index)} disabled={index === experiences.length - 1} className="btn-icon" title="Move Down" style={{ opacity: index === experiences.length - 1 ? 0.3 : 1, cursor: index === experiences.length - 1 ? 'not-allowed' : 'pointer' }}>↓</button>
                                        <button type="button" onClick={() => removeExperience(index)} className="btn-icon text-danger" title="Remove">&times;</button>
                                    </div>
                                </div>
                                <div className="block-body" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                                    <div className="form-group" style={{ gridColumn: 'span 2' }}>
                                        <label>Company Logo URL</label>
                                        <input type="url" className="form-input" value={exp.logoUrl || ''} onChange={(e) => updateExperience(index, 'logoUrl', e.target.value)} placeholder="https://..." />
                                    </div>
                                    <div className="form-group">
                                        <label>Job Title</label>
                                        <input type="text" className="form-input" value={exp.title || exp.jobTitle || ''} onChange={(e) => updateExperience(index, 'title', e.target.value)} />
                                    </div>
                                    <div className="form-group">
                                        <label>Company</label>
                                        <input type="text" className="form-input" value={exp.company || ''} onChange={(e) => updateExperience(index, 'company', e.target.value)} />
                                    </div>
                                    <div className="form-group">
                                        <label>Start Date</label>
                                        <input type="text" className="form-input" value={exp.dateStart || ''} onChange={(e) => updateExperience(index, 'dateStart', e.target.value)} placeholder="Jan 2024" />
                                    </div>
                                    <div className="form-group">
                                        <label>End Date</label>
                                        <input type="text" className="form-input" value={exp.dateEnd || ''} onChange={(e) => updateExperience(index, 'dateEnd', e.target.value)} placeholder="Present" />
                                    </div>
                                    <div className="form-group">
                                        <label>Contract Type</label>
                                        <input type="text" className="form-input" value={exp.type || exp.contractType || ''} onChange={(e) => updateExperience(index, 'type', e.target.value)} placeholder="Contract" />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <button type="button" onClick={addExperience} className="btn-outline">+ Add Experience</button>
                </div>

                <div className="editor-panel animate-fade-in delay-200">
                    <h4 className="panel-title">Licenses & Certifications</h4>
                    <div className="blocks-list">
                        {licenses.map((lic, index) => (
                            <div key={lic.id || index} className="editor-block">
                                <div className="block-header">
                                    <span className="block-type-badge">License {index + 1}</span>
                                    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                                        <button type="button" onClick={() => moveItemUp(licenses, setLicenses, index)} disabled={index === 0} className="btn-icon" title="Move Up" style={{ opacity: index === 0 ? 0.3 : 1, cursor: index === 0 ? 'not-allowed' : 'pointer' }}>↑</button>
                                        <button type="button" onClick={() => moveItemDown(licenses, setLicenses, index)} disabled={index === licenses.length - 1} className="btn-icon" title="Move Down" style={{ opacity: index === licenses.length - 1 ? 0.3 : 1, cursor: index === licenses.length - 1 ? 'not-allowed' : 'pointer' }}>↓</button>
                                        <button type="button" onClick={() => removeLicense(index)} className="btn-icon text-danger" title="Remove">&times;</button>
                                    </div>
                                </div>
                                <div className="block-body" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                                    <div className="form-group" style={{ gridColumn: 'span 2' }}>
                                        <label>Institution Logo URL</label>
                                        <input type="url" className="form-input" value={lic.logoUrl || ''} onChange={(e) => updateLicense(index, 'logoUrl', e.target.value)} placeholder="https://..." />
                                    </div>
                                    <div className="form-group">
                                        <label>Certification Name</label>
                                        <input type="text" className="form-input" value={lic.title || lic.name || ''} onChange={(e) => updateLicense(index, 'title', e.target.value)} />
                                    </div>
                                    <div className="form-group">
                                        <label>Issuer Organization</label>
                                        <input type="text" className="form-input" value={lic.issuer || ''} onChange={(e) => updateLicense(index, 'issuer', e.target.value)} />
                                    </div>
                                    <div className="form-group">
                                        <label>Start/Issue Date</label>
                                        <input type="text" className="form-input" value={lic.dateStart || lic.issueDate || ''} onChange={(e) => updateLicense(index, 'dateStart', e.target.value)} placeholder="Jul 2024" />
                                    </div>
                                    <div className="form-group">
                                        <label>Expiration Date</label>
                                        <input type="text" className="form-input" value={lic.dateEnd || ''} onChange={(e) => updateLicense(index, 'dateEnd', e.target.value)} placeholder="(Optional)" />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <button type="button" onClick={addLicense} className="btn-outline">+ Add License</button>
                </div>

                <div className="editor-panel animate-fade-in delay-300">
                    <h4 className="panel-title">Activity Gallery</h4>
                    <p className="text-secondary" style={{ marginBottom: '16px', fontSize: '0.9rem' }}>These images will appear on the frontend as a sliding carousel with an image viewer lightbox.</p>
                    <div className="blocks-list">
                        {activities.map((act, index) => (
                            <div key={act.id || index} className="editor-block">
                                <div className="block-header">
                                    <span className="block-type-badge">Image {index + 1}</span>
                                    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                                        <button type="button" onClick={() => moveItemUp(activities, setActivities, index)} disabled={index === 0} className="btn-icon" title="Move Up" style={{ opacity: index === 0 ? 0.3 : 1, cursor: index === 0 ? 'not-allowed' : 'pointer' }}>↑</button>
                                        <button type="button" onClick={() => moveItemDown(activities, setActivities, index)} disabled={index === activities.length - 1} className="btn-icon" title="Move Down" style={{ opacity: index === activities.length - 1 ? 0.3 : 1, cursor: index === activities.length - 1 ? 'not-allowed' : 'pointer' }}>↓</button>
                                        <button type="button" onClick={() => removeActivity(index)} className="btn-icon text-danger" title="Remove">&times;</button>
                                    </div>
                                </div>
                                <div className="block-body">
                                    <div className="form-group" style={{ marginBottom: 0 }}>
                                        <label>Image URL</label>
                                        <input type="url" className="form-input" value={act.imageUrl || act.url || ''} onChange={(e) => updateActivity(index, 'imageUrl', e.target.value)} placeholder="https://..." />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <button type="button" onClick={addActivity} className="btn-outline">+ Add Activity Image</button>
                </div>
            </div>
        </div>
    );
}
