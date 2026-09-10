import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiCheck, FiX, FiLayers, FiCompass, FiCpu, FiPackage } from 'react-icons/fi';
import Button from './ui/Button';

export default function Services() {
  const darkHeroBg = "https://assets-global.website-files.com/6175e5f51349efa3b3120baa/618080f4f9f6974e44e99f07_services_hero.jpg";

  const galleryImages = [
    { url: "https://assets-global.website-files.com/6175e5f51349efa3b3120baa/617b347a79be8351ce06894c_gallery_2.jpg", alt: "Construction site 1" },
    { url: "https://assets-global.website-files.com/6175e5f51349efa3b3120baa/618083a2bd13460b57e750dd_gallery_1.jpg", alt: "Construction site 2" },
    { url: "https://assets-global.website-files.com/6175e5f51349efa3b3120baa/618083d0bf813a48e78a632e_gallery_3.jpg", alt: "Construction site 3" },
  ];

  const servicesList = [
    {
      num: '01',
      title: 'Konstruksi (General Contractor)',
      desc: 'Pekerjaan kontraktor umum untuk bangunan rumah, kantor, dan fasilitas umum dengan alur terstruktur.',
      fullDesc: 'Jasa kontraktor umum profesional mengelola persiapan lahan, fondasi, struktur beton/baja, hingga finishing akhir.',
      icon: <FiLayers style={{ fontSize: '1.4rem', color: '#1e293b' }} />,
      features: ['Struktur Beton Bertulang', 'Instalasi Listrik & Sanitari', 'Pengawasan QC Lapangan'],
      slug: 'konstruksi',
    },
    {
      num: '02',
      title: 'Design & Build',
      desc: 'Layanan terpadu perencanaan Arsitektur, Desain Interior, dan Infrastruktur dalam satu pintu.',
      fullDesc: 'Integrasi penuh antara perancangan gambar arsitektur dan pelaksanaan fisik lapangan untuk efisiensi budget.',
      icon: <FiCompass style={{ fontSize: '1.4rem', color: '#1e293b' }} />,
      features: ['Desain 3D Visualisasi', 'Gambar Kerja Detail', 'Satu Penanggung Jawab Penuh'],
      slug: 'design-build',
    },
    {
      num: '03',
      title: 'Fabrikasi Struktur',
      desc: 'Workshop fabrikasi komponen baja, kanopi, pagar arsitektural, dan prafabrikasi presisi.',
      fullDesc: 'Pembuatan komponen struktur baja presisi di workshop pabrikasi siap rakit di lokasi proyek.',
      icon: <FiCpu style={{ fontSize: '1.4rem', color: '#1e293b' }} />,
      features: ['Fabrikasi Rangka Baja', 'Komponen Prafabrikasi', 'Coating Anti-Karat'],
      slug: 'fabrikasi',
    },
    {
      num: '04',
      title: 'Pengadaan Barang',
      desc: 'Penyediaan material konstruksi dan perlengkapan proyek berstandar spesifikasi verified.',
      fullDesc: 'Pengadaan material bangunan berkualitas tinggi untuk proyek instansi pemerintah dan swasta.',
      icon: <FiPackage style={{ fontSize: '1.4rem', color: '#1e293b' }} />,
      features: ['Suplai Material Verified', 'Sertifikasi Pabrikan', 'Pengiriman On-Time'],
      slug: 'pengadaan-barang',
    },
  ];

  const [selectedService, setSelectedService] = useState(null);

  return (
    <section id="services" style={{ backgroundColor: '#ffffff' }}>
      {/* 1. Dark Hero Section */}
      <div
        style={{
          position: 'relative',
          minHeight: '480px',
          backgroundColor: '#0c1015',
          color: '#ffffff',
          display: 'flex',
          alignItems: 'center',
          overflow: 'hidden',
          padding: '100px 0',
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `url(${darkHeroBg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: 0.35,
            zIndex: 1,
          }}
        />

        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(180deg, rgba(12, 16, 21, 0.4) 0%, rgba(12, 16, 21, 0.85) 100%)',
            zIndex: 2,
          }}
        />

        <div className="container" style={{ position: 'relative', zIndex: 10 }}>
          <div style={{ maxWidth: '720px' }}>
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <span className="section-tag section-tag-light">SERVICES</span>

              <h2
                style={{
                  fontSize: 'clamp(2.4rem, 4vw, 3.5rem)',
                  fontWeight: 800,
                  color: '#ffffff',
                  lineHeight: 1.1,
                  marginBottom: '24px',
                }}
              >
                We know how to deliver your vision
              </h2>

              <p
                style={{
                  fontSize: '1.05rem',
                  color: '#cbd5e1',
                  lineHeight: 1.7,
                  marginBottom: '36px',
                }}
              >
                PT Arsi Karya Unggul menghadirkan layanan konstruksi terpadu dengan eksekusi amanah dan profesional di Bandung.
              </p>

              <Button to="/layanan" variant="primary">
                Our Services
              </Button>
            </motion.div>
          </div>
        </div>
      </div>

      {/* 2. 3-Photo Showcase Bar */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '16px',
          padding: '0 16px',
        }}
      >
        {galleryImages.map((img, idx) => (
          <div
            key={idx}
            style={{
              height: '340px',
              overflow: 'hidden',
              borderRadius: '4px',
            }}
          >
            <img
              src={img.url}
              alt={img.alt}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                transition: 'transform 0.5s ease',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.06)')}
              onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
            />
          </div>
        ))}
      </div>

      {/* 3. 4-Column Services Grid with Static Square Icon Badges */}
      <div id="services-list" style={{ backgroundColor: '#ffffff', color: 'var(--color-text-main)', padding: '100px 0' }}>
        <div className="container">
          <div style={{ maxWidth: '720px', marginBottom: '60px' }}>
            <span className="section-tag">OUR EXPERTISE</span>

            <h2
              style={{
                fontSize: 'clamp(2.2rem, 3.8vw, 3rem)',
                fontWeight: 800,
                color: 'var(--color-text-main)',
                lineHeight: 1.12,
              }}
            >
              We construct spaces where amazing things happen
            </h2>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: '40px',
            }}
          >
            {servicesList.map((service, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                viewport={{ once: true }}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  cursor: 'pointer',
                }}
                onClick={() => setSelectedService(service)}
              >
                {/* Static Square Icon Badge */}
                <div
                  style={{
                    width: '48px',
                    height: '48px',
                    backgroundColor: '#f0f4f8',
                    borderRadius: '4px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '24px',
                  }}
                >
                  {service.icon}
                </div>

                <h3
                  style={{
                    fontSize: '1.25rem',
                    fontWeight: 700,
                    marginBottom: '12px',
                    color: 'var(--color-text-main)',
                    lineHeight: 1.25,
                  }}
                >
                  {service.title}
                </h3>

                <p
                  style={{
                    fontSize: '0.95rem',
                    color: 'var(--color-text-muted)',
                    lineHeight: 1.6,
                  }}
                >
                  {service.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Service Detail Modal */}
      <AnimatePresence>
        {selectedService && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'fixed',
              inset: 0,
              backgroundColor: 'rgba(12, 16, 21, 0.8)',
              backdropFilter: 'blur(6px)',
              zIndex: 2000,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '24px',
            }}
            onClick={() => setSelectedService(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                backgroundColor: '#ffffff',
                color: 'var(--color-text-main)',
                borderRadius: '8px',
                maxWidth: '600px',
                width: '100%',
                padding: '40px',
                position: 'relative',
                boxShadow: '0 25px 50px rgba(0,0,0,0.3)',
              }}
            >
              <button
                onClick={() => setSelectedService(null)}
                style={{
                  position: 'absolute',
                  top: '20px',
                  right: '20px',
                  fontSize: '1.4rem',
                  color: 'var(--color-text-main)',
                }}
              >
                <FiX />
              </button>

              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                <div style={{ width: '40px', height: '40px', backgroundColor: '#f0f4f8', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {selectedService.icon}
                </div>
                <span style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--color-primary-300)' }}>
                  SERVICE {selectedService.num}
                </span>
              </div>

              <h2 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '16px' }}>{selectedService.title}</h2>
              <p style={{ color: 'var(--color-text-muted)', lineHeight: 1.7, marginBottom: '24px' }}>
                {selectedService.fullDesc}
              </p>

              <h4 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '12px' }}>Scope Utama:</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '32px' }}>
                {selectedService.features.map((f, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <FiCheck style={{ color: 'var(--color-primary-300)' }} />
                    <span style={{ fontWeight: 600, fontSize: '0.95rem' }}>{f}</span>
                  </div>
                ))}
              </div>

              <Button
                to={`/layanan/${selectedService.slug}`}
                onClick={() => setSelectedService(null)}
                variant="primary"
                style={{ width: '100%', justifyContent: 'center' }}
              >
                Lihat Detail Layanan
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
