import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import SectionTag from '../components/ui/SectionTag';
import SEOHead from '../components/ui/SEOHead';
import Button from '../components/ui/Button';
import { projectsData } from '../data/projectsData';

export default function ProjectsPage() {
  const { projectSlug } = useParams();
  const [activeCategory, setActiveCategory] = useState('Semua');

  // Single Project Detail View
  if (projectSlug) {
    const project = projectsData.find((p) => p.slug === projectSlug);

    if (project) {
      return (
        <>
          <SEOHead
            title={`${project.title} — PT Arsi Karya Unggul`}
            description={project.description}
          />
          <section style={{ backgroundColor: 'var(--color-neutral-700)', color: '#ffffff', paddingTop: 'calc(var(--header-height) + 60px)', paddingBottom: '80px' }}>
            <div className="container">
              <SectionTag light>{project.category} • {project.year}</SectionTag>
              <h1 style={{ color: '#ffffff', fontSize: 'clamp(2rem, 4vw, 3.2rem)', marginBottom: '16px' }}>{project.title}</h1>
              <p style={{ fontSize: '1.1rem', color: 'var(--color-primary-200)' }}>{project.location}</p>
            </div>
          </section>

          <section className="section-padding" style={{ backgroundColor: 'var(--color-neutral-0)' }}>
            <div className="container" style={{ maxWidth: '900px' }}>
              <div style={{ height: '400px', backgroundColor: 'var(--color-neutral-200)', borderRadius: '8px', overflow: 'hidden', marginBottom: '40px' }}>
                <img src={project.thumbnail} alt={project.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>

              <h2>Detail Pekerjaan & Informasi Entitas</h2>
              <div style={{ backgroundColor: 'var(--color-neutral-50)', padding: '24px', borderRadius: '8px', border: '1px solid var(--color-neutral-200)', margin: '24px 0 32px 0' }}>
                <p style={{ fontSize: '0.95rem', color: 'var(--color-neutral-600)', margin: 0 }}>
                  <strong>Keterangan Peran / Listed Entity:</strong> {project.roleDisclosure}
                </p>
              </div>

              <p style={{ fontSize: '1.05rem', lineHeight: 1.8, color: 'var(--color-neutral-500)' }}>
                {project.description}
              </p>

              {project.features && (
                <div style={{ marginTop: '32px' }}>
                  <h3 style={{ fontSize: '1.2rem', marginBottom: '16px' }}>Spesifikasi Utama Pekerjaan</h3>
                  <ul style={{ paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {project.features.map((f, idx) => (
                      <li key={idx} style={{ color: 'var(--color-neutral-600)' }}>{f}</li>
                    ))}
                  </ul>
                </div>
              )}

              <div style={{ marginTop: '48px', display: 'flex', gap: '16px' }}>
                <Button to="/proyek" variant="secondary">
                  Kembali ke Portofolio
                </Button>
                <Button
                  href={`https://wa.me/628997932802?text=Hallo%20Arsi%20Karya,%20saya%20tertarik%20mengenai%20proyek%20${encodeURIComponent(project.title)}.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="whatsapp"
                >
                  Konsultasi Proyek Serupa
                </Button>
              </div>
            </div>
          </section>
        </>
      );
    }
  }

  // Filter Categories
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

      <section style={{ backgroundColor: 'var(--color-neutral-700)', color: '#ffffff', paddingTop: 'calc(var(--header-height) + 60px)', paddingBottom: '80px' }}>
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
                  <Button to={`/proyek/${proj.slug}`} variant="text" showArrow>
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
