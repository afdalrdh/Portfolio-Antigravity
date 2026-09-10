import React from 'react';
import { motion } from 'framer-motion';

export default function CTA() {
  const ctaPhoto = "https://assets-global.website-files.com/6175e5f51349efa3b3120baa/6180970fd098625c4087481a_contact_map.jpg";

  return (
    <section id="contact" style={{ backgroundColor: '#ffffff', padding: '60px 0' }}>
      <div className="container">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '0',
            borderRadius: '4px',
            overflow: 'hidden',
            boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
          }}
        >
          {/* Left Column: Full-height Industrial Yellow Pipes Photo */}
          <div style={{ height: '380px', position: 'relative' }}>
            <img
              src={ctaPhoto}
              alt="Yellow industrial pipes structure"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
            />
          </div>

          {/* Right Column: Primary #005697 Accent Block */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            style={{
              backgroundColor: 'var(--color-primary)',
              color: '#ffffff',
              padding: 'clamp(40px, 5vw, 64px)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'flex-start',
            }}
          >
            <span className="section-tag section-tag-light">CONTACT US</span>

            <h2
              style={{
                fontSize: 'clamp(2.2rem, 3.8vw, 3.2rem)',
                fontWeight: 800,
                color: '#ffffff',
                lineHeight: 1.1,
                marginBottom: '32px',
              }}
            >
              Ready to work together?
            </h2>

            <a
              href="#contact"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#ffffff',
                color: 'var(--color-primary)',
                fontWeight: 600,
                fontSize: '0.95rem',
                padding: '14px 28px',
                borderRadius: '4px',
                transition: 'all 0.25s ease',
                textDecoration: 'none',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--color-dark)';
                e.currentTarget.style.color = '#ffffff';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#ffffff';
                e.currentTarget.style.color = 'var(--color-primary)';
              }}
            >
              View Contacts
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
