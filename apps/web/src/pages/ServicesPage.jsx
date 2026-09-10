import React from 'react';
import { Link, useParams } from 'react-router-dom';
import SectionTag from '../components/ui/SectionTag';
import SEOHead from '../components/ui/SEOHead';
import Button from '../components/ui/Button';
import { servicesData, seoLandingServices } from '../data/servicesData';

export default function ServicesPage() {
  const { serviceSlug } = useParams();

  // If viewing a specific service detail page
  if (serviceSlug) {
    const service = servicesData.find((s) => s.slug === serviceSlug) || seoLandingServices.find((s) => s.slug === serviceSlug);

    if (service) {
      return (
        <>
          <SEOHead
            title={`${service.title} — PT Arsi Karya Unggul`}
            description={service.shortDesc || service.fullDesc}
          />
          <section style={{ backgroundColor: 'var(--color-neutral-700)', color: '#ffffff', paddingTop: 'calc(var(--header-height) + 60px)', paddingBottom: '80px' }}>
            <div className="container">
              <SectionTag light>LAYANAN KAMI</SectionTag>
              <h1 style={{ color: '#ffffff', fontSize: 'clamp(2.2rem, 4vw, 3.5rem)', marginBottom: '16px' }}>{service.title}</h1>
              <p style={{ fontSize: '1.15rem', color: '#EFEFEA', maxWidth: '700px' }}>{service.shortDesc}</p>
            </div>
          </section>

          <section className="section-padding" style={{ backgroundColor: 'var(--color-neutral-0)' }}>
            <div className="container" style={{ maxWidth: '900px' }}>
              <h2>Deskripsi & Scope Pekerjaan</h2>
              <p style={{ fontSize: '1.05rem', lineHeight: 1.8, color: 'var(--color-neutral-500)', marginTop: '20px' }}>
                {service.fullDesc}
              </p>

              {service.benefits && (
                <div style={{ marginTop: '40px', backgroundColor: 'var(--color-neutral-50)', padding: '32px', borderRadius: '8px', border: '1px solid var(--color-neutral-200)' }}>
                  <h3 style={{ fontSize: '1.25rem', marginBottom: '16px' }}>Keunggulan Layanan</h3>
                  <ul style={{ paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {service.benefits.map((b, idx) => (
                      <li key={idx} style={{ fontSize: '1rem', color: 'var(--color-neutral-600)' }}>{b}</li>
                    ))}
                  </ul>
                </div>
              )}

              <div style={{ marginTop: '48px', textAlign: 'center' }}>
                <Button
                  href={`https://wa.me/628997932802?text=Hallo%20Arsi%20Karya,%20saya%20ingin%20konsultasi%20mengenai%20layanan%20${encodeURIComponent(service.title)}.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="whatsapp"
                  style={{ padding: '16px 36px' }}
                >
                  Konsultasi Layanan via WhatsApp
                </Button>
              </div>
            </div>
          </section>
        </>
      );
    }
  }

  // Overview Services Directory Page
  return (
    <>
      <SEOHead
        title="Layanan Jasa Konstruksi & Design-Build — PT Arsi Karya Unggul"
        description="Empat layanan utama PT Arsi Karya Unggul: Kontraktor Umum / Konstruksi, Design & Build (Arsitektur & Interior), Fabrikasi Struktur, dan Pengadaan Barang di Bandung."
      />

      <section style={{ backgroundColor: 'var(--color-neutral-700)', color: '#ffffff', paddingTop: 'calc(var(--header-height) + 60px)', paddingBottom: '80px' }}>
        <div className="container">
          <SectionTag light>LAYANAN KAMI</SectionTag>
          <h1 style={{ color: '#ffffff', fontSize: 'clamp(2.2rem, 4.5vw, 3.8rem)', marginBottom: '16px' }}>
            Empat Pilar Layanan Konstruksi
          </h1>
          <p style={{ fontSize: '1.15rem', color: 'var(--color-primary-200)', maxWidth: '680px' }}>
            Layanan konstruksi terpadu dengan standar kontrol kualitas presisi dan pengelolaan transparan.
          </p>
        </div>
      </section>

      {/* 4 Core Primary Services */}
      <section className="section-padding" style={{ backgroundColor: 'var(--color-neutral-0)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '36px' }}>
            {servicesData.map((svc) => (
              <div
                key={svc.id}
                style={{
                  backgroundColor: 'var(--color-neutral-50)',
                  padding: '40px 32px',
                  borderRadius: 'var(--radius-card)',
                  border: '1px solid var(--color-neutral-200)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                }}
              >
                <div>
                  <h2 style={{ fontSize: '1.5rem', marginBottom: '16px' }}>{svc.title}</h2>
                  <p style={{ fontSize: '0.95rem', color: 'var(--color-neutral-500)', lineHeight: 1.6, marginBottom: '24px' }}>
                    {svc.fullDesc}
                  </p>
                </div>
                <Button to={`/layanan/${svc.slug}`} variant="primary" showArrow>
                  Detail & Scope Pekerjaan
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Specialized SEO Sub-Landing Services */}
      <section className="section-padding" style={{ backgroundColor: 'var(--color-neutral-50)', borderTop: '1px solid var(--color-neutral-200)' }}>
        <div className="container">
          <SectionTag>SPESIALISASI LAINNYA</SectionTag>
          <h2 style={{ marginBottom: '40px' }}>Pekerjaan Renovasi & Fasad Spesifik</h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
            {seoLandingServices.map((s, idx) => (
              <Link
                key={idx}
                to={`/layanan/${s.slug}`}
                style={{
                  backgroundColor: '#ffffff',
                  padding: '28px',
                  borderRadius: 'var(--radius-card)',
                  border: '1px solid var(--color-neutral-200)',
                  textDecoration: 'none',
                }}
              >
                <h3 style={{ fontSize: '1.15rem', marginBottom: '10px', color: 'var(--color-neutral-700)' }}>{s.title}</h3>
                <p style={{ fontSize: '0.9rem', color: 'var(--color-neutral-400)', lineHeight: 1.6 }}>{s.shortDesc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
