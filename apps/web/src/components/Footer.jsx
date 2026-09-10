import React from 'react';
import { Link } from 'react-router-dom';
import { FaInstagram, FaWhatsapp, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer style={{ backgroundColor: '#0A0A0A', color: '#A8A8A3', paddingTop: '80px', paddingBottom: '40px', borderTop: '1px solid #171717' }}>
      <div className="container">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '48px',
            marginBottom: '60px',
          }}
        >
          {/* Column 1: Brand Logo & Description */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', gridColumn: 'span 2' }}>
            <Link to="/" style={{ display: 'inline-block' }}>
              <img
                src="/logo.png"
                alt="PT Arsi Karya Unggul Logo"
                style={{ height: '44px', objectFit: 'contain' }}
              />
            </Link>
            <p style={{ fontSize: '0.95rem', lineHeight: 1.6, color: '#A8A8A3', maxWidth: '380px' }}>
              <strong>PT ARSI KARYA UNGGUL</strong><br />
              “Membangun Tuntas, Unggul Dalam Kualitas”<br />
              Perusahaan jasa konstruksi, design & build, fabrikasi, dan pengadaan barang terpercaya berpusat di Kota Bandung.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.9rem', color: '#D9D9D5', marginTop: '4px' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                <FaMapMarkerAlt style={{ color: 'var(--color-primary-200)', marginTop: '4px', flexShrink: 0 }} />
                <span>Bumi Adipura, Jl. Tulip VII No. 21, Rancabolang, Gedebage, Kota Bandung.</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <FaWhatsapp style={{ color: 'var(--color-whatsapp)', flexShrink: 0 }} />
                <a href="https://wa.me/628997932802" target="_blank" rel="noopener noreferrer" style={{ color: '#D9D9D5' }}>+62 899-7932-802</a>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <FaEnvelope style={{ color: 'var(--color-primary-200)', flexShrink: 0 }} />
                <a href="mailto:arsikaryaunggul@gmail.com" style={{ color: '#D9D9D5' }}>arsikaryaunggul@gmail.com</a>
              </div>
            </div>
          </div>

          {/* Column 2: NAVIGASI UTAMA */}
          <div>
            <h4 style={{ color: '#FFFFFF', fontSize: '0.85rem', fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '24px' }}>
              NAVIGASI UTAMA
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {[
                { name: 'Beranda', to: '/' },
                { name: 'Tentang Kami', to: '/tentang-kami' },
                { name: 'Layanan Utama', to: '/layanan' },
                { name: 'Portofolio Proyek', to: '/proyek' },
                { name: 'Testimoni Klien', to: '/testimoni' },
                { name: 'Artikel & Edukasi', to: '/artikel' },
                { name: 'Kontak & Konsultasi', to: '/kontak' },
              ].map((link, idx) => (
                <li key={idx}>
                  <Link
                    to={link.to}
                    style={{ fontSize: '0.925rem', color: '#A8A8A3', textDecoration: 'none', transition: 'color 0.2s ease' }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = '#FFFFFF')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = '#A8A8A3')}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: LAYANAN SPESIALIS */}
          <div>
            <h4 style={{ color: '#FFFFFF', fontSize: '0.85rem', fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '24px' }}>
              LAYANAN KAMI
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {[
                { name: 'Konstruksi & Kontraktor', to: '/layanan/konstruksi' },
                { name: 'Design & Build', to: '/layanan/design-build' },
                { name: 'Fabrikasi Struktur', to: '/layanan/fabrikasi' },
                { name: 'Pengadaan Barang', to: '/layanan/pengadaan-barang' },
                { name: 'Renovasi Bangunan', to: '/layanan/renovasi-rumah' },
                { name: 'Pekerjaan Fasad ACP', to: '/layanan/fasad-rumah' },
              ].map((item, idx) => (
                <li key={idx}>
                  <Link
                    to={item.to}
                    style={{ fontSize: '0.925rem', color: '#A8A8A3', textDecoration: 'none', transition: 'color 0.2s ease' }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = '#FFFFFF')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = '#A8A8A3')}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Line */}
        <div
          style={{
            borderTop: '1px solid #171717',
            paddingTop: '30px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '16px',
            fontSize: '0.875rem',
            color: '#6B6B67',
          }}
        >
          <div>
            © 2026 <strong style={{ color: '#FFFFFF' }}>PT ARSI KARYA UNGGUL</strong>. All rights reserved.
          </div>

          <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
            <a
              href="https://instagram.com/arsikarya.build"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: '#A8A8A3', fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: '6px' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#FFFFFF')}
              onMouseLeave={(e) => (e.currentTarget.style.color = '#A8A8A3')}
            >
              <FaInstagram /> <span style={{ fontSize: '0.85rem' }}>arsikarya.build</span>
            </a>
            <a
              href="https://wa.me/628997932802"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: 'var(--color-whatsapp)', fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: '6px' }}
            >
              <FaWhatsapp /> <span style={{ fontSize: '0.85rem', color: '#A8A8A3' }}>+62 899-7932-802</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
