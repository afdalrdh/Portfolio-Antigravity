import React from 'react';
import SectionTag from '../components/ui/SectionTag';
import SEOHead from '../components/ui/SEOHead';
import Button from '../components/ui/Button';
import { teamData } from '../data/teamData';

export default function AboutPage() {
  return (
    <>
      <SEOHead
        title="Tentang Kami — PT Arsi Karya Unggul"
        description="Profil PT Arsi Karya Unggul: Kontraktor Umum dan Design & Build di Bandung dengan posisi bisnis fokus pada proses terstruktur, kontrol kualitas, dan eksekusi efisien."
      />

      {/* Header Banner */}
      <section
        style={{
          backgroundColor: 'var(--color-neutral-700)',
          color: '#ffffff',
          paddingTop: 'calc(var(--header-height) + 60px)',
          paddingBottom: '80px',
        }}
      >
        <div className="container">
          <SectionTag light>TENTANG KAMI</SectionTag>
          <h1 style={{ color: '#ffffff', fontSize: 'clamp(2.2rem, 4.5vw, 3.8rem)', marginBottom: '16px' }}>
            PT ARSI KARYA UNGGUL
          </h1>
          <p style={{ fontSize: '1.2rem', color: 'var(--color-primary-200)', fontFamily: 'var(--font-heading)', fontWeight: 600 }}>
            “Membangun Tuntas, Unggul Dalam Kualitas”
          </p>
        </div>
      </section>

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

            <div style={{ backgroundColor: 'var(--color-neutral-50)', padding: '40px', borderRadius: 'var(--radius-card)', border: '1px solid var(--color-neutral-200)' }}>
              <h3 style={{ fontSize: '1.3rem', marginBottom: '20px', color: 'var(--color-primary-300)' }}>Identitas Perusahaan</h3>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '16px', fontSize: '0.95rem' }}>
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
      </section>

      {/* Verified Leadership Team */}
      <section className="section-padding" style={{ backgroundColor: 'var(--color-neutral-50)', borderTop: '1px solid var(--color-neutral-200)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 60px auto' }}>
            <SectionTag>TIM KAMI</SectionTag>
            <h2>Tim Profesional PT Arsi Karya Unggul</h2>
            <p style={{ color: 'var(--color-neutral-400)', marginTop: '12px' }}>
              Didukung oleh SDM berpengalaman di bidang manajemen teknik konstruksi, perancangan arsitektur, dan operasional proyek.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '32px' }}>
            {teamData.map((member, idx) => (
              <div
                key={idx}
                style={{
                  backgroundColor: '#ffffff',
                  padding: '36px 28px',
                  borderRadius: 'var(--radius-card)',
                  border: '1px solid var(--color-neutral-200)',
                  textAlign: 'center',
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
                  {member.name.charAt(0)}
                </div>
                <h3 style={{ fontSize: '1.25rem', marginBottom: '6px' }}>{member.name}</h3>
                <div style={{ fontSize: '0.85rem', color: 'var(--color-primary-300)', fontWeight: 700, textTransform: 'uppercase', marginBottom: '16px', letterSpacing: '0.05em' }}>
                  {member.role}
                </div>
                <p style={{ fontSize: '0.9rem', color: 'var(--color-neutral-400)', lineHeight: 1.6 }}>{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
