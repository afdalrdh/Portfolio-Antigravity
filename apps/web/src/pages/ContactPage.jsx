import React, { useState } from 'react';
import SectionTag from '../components/ui/SectionTag';
import SEOHead from '../components/ui/SEOHead';
import Button from '../components/ui/Button';
import FormField from '../components/ui/FormField';
import Breadcrumb from '../components/ui/Breadcrumb';
import { FaWhatsapp, FaEnvelope, FaMapMarkerAlt, FaInstagram, FaPhoneAlt } from 'react-icons/fa';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    service: 'Design & Build',
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
    if (!formData.phone.trim()) errs.phone = 'Nomor WhatsApp wajib diisi.';
    if (!formData.location.trim()) errs.location = 'Lokasi proyek wajib diisi.';
    if (!formData.message.trim()) errs.message = 'Detail pesan wajib diisi.';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (status === 'loading' || status === 'success') return; // Prevent duplicate submission

    if (!validate()) return;

    setStatus('loading');

    setTimeout(() => {
      // Format text for WhatsApp API
      const textMsg = `Halo PT Arsi Karya Unggul, saya ingin berkonsultasi mengenai proyek pembangunan:

*Nama:* ${formData.name}
*No. WhatsApp:* ${formData.phone}
*Email:* ${formData.email || '-'}
*Layanan:* ${formData.service}
*Jenis Proyek:* ${formData.projectType}
*Lokasi Proyek:* ${formData.location}
*Perkiraan Budget:* ${formData.budget || 'Belum Ditentukan'}
*Pesan / Kebutuhan:* 
${formData.message}
`;

      const encodedMsg = encodeURIComponent(textMsg);
      const waUrl = `https://wa.me/628997932802?text=${encodedMsg}`;

      setStatus('success');
      window.open(waUrl, '_blank');
    }, 600);
  };

  const generalWaUrl = `https://wa.me/628997932802?text=${encodeURIComponent("Hallo Arsi Karya, saya ingin konsultasi mengenai rencana proyek saya.")}`;

  return (
    <>
      <SEOHead
        title="Kontak & Konsultasi Gratis — PT Arsi Karya Unggul"
        description="Hubungi tim PT Arsi Karya Unggul untuk konsultasi gratis rencana pembangunan rumah, kontraktor umum, design & build, dan fabrikasi di Bandung."
      />

      <section style={{ backgroundColor: 'var(--color-neutral-700)', color: '#ffffff', paddingTop: 'calc(var(--header-height) + 40px)', paddingBottom: '70px' }}>
        <div className="container">
          <Breadcrumb items={[{ label: 'Kontak' }]} />
          <SectionTag light>HUBUNGI KAMI</SectionTag>
          <h1 style={{ color: '#ffffff', fontSize: 'clamp(2.2rem, 4.5vw, 3.8rem)', marginBottom: '16px' }}>
            Diskusikan Rencana Proyek Anda
          </h1>
          <p style={{ fontSize: '1.15rem', color: 'var(--color-primary-200)', maxWidth: '680px' }}>
            Arsi Karya siap membahas kebutuhan proyek dari tahap awal hingga pelaksanaan.
          </p>
        </div>
      </section>

      <section className="section-padding" style={{ backgroundColor: 'var(--color-neutral-0)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '48px' }}>
            
            {/* Left Column: Direct Contact Info */}
            <div>
              <SectionTag>INFORMASI KONTAK</SectionTag>
              <h2>Kantor & Saluran Resmi</h2>
              <p style={{ marginTop: '16px', color: 'var(--color-neutral-500)', lineHeight: 1.6 }}>
                Silakan hubungi kami melalui saluran komunikasi resmi di bawah ini atau kunjungi studio kantor kami di Bandung.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', marginTop: '36px' }}>
                <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                  <div style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: 'var(--color-primary-100)', color: 'var(--color-primary-300)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.25rem', flexShrink: 0 }}>
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
                  <div style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: 'rgba(37, 211, 102, 0.1)', color: 'var(--color-whatsapp)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.25rem', flexShrink: 0 }}>
                    <FaWhatsapp />
                  </div>
                  <div>
                    <h4 style={{ fontSize: '1rem', marginBottom: '4px' }}>WhatsApp / Telepon</h4>
                    <a href={generalWaUrl} target="_blank" rel="noopener noreferrer" style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--color-neutral-700)' }}>
                      +62 899-7932-802
                    </a>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                  <div style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: 'var(--color-primary-100)', color: 'var(--color-primary-300)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.25rem', flexShrink: 0 }}>
                    <FaEnvelope />
                  </div>
                  <div>
                    <h4 style={{ fontSize: '1rem', marginBottom: '4px' }}>Email Resmi</h4>
                    <a href="mailto:arsikaryaunggul@gmail.com" style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--color-neutral-700)' }}>
                      arsikaryaunggul@gmail.com
                    </a>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                  <div style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: 'var(--color-primary-100)', color: 'var(--color-primary-300)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.25rem', flexShrink: 0 }}>
                    <FaInstagram />
                  </div>
                  <div>
                    <h4 style={{ fontSize: '1rem', marginBottom: '4px' }}>Instagram</h4>
                    <a href="https://instagram.com/arsikarya.build" target="_blank" rel="noopener noreferrer" style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--color-neutral-700)' }}>
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
                  Chat WhatsApp Direct
                </Button>
              </div>
            </div>

            {/* Right Column: Consultation Form */}
            <div style={{ backgroundColor: 'var(--color-neutral-50)', padding: '40px', borderRadius: 'var(--radius-card)', border: '1px solid var(--color-neutral-200)' }}>
              <h3 style={{ fontSize: '1.35rem', marginBottom: '8px' }}>Formulir Konsultasi Gratis</h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--color-neutral-400)', marginBottom: '24px' }}>
                Lengkapi rincian proyek di bawah ini untuk terhubung langsung dengan tim kami via WhatsApp.
              </p>

              {status === 'success' && (
                <div style={{ backgroundColor: 'var(--color-primary-100)', color: 'var(--color-primary-400)', padding: '16px', borderRadius: '6px', marginBottom: '20px', fontSize: '0.9rem' }}>
                  Formulir berhasil dikirim! Aplikasi WhatsApp Anda akan terbuka secara otomatis.
                </div>
              )}

              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                <FormField
                  label="Nama Lengkap"
                  name="name"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  error={errors.name}
                />

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <FormField
                    label="Nomor WhatsApp"
                    name="phone"
                    type="tel"
                    required
                    placeholder="0812xxxx"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    error={errors.phone}
                  />

                  <FormField
                    label="Email (Opsional)"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <FormField
                    label="Layanan Yang Dibutuhkan"
                    name="service"
                    type="select"
                    required
                    value={formData.service}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    options={[
                      'Konstruksi (General Contractor)',
                      'Design & Build',
                      'Fabrikasi Struktur & Prafabrikasi',
                      'Pengadaan Barang',
                      'Renovasi Rumah / Gedung',
                      'Pekerjaan Fasad ACP'
                    ]}
                  />

                  <FormField
                    label="Jenis Proyek"
                    name="projectType"
                    type="select"
                    required
                    value={formData.projectType}
                    onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                    options={[
                      'Rumah Hunian',
                      'Gedung Perkantoran',
                      'Ruko / Komersial',
                      'Fasilitas Publik / Instansi',
                      'Infrastruktur / Parkir'
                    ]}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <FormField
                    label="Lokasi Proyek"
                    name="location"
                    required
                    placeholder="Contoh: Bandung / Pekalongan"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    error={errors.location}
                  />

                  <FormField
                    label="Perkiraan Budget (Opsional)"
                    name="budget"
                    placeholder="Contoh: Rp 200 Juta - Rp 500 Juta"
                    value={formData.budget}
                    onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                  />
                </div>

                <FormField
                  label="Detail Pesan & Kebutuhan"
                  name="message"
                  type="textarea"
                  required
                  placeholder="Jelaskan kebutuhan pembangunan atau pertanyaan Anda..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  error={errors.message}
                />

                <Button
                  type="submit"
                  variant="primary"
                  disabled={status === 'loading' || status === 'success'}
                  style={{ marginTop: '8px', justifyContent: 'center' }}
                >
                  {status === 'loading' ? 'Mengirim...' : 'Konsultasi Gratis'}
                </Button>
              </form>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}
