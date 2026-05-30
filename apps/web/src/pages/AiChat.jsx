import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { publicApi } from '../lib/api';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import './AiChat.css';

// Simple Markdown parser for AI responses
const parseMarkdown = (text) => {
    if (!text) return '';
    let html = text
        // Bold
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        // Italic
        .replace(/\*(.*?)\*/g, '<em>$1</em>')
        // Links (Markdown format)
        .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noreferrer" style="color: var(--accent-primary); text-decoration: underline;">$1</a>')
        // Bare URLs
        .replace(/(^|\s)(https?:\/\/\S+|www\.\S+)/g, (match, space, url) => {
            const cleanUrl = url.replace(/[.,!?;]+$/, '');
            const href = cleanUrl.startsWith('http') ? cleanUrl : `https://${cleanUrl}`;
            const punctuation = url.substring(cleanUrl.length);
            return `${space}<a href="${href}" target="_blank" rel="noreferrer" style="color: var(--accent-primary); text-decoration: underline;">${cleanUrl}</a>${punctuation}`;
        })
        // Unordered lists (bullet points)
        .replace(/^\s*[-*]\s+(.*)$/gm, '&bull; $1')
        // Paragraphs (double newline)
        .replace(/\n\n/g, '</p><p>')
        // Line breaks
        .replace(/\n/g, '<br />');
    
    return `<p>${html}</p>`;
};

// Helper to determine if an avatar URL is a Lottie animation
const isLottie = (url) => {
    if (!url) return false;
    return url.endsWith('.lottie') || url.endsWith('.json') || url.includes('lottie.host');
};

export default function AiChat() {
    const [settings, setSettings] = useState(null);
    const [loading, setLoading] = useState(true);
    
    // Chat state
    const [messages, setMessages] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [chatError, setChatError] = useState(null);
    const [language, setLanguage] = useState('en');
    const [showLangDropdown, setShowLangDropdown] = useState(false);
    const [sessionId] = useState(() => Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15));
    
    const messagesEndRef = useRef(null);
    const inputRef = useRef(null);
    const dropdownRef = useRef(null);

    // Fetch public settings on mount
    useEffect(() => {
        publicApi.getAiChatSettings()
            .then(data => {
                setSettings(data);
            })
            .catch(console.error)
            .finally(() => setLoading(false));
    }, []);

    // Close dropdown on click outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setShowLangDropdown(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Auto-scroll to bottom
    const scrollToBottom = () => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isTyping]);

    const handleSendMessage = async (textOverride = null) => {
        const text = textOverride || inputValue.trim();
        if (!text) return;

        // Add user message
        const newMessages = [...messages, { role: 'user', content: text }];
        setMessages(newMessages);
        setInputValue('');
        setIsTyping(true);
        setChatError(null);

        // Prepare for SSE response
        let aiResponseText = '';
        const aiMessageIndex = newMessages.length;
        
        // Add empty AI message placeholder
        setMessages([...newMessages, { role: 'assistant', content: '' }]);

        try {
            // Using native fetch for SSE support
            const token = localStorage.getItem('auth_token');
            const headers = { 'Content-Type': 'application/json' };
            if (token) headers['Authorization'] = `Bearer ${token}`;

            const API_BASE = (import.meta.env.VITE_API_URL || '') + '/api';
            const response = await fetch(`${API_BASE}/ai-chat`, {
                method: 'POST',
                headers,
                body: JSON.stringify({ messages: newMessages, sessionId, language }),
            });

            if (!response.ok) {
                throw new Error('Failed to fetch response');
            }

            const reader = response.body.getReader();
            const decoder = new TextDecoder('utf-8');

            while (true) {
                const { done, value } = await reader.read();
                if (done) break;
                
                const chunk = decoder.decode(value, { stream: true });
                
                // Check if chunk is our custom error format
                if (chunk.startsWith('data: {"error"')) {
                    try {
                        const errObj = JSON.parse(chunk.replace('data: ', ''));
                        setChatError(errObj.error);
                        // Remove the empty AI message
                        setMessages(prev => prev.slice(0, aiMessageIndex));
                        break;
                    } catch(e) {}
                }

                // Append chunk directly for Groq API which usually streams pure text or JSON chunks
                // Depending on the groq api response shape, if it streams SSE, we might need to parse it.
                // Assuming the backend aiChatService passes raw chunks. 
                // Wait, the backend streams the raw Groq chunks. Groq chunks look like: `data: {"id":"...","choices":[{"delta":{"content":"..."}}]}\n\n`
                
                const lines = chunk.split('\n');
                for (const line of lines) {
                    if (line.startsWith('data: ') && line !== 'data: [DONE]') {
                        try {
                            const data = JSON.parse(line.replace('data: ', ''));
                            const content = data.choices?.[0]?.delta?.content;
                            if (content) {
                                aiResponseText += content;
                                setMessages(prev => {
                                    const updated = [...prev];
                                    updated[aiMessageIndex] = { role: 'assistant', content: aiResponseText };
                                    return updated;
                                });
                            }
                        } catch (e) {
                            // If not JSON, it might just be text if backend sent it differently
                        }
                    }
                }
            }
        } catch (error) {
            console.error('Chat error:', error);
            setChatError('Koneksi terputus. Silakan coba lagi.');
            setMessages(prev => prev.slice(0, aiMessageIndex));
        } finally {
            setIsTyping(false);
            // Re-focus input on desktop
            if (window.innerWidth > 768 && inputRef.current) {
                inputRef.current.focus();
            }
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    if (loading) return <LoadingSpinner />;

    if (settings && !settings.isEnabled) {
        return (
            <div className="container" style={{ paddingTop: '120px', textAlign: 'center' }}>
                <Helmet><title>AI Chat | Not Available</title></Helmet>
                <h2>AI Chat is currently resting ☕</h2>
                <p className="text-secondary" style={{ marginTop: '16px' }}>Please check back later.</p>
            </div>
        );
    }

    const hasStarted = messages.length > 0;

    return (
        <motion.div 
            className="ai-chat-page container"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <Helmet>
                <title>{settings?.assistantName || 'AI Chat'} | Afdal Ramdan</title>
                <meta name="description" content="Chat with my AI assistant to learn more about my skills, experience, and projects." />
            </Helmet>

            <div className="ai-chat-container">
                
                <AnimatePresence mode="wait">
                    {!hasStarted ? (
                        <motion.div 
                            key="welcome"
                            className="welcome-screen"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
                        >
                            <div className="welcome-center-content">
                                <div className="avatar-wrapper">
                                    <div className="ai-avatar-glow"></div>
                                    {isLottie(settings?.assistantAvatarUrl || 'https://lottie.host/5c297a87-37d6-47c7-9ce6-640e0c805d6d/Q6NEU3fvv0.lottie') ? (
                                        <div className="ai-avatar-large ai-avatar-lottie-container">
                                            <dotlottie-wc 
                                                src={settings?.assistantAvatarUrl || 'https://lottie.host/5c297a87-37d6-47c7-9ce6-640e0c805d6d/Q6NEU3fvv0.lottie'} 
                                                style={{ width: '100%', height: '100%', display: 'block' }}
                                                autoplay 
                                                loop
                                            />
                                        </div>
                                    ) : (
                                        <img 
                                            src={settings?.assistantAvatarUrl || '/images/bodal-avatar.png'} 
                                            alt="AI Avatar" 
                                            className="ai-avatar-large"
                                            onError={(e) => { e.target.src = 'https://ui-avatars.com/api/?name=AI&background=2e83fb&color=fff'; }}
                                        />
                                    )}
                                </div>
                                <h2 className="welcome-title">{settings?.welcomeSubtitle}</h2>
                                <p className="welcome-subtitle">{settings?.welcomeTitle}</p>
                            </div>

                            <div className="suggestions-grid">
                                {(settings?.suggestions || []).map((sugg, idx) => (
                                    <motion.button 
                                        key={idx}
                                        className="suggestion-card"
                                        onClick={() => handleSendMessage(sugg.prompt)}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.1 + (idx * 0.05) }}
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        <span className="suggestion-icon">{sugg.icon}</span>
                                        <span>{sugg.label}</span>
                                    </motion.button>
                                ))}
                            </div>
                        </motion.div>
                    ) : (
                        <motion.div 
                            key="chat"
                            className="chat-history"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                        >
                            {messages.map((msg, idx) => (
                                <div key={idx} className={`chat-message ${msg.role === 'user' ? 'message-user' : 'message-ai'}`}>
                                    {msg.role === 'assistant' && (
                                        isLottie(settings?.assistantAvatarUrl || 'https://lottie.host/5c297a87-37d6-47c7-9ce6-640e0c805d6d/Q6NEU3fvv0.lottie') ? (
                                            <div className="ai-avatar-small ai-avatar-small-lottie-container">
                                                <dotlottie-wc 
                                                    src={settings?.assistantAvatarUrl || 'https://lottie.host/5c297a87-37d6-47c7-9ce6-640e0c805d6d/Q6NEU3fvv0.lottie'} 
                                                    style={{ width: '100%', height: '100%', display: 'block' }}
                                                    autoplay 
                                                    loop
                                                />
                                            </div>
                                        ) : (
                                            <img 
                                                src={settings?.assistantAvatarUrl || '/images/bodal-avatar.png'} 
                                                alt="AI Avatar" 
                                                className="ai-avatar-small"
                                                onError={(e) => { e.target.src = 'https://ui-avatars.com/api/?name=AI&background=2e83fb&color=fff'; }}
                                            />
                                        )
                                    )}
                                    <div className="chat-bubble">
                                        {msg.role === 'user' ? (
                                            msg.content
                                        ) : msg.content ? (
                                            <div dangerouslySetInnerHTML={{ __html: parseMarkdown(msg.content) }} />
                                        ) : (
                                            <div className="typing-indicator">
                                                <div className="typing-dot"></div>
                                                <div className="typing-dot"></div>
                                                <div className="typing-dot"></div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}

                            {chatError && (
                                <div className="chat-error animate-fade-in">
                                    {chatError}
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </motion.div>
                    )}
                </AnimatePresence>

                <div className="chat-input-wrapper">
                    <div className="chat-input-container" style={{ display: 'flex', alignItems: 'flex-end', gap: '8px' }}>
                        <textarea 
                            ref={inputRef}
                            className="chat-input"
                            placeholder="Ask about Afdal..."
                            value={inputValue}
                            onChange={(e) => {
                                setInputValue(e.target.value);
                                e.target.style.height = 'auto';
                                e.target.style.height = (e.target.scrollHeight) + 'px';
                            }}
                            onKeyDown={handleKeyDown}
                            disabled={isTyping}
                            rows={1}
                            style={{ flex: 1 }}
                        />
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', paddingBottom: '6px' }}>
                            {!inputValue.trim() && (
                                <div className="language-selector" ref={dropdownRef} style={{ position: 'relative' }}>
                                    <div 
                                        onClick={() => setShowLangDropdown(!showLangDropdown)}
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            height: '36px',
                                            gap: '4px',
                                            padding: '0 8px',
                                            cursor: 'pointer',
                                            borderRadius: '50px',
                                            background: showLangDropdown ? 'var(--bg-secondary)' : 'transparent',
                                            transition: 'background 0.2s'
                                        }}
                                    >
                                        <img 
                                            src={`https://flagcdn.com/w20/${language === 'en' ? 'gb' : 'id'}.png`}
                                            alt={language}
                                            style={{ width: '20px', height: '20px', objectFit: 'cover', borderRadius: '50%', border: '1px solid var(--card-border)' }}
                                        />
                                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--text-secondary)' }}>
                                            <polyline points="6 9 12 15 18 9"></polyline>
                                        </svg>
                                    </div>
                                    
                                    <AnimatePresence>
                                        {showLangDropdown && (
                                            <motion.div 
                                                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                                transition={{ duration: 0.15 }}
                                                style={{
                                                    position: 'absolute',
                                                    bottom: '100%',
                                                    right: 0,
                                                    marginBottom: '8px',
                                                    background: 'var(--bg-primary)',
                                                    border: '1px solid var(--card-border)',
                                                    borderRadius: '12px',
                                                    padding: '4px',
                                                    boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
                                                    zIndex: 10
                                                }}
                                            >
                                                <div 
                                                    onClick={() => { setLanguage('en'); setShowLangDropdown(false); }}
                                                    style={{
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        gap: '8px',
                                                        padding: '8px 12px',
                                                        cursor: 'pointer',
                                                        borderRadius: '8px',
                                                        background: language === 'en' ? 'var(--bg-secondary)' : 'transparent'
                                                    }}
                                                >
                                                    <img src="https://flagcdn.com/w20/gb.png" alt="English" style={{ width: '20px', height: '20px', objectFit: 'cover', borderRadius: '50%', border: '1px solid var(--card-border)' }} />
                                                    <span style={{ fontSize: '0.9rem', fontWeight: 500 }}>English</span>
                                                </div>
                                                <div 
                                                    onClick={() => { setLanguage('id'); setShowLangDropdown(false); }}
                                                    style={{
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        gap: '8px',
                                                        padding: '8px 12px',
                                                        cursor: 'pointer',
                                                        borderRadius: '8px',
                                                        background: language === 'id' ? 'var(--bg-secondary)' : 'transparent'
                                                    }}
                                                >
                                                    <img src="https://flagcdn.com/w20/id.png" alt="Indonesia" style={{ width: '20px', height: '20px', objectFit: 'cover', borderRadius: '50%', border: '1px solid var(--card-border)' }} />
                                                    <span style={{ fontSize: '0.9rem', fontWeight: 500 }}>Indonesia</span>
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            )}
                            <button 
                                className="send-button"
                                onClick={() => handleSendMessage()}
                                disabled={!inputValue.trim() || isTyping}
                                aria-label="Send message"
                            >
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                    <line x1="12" y1="19" x2="12" y2="5"></line>
                                    <polyline points="5 12 12 5 19 12"></polyline>
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

            </div>
        </motion.div>
    );
}
