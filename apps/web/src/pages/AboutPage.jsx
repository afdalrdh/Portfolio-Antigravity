import React from 'react';
import SectionTag from '../components/ui/SectionTag';
import SEOHead from '../components/ui/SEOHead';
import Button from '../components/ui/Button';
import HeroBanner from '../components/ui/HeroBanner';
import { teamData } from '../data/teamData';

export default function AboutPage() {
  const direksiTeam = teamData.filter(m => m.role === 'Direktur' || m.role === 'Direktur Teknik');
  const operationalTeam = teamData.filter(m => m.role !== 'Direktur' && m.role !== 'Direktur Teknik');

  return (
    <>
      <SEOHead
        title="Tentang Kami — PT Arsi Karya Unggul"
        description="Profil PT Arsi Karya Unggul: Kontraktor Umum dan Design & Build di Bandung dengan posisi bisnis fokus pada proses terstruktur, kontrol kualitas, dan eksekusi efisien."
      />

      {/* Dark Architectural Hero Banner */}
      <HeroBanner
        bgImage="/projects/project_2.jpg"
        overlayOpacity={0.65}
        tag="TENTANG KAMI"
        title="PT ARSI KARYA UNGGUL"
        subtitle="“Membangun Tuntas, Unggul Dalam Kualitas”"
      />

      {/* Company Positioning & Profile */}
      <section className="section-padding" style={{ backgroundColor: 'var(--color-neutral-0)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '48px', alignItems: 'center' }}>
            <div>
              <SectionTag>PROFIL PERUSAHAAN</SectionTag>
              <h2>Komitmen Profesionalisme dalam Dunia Konstruksi</h2>
              <p style={{ marginTop: '20px', lineHeight: 1.7, color: 'var(--color-neutral-500)' }}>
                <strong>PT ARSI KARYA UNGGUL</strong> adalah perusahaan jasa konstruksi dan <em>Design & Build</em> berkedudukan di Kota Bandung yang berfokus pada alur kerja terstruktur, eksekusi efisien, pengendalian mutu material, komunikasi jelas, dan kontrol proyek yang konsisten.
              </p>
              <p style={{ marginTop: '16px', lineHeight: 1.7, color: 'var(--color-neutral-500)' }}>
                Kami memadukan kemampuan kompetensi teknis konstruksi dengan kepekaan desain arsitektural untuk memberikan hasil akhir yang kokoh, fungsional, dan bernilai tinggi bagi klien instansi pemerintah, swasta, maupun perorangan.
              </p>

              <div style={{ marginTop: '32px' }}>
                <Button to="/kontak" variant="primary">
                  Konsultasi Bersama Tim Kami
                </Button>
              </div>
            </div>

            <div>
              {/* Architectural Visual Feature Banner */}
              <div style={{ height: '240px', borderRadius: 'var(--radius-card)', overflow: 'hidden', marginBottom: '24px', position: 'relative', border: '1px solid var(--color-neutral-200)' }}>
                <img src="/projects/project_3.jpg" alt="PT Arsi Karya Unggul Office & Projects" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)', padding: '16px 20px', color: '#ffffff', fontSize: '0.85rem', fontWeight: 600 }}>
                  Gedung & Proyek PT Arsi Karya Unggul
                </div>
              </div>

              <div style={{ backgroundColor: 'var(--color-neutral-50)', padding: '32px', borderRadius: 'var(--radius-card)', border: '1px solid var(--color-neutral-200)' }}>
                <h3 style={{ fontSize: '1.2rem', marginBottom: '16px', color: 'var(--color-primary-300)' }}>Identitas Perusahaan</h3>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '14px', fontSize: '0.925rem' }}>
                  <li>
                    <strong style={{ color: 'var(--color-neutral-700)' }}>Nama Legal:</strong><br />
                    PT ARSI KARYA UNGGUL
                  </li>
                  <li>
                    <strong style={{ color: 'var(--color-neutral-700)' }}>Brand Dagang:</strong><br />
                    ARSI KARYA
                  </li>
                  <li>
                    <strong style={{ color: 'var(--color-neutral-700)' }}>Slogan Utama:</strong><br />
                    “Membangun Tuntas, Unggul Dalam Kualitas”
                  </li>
                  <li>
                    <strong style={{ color: 'var(--color-neutral-700)' }}>Kantor Operasional:</strong><br />
                    Bumi Adipura, Jl. Tulip VII No. 21, Rancabolang, Gedebage, Kota Bandung.
                  </li>
                  <li>
                    <strong style={{ color: 'var(--color-neutral-700)' }}>Layanan Utama:</strong><br />
                    Konstruksi, Design & Build, Fabrikasi, Pengadaan Barang
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>



      {/* Verified Leadership & Team Section */}
      <section className="section-padding" style={{ backgroundColor: 'var(--color-neutral-50)', borderTop: '1px solid var(--color-neutral-200)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 50px auto' }}>
            <SectionTag>TIM KAMI</SectionTag>
            <h2 style={{ fontSize: 'clamp(2rem, 3.5vw, 2.75rem)', fontWeight: 800, color: 'var(--color-neutral-800)' }}>
              Tim Profesional PT Arsi Karya Unggul
            </h2>
            <p style={{ color: 'var(--color-neutral-400)', marginTop: '12px', fontSize: '1rem', lineHeight: 1.6 }}>
              Didukung oleh SDM berpengalaman di bidang manajemen teknik konstruksi, perancangan arsitektur, dan operasional proyek.
            </p>
          </div>

          {/* Baris 1: Direktur & Direktur Teknik (2 Kotak Sejajar) */}
          <div style={{ marginBottom: '32px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '32px', maxWidth: '900px', margin: '0 auto' }}>
              {direksiTeam.map((member, idx) => (
                <div
                  key={idx}
                  style={{
                    backgroundColor: '#ffffff',
                    padding: '40px 32px',
                    borderRadius: 'var(--radius-card)',
                    border: '1px solid var(--color-neutral-200)',
                    textAlign: 'center',
                    boxShadow: '0 2px 10px rgba(0,0,0,0.03)',
                  }}
                >
                  <div
                    style={{
                      width: '90px',
                      height: '90px',
                      borderRadius: '50%',
                      backgroundColor: 'var(--color-primary-100)',
                      color: 'var(--color-primary-300)',
                      margin: '0 auto 20px auto',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '2rem',
                      fontWeight: 700,
                    }}
                  >
                    {member.initial || member.name.charAt(0)}
                  </div>
                  <h3 style={{ fontSize: '1.3rem', fontWeight: 800, marginBottom: '6px', color: 'var(--color-neutral-800)' }}>{member.name}</h3>
                  <div style={{ fontSize: '0.85rem', color: 'var(--color-primary-300)', fontWeight: 800, textTransform: 'uppercase', marginBottom: '16px', letterSpacing: '0.08em' }}>
                    {member.role}
                  </div>
                  <p style={{ fontSize: '0.9rem', color: 'var(--color-neutral-500)', lineHeight: 1.6 }}>{member.bio}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Baris 2: Staff Umum & Kepala Studio Kreatif (2 Kotak Sejajar) */}
          <div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '32px', maxWidth: '900px', margin: '0 auto' }}>
              {operationalTeam.map((member, idx) => (
                <div
                  key={idx}
                  style={{
                    backgroundColor: '#ffffff',
                    padding: '40px 32px',
                    borderRadius: 'var(--radius-card)',
                    border: '1px solid var(--color-neutral-200)',
                    textAlign: 'center',
                    boxShadow: '0 2px 10px rgba(0,0,0,0.03)',
                  }}
                >
                  <div
                    style={{
                      width: '90px',
                      height: '90px',
                      borderRadius: '50%',
                      backgroundColor: 'var(--color-primary-100)',
                      color: 'var(--color-primary-300)',
                      margin: '0 auto 20px auto',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '2rem',
                      fontWeight: 700,
                    }}
                  >
                    {member.initial || member.name.charAt(0)}
                  </div>
                  <h3 style={{ fontSize: '1.3rem', fontWeight: 800, marginBottom: '6px', color: 'var(--color-neutral-800)' }}>{member.name}</h3>
                  <div style={{ fontSize: '0.85rem', color: 'var(--color-primary-300)', fontWeight: 800, textTransform: 'uppercase', marginBottom: '16px', letterSpacing: '0.08em' }}>
                    {member.role}
                  </div>
                  <p style={{ fontSize: '0.9rem', color: 'var(--color-neutral-500)', lineHeight: 1.6 }}>{member.bio}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>
    </>
  );
}
