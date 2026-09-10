import React, { useState, useEffect } from 'react';
import SEOHead from '../components/ui/SEOHead';
import HeroBanner from '../components/ui/HeroBanner';
import { publicApi } from '../lib/api';
import { DEFAULT_CLIENT_TESTIMONIALS } from '../data/testimonialsData';

export default function TestimonialsPage() {
  const [testimonials, setTestimonials] = useState(DEFAULT_CLIENT_TESTIMONIALS);

  useEffect(() => {
    publicApi.getTestimonials()
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setTestimonials(data);
        }
      })
      .catch(() => {
        // Fallback to DEFAULT_CLIENT_TESTIMONIALS
      });
  }, []);

  return (
    <>
      <SEOHead
        title="Testimoni Klien — PT Arsi Karya Unggul"
        description="Ulasan dan testimoni langsung pengalaman klien bekerja sama dengan PT Arsi Karya Unggul."
      />

      {/* Dark Architectural Hero Banner */}
      <HeroBanner
        bgImage="/projects/project_6.jpg"
        overlayOpacity={0.65}
        tag="TESTIMONI KLIEN"
        title="Pengalaman Bekerjasama"
        subtitle="Kepuasan dan kepercayan klien adalah tolok ukur utama keberhasilan pengerjaan proyek kami."
      />

      <section className="section-padding" style={{ backgroundColor: 'var(--color-neutral-50)' }}>
        <div className="container">
          {/* Section Header with Accent Bar */}
          <div style={{ marginBottom: '48px' }}>
            <h2
              style={{
                fontSize: 'clamp(2.2rem, 3.8vw, 3rem)',
                fontWeight: 800,
                color: 'var(--color-neutral-800)',
                lineHeight: 1.15,
                margin: '0 0 12px 0',
              }}
            >
              Testimoni Client
            </h2>
            <div
              style={{
                width: '60px',
                height: '3px',
                backgroundColor: '#c48b59',
                borderRadius: '2px',
              }}
            />
          </div>

          {/* Testimonial Cards Grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(420px, 1fr))',
              gap: '32px',
            }}
          >
            {testimonials.map((t) => (
              <div
                key={t.id}
                style={{
                  backgroundColor: '#ffffff',
                  borderRadius: '16px',
                  border: '1px solid var(--color-neutral-200)',
                  padding: '32px',
                  boxShadow: '0 4px 24px rgba(0, 0, 0, 0.04)',
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'stretch',
                  gap: '24px',
                }}
              >
                {/* Left Side: Quote, Divider, Name, Profession */}
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <p
                    style={{
                      fontSize: '0.95rem',
                      lineHeight: 1.7,
                      color: 'var(--color-neutral-600)',
                      margin: 0,
                    }}
                  >
                    {t.quote}
                  </p>

                  <div style={{ marginTop: '24px' }}>
                    <div
                      style={{
                        width: '36px',
                        height: '2px',
                        backgroundColor: '#c48b59',
                        marginBottom: '16px',
                      }}
                    />
                    <h4
                      style={{
                        fontSize: '1.15rem',
                        fontWeight: 800,
                        color: 'var(--color-neutral-800)',
                        margin: '0 0 4px 0',
                      }}
                    >
                      {t.clientName}
                    </h4>
                    <p
                      style={{
                        fontSize: '0.85rem',
                        color: 'var(--color-neutral-400)',
                        margin: 0,
                      }}
                    >
                      {t.clientRole || t.projectName || 'Klien PT Arsi Karya Unggul'}
                    </p>
                  </div>
                </div>

                {/* Right Side: Photo */}
                <div
                  style={{
                    width: '180px',
                    minWidth: '180px',
                    borderRadius: '12px',
                    overflow: 'hidden',
                    backgroundColor: 'var(--color-neutral-100)',
                  }}
                >
                  <img
                    src={t.imageUrl || '/projects/project_2.jpg'}
                    alt={t.clientName}
                    onError={(e) => {
                      e.currentTarget.src = '/projects/project_2.jpg';
                    }}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      display: 'block',
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
