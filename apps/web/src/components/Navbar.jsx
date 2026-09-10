import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { FiMenu, FiX, FiChevronDown } from 'react-icons/fi';
import Button from './ui/Button';
import { getGeneralWaUrl } from '../utils/whatsapp';

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

  const generalWaUrl = getGeneralWaUrl();

  // Exact 7 Primary Navbar Items
  const navLinks = [
    { name: 'Beranda', to: '/' },
    { name: 'Tentang Kami', to: '/tentang-kami' },
    {
      name: 'Layanan',
      to: '/layanan',
      hasDropdown: true,
      subItems: [
        { name: 'Kontraktor Umum / Konstruksi', to: '/layanan/konstruksi' },
        { name: 'Design & Build', to: '/layanan/design-build' },
        { name: 'Fabrikasi Struktur & Prafabrikasi', to: '/layanan/fabrikasi' },
        { name: 'Pengadaan Barang', to: '/layanan/pengadaan-barang' },
        { name: 'Renovasi Rumah & Bangunan', to: '/layanan/renovasi-rumah' },
        { name: 'Fasad ACP & Arsitektural', to: '/layanan/fasad-rumah' },
      ],
    },
    { name: 'Proyek', to: '/proyek' },
    { name: 'Testimoni', to: '/testimoni' },
    { name: 'Artikel', to: '/artikel' },
    { name: 'Kontak', to: '/kontak' },
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
        borderBottom: isScrolled ? '1px solid var(--color-neutral-200)' : '1px solid rgba(0,0,0,0.06)',
        boxShadow: isScrolled ? '0 4px 20px rgba(0,0,0,0.05)' : 'none',
        transition: 'all 0.3s ease',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
        {/* Logo */}
        <Link to="/" style={{ display: 'flex', alignItems: 'center' }}>
          <img
            src="/logo.png"
            alt="PT Arsi Karya Unggul Logo"
            style={{
              height: '42px',
              objectFit: 'contain',
            }}
          />
        </Link>

        {/* Desktop Nav Links */}
        <nav
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '28px',
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
              <NavLink
                to={link.to}
                className={({ isActive }) => (isActive ? 'active-nav-item' : '')}
                style={({ isActive }) => ({
                  fontSize: '0.925rem',
                  fontWeight: isActive ? 700 : 600,
                  color: isActive ? 'var(--color-primary-300)' : 'var(--color-neutral-700)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  padding: '8px 0',
                  letterSpacing: '0.01em',
                })}
              >
                {link.name}
                {link.hasDropdown && <FiChevronDown style={{ fontSize: '0.9rem', transition: 'transform 0.2s ease', transform: activeDropdown ? 'rotate(180deg)' : 'rotate(0deg)' }} />}
              </NavLink>

              {/* Sub-services Dropdown under Layanan */}
              {link.hasDropdown && activeDropdown && (
                <div
                  style={{
                    position: 'absolute',
                    top: '100%',
                    left: '-16px',
                    backgroundColor: '#ffffff',
                    boxShadow: '0 12px 32px rgba(0,0,0,0.12)',
                    borderRadius: 'var(--radius-card)',
                    padding: '12px 0',
                    minWidth: '260px',
                    border: '1px solid var(--color-neutral-200)',
                    zIndex: 1010,
                  }}
                >
                  {link.subItems.map((sub, sIdx) => (
                    <Link
                      key={sIdx}
                      to={sub.to}
                      style={{
                        display: 'block',
                        padding: '10px 20px',
                        fontSize: '0.875rem',
                        fontWeight: 500,
                        color: 'var(--color-neutral-600)',
                        transition: 'background 0.2s ease, color 0.2s ease',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = 'var(--color-primary-100)';
                        e.currentTarget.style.color = 'var(--color-primary-400)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = 'transparent';
                        e.currentTarget.style.color = 'var(--color-neutral-600)';
                      }}
                    >
                      {sub.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Right Primary CTA & Mobile Menu Toggle */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <Button
            href={generalWaUrl}
            target="_blank"
            rel="noopener noreferrer"
            variant="primary"
            className="desktop-cta"
            style={{ padding: '12px 22px' }}
          >
            Konsultasi Gratis
          </Button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="mobile-toggle"
            style={{
              display: 'none',
              fontSize: '1.8rem',
              color: 'var(--color-neutral-700)',
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
            borderBottom: '1px solid var(--color-neutral-200)',
            boxShadow: '0 10px 20px rgba(0,0,0,0.1)',
            padding: '24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            maxHeight: 'calc(100vh - var(--header-height))',
            overflowY: 'auto',
            zIndex: 999,
          }}
        >
          {navLinks.map((link, idx) => (
            <div key={idx}>
              <Link
                to={link.to}
                onClick={() => setMobileMenuOpen(false)}
                style={{
                  fontSize: '1rem',
                  fontWeight: 600,
                  color: 'var(--color-neutral-700)',
                  display: 'block',
                  padding: '10px 0',
                  borderBottom: '1px solid var(--color-neutral-100)',
                }}
              >
                {link.name}
              </Link>
              {link.hasDropdown && (
                <div style={{ paddingLeft: '16px', display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '8px' }}>
                  {link.subItems.map((sub, sIdx) => (
                    <Link
                      key={sIdx}
                      to={sub.to}
                      onClick={() => setMobileMenuOpen(false)}
                      style={{
                        fontSize: '0.875rem',
                        color: 'var(--color-neutral-400)',
                        padding: '4px 0',
                      }}
                    >
                      • {sub.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
          <Button
            href={generalWaUrl}
            target="_blank"
            rel="noopener noreferrer"
            variant="primary"
            onClick={() => setMobileMenuOpen(false)}
            style={{ marginTop: '16px', justifyContent: 'center', width: '100%' }}
          >
            Konsultasi Gratis
          </Button>
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
