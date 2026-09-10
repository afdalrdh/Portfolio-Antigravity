import React from 'react';
import { FaFacebookF, FaInstagram, FaTwitter } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer style={{ backgroundColor: '#0b0f14', color: '#94a3b8', paddingTop: '80px', paddingBottom: '40px', borderTop: '1px solid #1c242f' }}>
      <div className="container">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '48px',
            marginBottom: '60px',
          }}
        >
          {/* Column 1: Brand Logo & Description */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', gridColumn: 'span 2' }}>
            <a href="#home" style={{ display: 'inline-block' }}>
              <img
                src="/logo.png"
                alt="Albion Logo"
                style={{ height: '40px', objectFit: 'contain' }}
              />
            </a>
            <p style={{ fontSize: '0.95rem', lineHeight: 1.6, color: '#94a3b8', maxWidth: '380px' }}>
              Feugiat ut condimentum nunc dictumst hendrerit sed. Diam id convallis aliquam tellus suscipit id viverra sed.
            </p>
          </div>

          {/* Column 2: QUICK LINKS */}
          <div>
            <h4 style={{ color: '#ffffff', fontSize: '0.85rem', fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '24px' }}>
              QUICK LINKS
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {['About', 'Projects', 'Contact', 'News'].map((link, idx) => (
                <li key={idx}>
                  <a
                    href={`#${link.toLowerCase()}`}
                    style={{ fontSize: '0.95rem', color: '#94a3b8', textDecoration: 'none', transition: 'color 0.2s ease' }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = '#ffffff')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = '#94a3b8')}
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: SOCIAL */}
          <div>
            <h4 style={{ color: '#ffffff', fontSize: '0.85rem', fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '24px' }}>
              SOCIAL
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {[
                { name: 'Facebook', url: 'https://facebook.com/webflow' },
                { name: 'Instagram', url: 'https://instagram.com/webflow' },
                { name: 'Twitter', url: 'https://twitter.com/webflow' },
                { name: 'YouTube', url: 'https://youtube.com' },
              ].map((social, idx) => (
                <li key={idx}>
                  <a
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ fontSize: '0.95rem', color: '#94a3b8', textDecoration: 'none', transition: 'color 0.2s ease' }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = '#ffffff')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = '#94a3b8')}
                  >
                    {social.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: TEMPLATE */}
          <div>
            <h4 style={{ color: '#ffffff', fontSize: '0.85rem', fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '24px' }}>
              TEMPLATE
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {['Licensing', 'Style Guide', 'Changelog'].map((item, idx) => (
                <li key={idx}>
                  <a
                    href="#home"
                    style={{ fontSize: '0.95rem', color: '#94a3b8', textDecoration: 'none', transition: 'color 0.2s ease' }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = '#ffffff')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = '#94a3b8')}
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Line */}
        <div
          style={{
            borderTop: '1px solid #1c242f',
            paddingTop: '30px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontSize: '0.85rem',
            color: '#64748b',
          }}
        >
          <div>
            Made by <strong style={{ color: '#ffffff' }}>Maxim W.</strong> Powered by <strong style={{ color: '#ffffff' }}>Webflow</strong>
          </div>

          <div style={{ display: 'flex', gap: '16px' }}>
            <a href="https://twitter.com/webflow" target="_blank" rel="noopener noreferrer" style={{ color: '#94a3b8', fontSize: '1rem' }}>
              <FaTwitter />
            </a>
            <a href="https://facebook.com/webflow" target="_blank" rel="noopener noreferrer" style={{ color: '#94a3b8', fontSize: '1rem' }}>
              <FaFacebookF />
            </a>
            <a href="https://instagram.com/webflow" target="_blank" rel="noopener noreferrer" style={{ color: '#94a3b8', fontSize: '1rem' }}>
              <FaInstagram />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
