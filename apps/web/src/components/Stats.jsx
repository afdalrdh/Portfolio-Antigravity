import React from 'react';
import { motion } from 'framer-motion';
import { FiArrowUpRight } from 'react-icons/fi';
import Button from './ui/Button';

export default function Stats() {
  const statsList = [
    { value: '100%', label: 'Kontrol kualitas dan transparansi biaya' },
    { value: '9+', label: 'Proyek terverifikasi diselesaikan' },
    { value: '4', label: 'Pilar layanan utama (Konstruksi, Design & Build, Fabrikasi, Pengadaan)' },
    { value: '100%', label: 'Komitmen waktu & serah terima BAST' },
  ];

  return (
    <section
      id="stats-section"
      style={{
        backgroundColor: '#f4f6f9',
        padding: '100px 0',
        borderBottom: '1px solid var(--color-border)',
      }}
    >
      <div className="container">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '60px',
            alignItems: 'center',
          }}
        >
          {/* Left Column: 2x2 Grid of Stat Cards */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '20px',
            }}
          >
            {statsList.map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                viewport={{ once: true }}
                style={{
                  backgroundColor: '#ffffff',
                  padding: '36px 28px',
                  borderRadius: '4px',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.03)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  minHeight: '180px',
                  position: 'relative',
                  border: '1px solid var(--color-border)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                  <span
                    style={{
                      fontSize: 'clamp(2.5rem, 3.5vw, 3.2rem)',
                      fontWeight: 800,
                      color: 'var(--color-text-main)',
                      lineHeight: 1,
                    }}
                  >
                    {stat.value}
                  </span>
                  <FiArrowUpRight style={{ fontSize: '1.2rem', color: '#94a3b8' }} />
                </div>

                <p
                  style={{
                    fontSize: '0.9rem',
                    fontWeight: 500,
                    color: 'var(--color-text-muted)',
                    lineHeight: 1.4,
                    marginTop: '20px',
                  }}
                >
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Right Column: Text Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <span className="section-tag">— WHY US</span>

            <h2
              style={{
                fontSize: 'clamp(2.2rem, 3.8vw, 3rem)',
                fontWeight: 800,
                color: 'var(--color-text-main)',
                lineHeight: 1.12,
                marginBottom: '24px',
              }}
            >
              Membangun dengan proses yang terstruktur & terukur
            </h2>

            <p
              style={{
                fontSize: '1.05rem',
                color: 'var(--color-text-muted)',
                lineHeight: 1.7,
                marginBottom: '36px',
              }}
            >
              PT Arsi Karya Unggul memadukan manajemen konstruksi presisi dengan eksekusi efisien. Setiap proyek dikendalikan secara transparan untuk menghasilkan bangunan yang berkualitas dan tahan lama.
            </p>

            <Button to="/tentang-kami" variant="primary">
              More About Us
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
