import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import './Navbar.css'

export default function Navbar() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const [theme, setTheme] = useState('light')
    const location = useLocation()

    useEffect(() => {
        // Check initial theme from OS or localStorage
        const savedTheme = localStorage.getItem('theme') || 'light'
        setTheme(savedTheme)
        document.documentElement.setAttribute('data-theme', savedTheme)
    }, [])

    // Close mobile menu on route change
    useEffect(() => {
        setIsMobileMenuOpen(false)
    }, [location])

    const toggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light'
        setTheme(newTheme)
        document.documentElement.setAttribute('data-theme', newTheme)
        localStorage.setItem('theme', newTheme)
    }

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen)
    }

    if (location.pathname.startsWith('/project/')) {
        return null;
    }

    return (
        <>
            <nav className="glass-nav navbar">
                <div className="container nav-content">
                    <Link to="/" className="nav-logo">
                        afdal<span className="text-secondary">rdh.</span>
                    </Link>

                    {/* Desktop Nav Links */}
                    <div className="nav-links desktop-only">
                        <Link to="/" className={location.pathname === '/' ? 'active' : ''}>Home</Link>
                        <Link to="/about" className={location.pathname === '/about' ? 'active' : ''}>About</Link>
                        <a href="https://wa.me/6281234567890?text=Halo%20Afdal,%20saya%20tertarik%20bekerja%20sama" target="_blank" rel="noreferrer" className="contact-link">Contact Me</a>
                    </div>

                    <div className="nav-controls">
                        <div className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
                            {theme === 'light' ? (
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="4" /><path d="M12 2v2" /><path d="M12 20v2" /><path d="m4.93 4.93 1.41 1.41" /><path d="m17.66 17.66 1.41 1.41" /><path d="M2 12h2" /><path d="M20 12h2" /><path d="m6.34 17.66-1.41 1.41" /><path d="m19.07 4.93-1.41 1.41" /></svg>
                            ) : (
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" /></svg>
                            )}
                        </div>

                        {/* Mobile Menu Button */}
                        <button className="mobile-menu-btn mobile-only" onClick={toggleMobileMenu} aria-label="Toggle menu">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" x2="20" y1="12" y2="12" /><line x1="4" x2="20" y1="6" y2="6" /><line x1="4" x2="20" y1="18" y2="18" /></svg>
                        </button>
                    </div>
                </div>
            </nav>

            {/* Mobile Overlay */}
            {isMobileMenuOpen && (
                <div className="mobile-overlay animate-fade-in">
                    <div className="mobile-overlay-header">
                        <Link to="/" className="nav-logo" onClick={() => setIsMobileMenuOpen(false)}>
                            afdal<span className="text-secondary">rdh.</span>
                        </Link>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                            <div className="theme-toggle" onClick={toggleTheme}>
                                {theme === 'light' ? (
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="4" /><path d="M12 2v2" /><path d="M12 20v2" /><path d="m4.93 4.93 1.41 1.41" /><path d="m17.66 17.66 1.41 1.41" /><path d="M2 12h2" /><path d="M20 12h2" /><path d="m6.34 17.66-1.41 1.41" /><path d="m19.07 4.93-1.41 1.41" /></svg>
                                ) : (
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" /></svg>
                                )}
                            </div>
                            <button className="mobile-menu-btn" onClick={toggleMobileMenu}>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
                            </button>
                        </div>
                    </div>
                    <div className="mobile-nav-links">
                        <Link to="/" className={location.pathname === '/' ? 'active' : ''}>Home</Link>
                        <Link to="/about" className={location.pathname === '/about' ? 'active' : ''}>About</Link>
                        <a href="https://wa.me/6281234567890?text=Halo%20Afdal,%20saya%20tertarik%20bekerja%20sama" target="_blank" rel="noreferrer" className="contact-link">Contact Me</a>
                    </div>
                </div>
            )}
        </>
    )
}
