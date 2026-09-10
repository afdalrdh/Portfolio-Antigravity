import React from 'react';
import { motion } from 'framer-motion';
import { FiCheckCircle, FiArrowRight } from 'react-icons/fi';

export default function About() {
  const aboutImg1 = "https://assets-global.website-files.com/6175e5f51349efa3b3120baa/6181b49dad041b569acca334_about_1.jpg";
  const aboutImg2 = "https://assets-global.website-files.com/6175e5f51349efa3b3120baa/6181bc9593b65751777cb76b_about_a4.jpg";

  const keyPoints = [
    'High Precision Architectural Engineering',
    'Sustainable & Eco-Friendly Construction Practices',
    'Uncompromising Safety Standards & Regulatory Compliance',
    'Transparent Project Timeline & On-time Delivery',
  ];

  return (
    <section id="about" className="section-padding" style={{ backgroundColor: '#ffffff', overflow: 'hidden' }}>
      <div className="container">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '60px',
            alignItems: 'center',
          }}
        >
          {/* Left Column: Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
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
                fontSize: 'clamp(2.2rem, 3.5vw, 3rem)',
                fontWeight: 800,
                color: 'var(--color-text-main)',
                marginBottom: '20px',
                lineHeight: 1.15,
              }}
            >
              We create things that matter
            </h2>

            <p
              style={{
                fontSize: '1.05rem',
                color: 'var(--color-text-muted)',
                lineHeight: 1.7,
                marginBottom: '28px',
              }}
            >
              Arcu viverra ut quis gravida luctus. Scelerisque elit massa purus morbi pellentesque tincidunt nulla. Aliquet molestie felis consectetur cras. Sit est facilisi pharetra quisque.
            </p>

            {/* Checklist */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '36px' }}>
              {keyPoints.map((pt, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <FiCheckCircle style={{ color: 'var(--color-primary)', fontSize: '1.2rem', flexShrink: 0 }} />
                  <span style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--color-text-main)' }}>
                    {pt}
                  </span>
                </div>
              ))}
            </div>

            <a href="#services" className="btn-primary">
              <span>More About Us</span>
              <FiArrowRight />
            </a>
          </motion.div>

          {/* Right Column: Visual Composite Grid */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            style={{ position: 'relative' }}
          >
            <div
              style={{
                position: 'relative',
                borderRadius: '8px',
                overflow: 'hidden',
                boxShadow: '0 20px 40px rgba(0,0,0,0.12)',
              }}
            >
              <img
                src={aboutImg1}
                alt="Construction site"
                style={{
                  width: '100%',
                  height: '460px',
                  objectFit: 'cover',
                }}
              />
            </div>

            {/* Floating Badge / Second Image */}
            <div
              style={{
                position: 'absolute',
                bottom: '-30px',
                left: '-30px',
                width: '240px',
                height: '200px',
                borderRadius: '8px',
                overflow: 'hidden',
                border: '6px solid #ffffff',
                boxShadow: '0 15px 30px rgba(0,86,151,0.2)',
                display: 'none', // Shown on desktop via media query
              }}
              className="about-secondary-img"
            >
              <img
                src={aboutImg2}
                alt="Architect planning"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>

            {/* Floating Experience Box */}
            <div
              style={{
                position: 'absolute',
                top: '30px',
                right: '-20px',
                backgroundColor: 'var(--color-primary)',
                color: '#ffffff',
                padding: '20px 24px',
                borderRadius: '6px',
                boxShadow: '0 10px 25px rgba(0,86,151,0.3)',
              }}
            >
              <span style={{ fontSize: '2.2rem', fontWeight: 800, display: 'block', lineHeight: 1 }}>100%</span>
              <span style={{ fontSize: '0.85rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Quality Guaranteed</span>
            </div>
          </motion.div>
        </div>
      </div>

      <style>{`
        @media (min-width: 768px) {
          .about-secondary-img { display: block !important; }
        }
      `}</style>
    </section>
  );
}
