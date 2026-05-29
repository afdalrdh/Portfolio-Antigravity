import { useState, useEffect, useRef } from 'react';
import { adminApi } from '../../lib/api';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import CloudinaryUploadWidget from '../../components/admin/CloudinaryUploadWidget';
import './AdminProjectEditor.css';
import * as pdfjsLib from 'pdfjs-dist';

pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.mjs`;

// Helper to determine if an avatar URL is a Lottie animation
const isLottie = (url) => {
    if (!url) return false;
    return url.endsWith('.lottie') || url.endsWith('.json') || url.includes('lottie.host');
};

export default function AdminAiChatEditor() {
    const [settings, setSettings] = useState(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [uploadingFile, setUploadingFile] = useState(false);
    const [message, setMessage] = useState('');
    
    const [showApiKey, setShowApiKey] = useState(false);
    const fileInputRef = useRef(null);

    useEffect(() => {
        adminApi.getAiChat()
            .then((data) => {
                if (data) {
                    // parse models and suggestions if they are strings
                    let parsedModels = [];
                    let parsedSuggestions = [];
                    try {
                        parsedModels = typeof data.groqModels === 'string' ? JSON.parse(data.groqModels) : data.groqModels;
                    } catch (e) { parsedModels = ['llama-3.3-70b-versatile']; }
                    
                    try {
                        parsedSuggestions = typeof data.suggestions === 'string' ? JSON.parse(data.suggestions) : data.suggestions;
                    } catch (e) { parsedSuggestions = []; }

                    setSettings({
                        ...data,
                        groqModels: parsedModels,
                        suggestions: parsedSuggestions,
                    });
                }
            })
            .catch(console.error)
            .finally(() => setLoading(false));
    }, []);

    const handleSave = async () => {
        setSaving(true);
        setMessage('');
        try {
            await adminApi.updateAiChat(settings);
            setMessage('✅ Saved successfully!');
            setTimeout(() => setMessage(''), 3000);
        } catch (err) {
            setMessage('❌ Failed to save: ' + err.message);
        } finally {
            setSaving(false);
        }
    };

    const handleFileUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        
        setUploadingFile(true);
        try {
            let text = '';
            if (file.type === 'application/pdf') {
                const arrayBuffer = await file.arrayBuffer();
                const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
                for (let i = 1; i <= pdf.numPages; i++) {
                    const page = await pdf.getPage(i);
                    const content = await page.getTextContent();
                    const strings = content.items.map(item => item.str);
                    text += strings.join(' ') + '\n';
                }
            } else {
                text = await file.text();
            }
            
            if (text) {
                const currentPrompt = settings?.systemPrompt || '';
                const newPrompt = currentPrompt ? currentPrompt + '\n\n' + text.trim() : text.trim();
                handleUpdate('systemPrompt', newPrompt);
                setMessage('✅ File content extracted and added!');
                setTimeout(() => setMessage(''), 3000);
            }
        } catch (err) {
            setMessage('❌ Failed to parse file: ' + err.message);
        } finally {
            setUploadingFile(false);
            if (fileInputRef.current) fileInputRef.current.value = null;
        }
    };

    const handleUpdate = (field, value) => {
        setSettings(prev => ({ ...prev, [field]: value }));
    };

    const handleSuggestionChange = (index, field, value) => {
        const newSuggestions = [...settings.suggestions];
        newSuggestions[index] = { ...newSuggestions[index], [field]: value };
        handleUpdate('suggestions', newSuggestions);
    };

    const addSuggestion = () => {
        const newSuggestions = [...(settings.suggestions || []), { icon: '✨', label: 'New', prompt: '' }];
        handleUpdate('suggestions', newSuggestions);
    };

    const removeSuggestion = (index) => {
        const newSuggestions = settings.suggestions.filter((_, i) => i !== index);
        handleUpdate('suggestions', newSuggestions);
    };

    if (loading) return <LoadingSpinner />;

    return (
        <div className="admin-project-editor">
            <div className="editor-header-bar">
                <div className="header-left">
                    <h3 className="section-title">AI Chat Settings</h3>
                    {message && <span style={{ marginLeft: '16px', fontSize: '0.9rem' }}>{message}</span>}
                </div>
                <div className="header-actions">
                    <button className="btn-primary" onClick={handleSave} disabled={saving}>{saving ? 'Saving...' : 'Save Changes'}</button>
                </div>
            </div>

            <div className="editor-layout" style={{ gridTemplateColumns: '1fr' }}>
                
                {/* Configuration Panel */}
                <div className="editor-panel animate-fade-in">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                        <h4 className="panel-title" style={{ margin: 0 }}>Groq Configuration</h4>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <span className="text-secondary" style={{ fontSize: '0.9rem' }}>{settings?.isEnabled ? 'Enabled' : 'Disabled'}</span>
                            <button 
                                className="toggle-btn"
                                style={{
                                    background: settings?.isEnabled ? 'var(--accent-primary)' : 'var(--nav-border)',
                                    border: 'none',
                                    borderRadius: '16px',
                                    width: '40px',
                                    height: '24px',
                                    position: 'relative',
                                    cursor: 'pointer',
                                    transition: 'background 0.3s'
                                }}
                                onClick={() => handleUpdate('isEnabled', !settings?.isEnabled)}
                            >
                                <div style={{
                                    position: 'absolute',
                                    top: '2px',
                                    left: settings?.isEnabled ? '18px' : '2px',
                                    width: '20px',
                                    height: '20px',
                                    background: 'white',
                                    borderRadius: '50%',
                                    transition: 'left 0.3s'
                                }} />
                            </button>
                        </div>
                    </div>

                    <div className="form-group">
                        <label>Groq API Key</label>
                        <div style={{ display: 'flex', gap: '8px' }}>
                            <input 
                                type={showApiKey ? "text" : "password"} 
                                className="form-input" 
                                value={settings?.groqApiKey || ''} 
                                onChange={(e) => handleUpdate('groqApiKey', e.target.value)} 
                                placeholder="gsk_..." 
                            />
                            <button 
                                className="btn-secondary" 
                                onClick={() => setShowApiKey(!showApiKey)}
                                type="button"
                            >
                                {showApiKey ? 'Hide' : 'Show'}
                            </button>
                        </div>
                        <span className="text-secondary" style={{ fontSize: '0.8rem', marginTop: '4px' }}>Get your free API key at console.groq.com/keys</span>
                    </div>

                    <div className="form-group" style={{ marginTop: '16px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                            <label style={{ margin: 0 }}>System Prompt (Knowledge Base)</label>
                            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                                {uploadingFile && <span className="text-secondary" style={{ fontSize: '0.8rem' }}>Extracting text...</span>}
                                <button 
                                    type="button"
                                    className="btn-secondary" 
                                    style={{ padding: '4px 8px', fontSize: '0.8rem' }}
                                    onClick={() => fileInputRef.current?.click()}
                                    disabled={uploadingFile}
                                >
                                    Upload CV / PDF
                                </button>
                                <input 
                                    type="file" 
                                    ref={fileInputRef} 
                                    style={{ display: 'none' }} 
                                    accept=".pdf,.txt,.md" 
                                    onChange={handleFileUpload} 
                                />
                            </div>
                        </div>
                        <textarea 
                            className="form-input" 
                            rows="8" 
                            value={settings?.systemPrompt || ''} 
                            onChange={(e) => handleUpdate('systemPrompt', e.target.value)} 
                            placeholder="You are Bodal AI, the personal assistant of Afdal Ramdan. Afdal is a UI/UX designer..."
                        />
                        <span className="text-secondary" style={{ fontSize: '0.8rem', marginTop: '4px' }}>Input information about Afdal here, or upload a CV/Portfolio PDF. The AI will use this to answer questions.</span>
                    </div>
                </div>

                {/* Display Settings Panel */}
                <div className="editor-panel animate-fade-in" style={{ animationDelay: '100ms' }}>
                    <h4 className="panel-title">Display & Content</h4>

                    <div className="form-group">
                        <label>Assistant Name</label>
                        <input type="text" className="form-input" value={settings?.assistantName || ''} onChange={(e) => handleUpdate('assistantName', e.target.value)} />
                    </div>

                    <div className="form-group" style={{ marginTop: '16px' }}>
                        <label>Avatar URL</label>
                        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                            {settings?.assistantAvatarUrl && (
                                isLottie(settings.assistantAvatarUrl) ? (
                                    <div style={{ width: '48px', height: '48px', borderRadius: '50%', overflow: 'hidden', flexShrink: 0 }}>
                                        <dotlottie-wc 
                                            src={settings.assistantAvatarUrl} 
                                            style={{ width: '100%', height: '100%' }} 
                                            autoplay 
                                            loop 
                                        />
                                    </div>
                                ) : (
                                    <img src={settings.assistantAvatarUrl} alt="Avatar" style={{ width: '48px', height: '48px', borderRadius: '50%', objectFit: 'cover' }} />
                                )
                            )}
                            <div style={{ flex: 1 }}>
                                <input type="text" className="form-input" value={settings?.assistantAvatarUrl || ''} onChange={(e) => handleUpdate('assistantAvatarUrl', e.target.value)} placeholder="/images/bodal-avatar.png" />
                            </div>
                            <CloudinaryUploadWidget 
                                onUploadSuccess={(url) => handleUpdate('assistantAvatarUrl', url)} 
                                buttonText="Upload Avatar"
                            />
                        </div>
                    </div>

                    <div className="form-group" style={{ marginTop: '16px' }}>
                        <label>Welcome Title</label>
                        <input type="text" className="form-input" value={settings?.welcomeTitle || ''} onChange={(e) => handleUpdate('welcomeTitle', e.target.value)} />
                    </div>

                    <div className="form-group" style={{ marginTop: '16px' }}>
                        <label>Welcome Subtitle</label>
                        <input type="text" className="form-input" value={settings?.welcomeSubtitle || ''} onChange={(e) => handleUpdate('welcomeSubtitle', e.target.value)} />
                    </div>
                </div>

                {/* Suggestions Panel */}
                <div className="editor-panel animate-fade-in" style={{ animationDelay: '200ms' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                        <h4 className="panel-title" style={{ margin: 0 }}>Chat Suggestions</h4>
                        <button className="btn-secondary" onClick={addSuggestion} type="button">+ Add</button>
                    </div>
                    
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        {(settings?.suggestions || []).map((sugg, idx) => (
                            <div key={`sugg-${idx}`} style={{ display: 'flex', gap: '8px', background: 'var(--bg-secondary)', padding: '12px', borderRadius: '8px', border: '1px solid var(--nav-border)' }}>
                                <input 
                                    type="text" 
                                    className="form-input" 
                                    style={{ width: '60px' }} 
                                    placeholder="Icon" 
                                    value={sugg.icon || ''} 
                                    onChange={(e) => handleSuggestionChange(idx, 'icon', e.target.value)} 
                                />
                                <input 
                                    type="text" 
                                    className="form-input" 
                                    style={{ width: '120px' }} 
                                    placeholder="Label" 
                                    value={sugg.label || ''} 
                                    onChange={(e) => handleSuggestionChange(idx, 'label', e.target.value)} 
                                />
                                <input 
                                    type="text" 
                                    className="form-input" 
                                    style={{ flex: 1 }} 
                                    placeholder="Prompt text..." 
                                    value={sugg.prompt || ''} 
                                    onChange={(e) => handleSuggestionChange(idx, 'prompt', e.target.value)} 
                                />
                                <button className="btn-secondary" style={{ color: '#ff3b30' }} onClick={() => removeSuggestion(idx)} type="button">X</button>
                            </div>
                        ))}
                        {(!settings?.suggestions || settings.suggestions.length === 0) && (
                            <p className="text-secondary text-center" style={{ padding: '20px' }}>No suggestions added yet.</p>
                        )}
                    </div>
                </div>

            </div>
        </div>
    );
}
