import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { publicApi } from '../../lib/api';

export default function FloatingAiButton() {
    const navigate = useNavigate();
    const location = useLocation();
    const [settings, setSettings] = useState(null);

    useEffect(() => {
        publicApi.getAiChatSettings()
            .then(data => setSettings(data))
            .catch(console.error);
    }, []);

    // Do not show on ai-chat or admin pages
    if (location.pathname === '/ai-chat' || location.pathname.startsWith('/admin')) {
        return null;
    }

    if (!settings || !settings.isEnabled) {
        return null;
    }

    const avatarUrl = settings?.assistantAvatarUrl || '/images/bodal-avatar.png';
    const isLottie = avatarUrl.endsWith('.lottie') || avatarUrl.endsWith('.json') || avatarUrl.includes('lottie.host');

    return (
        <AnimatePresence>
            <motion.button
                className="floating-ai-btn hover-lift"
                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 20, scale: 0.9 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/ai-chat')}
            >
                {isLottie ? (
                    <div style={{ width: '24px', height: '24px', borderRadius: '50%', overflow: 'hidden' }}>
                        <dotlottie-wc src={avatarUrl} autoplay loop style={{ width: '100%', height: '100%' }} />
                    </div>
                ) : (
                    <img 
                        src={avatarUrl} 
                        alt="Bodal AI" 
                        style={{ width: '24px', height: '24px', borderRadius: '50%', objectFit: 'cover' }}
                        onError={(e) => { e.target.src = 'https://ui-avatars.com/api/?name=AI&background=2e83fb&color=fff'; }}
                    />
                )}
                Ask Bodal AI
            </motion.button>
        </AnimatePresence>
    );
}
