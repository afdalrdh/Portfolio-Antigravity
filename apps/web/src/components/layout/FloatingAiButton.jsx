import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

export default function FloatingAiButton() {
    const navigate = useNavigate();
    const location = useLocation();

    // Do not show on ai-chat or admin pages
    if (location.pathname === '/ai-chat' || location.pathname.startsWith('/admin')) {
        return null;
    }

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
                <img 
                    src="/images/bodal-avatar.png" 
                    alt="Bodal AI" 
                    style={{ width: '28px', height: '28px', borderRadius: '50%' }}
                />
                Ask Bodal AI
            </motion.button>
        </AnimatePresence>
    );
}
