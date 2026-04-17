import { useState, useEffect } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { authClient } from '../../lib/authClient';
import './AdminLayout.css';

export default function AdminLayout() {
    const location = useLocation();
    const navigate = useNavigate();
    const [session, setSession] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        authClient.getSession()
            .then((data) => {
                if (!data || !data.session) {
                    navigate('/admin/login');
                } else {
                    setSession(data);
                }
            })
            .catch(() => navigate('/admin/login'))
            .finally(() => setLoading(false));
    }, [navigate]);

    const handleLogout = async () => {
        await authClient.signOut();
        navigate('/admin/login');
    };

    if (loading) {
        return (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', background: 'var(--bg-primary)' }}>
                <p className="text-secondary">Checking session...</p>
            </div>
        );
    }

    if (!session) return null;

    return (
        <div className="admin-layout">
            <aside className="admin-sidebar" aria-label="Sidebar Navigation">
                <div className="admin-brand">
                    <Link to="/admin">
                        <strong>CMS</strong> HQ
                    </Link>
                </div>
                <nav className="admin-nav">
                    <p className="admin-nav-heading">CMS</p>
                    <Link
                        to="/admin"
                        className={`admin-nav-link ${location.pathname === '/admin' ? 'active' : ''}`}
                    >
                        Projects
                    </Link>
                    <p className="admin-nav-heading">PAGES</p>
                    <Link
                        to="/admin/home"
                        className={`admin-nav-link ${location.pathname === '/admin/home' ? 'active' : ''}`}
                    >
                        Home Page
                    </Link>
                    <Link
                        to="/admin/about"
                        className={`admin-nav-link ${location.pathname === '/admin/about' ? 'active' : ''}`}
                    >
                        About Page
                    </Link>
                    <Link
                        to="/admin/contact"
                        className={`admin-nav-link ${location.pathname === '/admin/contact' ? 'active' : ''}`}
                    >
                        Contact Page
                    </Link>
                    <Link
                        to="/"
                        className="admin-nav-link text-secondary"
                        style={{ marginTop: '16px' }}
                    >
                        &larr; Back to Site
                    </Link>
                    <button
                        onClick={handleLogout}
                        className="admin-nav-link text-secondary"
                        style={{ marginTop: 'auto', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left', padding: '10px 16px', width: '100%', color: '#ff3b30' }}
                    >
                        Logout
                    </button>
                </nav>
            </aside>
            <main className="admin-main">
                <header className="admin-header">
                    <h2 className="admin-page-title">
                        {location.pathname.includes('/new') ? 'Create Project' : 'Dashboard'}
                    </h2>
                    <div className="admin-profile">
                        <span className="admin-avatar">{session?.user?.name?.[0] || 'A'}</span>
                    </div>
                </header>
                <div className="admin-content animate-fade-in">
                    <Outlet />
                </div>
            </main>
        </div>
    );
}
