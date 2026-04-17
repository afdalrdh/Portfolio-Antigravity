import { useState, useEffect } from 'react';
import { adminApi } from '../../lib/api';
import './AdminProjectEditor.css';

export default function AdminAboutEditor() {
    const [bioDescription, setBioDescription] = useState('');
    const [experiences, setExperiences] = useState([]);
    const [licenses, setLicenses] = useState([]);
    const [activities, setActivities] = useState([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState('');

    useEffect(() => {
        adminApi.getAbout()
            .then((data) => {
                setBioDescription(data.page?.bioDescription || '');
                setExperiences(data.experiences || []);
                setLicenses(data.certifications || []);
                setActivities(data.galleryImages || []);
            })
            .catch(console.error)
            .finally(() => setLoading(false));
    }, []);

    const addExperience = () => setExperiences([...experiences, { id: Date.now(), initials: '', jobTitle: '', company: '', dateRange: '', contractType: '' }]);
    const removeExperience = (index) => setExperiences(experiences.filter((_, i) => i !== index));
    const updateExperience = (index, field, value) => { const u = [...experiences]; u[index] = { ...u[index], [field]: value }; setExperiences(u); };

    const addLicense = () => setLicenses([...licenses, { id: Date.now(), initials: '', name: '', issuer: '', issueDate: '' }]);
    const removeLicense = (index) => setLicenses(licenses.filter((_, i) => i !== index));
    const updateLicense = (index, field, value) => { const u = [...licenses]; u[index] = { ...u[index], [field]: value }; setLicenses(u); };

    const addActivity = () => setActivities([...activities, { id: Date.now(), imageUrl: '' }]);
    const removeActivity = (index) => setActivities(activities.filter((_, i) => i !== index));
    const updateActivity = (index, value) => { const u = [...activities]; u[index] = { ...u[index], imageUrl: value }; setActivities(u); };

    const handleSave = async () => {
        setSaving(true);
        setMessage('');
        try {
            await adminApi.updateAbout({
                bioDescription,
                experiences: experiences.map(e => ({ initials: e.initials, jobTitle: e.jobTitle, company: e.company, dateRange: e.dateRange, contractType: e.contractType })),
                certifications: licenses.map(l => ({ initials: l.initials, name: l.name, issuer: l.issuer, issueDate: l.issueDate })),
                galleryImages: activities.map(a => ({ imageUrl: a.imageUrl })),
            });
            setMessage('✅ Saved successfully!');
            setTimeout(() => setMessage(''), 3000);
        } catch (err) {
            setMessage('❌ Failed to save: ' + err.message);
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <div style={{ padding: '40px', textAlign: 'center' }}><p className="text-secondary">Loading...</p></div>;

    return (
        <div className="admin-project-editor">
            <div className="editor-header-bar">
                <div className="header-left">
                    <h3 className="section-title">About Page CMS</h3>
                    {message && <span style={{ marginLeft: '16px', fontSize: '0.9rem' }}>{message}</span>}
                </div>
                <div className="header-actions">
                    <button className="btn-primary" onClick={handleSave} disabled={saving}>{saving ? 'Saving...' : 'Save Changes'}</button>
                </div>
            </div>

            <div className="editor-layout" style={{ gridTemplateColumns: '1fr' }}>
                <div className="editor-panel container-fade-in">
                    <h4 className="panel-title">Overview Description</h4>
                    <div className="form-group">
                        <label>About Description (HTML supported)</label>
                        <textarea className="form-input" rows="8" value={bioDescription} onChange={(e) => setBioDescription(e.target.value)} />
                    </div>
                </div>

                <div className="editor-panel container-fade-in delay-100">
                    <h4 className="panel-title">Experience</h4>
                    <div className="blocks-list">
                        {experiences.map((exp, index) => (
                            <div key={exp.id || index} className="editor-block">
                                <div className="block-header">
                                    <span className="block-type-badge">Experience {index + 1}</span>
                                    <button type="button" onClick={() => removeExperience(index)} className="btn-icon text-danger">&times;</button>
                                </div>
                                <div className="block-body" style={{ display: 'grid', gridTemplateColumns: '80px 1fr 1fr', gap: '16px' }}>
                                    <div className="form-group"><label>Initials</label><input type="text" className="form-input text-center" value={exp.initials} onChange={(e) => updateExperience(index, 'initials', e.target.value)} /></div>
                                    <div className="form-group"><label>Job Title</label><input type="text" className="form-input" value={exp.jobTitle} onChange={(e) => updateExperience(index, 'jobTitle', e.target.value)} /></div>
                                    <div className="form-group"><label>Company</label><input type="text" className="form-input" value={exp.company} onChange={(e) => updateExperience(index, 'company', e.target.value)} /></div>
                                    <div className="form-group" style={{ gridColumn: '2 / 3' }}><label>Date Range</label><input type="text" className="form-input" value={exp.dateRange} onChange={(e) => updateExperience(index, 'dateRange', e.target.value)} /></div>
                                    <div className="form-group"><label>Contract Type</label><input type="text" className="form-input" value={exp.contractType} onChange={(e) => updateExperience(index, 'contractType', e.target.value)} /></div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <button type="button" onClick={addExperience} className="btn-outline">+ Add Experience</button>
                </div>

                <div className="editor-panel container-fade-in delay-200">
                    <h4 className="panel-title">Licenses & Certifications</h4>
                    <div className="blocks-list">
                        {licenses.map((lic, index) => (
                            <div key={lic.id || index} className="editor-block">
                                <div className="block-header">
                                    <span className="block-type-badge">License {index + 1}</span>
                                    <button type="button" onClick={() => removeLicense(index)} className="btn-icon text-danger">&times;</button>
                                </div>
                                <div className="block-body" style={{ display: 'grid', gridTemplateColumns: '80px 1fr 1fr', gap: '16px' }}>
                                    <div className="form-group"><label>Initials</label><input type="text" className="form-input text-center" value={lic.initials} onChange={(e) => updateLicense(index, 'initials', e.target.value)} /></div>
                                    <div className="form-group"><label>Certification Name</label><input type="text" className="form-input" value={lic.name} onChange={(e) => updateLicense(index, 'name', e.target.value)} /></div>
                                    <div className="form-group"><label>Issuer Organization</label><input type="text" className="form-input" value={lic.issuer} onChange={(e) => updateLicense(index, 'issuer', e.target.value)} /></div>
                                    <div className="form-group" style={{ gridColumn: '2 / 3' }}><label>Issue Date</label><input type="text" className="form-input" value={lic.issueDate} onChange={(e) => updateLicense(index, 'issueDate', e.target.value)} /></div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <button type="button" onClick={addLicense} className="btn-outline">+ Add License</button>
                </div>

                <div className="editor-panel container-fade-in delay-300">
                    <h4 className="panel-title">Activity Gallery</h4>
                    <p className="text-secondary" style={{ marginBottom: '16px', fontSize: '0.9rem' }}>Images added here will be rendered as a horizontal scroll on the About page if there are more than 3 images.</p>
                    <div className="blocks-list">
                        {activities.map((act, index) => (
                            <div key={act.id || index} className="editor-block">
                                <div className="block-header">
                                    <span className="block-type-badge">Image {index + 1}</span>
                                    <button type="button" onClick={() => removeActivity(index)} className="btn-icon text-danger">&times;</button>
                                </div>
                                <div className="block-body">
                                    <div className="form-group" style={{ marginBottom: 0 }}>
                                        <label>Image URL</label>
                                        <input type="url" className="form-input" value={act.imageUrl} onChange={(e) => updateActivity(index, e.target.value)} placeholder="https://..." />
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
