import { BrowserRouter as Router, Routes, Route, Outlet, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Home from './pages/Home'
import About from './pages/About'
import ProjectDetail from './pages/ProjectDetail'
import AiChat from './pages/AiChat'
import Contact from './pages/Contact'
import Navbar from './components/layout/Navbar'
import AdminLayout from './components/admin/AdminLayout'
import AdminDashboard from './pages/admin/AdminDashboard'
import AdminProjectEditor from './pages/admin/AdminProjectEditor'
import AdminHomeEditor from './pages/admin/AdminHomeEditor'
import AdminAboutEditor from './pages/admin/AdminAboutEditor'
import AdminContactEditor from './pages/admin/AdminContactEditor'
import AdminAiChatEditor from './pages/admin/AdminAiChatEditor'
import AdminLogin from './pages/admin/AdminLogin'
const ClientLayout = () => (
    <>
        <Navbar />
        <main>
            <Outlet />
        </main>
    </>
);

import { Analytics } from '@vercel/analytics/react';

import { HelmetProvider } from 'react-helmet-async';

const AnimatedRoutes = () => {
    const location = useLocation();
    
    return (
        <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
                {/* Client Routes */}
                <Route element={<ClientLayout />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/project/:slug" element={<ProjectDetail />} />
                    <Route path="/ai-chat" element={<AiChat />} />
                    <Route path="/contact" element={<Contact />} />
                </Route>

                {/* Admin Routes */}
                <Route path="/admin/login" element={<AdminLogin />} />
                <Route path="/admin" element={<AdminLayout />}>
                    <Route index element={<AdminDashboard />} />
                    <Route path="projects/new" element={<AdminProjectEditor />} />
                    <Route path="projects/:id/edit" element={<AdminProjectEditor />} />
                    <Route path="home" element={<AdminHomeEditor />} />
                    <Route path="about" element={<AdminAboutEditor />} />
                    <Route path="contact" element={<AdminContactEditor />} />
                    <Route path="ai-chat" element={<AdminAiChatEditor />} />
                </Route>
            </Routes>
        </AnimatePresence>
    );
};

import FloatingAiButton from './components/layout/FloatingAiButton';

function App() {
    return (
        <HelmetProvider>
            <Router>
                <AnimatedRoutes />
                <FloatingAiButton />
            </Router>
            <Analytics />
        </HelmetProvider>
    )
}

export default App
