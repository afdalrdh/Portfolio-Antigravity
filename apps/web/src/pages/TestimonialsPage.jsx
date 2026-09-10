import React, { useState } from 'react';
import SectionTag from '../components/ui/SectionTag';
import SEOHead from '../components/ui/SEOHead';
import Button from '../components/ui/Button';
import { publishedTestimonials, submitTestimonialLocal } from '../data/testimonialsData';

export default function TestimonialsPage() {
  const [formData, setFormData] = useState({
    name: '',
    project: '',
    rating: 5,
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    submitTestimonialLocal(formData);
    setSubmitted(true);
  };

  return (
    <>
      <SEOHead
        title="Testimoni Klien & Ulasan — PT Arsi Karya Unggul"
        description="Ulasan pengalaman klien dan mitra dalam bekerjasama dengan PT Arsi Karya Unggul."
      />

      <section style={{ backgroundColor: 'var(--color-neutral-700)', color: '#ffffff', paddingTop: 'calc(var(--header-height) + 60px)', paddingBottom: '80px' }}>
        <div className="container">
          <SectionTag light>TESTIMONI KLIEN</SectionTag>
          <h1 style={{ color: '#ffffff', fontSize: 'clamp(2.2rem, 4.5vw, 3.8rem)', marginBottom: '16px' }}>
            Pengalaman Bekerjasama
          </h1>
          <p style={{ fontSize: '1.15rem', color: 'var(--color-primary-200)', maxWidth: '680px' }}>
            Transparansi ulasan dan integritas tinggi dalam setiap pengerjaan proyek konstruksi.
          </p>
        </div>
      </section>

      <section className="section-padding" style={{ backgroundColor: 'var(--color-neutral-0)' }}>
        <div className="container">
          {publishedTestimonials.length > 0 ? (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '32px' }}>
              {publishedTestimonials.map((t) => (
                <div key={t.id} style={{ padding: '32px', backgroundColor: 'var(--color-neutral-50)', borderRadius: '8px', border: '1px solid var(--color-neutral-200)' }}>
                  <p style={{ fontStyle: 'italic', fontSize: '1rem', marginBottom: '20px' }}>"{t.quote}"</p>
                  <strong>{t.clientName}</strong>
                  <div style={{ fontSize: '0.85rem', color: 'var(--color-neutral-400)' }}>{t.projectTitle}</div>
                </div>
              ))}
            </div>
          ) : (
            <div style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto 60px auto' }}>
              <h2>Komitmen Kepuasan Klien</h2>
              <p style={{ color: 'var(--color-neutral-400)', marginTop: '12px', lineHeight: 1.6 }}>
                Halaman ulasan ini diperbarui secara berkala berdasarkan kiriman ulasan resmi klien yang telah menyelesaikan serah terima proyek (BAST).
              </p>
            </div>
          )}

          {/* Review Submission Form */}
          <div style={{ maxWidth: '640px', margin: '0 auto', backgroundColor: 'var(--color-neutral-50)', padding: '40px', borderRadius: 'var(--radius-card)', border: '1px solid var(--color-neutral-200)' }}>
            <h3 style={{ fontSize: '1.35rem', marginBottom: '12px' }}>Formulir Pengalaman Bekerjasama</h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--color-neutral-400)', marginBottom: '28px' }}>
              Pernah menggunakan jasa konstruksi atau Design & Build PT Arsi Karya Unggul? Bagikan pengalaman Anda di bawah ini:
            </p>

            {submitted ? (
              <div style={{ backgroundColor: 'var(--color-primary-100)', color: 'var(--color-primary-400)', padding: '20px', borderRadius: '6px', textAlign: 'center' }}>
                <strong>Terima kasih atas ulasan Anda!</strong><br />
                Pesan Anda telah dikirim dan akan melalui verifikasi tim sebelum ditampilkan secara publik.
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: 600, marginBottom: '6px' }}>Nama Lengkap / Instansi *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    style={{ width: '100%', padding: '12px 16px', borderRadius: '6px', border: '1px solid var(--color-neutral-200)', fontSize: '0.95rem' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: 600, marginBottom: '6px' }}>Nama Proyek / Pekerjaan *</label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: Renovasi Rumah / Pekerjaan Fasad"
                    value={formData.project}
                    onChange={(e) => setFormData({ ...formData, project: e.target.value })}
                    style={{ width: '100%', padding: '12px 16px', borderRadius: '6px', border: '1px solid var(--color-neutral-200)', fontSize: '0.95rem' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: 600, marginBottom: '6px' }}>Ulasan / Pengalaman Bekerjasama *</label>
                  <textarea
                    required
                    rows="4"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    style={{ width: '100%', padding: '12px 16px', borderRadius: '6px', border: '1px solid var(--color-neutral-200)', fontSize: '0.95rem', fontFamily: 'inherit' }}
                  ></textarea>
                </div>

                <Button type="submit" variant="primary" style={{ marginTop: '8px' }}>
                  Kirim Ulasan Resmi
                </Button>
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
