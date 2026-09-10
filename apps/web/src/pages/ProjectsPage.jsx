import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import SectionTag from '../components/ui/SectionTag';
import SEOHead from '../components/ui/SEOHead';
import Button from '../components/ui/Button';
import Gallery from '../components/ui/Gallery';
import HeroBanner from '../components/ui/HeroBanner';
import CTA from '../components/CTA';
import { projectsData } from '../data/projectsData';
import { getProjectWaUrl } from '../utils/whatsapp';
import { publicApi } from '../lib/api';

export default function ProjectsPage() {
  const { projectSlug } = useParams();
  const [activeCategory, setActiveCategory] = useState('Semua');
  const [apiProject, setApiProject] = useState(null);
  const [loading, setLoading] = useState(Boolean(projectSlug));

  useEffect(() => {
    if (projectSlug) {
      setLoading(true);
      publicApi.getProject(projectSlug)
        .then((data) => {
          if (data) setApiProject(data);
        })
        .catch(() => {
          // fallback to static projectsData
        })
        .finally(() => setLoading(false));
    }
  }, [projectSlug]);

  // Single Project Detail View (/proyek/:slug)
  if (projectSlug) {
    const fallbackProject = projectsData.find((p) => p.slug === projectSlug);
    const project = apiProject || fallbackProject;

    if (project) {
      const relatedProjects = projectsData.filter(
        (p) => p.id !== project.id && (p.category === project.category || p.location === project.location)
      );

      const projectWaUrl = getProjectWaUrl(project.title);
      const coverImg = project.coverImageUrl || project.thumbnail || '/projects/project_1.jpg';
      const galleryList = Array.isArray(project.gallery) && project.gallery.length > 0 
        ? project.gallery.map(g => typeof g === 'string' ? g : g.url) 
        : [coverImg];

      const renderRichTextContent = () => {
        const raw = project.description || '';
        const isHtml = /<[a-z][\s\S]*>/i.test(raw);

        if (isHtml) {
          return <div className="rich-text-block w-richtext" dangerouslySetInnerHTML={{ __html: raw }} />;
        }

        return (
          <div className="rich-text-block w-richtext">
            <p>{raw}</p>
            {project.scope && (
              <>
                <h3>Ruang Lingkup Teknis & Spesifikasi</h3>
                <p>{project.scope}</p>
              </>
            )}
            {project.process && (
              <>
                <h3>Metodologi Eksekusi & Tahapan Pengerjaan</h3>
                <p>{project.process}</p>
              </>
            )}
            {project.features && project.features.length > 0 && (
              <>
                <h3>Keunggulan & Fitur Utama Pekerjaan</h3>
                <ul role="list">
                  {project.features.map((feat, idx) => (
                    <li key={idx}>{feat}</li>
                  ))}
                </ul>
              </>
            )}
          </div>
        );
      };

      return (
        <>
          <SEOHead
            title={`${project.title} — PT Arsi Karya Unggul`}
            description={project.seoDescription || project.description}
          />

          {/* Albion Top Cover Image (Full Width Banner) */}
          <div style={{ width: '100%', paddingTop: 'var(--header-height)', backgroundColor: '#0a0a0a', overflow: 'hidden' }}>
            <img 
              src={coverImg} 
              alt={project.title} 
              style={{
                width: '100%',
                maxHeight: '520px',
                objectFit: 'cover',
                display: 'block',
              }}
            />
          </div>

          <section className="section-padding" style={{ backgroundColor: 'var(--color-neutral-0)', paddingTop: '48px' }}>
            <div className="container" style={{ maxWidth: '980px' }}>
              
              {/* Top Back Navigation */}
              <Link 
                to="/proyek" 
                style={{ 
                  display: 'inline-flex', 
                  alignItems: 'center', 
                  gap: '8px', 
                  marginBottom: '24px', 
                  color: 'var(--color-primary-300)', 
                  fontWeight: 700, 
                  fontSize: '0.9rem',
                  textDecoration: 'none'
                }}
              >
                ← Kembali ke Proyek
              </Link>

              {/* Title Header */}
              <div style={{ marginBottom: '32px' }}>
                <h1 
                  style={{ 
                    fontSize: 'clamp(2.2rem, 4vw, 3.2rem)', 
                    fontWeight: 800, 
                    color: 'var(--color-neutral-700)', 
                    lineHeight: 1.12, 
                    marginTop: '8px',
                    letterSpacing: '-0.02em' 
                  }}
                >
                  {project.title}
                </h1>
              </div>

              {/* Project Specification Metadata Panel */}
              <div 
                style={{ 
                  display: 'grid', 
                  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
                  gap: '24px', 
                  backgroundColor: 'var(--color-neutral-50)', 
                  padding: '28px 32px', 
                  borderRadius: 'var(--radius-card)', 
                  border: '1px solid var(--color-neutral-200)',
                  marginBottom: '48px'
                }}
              >
                <div>
                  <span style={{ fontSize: '0.8rem', color: 'var(--color-neutral-400)', textTransform: 'uppercase', fontWeight: 700, letterSpacing: '0.05em' }}>Jenis Proyek</span>
                  <div style={{ fontSize: '0.975rem', fontWeight: 700, color: 'var(--color-neutral-700)', marginTop: '4px' }}>{project.category || '-'}</div>
                </div>

                <div>
                  <span style={{ fontSize: '0.8rem', color: 'var(--color-neutral-400)', textTransform: 'uppercase', fontWeight: 700, letterSpacing: '0.05em' }}>Lokasi</span>
                  <div style={{ fontSize: '0.975rem', fontWeight: 700, color: 'var(--color-neutral-700)', marginTop: '4px' }}>{project.location || '-'}</div>
                </div>

                <div>
                  <span style={{ fontSize: '0.8rem', color: 'var(--color-neutral-400)', textTransform: 'uppercase', fontWeight: 700, letterSpacing: '0.05em' }}>Tahun</span>
                  <div style={{ fontSize: '0.975rem', fontWeight: 700, color: 'var(--color-neutral-700)', marginTop: '4px' }}>{project.year || '-'}</div>
                </div>

                <div>
                  <span style={{ fontSize: '0.8rem', color: 'var(--color-neutral-400)', textTransform: 'uppercase', fontWeight: 700, letterSpacing: '0.05em' }}>Pemberi Kerja / Klien</span>
                  <div style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--color-neutral-700)', marginTop: '4px' }}>
                    {project.clientContext || project.companyListed || project.company || 'PT Arsi Karya Unggul'}
                  </div>
                </div>

                {(project.arsiKaryaRole || project.roleDisclosure) && (
                  <div style={{ gridColumn: '1 / -1', borderTop: '1px solid var(--color-neutral-200)', paddingTop: '16px', marginTop: '4px' }}>
                    <span style={{ fontSize: '0.8rem', color: 'var(--color-primary-300)', textTransform: 'uppercase', fontWeight: 800, letterSpacing: '0.05em' }}>Peran Resmi Arsi Karya</span>
                    <div style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--color-neutral-700)', marginTop: '4px' }}>
                      {project.arsiKaryaRole || project.roleDisclosure}
                    </div>
                  </div>
                )}
              </div>

              {/* Rich Text Editorial Block (Albion WYSIWYG Content) */}
              {renderRichTextContent()}

              {/* Gallery Component */}
              {galleryList.length > 0 && (
                <div style={{ marginTop: '48px', marginBottom: '60px' }}>
                  <Gallery images={galleryList} title="Dokumentasi Visual & Foto Lapangan" />
                </div>
              )}

              {/* Related Projects */}
              {relatedProjects.length > 0 && (
                <div style={{ marginTop: '64px', borderTop: '1px solid var(--color-neutral-200)', paddingTop: '48px' }}>
                  <SectionTag>PORTOFOLIO TERKAIT</SectionTag>
                  <h2 style={{ marginBottom: '28px', fontSize: '1.8rem' }}>Proyek Lainnya</h2>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '24px' }}>
                    {relatedProjects.slice(0, 3).map((rp) => (
                      <Link key={rp.id} to={`/proyek/${rp.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                        <div 
                          style={{ 
                            backgroundColor: 'var(--color-neutral-50)', 
                            padding: '24px', 
                            borderRadius: 'var(--radius-card)', 
                            border: '1px solid var(--color-neutral-200)',
                            height: '100%',
                            transition: 'transform 0.2s ease, border-color 0.2s ease'
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.borderColor = 'var(--color-primary-300)';
                            e.currentTarget.style.transform = 'translateY(-3px)';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.borderColor = 'var(--color-neutral-200)';
                            e.currentTarget.style.transform = 'translateY(0)';
                          }}
                        >
                          <span style={{ fontSize: '0.8rem', color: 'var(--color-primary-300)', fontWeight: 700, textTransform: 'uppercase' }}>{rp.category}</span>
                          <h4 style={{ fontSize: '1.05rem', margin: '8px 0 6px', fontWeight: 700, lineHeight: 1.3 }}>{rp.title}</h4>
                          <span style={{ fontSize: '0.825rem', color: 'var(--color-neutral-400)' }}>{rp.location} • {rp.year}</span>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

            </div>
          </section>

          {/* Albion CTA Banner Section at bottom */}
          <CTA />
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

      <HeroBanner
        bgImage="/projects/project_1.jpg"
        overlayOpacity={0.65}
        tag="PORTOFOLIO PROYEK"
        title="Rekam Jejak Pekerjaan"
        subtitle="Pengalaman proyek nyata dengan keterbukaan entitas pelaksana dan penanganan mutu profesional."
      />

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

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '32px' }}>
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
                    <img 
                      src={proj.thumbnail} 
                      alt={proj.title} 
                      onError={(e) => { e.currentTarget.src = '/projects/project_1.jpg'; }}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                    />
                  </div>
                  <div style={{ padding: '24px' }}>
                    <div style={{ fontSize: '0.8rem', color: 'var(--color-primary-300)', fontWeight: 700, textTransform: 'uppercase', marginBottom: '6px' }}>
                      {proj.category} • {proj.year}
                    </div>
                    <h2 style={{ fontSize: '1.25rem', marginBottom: '12px', lineHeight: 1.3 }}>{proj.title}</h2>
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
