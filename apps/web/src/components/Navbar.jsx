import React, { useState, useEffect } from 'react';
import { FiMenu, FiX, FiChevronDown } from 'react-icons/fi';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home', hasDropdown: true },
    { name: 'Services', href: '#services' },
    { name: 'News', href: '#news' },
    { name: 'About', href: '#about' },
    { name: 'Projects', href: '#projects' },
  ];

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        height: 'var(--header-height)',
        backgroundColor: isScrolled ? 'rgba(255, 255, 255, 0.98)' : '#ffffff',
        backdropFilter: 'blur(10px)',
        borderBottom: isScrolled ? '1px solid var(--color-border)' : '1px solid rgba(0,0,0,0.06)',
        boxShadow: isScrolled ? '0 4px 20px rgba(0,0,0,0.05)' : 'none',
        transition: 'all 0.3s ease',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
        {/* Logo */}
        <a href="#home" style={{ display: 'flex', alignItems: 'center' }}>
          <img
            src="/logo.png"
            alt="Albion Logo"
            style={{
              height: '42px',
              objectFit: 'contain',
            }}
          />
        </a>

        {/* Desktop Nav Links */}
        <nav
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '32px',
          }}
          className="desktop-nav"
        >
          {navLinks.map((link, idx) => (
            <div
              key={idx}
              style={{ position: 'relative' }}
              onMouseEnter={() => link.hasDropdown && setActiveDropdown(true)}
              onMouseLeave={() => link.hasDropdown && setActiveDropdown(false)}
            >
              <a
                href={link.href}
                style={{
                  fontSize: '0.95rem',
                  fontWeight: 700,
                  color: 'var(--color-text-main)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  padding: '8px 0',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                }}
              >
                {link.name}
                {link.hasDropdown && <FiChevronDown style={{ fontSize: '0.9rem', transition: 'transform 0.2s ease', transform: activeDropdown ? 'rotate(180deg)' : 'rotate(0deg)' }} />}
              </a>

              {link.hasDropdown && activeDropdown && (
                <div
                  style={{
                    position: 'absolute',
                    top: '100%',
                    left: 0,
                    backgroundColor: '#ffffff',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                    borderRadius: '4px',
                    padding: '12px 0',
                    minWidth: '160px',
                    border: '1px solid var(--color-border)',
                  }}
                >
                  <a href="#home" style={{ display: 'block', padding: '8px 20px', fontSize: '0.9rem', fontWeight: 600, color: 'var(--color-primary)' }}>Home Option A</a>
                  <a href="#about" style={{ display: 'block', padding: '8px 20px', fontSize: '0.9rem', fontWeight: 500, color: 'var(--color-text-main)' }}>Home Option B</a>
                  <a href="#services" style={{ display: 'block', padding: '8px 20px', fontSize: '0.9rem', fontWeight: 500, color: 'var(--color-text-main)' }}>Home Option C</a>
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Right CTA & Mobile Toggle */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <a
            href="#contact"
            className="btn-primary desktop-cta"
            style={{
              padding: '12px 24px',
            }}
          >
            Get in Touch
          </a>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="mobile-toggle"
            style={{
              display: 'none',
              fontSize: '1.8rem',
              color: 'var(--color-text-main)',
              padding: '4px',
            }}
            aria-label="Toggle Navigation"
          >
            {mobileMenuOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div
          style={{
            position: 'fixed',
            top: 'var(--header-height)',
            left: 0,
            right: 0,
            backgroundColor: '#ffffff',
            borderBottom: '1px solid var(--color-border)',
            boxShadow: '0 10px 20px rgba(0,0,0,0.1)',
            padding: '24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            zIndex: 999,
          }}
        >
          {navLinks.map((link, idx) => (
            <a
              key={idx}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              style={{
                fontSize: '1.05rem',
                fontWeight: 600,
                color: 'var(--color-text-main)',
                padding: '8px 0',
                borderBottom: '1px solid #f0f0f0',
              }}
            >
              {link.name}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setMobileMenuOpen(false)}
            className="btn-primary"
            style={{ marginTop: '12px', justifyContent: 'center' }}
          >
            Get in Touch
          </a>
        </div>
      )}

      <style>{`
        @media (max-width: 991px) {
          .desktop-nav { display: none !important; }
          .desktop-cta { display: none !important; }
          .mobile-toggle { display: block !important; }
        }
      `}</style>
    </header>
  );
}
