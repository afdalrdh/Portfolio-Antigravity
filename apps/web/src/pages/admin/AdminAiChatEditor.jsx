import { useState, useEffect, useRef } from 'react';
import { adminApi } from '../../lib/api';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import CloudinaryUploadWidget from '../../components/admin/CloudinaryUploadWidget';
import './AdminProjectEditor.css';
import * as pdfjsLib from 'pdfjs-dist';
import pdfWorkerUrl from 'pdfjs-dist/build/pdf.worker.min.mjs?url';

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorkerUrl;

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
    
    const [activeTab, setActiveTab] = useState('settings'); // 'settings' | 'logs'
    const [logsData, setLogsData] = useState({ logs: [], stats: {} });
    const [loadingLogs, setLoadingLogs] = useState(false);
    const [expandedLogs, setExpandedLogs] = useState({});

    useEffect(() => {
        if (activeTab === 'logs') {
            setLoadingLogs(true);
            adminApi.getAiChatLogs()
                .then(data => setLogsData(data))
                .catch(console.error)
                .finally(() => setLoadingLogs(false));
        }
    }, [activeTab]);

    const toggleLogExpand = (id) => {
        setExpandedLogs(prev => ({ ...prev, [id]: !prev[id] }));
    };
    
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
                const currentPrompt = settings?.knowledgeBase || '';
                const newPrompt = currentPrompt ? currentPrompt + '\n\n' + text.trim() : text.trim();
                handleUpdate('knowledgeBase', newPrompt);
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
                    <button 
                        className="btn-primary" 
                        onClick={handleSave} 
                        disabled={saving}
                    >
                        {saving ? 'Saving...' : 'Save Changes'}
                    </button>
                </div>
            </div>

            <div style={{ display: 'flex', gap: '16px', marginBottom: '24px', borderBottom: '1px solid var(--card-border)', paddingBottom: '12px' }}>
                <button 
                    style={{ background: 'none', border: 'none', fontSize: '1rem', fontWeight: activeTab === 'settings' ? 'bold' : 'normal', color: activeTab === 'settings' ? 'var(--accent-primary)' : 'var(--text-primary)', cursor: 'pointer', borderBottom: activeTab === 'settings' ? '2px solid var(--accent-primary)' : 'none', padding: '0 8px 8px 8px', marginBottom: '-13px' }}
                    onClick={() => setActiveTab('settings')}
                >
                    ⚙️ Pengaturan AI
                </button>
                <button 
                    style={{ background: 'none', border: 'none', fontSize: '1rem', fontWeight: activeTab === 'logs' ? 'bold' : 'normal', color: activeTab === 'logs' ? 'var(--accent-primary)' : 'var(--text-primary)', cursor: 'pointer', borderBottom: activeTab === 'logs' ? '2px solid var(--accent-primary)' : 'none', padding: '0 8px 8px 8px', marginBottom: '-13px' }}
                    onClick={() => setActiveTab('logs')}
                >
                    📊 Analitik & Riwayat
                </button>
            </div>

            {activeTab === 'settings' ? (
                <div className="editor-grid">
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
                            <label>Sifat & Peran AI (Persona)</label>
                            <textarea 
                                className="form-input" 
                                rows="6" 
                                value={settings?.personaPrompt || ''} 
                                onChange={(e) => handleUpdate('personaPrompt', e.target.value)} 
                                placeholder="Kamu adalah asisten virtual yang sangat setia dari bosmu, Afdal Ramdan..."
                            />
                            <span className="text-secondary" style={{ fontSize: '0.8rem', marginTop: '4px' }}>Tentukan sifat, peran, dan cara AI menjawab (contoh: galak, ramah, loyal, dll).</span>
                        </div>

                        <div className="form-group" style={{ marginTop: '16px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                                <label style={{ margin: 0 }}>Data Pengetahuan (Portofolio)</label>
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
                                rows="12" 
                                value={settings?.knowledgeBase || ''} 
                                onChange={(e) => handleUpdate('knowledgeBase', e.target.value)} 
                                placeholder="Berikut adalah data tentang bosmu: Nama: Afdal Ramdan..."
                            />
                            <span className="text-secondary" style={{ fontSize: '0.8rem', marginTop: '4px' }}>Masukkan data portofolio, pengalaman kerja, kontak, dll. AI akan membaca data ini untuk menjawab pertanyaan teknis.</span>
                        </div>
                    </div>

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
            ) : (
                <div className="logs-dashboard animate-fade-in">
                    <div style={{ display: 'flex', gap: '16px', marginBottom: '24px' }}>
                        <div className="stat-card" style={{ padding: '16px', background: 'var(--card-bg)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--card-border)', flex: 1 }}>
                            <h4 style={{ margin: '0 0 8px 0', color: 'var(--text-secondary)' }}>Chat Hari Ini</h4>
                            <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>{logsData.stats.todayChats || 0}</div>
                        </div>
                        <div className="stat-card" style={{ padding: '16px', background: 'var(--card-bg)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--card-border)', flex: 1 }}>
                            <h4 style={{ margin: '0 0 8px 0', color: 'var(--text-secondary)' }}>Chat Minggu Ini</h4>
                            <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>{logsData.stats.weekChats || 0}</div>
                        </div>
                        <div className="stat-card" style={{ padding: '16px', background: 'var(--card-bg)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--card-border)', flex: 1 }}>
                            <h4 style={{ margin: '0 0 8px 0', color: 'var(--text-secondary)' }}>Total Chat</h4>
                            <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>{logsData.stats.totalChats || 0}</div>
                        </div>
                    </div>

                    <h3 style={{ marginBottom: '16px' }}>Riwayat Percakapan</h3>
                    {loadingLogs ? (
                        <LoadingSpinner />
                    ) : logsData.logs.length === 0 ? (
                        <p className="text-secondary">Belum ada percakapan dengan AI.</p>
                    ) : (
                        <div style={{ overflowX: 'auto' }}>
                            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
                                <thead>
                                    <tr style={{ borderBottom: '2px solid var(--card-border)', textAlign: 'left' }}>
                                        <th style={{ padding: '12px' }}>Waktu</th>
                                        <th style={{ padding: '12px' }}>Lokasi</th>
                                        <th style={{ padding: '12px' }}>Pertanyaan (Prompt)</th>
                                        <th style={{ padding: '12px' }}>Jawaban (Response)</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {logsData.logs.map(log => {
                                        const isExpanded = expandedLogs[log.id];
                                        return (
                                            <tr key={log.id} style={{ borderBottom: '1px solid var(--card-border)' }}>
                                                <td style={{ padding: '12px', verticalAlign: 'top', whiteSpace: 'nowrap' }}>
                                                    {new Date(log.createdAt).toLocaleString('id-ID', { dateStyle: 'short', timeStyle: 'short' })}
                                                </td>
                                                <td style={{ padding: '12px', verticalAlign: 'top' }}>
                                                    {log.location || '-'}
                                                </td>
                                                <td style={{ padding: '12px', verticalAlign: 'top', maxWidth: '250px' }}>
                                                    {log.prompt}
                                                </td>
                                                <td style={{ padding: '12px', verticalAlign: 'top', maxWidth: '400px' }}>
                                                    <div style={{ 
                                                        maxHeight: isExpanded ? 'none' : '60px', 
                                                        overflow: 'hidden',
                                                        position: 'relative'
                                                    }}>
                                                        {log.response}
                                                        {!isExpanded && log.response.length > 100 && (
                                                            <div style={{
                                                                position: 'absolute',
                                                                bottom: 0,
                                                                left: 0,
                                                                right: 0,
                                                                height: '30px',
                                                                background: 'linear-gradient(transparent, var(--bg-primary))'
                                                            }} />
                                                        )}
                                                    </div>
                                                    {log.response.length > 100 && (
                                                        <button 
                                                            style={{ background: 'none', border: 'none', color: 'var(--accent-primary)', cursor: 'pointer', padding: '4px 0', fontSize: '0.8rem', fontWeight: 'bold' }}
                                                            onClick={() => toggleLogExpand(log.id)}
                                                        >
                                                            {isExpanded ? 'Tutup' : 'Baca Selengkapnya'}
                                                        </button>
                                                    )}
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
