import React, { useState } from 'react';
import SectionTag from '../components/ui/SectionTag';
import SEOHead from '../components/ui/SEOHead';
import Button from '../components/ui/Button';
import { FaWhatsapp, FaEnvelope, FaMapMarkerAlt, FaInstagram } from 'react-icons/fa';

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

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

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

    setSubmitted(true);

    // Open WhatsApp in new tab
    window.open(waUrl, '_blank');
  };

  return (
    <>
      <SEOHead
        title="Kontak & Konsultasi Gratis — PT Arsi Karya Unggul"
        description="Hubungi tim PT Arsi Karya Unggul untuk konsultasi gratis rencana pembangunan rumah, kontraktor umum, design & build, dan fabrikasi di Bandung."
      />

      <section style={{ backgroundColor: 'var(--color-neutral-700)', color: '#ffffff', paddingTop: 'calc(var(--header-height) + 60px)', paddingBottom: '80px' }}>
        <div className="container">
          <SectionTag light>HUBUNGI KAMI</SectionTag>
          <h1 style={{ color: '#ffffff', fontSize: 'clamp(2.2rem, 4.5vw, 3.8rem)', marginBottom: '16px' }}>
            Konsultasi Proyek Anda
          </h1>
          <p style={{ fontSize: '1.15rem', color: 'var(--color-primary-200)', maxWidth: '680px' }}>
            Tim teknis PT Arsi Karya Unggul siap mendiskusikan kebutuhan rencana pembangunan Anda secara transparan.
          </p>
        </div>
      </section>

      <section className="section-padding" style={{ backgroundColor: 'var(--color-neutral-0)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '48px' }}>
            {/* Left Column: Direct Channels */}
            <div>
              <SectionTag>KONTAK KAMI</SectionTag>
              <h2>Informasi & Alamat Kantor</h2>
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
                    <a href="https://wa.me/628997932802" target="_blank" rel="noopener noreferrer" style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--color-neutral-700)' }}>
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
            </div>

            {/* Right Column: Multi-Field Consultation Form */}
            <div style={{ backgroundColor: 'var(--color-neutral-50)', padding: '40px', borderRadius: 'var(--radius-card)', border: '1px solid var(--color-neutral-200)' }}>
              <h3 style={{ fontSize: '1.35rem', marginBottom: '8px' }}>Formulir Konsultasi Gratis</h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--color-neutral-400)', marginBottom: '24px' }}>
                Lengkapi rincian proyek di bawah ini untuk terhubung langsung dengan tim kami via WhatsApp.
              </p>

              {submitted && (
                <div style={{ backgroundColor: 'var(--color-primary-100)', color: 'var(--color-primary-400)', padding: '16px', borderRadius: '6px', marginBottom: '20px', fontSize: '0.9rem' }}>
                  Formulir telah dikirim dan aplikasi WhatsApp Anda akan terbuka secara otomatis.
                </div>
              )}

              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, marginBottom: '6px' }}>Nama Lengkap *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    style={{ width: '100%', padding: '12px 14px', borderRadius: '6px', border: '1px solid var(--color-neutral-200)', fontSize: '0.9rem' }}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, marginBottom: '6px' }}>Nomor WhatsApp *</label>
                    <input
                      type="tel"
                      required
                      placeholder="0812xxxx"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      style={{ width: '100%', padding: '12px 14px', borderRadius: '6px', border: '1px solid var(--color-neutral-200)', fontSize: '0.9rem' }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, marginBottom: '6px' }}>Email (Opsional)</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      style={{ width: '100%', padding: '12px 14px', borderRadius: '6px', border: '1px solid var(--color-neutral-200)', fontSize: '0.9rem' }}
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, marginBottom: '6px' }}>Layanan Yang Dibutuhkan *</label>
                    <select
                      value={formData.service}
                      onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                      style={{ width: '100%', padding: '12px 14px', borderRadius: '6px', border: '1px solid var(--color-neutral-200)', fontSize: '0.9rem', backgroundColor: '#ffffff' }}
                    >
                      <option value="Konstruksi (General Contractor)">Konstruksi (General Contractor)</option>
                      <option value="Design & Build">Design & Build</option>
                      <option value="Fabrikasi Struktur & Prafabrikasi">Fabrikasi Struktur</option>
                      <option value="Pengadaan Barang">Pengadaan Barang</option>
                      <option value="Renovasi Rumah / Gedung">Renovasi Rumah / Gedung</option>
                      <option value="Pekerjaan Fasad ACP">Pekerjaan Fasad ACP</option>
                    </select>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, marginBottom: '6px' }}>Jenis Proyek *</label>
                    <select
                      value={formData.projectType}
                      onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                      style={{ width: '100%', padding: '12px 14px', borderRadius: '6px', border: '1px solid var(--color-neutral-200)', fontSize: '0.9rem', backgroundColor: '#ffffff' }}
                    >
                      <option value="Rumah Hunian">Rumah Hunian</option>
                      <option value="Gedung Perkantoran">Gedung Perkantoran</option>
                      <option value="Ruko / Komersial">Ruko / Komersial</option>
                      <option value="Fasilitas Publik / Instansi">Fasilitas Publik / Instansi</option>
                      <option value="Infrastruktur / Parkir">Infrastruktur / Parkir</option>
                    </select>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, marginBottom: '6px' }}>Lokasi Proyek *</label>
                    <input
                      type="text"
                      required
                      placeholder="Contoh: Bandung / Pekalongan"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      style={{ width: '100%', padding: '12px 14px', borderRadius: '6px', border: '1px solid var(--color-neutral-200)', fontSize: '0.9rem' }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, marginBottom: '6px' }}>Perkiraan Budget (Opsional)</label>
                    <input
                      type="text"
                      placeholder="Contoh: Rp 200 Juta - Rp 500 Juta"
                      value={formData.budget}
                      onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                      style={{ width: '100%', padding: '12px 14px', borderRadius: '6px', border: '1px solid var(--color-neutral-200)', fontSize: '0.9rem' }}
                    />
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, marginBottom: '6px' }}>Detail Pesan & Kebutuhan *</label>
                  <textarea
                    required
                    rows="4"
                    placeholder="Jelaskan kebutuhan pembangunan atau pertanyaan Anda..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    style={{ width: '100%', padding: '12px 14px', borderRadius: '6px', border: '1px solid var(--color-neutral-200)', fontSize: '0.9rem', fontFamily: 'inherit' }}
                  ></textarea>
                </div>

                <Button type="submit" variant="primary" style={{ marginTop: '8px', justifyContent: 'center' }}>
                  Kirim & Konsultasi Gratis (WhatsApp)
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
