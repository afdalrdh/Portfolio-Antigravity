import { useState, useEffect } from 'react';
import { adminApi } from '../../lib/api';
import './AdminProjectEditor.css';

export default function AdminContactEditor() {
    const [whatsappNumber, setWhatsappNumber] = useState('');
    const [defaultMessage, setDefaultMessage] = useState('');
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState('');

    useEffect(() => {
        adminApi.getContact()
            .then((data) => {
                if (data) {
                    setWhatsappNumber(data.whatsappNumber || '');
                    setDefaultMessage(data.defaultMessage || '');
                }
            })
            .catch(console.error)
            .finally(() => setLoading(false));
    }, []);

    const handleSave = async () => {
        setSaving(true);
        setMessage('');
        try {
            await adminApi.updateContact({ whatsappNumber, defaultMessage });
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
                    <h3 className="section-title">Contact Page CMS</h3>
                    {message && <span style={{ marginLeft: '16px', fontSize: '0.9rem' }}>{message}</span>}
                </div>
                <div className="header-actions">
                    <button className="btn-primary" onClick={handleSave} disabled={saving}>{saving ? 'Saving...' : 'Save Changes'}</button>
                </div>
            </div>

            <div className="editor-layout" style={{ gridTemplateColumns: '1fr' }}>
                <div className="editor-panel container-fade-in">
                    <h4 className="panel-title">WhatsApp Settings</h4>
                    <p className="text-secondary" style={{ marginBottom: '24px', fontSize: '0.9rem' }}>Configure the phone number and default message for the WhatsApp contact button.</p>

                    <div className="form-group">
                        <label>WhatsApp Number</label>
                        <input type="text" className="form-input text-lg" value={whatsappNumber} onChange={(e) => setWhatsappNumber(e.target.value)} placeholder="e.g. 628123... (include country code)" />
                        <span className="text-secondary" style={{ fontSize: '0.8rem', marginTop: '4px' }}>Fill numerical only including country code but without '+' sign.</span>
                    </div>

                    <div className="form-group" style={{ marginTop: '24px' }}>
                        <label>Default WhatsApp Message</label>
                        <textarea className="form-input" rows="5" value={defaultMessage} onChange={(e) => setDefaultMessage(e.target.value)} />
                    </div>
                </div>
            </div>
        </div>
    );
}
