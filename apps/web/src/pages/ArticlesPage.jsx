import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import SectionTag from '../components/ui/SectionTag';
import SEOHead from '../components/ui/SEOHead';
import Button from '../components/ui/Button';
import Breadcrumb from '../components/ui/Breadcrumb';
import HeroBanner from '../components/ui/HeroBanner';
import { articlesData } from '../data/articlesData';

export default function ArticlesPage() {
  const { articleSlug } = useParams();
  const [activeCat, setActiveCat] = useState('Semua');

  // Single Article Reader View (/artikel/:slug)
  if (articleSlug) {
    const article = articlesData.find((a) => a.slug === articleSlug);

    if (article) {
      return (
        <>
          <SEOHead
            title={`${article.title} — PT Arsi Karya Unggul`}
            description={article.excerpt}
          />
          {/* Dark Architectural Hero Banner */}
          <HeroBanner
            bgImage={article.thumbnail}
            overlayOpacity={0.65}
            imageAlt={article.title}
            breadcrumbItems={[{ label: 'Artikel', to: '/artikel' }]}
            tag={`${article.category} • ${article.date}`}
            title={article.title}
            subtitle={`Penulis: ${article.author} • ${article.readTime}`}
          />

          <section className="section-padding" style={{ backgroundColor: 'var(--color-neutral-0)', paddingTop: '40px' }}>
            <div className="container" style={{ maxWidth: '840px' }}>
              
              {/* Top Back Navigation */}
              <Link 
                to="/artikel" 
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
                ← Kembali ke Artikel
              </Link>

              <div style={{ height: '380px', backgroundColor: 'var(--color-neutral-200)', borderRadius: '8px', overflow: 'hidden', marginBottom: '40px' }}>
                <img src={article.thumbnail} alt={article.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>

              <div
                style={{ fontSize: '1.05rem', lineHeight: 1.8, color: 'var(--color-neutral-600)' }}
                dangerouslySetInnerHTML={{ __html: article.content }}
              />

              <div style={{ marginTop: '60px', paddingTop: '32px', borderTop: '1px solid var(--color-neutral-200)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
                <Button to="/artikel" variant="secondary">
                  Kembali ke Artikel
                </Button>
                <Button to="/kontak" variant="primary">
                  Ajukan Kerja Sama
                </Button>
              </div>
            </div>
          </section>
        </>
      );
    }
  }

  // Articles Directory View (/artikel) — TOP-LEVEL HAS NO BREADCRUMB
  const categories = ['Semua', 'Konstruksi', 'Renovasi', 'Desain', 'Material', 'Project Story'];

  const filtered = activeCat === 'Semua'
    ? articlesData
    : articlesData.filter((a) => a.category === activeCat);

  return (
    <>
      <SEOHead
        title="Artikel & Wawasan Konstruksi — PT Arsi Karya Unggul"
        description="Panduan, edukasi, dan informasi seputar renovasi rumah, jasa kontraktor, material bangunan, dan perencanaan budget."
      />

      <HeroBanner
        bgImage="/projects/project_4.jpg"
        overlayOpacity={0.65}
        tag="ARTIKEL & EDUKASI"
        title="Wawasan & Edukasi Pembangunan"
        subtitle="Informasi praktis seputar dunia konstruksi, tren arsitektur, dan tips perencanaan anggaran proyek."
      />

      <section className="section-padding" style={{ backgroundColor: 'var(--color-neutral-0)' }}>
        <div className="container">
          {/* Category Filter */}
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '48px' }}>
            {categories.map((cat, idx) => (
              <button
                key={idx}
                onClick={() => setActiveCat(cat)}
                style={{
                  padding: '10px 20px',
                  borderRadius: '30px',
                  fontSize: '0.9rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  border: activeCat === cat ? '1px solid var(--color-primary-300)' : '1px solid var(--color-neutral-200)',
                  backgroundColor: activeCat === cat ? 'var(--color-primary-300)' : '#ffffff',
                  color: activeCat === cat ? '#ffffff' : 'var(--color-neutral-600)',
                  transition: 'all 0.2s ease',
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '32px' }}>
            {filtered.map((art) => (
              <div
                key={art.id}
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
                      src={art.thumbnail} 
                      alt={art.title} 
                      onError={(e) => { e.currentTarget.src = '/projects/project_2.jpg'; }}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                    />
                  </div>
                  <div style={{ padding: '24px' }}>
                    <div style={{ fontSize: '0.8rem', color: 'var(--color-primary-300)', fontWeight: 700, textTransform: 'uppercase', marginBottom: '8px' }}>
                      {art.category} • {art.date}
                    </div>
                    <h2 style={{ fontSize: '1.2rem', marginBottom: '10px', lineHeight: 1.4 }}>{art.title}</h2>
                    <p style={{ fontSize: '0.9rem', color: 'var(--color-neutral-400)', lineHeight: 1.6 }}>{art.excerpt}</p>
                  </div>
                </div>
                <div style={{ padding: '0 24px 24px 24px' }}>
                  <Button to={`/artikel/${art.slug}`} variant="primary">
                    Baca Selengkapnya
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
