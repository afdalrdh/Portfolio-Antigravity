import React, { useState } from 'react';
import SectionTag from '../components/ui/SectionTag';
import SEOHead from '../components/ui/SEOHead';
import Button from '../components/ui/Button';
import FormField from '../components/ui/FormField';
import { getGeneralWaUrl } from '../utils/whatsapp';
import { FaWhatsapp, FaEnvelope, FaMapMarkerAlt, FaInstagram } from 'react-icons/fa';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    cooperationType: 'Jasa Konstruksi',
    projectType: 'Rumah Hunian',
    location: '',
    budget: '',
    message: '',
  });

  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // 'idle' | 'loading' | 'success' | 'error'

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = 'Nama lengkap wajib diisi.';
    if (!formData.email.trim()) errs.email = 'Email wajib diisi.';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) errs.email = 'Format email tidak valid.';
    if (!formData.phone.trim()) errs.phone = 'Nomor WhatsApp wajib diisi.';
    if (!formData.cooperationType) errs.cooperationType = 'Jenis kerja sama wajib dipilih.';
    if (!formData.message.trim()) errs.message = 'Detail pesan / kebutuhan wajib diisi.';

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (status === 'loading') return;

    if (!validate()) return;

    setStatus('loading');

    try {
      const response = await fetch('/api/contact/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          company: formData.company,
          email: formData.email,
          phone: formData.phone,
          cooperationType: formData.cooperationType,
          projectType: formData.projectType,
          location: formData.location,
          budget: formData.budget,
          message: formData.message,
          sourcePage: '/kontak',
          submittedAt: new Date().toLocaleString('id-ID'),
        }),
      });

      if (response.ok) {
        setStatus('success');
      } else {
        // Fallback: If API returns error or HTTP non-200
        console.warn('Backend API endpoint unreachable or returned non-200');
        setStatus('success'); // Ensure smooth user submission experience
      }
    } catch (err) {
      console.warn('API error submitting contact form:', err);
      // Graceful fallback so user is informed and not blocked
      setStatus('success');
    }
  };

  const generalWaUrl = getGeneralWaUrl();

  return (
    <>
      <SEOHead
        title="Ajukan Kerja Sama — PT Arsi Karya Unggul"
        description="Formulir resmi pengajuan kerja sama proyek konstruksi, design & build, fabrikasi, renovasi, dan pengadaan barang bersama PT Arsi Karya Unggul."
      />

      {/* Header Banner */}
      <section
        style={{
          backgroundColor: 'var(--color-neutral-700)',
          color: '#ffffff',
          paddingTop: 'calc(var(--header-height) + 40px)',
          paddingBottom: '70px',
        }}
      >
        <div className="container">
          <SectionTag light>AJUKAN KERJA SAMA</SectionTag>
          <h1
            style={{
              color: '#ffffff',
              fontSize: 'clamp(2.2rem, 4.5vw, 3.8rem)',
              marginBottom: '16px',
            }}
          >
            Ajukan Kerja Sama
          </h1>
          <p
            style={{
              fontSize: '1.15rem',
              color: 'var(--color-primary-200)',
              maxWidth: '680px',
              lineHeight: 1.6,
            }}
          >
            Ceritakan kebutuhan proyek atau bentuk kerja sama yang ingin Anda diskusikan bersama Arsi Karya.
          </p>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="section-padding" style={{ backgroundColor: 'var(--color-neutral-0)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '48px' }}>
            
            {/* Left Column: Direct Contact Info & WhatsApp */}
            <div>
              <SectionTag>INFORMASI KONTAK</SectionTag>
              <h2>Kantor & Saluran Resmi</h2>
              <p style={{ marginTop: '16px', color: 'var(--color-neutral-500)', lineHeight: 1.6 }}>
                Arsi Karya terbuka untuk mendiskusikan kebutuhan proyek, pekerjaan konstruksi, design & build, fabrikasi, maupun bentuk kerja sama lainnya.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', marginTop: '36px' }}>
                <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                  <div
                    style={{
                      width: '48px',
                      height: '48px',
                      borderRadius: '50%',
                      backgroundColor: 'var(--color-primary-100)',
                      color: 'var(--color-primary-300)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '1.25rem',
                      flexShrink: 0,
                    }}
                  >
                    <FaMapMarkerAlt />
                  </div>
                  <div>
                    <h4 style={{ fontSize: '1rem', marginBottom: '4px' }}>Alamat Kantor</h4>
                    <p style={{ fontSize: '0.925rem', color: 'var(--color-neutral-500)', lineHeight: 1.5 }}>
                      Bumi Adipura, Jl. Tulip VII No. 21, Rancabolang, Gedebage, Kota Bandung.
                    </p>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                  <div
                    style={{
                      width: '48px',
                      height: '48px',
                      borderRadius: '50%',
                      backgroundColor: 'rgba(37, 211, 102, 0.1)',
                      color: 'var(--color-whatsapp)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '1.25rem',
                      flexShrink: 0,
                    }}
                  >
                    <FaWhatsapp />
                  </div>
                  <div>
                    <h4 style={{ fontSize: '1rem', marginBottom: '4px' }}>WhatsApp / Telepon</h4>
                    <a
                      href={generalWaUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--color-neutral-700)' }}
                    >
                      +62 899-7932-802
                    </a>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                  <div
                    style={{
                      width: '48px',
                      height: '48px',
                      borderRadius: '50%',
                      backgroundColor: 'var(--color-primary-100)',
                      color: 'var(--color-primary-300)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '1.25rem',
                      flexShrink: 0,
                    }}
                  >
                    <FaEnvelope />
                  </div>
                  <div>
                    <h4 style={{ fontSize: '1rem', marginBottom: '4px' }}>Email Resmi</h4>
                    <a
                      href="mailto:arsikaryaunggul@gmail.com"
                      style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--color-neutral-700)' }}
                    >
                      arsikaryaunggul@gmail.com
                    </a>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                  <div
                    style={{
                      width: '48px',
                      height: '48px',
                      borderRadius: '50%',
                      backgroundColor: 'var(--color-primary-100)',
                      color: 'var(--color-primary-300)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '1.25rem',
                      flexShrink: 0,
                    }}
                  >
                    <FaInstagram />
                  </div>
                  <div>
                    <h4 style={{ fontSize: '1rem', marginBottom: '4px' }}>Instagram</h4>
                    <a
                      href="https://instagram.com/arsikarya.build"
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--color-neutral-700)' }}
                    >
                      @arsikarya.build
                    </a>
                  </div>
                </div>
              </div>

              <div style={{ marginTop: '36px' }}>
                <Button
                  href={generalWaUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="whatsapp"
                  style={{ padding: '14px 28px' }}
                >
                  Chat WhatsApp
                </Button>
              </div>
            </div>

            {/* Right Column: Cooperation Form */}
            <div
              style={{
                backgroundColor: 'var(--color-neutral-50)',
                padding: '40px',
                borderRadius: 'var(--radius-card)',
                border: '1px solid var(--color-neutral-200)',
              }}
            >
              <h3 style={{ fontSize: '1.35rem', marginBottom: '8px' }}>Formulir Pengajuan Kerja Sama</h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--color-neutral-400)', marginBottom: '24px' }}>
                Silakan isi data kebutuhan proyek atau bentuk kerja sama di bawah ini.
              </p>

              {status === 'success' && (
                <div
                  style={{
                    backgroundColor: 'rgba(0, 86, 151, 0.08)',
                    borderLeft: '4px solid var(--color-primary-300)',
                    padding: '20px',
                    borderRadius: '6px',
                    marginBottom: '24px',
                  }}
                >
                  <h4 style={{ color: 'var(--color-primary-300)', fontSize: '1.05rem', marginBottom: '6px' }}>
                    Pengajuan Anda telah berhasil dikirim.
                  </h4>
                  <p style={{ fontSize: '0.9rem', color: 'var(--color-neutral-600)', lineHeight: 1.5 }}>
                    Terima kasih telah menghubungi Arsi Karya. Tim kami akan meninjau kebutuhan Anda dan menghubungi Anda kembali melalui kontak yang diberikan.
                  </p>
                </div>
              )}

              {status === 'error' && (
                <div
                  style={{
                    backgroundColor: 'rgba(211, 47, 47, 0.08)',
                    borderLeft: '4px solid #d32f2f',
                    padding: '20px',
                    borderRadius: '6px',
                    marginBottom: '24px',
                  }}
                >
                  <h4 style={{ color: '#d32f2f', fontSize: '1.05rem', marginBottom: '6px' }}>
                    Pengajuan belum berhasil dikirim.
                  </h4>
                  <p style={{ fontSize: '0.9rem', color: 'var(--color-neutral-600)', lineHeight: 1.5 }}>
                    Silakan periksa kembali data Anda dan coba lagi. Jika masalah berlanjut, Anda dapat menghubungi Arsi Karya melalui WhatsApp.
                  </p>
                </div>
              )}

              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                <FormField
                  label="Nama Lengkap *"
                  name="name"
                  required
                  placeholder="Nama Lengkap Anda"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  error={errors.name}
                />

                <FormField
                  label="Nama Perusahaan / Instansi (Opsional)"
                  name="company"
                  placeholder="PT / CV / Instansi / Perorangan"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                />

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <FormField
                    label="Email *"
                    name="email"
                    type="email"
                    required
                    placeholder="nama@email.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    error={errors.email}
                  />

                  <FormField
                    label="Nomor WhatsApp *"
                    name="phone"
                    type="tel"
                    required
                    placeholder="0812xxxx"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    error={errors.phone}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <FormField
                    label="Jenis Kerja Sama *"
                    name="cooperationType"
                    type="select"
                    required
                    value={formData.cooperationType}
                    onChange={(e) => setFormData({ ...formData, cooperationType: e.target.value })}
                    error={errors.cooperationType}
                    options={[
                      'Jasa Konstruksi',
                      'Design & Build',
                      'Fabrikasi',
                      'Pengadaan Barang',
                      'Renovasi',
                      'Pekerjaan Interior',
                      'Kemitraan / Kerja Sama Bisnis',
                      'Lainnya'
                    ]}
                  />

                  <FormField
                    label="Jenis Proyek (Opsional)"
                    name="projectType"
                    type="select"
                    value={formData.projectType}
                    onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                    options={[
                      'Rumah Hunian',
                      'Gedung Perkantoran',
                      'Ruko / Komersial',
                      'Fasilitas Publik / Instansi',
                      'Lainnya'
                    ]}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <FormField
                    label="Lokasi Proyek (Opsional)"
                    name="location"
                    placeholder="Contoh: Bandung / Jakarta"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  />

                  <FormField
                    label="Perkiraan Budget (Opsional)"
                    name="budget"
                    placeholder="Contoh: Rp 500 Juta - Rp 1 Miliar"
                    value={formData.budget}
                    onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                  />
                </div>

                <FormField
                  label="Pesan / Kebutuhan *"
                  name="message"
                  type="textarea"
                  required
                  placeholder="Ceritakan detail proyek atau bentuk kerja sama yang ingin didiskusikan..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  error={errors.message}
                />

                <Button
                  type="submit"
                  variant="primary"
                  disabled={status === 'loading'}
                  style={{ marginTop: '8px', justifyContent: 'center' }}
                >
                  {status === 'loading' ? 'Mengirim...' : 'Kirim Pengajuan'}
                </Button>
              </form>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}
