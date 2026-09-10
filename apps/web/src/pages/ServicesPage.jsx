import React from 'react';
import { Link, useParams } from 'react-router-dom';
import SectionTag from '../components/ui/SectionTag';
import SEOHead from '../components/ui/SEOHead';
import Button from '../components/ui/Button';
import Breadcrumb from '../components/ui/Breadcrumb';
import FAQ from '../components/ui/FAQ';
import { servicesData, seoLandingServices } from '../data/servicesData';
import { projectsData } from '../data/projectsData';
import { getServiceWaUrl, getGeneralWaUrl } from '../utils/whatsapp';

export default function ServicesPage() {
  const { serviceSlug } = useParams();

  // If viewing a specific service detail page (/layanan/:serviceSlug)
  if (serviceSlug) {
    const service = servicesData.find((s) => s.slug === serviceSlug) || seoLandingServices.find((s) => s.slug === serviceSlug);

    if (service) {
      const relatedProjects = projectsData.filter((p) =>
        p.category.toLowerCase().includes(service.title.split(' ')[0].toLowerCase()) ||
        p.title.toLowerCase().includes(service.slug.split('-')[0])
      );

      const defaultFaqs = [
        {
          question: "Bagaimana alur awal pengajuan konsultasi?",
          answer: "Anda dapat menghubungi kami via WhatsApp atau pengajuan kerja sama. Tim kami akan melakukan penjadwalan survey lokasi awal dan pembuatan indikatif RAB."
        },
        {
          question: "Bagaimana penentuan perkiraan biaya pekerjaan?",
          answer: service.pricingNotice || "Biaya bergantung pada lingkup pekerjaan, spesifikasi, material, lokasi, dan kondisi proyek."
        },
        {
          question: "Apakah ada garansi hasil pekerjaan?",
          answer: "Ya, setiap serah terima pekerjaan dilengkapi dengan masa retensi garansi pemeliharaan resmi dari PT Arsi Karya Unggul."
        }
      ];

      const faqsList = service.faqs && service.faqs.length > 0 ? service.faqs : defaultFaqs;
      const serviceWaUrl = getServiceWaUrl(service.title);

      return (
        <>
          <SEOHead
            title={`${service.title} — PT Arsi Karya Unggul`}
            description={service.shortDesc || service.fullDesc}
          />

          {/* Hero Header */}
          <section style={{ backgroundColor: 'var(--color-neutral-700)', color: '#ffffff', paddingTop: 'calc(var(--header-height) + 40px)', paddingBottom: '70px' }}>
            <div className="container">
              {/* Detail Page Breadcrumb ONLY: Layanan > Service Name */}
              <Breadcrumb items={[{ label: 'Layanan', to: '/layanan' }, { label: service.title }]} />
              <SectionTag light>DETAIL LAYANAN</SectionTag>
              <h1 style={{ color: '#ffffff', fontSize: 'clamp(2.2rem, 4vw, 3.5rem)', marginBottom: '16px' }}>{service.title}</h1>
              <p style={{ fontSize: '1.15rem', color: '#EFEFEA', maxWidth: '750px' }}>{service.shortDesc}</p>
            </div>
          </section>

          <section className="section-padding" style={{ backgroundColor: 'var(--color-neutral-0)' }}>
            <div className="container" style={{ maxWidth: '960px' }}>
              
              {/* Introduction */}
              <div style={{ marginBottom: '48px' }}>
                <SectionTag>PENJELASAN UTAMA</SectionTag>
                <h2>Deskripsi & Karakteristik Layanan</h2>
                <p style={{ fontSize: '1.05rem', lineHeight: 1.8, color: 'var(--color-neutral-500)', marginTop: '16px' }}>
                  {service.fullDesc}
                </p>
              </div>

              {/* Customer Need / Problem */}
              {service.problemStatement && (
                <div style={{ backgroundColor: 'var(--color-primary-100)', padding: '32px', borderRadius: 'var(--radius-card)', marginBottom: '48px', borderLeft: '4px solid var(--color-primary-300)' }}>
                  <h3 style={{ fontSize: '1.2rem', color: 'var(--color-primary-400)', marginBottom: '8px' }}>Solusi Atas Masalah Lapangan</h3>
                  <p style={{ fontSize: '0.975rem', color: 'var(--color-neutral-600)', lineHeight: 1.6, margin: 0 }}>
                    {service.problemStatement}
                  </p>
                </div>
              )}

              {/* Scope of Service */}
              {service.scopeList && service.scopeList.length > 0 && (
                <div style={{ marginBottom: '48px' }}>
                  <SectionTag>CAKUPAN PEKERJAAN</SectionTag>
                  <h2>Lingkup & Deliverables Pekerjaan</h2>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px', marginTop: '24px' }}>
                    {service.scopeList.map((sc, idx) => (
                      <div
                        key={idx}
                        style={{
                          backgroundColor: 'var(--color-neutral-50)',
                          padding: '20px',
                          borderRadius: 'var(--radius-card)',
                          border: '1px solid var(--color-neutral-200)',
                          fontSize: '0.95rem',
                          fontWeight: 600,
                          color: 'var(--color-neutral-700)',
                        }}
                      >
                        • {sc}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Who it is suitable for */}
              {service.targetAudience && (
                <div style={{ marginBottom: '48px', backgroundColor: 'var(--color-neutral-50)', padding: '32px', borderRadius: 'var(--radius-card)', border: '1px solid var(--color-neutral-200)' }}>
                  <h3 style={{ fontSize: '1.25rem', marginBottom: '10px' }}>Peruntukan Klien</h3>
                  <p style={{ fontSize: '0.95rem', color: 'var(--color-neutral-500)', lineHeight: 1.6, margin: 0 }}>
                    {service.targetAudience}
                  </p>
                </div>
              )}

              {/* Process (4 Steps) */}
              {service.processSteps && (
                <div style={{ marginBottom: '48px' }}>
                  <SectionTag>ALUR KERJA</SectionTag>
                  <h2>Metodologi & Tahapan Kerja</h2>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px', marginTop: '24px' }}>
                    {service.processSteps.map((st, idx) => (
                      <div
                        key={idx}
                        style={{
                          backgroundColor: '#ffffff',
                          padding: '24px',
                          borderRadius: 'var(--radius-card)',
                          border: '1px solid var(--color-neutral-200)',
                        }}
                      >
                        <h4 style={{ fontSize: '1.05rem', color: 'var(--color-primary-300)', marginBottom: '8px' }}>{st.title}</h4>
                        <p style={{ fontSize: '0.875rem', color: 'var(--color-neutral-400)', lineHeight: 1.5, margin: 0 }}>{st.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Methods & Verified Materials */}
              {service.methodsMaterials && (
                <div style={{ marginBottom: '48px' }}>
                  <SectionTag>STANDAR BAHAN</SectionTag>
                  <h2>Metode Kerja & Material Verified</h2>
                  <ul style={{ paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '16px' }}>
                    {service.methodsMaterials.map((mm, idx) => (
                      <li key={idx} style={{ fontSize: '0.95rem', color: 'var(--color-neutral-600)' }}>{mm}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Contextual Pricing Disclosure Notice */}
              <div style={{ backgroundColor: 'var(--color-neutral-100)', padding: '24px', borderRadius: 'var(--radius-card)', marginBottom: '48px', border: '1px solid var(--color-neutral-200)' }}>
                <strong style={{ fontSize: '0.9rem', color: 'var(--color-neutral-700)' }}>Catatan Anggaran Biaya:</strong>
                <p style={{ fontSize: '0.9rem', color: 'var(--color-neutral-500)', margin: '4px 0 0 0' }}>
                  {service.pricingNotice || "Biaya bergantung pada lingkup pekerjaan, spesifikasi, material, lokasi, dan kondisi proyek."}
                </p>
              </div>

              {/* Related Projects */}
              {relatedProjects.length > 0 && (
                <div style={{ marginBottom: '48px' }}>
                  <SectionTag>PORTOFOLIO TERKAIT</SectionTag>
                  <h2>Proyek Terkait Layanan Ini</h2>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px', marginTop: '20px' }}>
                    {relatedProjects.map((rp) => (
                      <Link key={rp.id} to={`/proyek/${rp.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                        <div style={{ backgroundColor: 'var(--color-neutral-50)', padding: '20px', borderRadius: '8px', border: '1px solid var(--color-neutral-200)' }}>
                          <h4 style={{ fontSize: '1rem', marginBottom: '6px' }}>{rp.title}</h4>
                          <span style={{ fontSize: '0.8rem', color: 'var(--color-neutral-400)' }}>{rp.location} • {rp.year}</span>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* FAQ Accordion */}
              <div style={{ marginBottom: '56px' }}>
                <SectionTag>PERTANYAAN UMUM</SectionTag>
                <h2 style={{ marginBottom: '24px' }}>Pertanyaan Sering Diajukan (FAQ)</h2>
                <FAQ items={faqsList} />
              </div>

              {/* CTA Section */}
              <div style={{ textAlign: 'center', backgroundColor: 'var(--color-primary-300)', color: '#ffffff', padding: '48px 32px', borderRadius: 'var(--radius-card)' }}>
                <h3 style={{ color: '#ffffff', fontSize: '1.6rem', marginBottom: '12px' }}>
                  Ingin Berkonsultasi Mengenai Layanan {service.title}?
                </h3>
                <p style={{ color: '#EAF4FA', fontSize: '1rem', marginBottom: '28px', maxWidth: '600px', margin: '0 auto 28px auto' }}>
                  Tim teknis PT Arsi Karya Unggul siap membantu menghitung estimasi anggaran dan perencanaan teknis Anda.
                </p>
                <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
                  <Button
                    href={serviceWaUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    variant="whatsapp"
                    style={{ padding: '14px 28px' }}
                  >
                    Chat WhatsApp
                  </Button>
                  <Button to="/kontak" variant="dark" style={{ border: '1px solid rgba(255,255,255,0.4)', padding: '14px 28px' }}>
                    Ajukan Kerja Sama
                  </Button>
                </div>
              </div>

            </div>
          </section>
        </>
      );
    }
  }

  // Overview Services Directory Page (/layanan) — TOP-LEVEL HAS NO BREADCRUMB
  return (
    <>
      <SEOHead
        title="Layanan Jasa Konstruksi & Design-Build — PT Arsi Karya Unggul"
        description="Empat layanan utama PT Arsi Karya Unggul: Kontraktor Umum / Konstruksi, Design & Build (Arsitektur & Interior), Fabrikasi Struktur, dan Pengadaan Barang di Bandung."
      />

      <section style={{ backgroundColor: 'var(--color-neutral-700)', color: '#ffffff', paddingTop: 'calc(var(--header-height) + 40px)', paddingBottom: '70px' }}>
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
                <Button to={`/layanan/${svc.slug}`} variant="primary">
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
