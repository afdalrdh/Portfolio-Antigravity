import React from 'react';
import { motion } from 'framer-motion';
import { FiArrowRight } from 'react-icons/fi';

export default function Standards() {
  const bgPhoto = "https://assets-global.website-files.com/6175e5f51349efa3b3120baa/6181b49dad041b569acca334_about_1.jpg";
  const fgPhoto = "https://assets-global.website-files.com/6175e5f51349efa3b3120baa/617f0115cb238076480b00d5_img_5.jpg";

  return (
    <section className="section-padding" style={{ backgroundColor: '#ffffff' }}>
      <div className="container">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '60px',
            alignItems: 'center',
          }}
        >
          {/* Left Column: Text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <span
              style={{
                display: 'inline-block',
                fontSize: '0.85rem',
                fontWeight: 700,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: 'var(--color-text-muted)',
                marginBottom: '16px',
              }}
            >
              — WHY US
            </span>

            <h2
              style={{
                fontSize: 'clamp(2.2rem, 3.8vw, 3rem)',
                fontWeight: 800,
                color: 'var(--color-text-main)',
                lineHeight: 1.12,
                marginBottom: '24px',
              }}
            >
              We conduct all business with the highest standards
            </h2>

            <p
              style={{
                fontSize: '1.05rem',
                color: 'var(--color-text-muted)',
                lineHeight: 1.7,
                marginBottom: '36px',
              }}
            >
              Phasellus at eu adipiscing orci, est cras. Sed sed pulvinar sollicitudin purus tincidunt volutpat. Duis id diam commodo eros. Turpis proin molestie ut rhoncus.
            </p>

            <a href="#about" className="btn-primary" style={{ backgroundColor: 'var(--color-dark)', borderColor: 'var(--color-dark)' }}>
              <span>LEARN MORE</span>
              <FiArrowRight />
            </a>
          </motion.div>

          {/* Right Column: Dual Overlapping Photo Composition */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            style={{ position: 'relative', paddingRight: '40px', paddingBottom: '40px' }}
          >
            {/* Main Background Photo */}
            <div
              style={{
                width: '100%',
                height: '480px',
                borderRadius: '4px',
                overflow: 'hidden',
                boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
              }}
            >
              <img
                src={bgPhoto}
                alt="Yellow construction crane structure"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>

            {/* Overlapping Floating Photo */}
            <div
              style={{
                position: 'absolute',
                bottom: '0',
                right: '0',
                width: '60%',
                height: '280px',
                borderRadius: '4px',
                overflow: 'hidden',
                border: '8px solid #ffffff',
                boxShadow: '0 20px 40px rgba(0,0,0,0.18)',
                outline: '3px solid var(--color-primary)',
              }}
            >
              <img
                src={fgPhoto}
                alt="Modern building facade"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
