import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import SectionTag from '../components/ui/SectionTag';
import SEOHead from '../components/ui/SEOHead';
import Button from '../components/ui/Button';
import Breadcrumb from '../components/ui/Breadcrumb';
import Gallery from '../components/ui/Gallery';
import { projectsData } from '../data/projectsData';
import { getProjectWaUrl } from '../utils/whatsapp';

export default function ProjectsPage() {
  const { projectSlug } = useParams();
  const [activeCategory, setActiveCategory] = useState('Semua');

  // Single Project Detail View (/proyek/:slug)
  if (projectSlug) {
    const project = projectsData.find((p) => p.slug === projectSlug);

    if (project) {
      const relatedProjects = projectsData.filter(
        (p) => p.id !== project.id && (p.category === project.category || p.location === project.location)
      );

      const projectWaUrl = getProjectWaUrl(project.title);

      return (
        <>
          <SEOHead
            title={`${project.title} — PT Arsi Karya Unggul`}
            description={project.description}
          />

          {/* Hero Banner */}
          <section style={{ backgroundColor: 'var(--color-neutral-700)', color: '#ffffff', paddingTop: 'calc(var(--header-height) + 40px)', paddingBottom: '60px' }}>
            <div className="container">
              {/* Detail Page Breadcrumb ONLY: Proyek > Project Name */}
              <Breadcrumb items={[{ label: 'Proyek', to: '/proyek' }, { label: project.title }]} />
              <SectionTag light>{project.category} • {project.year}</SectionTag>
              <h1 style={{ color: '#ffffff', fontSize: 'clamp(2rem, 4vw, 3.2rem)', marginBottom: '16px' }}>{project.title}</h1>
              <p style={{ fontSize: '1.1rem', color: 'var(--color-primary-200)' }}>{project.location}</p>
            </div>
          </section>

          <section className="section-padding" style={{ backgroundColor: 'var(--color-neutral-0)' }}>
            <div className="container" style={{ maxWidth: '960px' }}>
              
              {/* Project Cover & Overview Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '40px', marginBottom: '48px' }}>
                <div style={{ height: '380px', backgroundColor: 'var(--color-neutral-200)', borderRadius: '8px', overflow: 'hidden' }}>
                  <img src={project.thumbnail} alt={project.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>

                {/* Project Info Sidebar */}
                <div style={{ backgroundColor: 'var(--color-neutral-50)', padding: '32px', borderRadius: 'var(--radius-card)', border: '1px solid var(--color-neutral-200)' }}>
                  <h3 style={{ fontSize: '1.25rem', marginBottom: '20px', color: 'var(--color-primary-300)' }}>Informasi Proyek</h3>
                  
                  <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '14px', fontSize: '0.925rem' }}>
                    <li>
                      <strong style={{ color: 'var(--color-neutral-700)' }}>Jenis Proyek:</strong><br />
                      {project.category}
                    </li>
                    <li>
                      <strong style={{ color: 'var(--color-neutral-700)' }}>Lokasi Terverifikasi:</strong><br />
                      {project.location}
                    </li>
                    <li>
                      <strong style={{ color: 'var(--color-neutral-700)' }}>Tahun Pengerjaan:</strong><br />
                      {project.year}
                    </li>
                    <li>
                      <strong style={{ color: 'var(--color-neutral-700)' }}>Keterangan Entitas Listed:</strong><br />
                      {project.companyListed || 'PT Arsi Karya Unggul'}
                    </li>
                    <li>
                      <strong style={{ color: 'var(--color-neutral-700)' }}>Keterangan Peran:</strong><br />
                      <span style={{ fontStyle: 'italic', color: 'var(--color-neutral-500)' }}>{project.roleDisclosure}</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Description */}
              <div style={{ marginBottom: '40px' }}>
                <SectionTag>DESKRIPSI KELENGKAPAN</SectionTag>
                <h2>Gambaran Umum Pekerjaan</h2>
                <p style={{ fontSize: '1.05rem', lineHeight: 1.8, color: 'var(--color-neutral-500)', marginTop: '16px' }}>
                  {project.description}
                </p>
              </div>

              {/* Features / Scope */}
              {project.features && (
                <div style={{ marginBottom: '40px' }}>
                  <SectionTag>SPESIFIKASI PEKERJAAN</SectionTag>
                  <h2>Ruang Lingkup Teknis</h2>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px', marginTop: '20px' }}>
                    {project.features.map((f, idx) => (
                      <div key={idx} style={{ backgroundColor: 'var(--color-neutral-50)', padding: '16px 20px', borderRadius: '6px', border: '1px solid var(--color-neutral-200)', fontSize: '0.95rem', fontWeight: 600 }}>
                        ✓ {f}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Gallery Component */}
              <Gallery images={project.gallery || [project.thumbnail]} title="Dokumentasi Visual Proyek" />

              {/* Related Service Link */}
              <div style={{ marginTop: '48px', backgroundColor: 'var(--color-primary-100)', padding: '24px', borderRadius: 'var(--radius-card)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
                <div>
                  <h4 style={{ fontSize: '1.05rem', color: 'var(--color-primary-400)', marginBottom: '4px' }}>Tertarik dengan Layanan Kategori Ini?</h4>
                  <p style={{ fontSize: '0.9rem', color: 'var(--color-neutral-600)', margin: 0 }}>Lihat rincian scope teknis dan metodologi layanan terkait.</p>
                </div>
                <Button to="/layanan" variant="primary">
                  Lihat Seluruh Layanan
                </Button>
              </div>

              {/* Related Projects */}
              {relatedProjects.length > 0 && (
                <div style={{ marginTop: '56px' }}>
                  <SectionTag>PROYEK LAINNYA</SectionTag>
                  <h2 style={{ marginBottom: '24px' }}>Portofolio Terkait</h2>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '24px' }}>
                    {relatedProjects.slice(0, 3).map((rp) => (
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

              {/* Consultation CTA */}
              <div style={{ marginTop: '56px', textAlign: 'center', backgroundColor: 'var(--color-neutral-700)', color: '#ffffff', padding: '48px 32px', borderRadius: 'var(--radius-card)' }}>
                <h3 style={{ color: '#ffffff', fontSize: '1.6rem', marginBottom: '12px' }}>
                  Ingin Berkonsultasi Mengenai Proyek Serupa?
                </h3>
                <p style={{ color: '#EFEFEA', fontSize: '1rem', marginBottom: '28px', maxWidth: '600px', margin: '0 auto 28px auto' }}>
                  Hubungi tim PT Arsi Karya Unggul untuk mendiskusikan rencana pembangunan dan perkiraan anggaran Anda.
                </p>
                <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
                  <Button
                    href={projectWaUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    variant="whatsapp"
                  >
                    Chat WhatsApp
                  </Button>
                  <Button to="/kontak" variant="dark" style={{ border: '1px solid rgba(255,255,255,0.4)' }}>
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

  // Filter Categories Overview (/proyek) — TOP-LEVEL HAS NO BREADCRUMB
  const categories = ['Semua', 'Design & Build', 'Fasad & Eksterior', 'Finishing & Interior', 'Konstruksi & Maintenance', 'Infrastruktur'];

  const filteredProjects = activeCategory === 'Semua'
    ? projectsData
    : projectsData.filter((p) => p.category === activeCategory);

  return (
    <>
      <SEOHead
        title="Portofolio Proyek Terverifikasi — PT Arsi Karya Unggul"
        description="Daftar rekam jejak pekerjaan proyek PT Arsi Karya Unggul di bidang konstruksi, fasad ACP, rumah hunian, interior, dan pengaspalan jalan."
      />

      <section style={{ backgroundColor: 'var(--color-neutral-700)', color: '#ffffff', paddingTop: 'calc(var(--header-height) + 40px)', paddingBottom: '70px' }}>
        <div className="container">
          <SectionTag light>PORTOFOLIO PROYEK</SectionTag>
          <h1 style={{ color: '#ffffff', fontSize: 'clamp(2.2rem, 4.5vw, 3.8rem)', marginBottom: '16px' }}>
            Rekam Jejak Pekerjaan
          </h1>
          <p style={{ fontSize: '1.15rem', color: 'var(--color-primary-200)', maxWidth: '680px' }}>
            Pengalaman proyek nyata dengan keterbukaan entitas pelaksana dan penanganan mutu profesional.
          </p>
        </div>
      </section>

      <section className="section-padding" style={{ backgroundColor: 'var(--color-neutral-0)' }}>
        <div className="container">
          {/* Category Filter Pills */}
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '48px' }}>
            {categories.map((cat, idx) => (
              <button
                key={idx}
                onClick={() => setActiveCategory(cat)}
                style={{
                  padding: '10px 20px',
                  borderRadius: '30px',
                  fontSize: '0.9rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  border: activeCategory === cat ? '1px solid var(--color-primary-300)' : '1px solid var(--color-neutral-200)',
                  backgroundColor: activeCategory === cat ? 'var(--color-primary-300)' : '#ffffff',
                  color: activeCategory === cat ? '#ffffff' : 'var(--color-neutral-600)',
                  transition: 'all 0.2s ease',
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '32px' }}>
            {filteredProjects.map((proj) => (
              <div
                key={proj.id}
                style={{
                  borderRadius: 'var(--radius-card)',
                  overflow: 'hidden',
                  border: '1px solid var(--color-neutral-200)',
                  backgroundColor: '#ffffff',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                }}
              >
                <div>
                  <div style={{ height: '220px', backgroundColor: 'var(--color-neutral-200)', overflow: 'hidden' }}>
                    <img src={proj.thumbnail} alt={proj.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                  <div style={{ padding: '24px' }}>
                    <div style={{ fontSize: '0.8rem', color: 'var(--color-primary-300)', fontWeight: 700, textTransform: 'uppercase', marginBottom: '6px' }}>
                      {proj.category} • {proj.year}
                    </div>
                    <h2 style={{ fontSize: '1.25rem', marginBottom: '8px', lineHeight: 1.3 }}>{proj.title}</h2>
                    <p style={{ fontSize: '0.85rem', color: 'var(--color-neutral-400)', fontStyle: 'italic', marginBottom: '16px' }}>
                      {proj.roleDisclosure}
                    </p>
                    <p style={{ fontSize: '0.9rem', color: 'var(--color-neutral-500)', lineHeight: 1.5 }}>
                      {proj.description.substring(0, 100)}...
                    </p>
                  </div>
                </div>
                <div style={{ padding: '0 24px 24px 24px' }}>
                  <Button to={`/proyek/${proj.slug}`} variant="primary">
                    Lihat Detail Proyek
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
