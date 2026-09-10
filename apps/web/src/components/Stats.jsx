import React from 'react';
import { motion } from 'framer-motion';
import { FiArrowUpRight } from 'react-icons/fi';

export default function Stats() {
  const statsList = [
    { value: '47', label: 'Years of experience designing and building' },
    { value: '1400+', label: 'Successfully completed projects' },
    { value: '800+', label: 'Construction and engineering experts' },
    { value: '12', label: 'Awards for excellence in construction' },
  ];

  return (
    <section
      id="about"
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
            <span className="section-tag">WHY US</span>

            <h2
              style={{
                fontSize: 'clamp(2.2rem, 3.8vw, 3rem)',
                fontWeight: 800,
                color: 'var(--color-text-main)',
                lineHeight: 1.12,
                marginBottom: '24px',
              }}
            >
              We create things that matter
            </h2>

            <p
              style={{
                fontSize: '1.05rem',
                color: 'var(--color-text-muted)',
                lineHeight: 1.7,
                marginBottom: '36px',
              }}
            >
              Arcu viverra ut quis gravida luctus. Scelerisque elit massa purus morbi pellentesque tincidunt nulla. Aliquet molestie felis consectetur cras. Sit est facilisi pharetra quisque.
            </p>

            <a href="#services" className="btn-primary">
              More About Us
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
