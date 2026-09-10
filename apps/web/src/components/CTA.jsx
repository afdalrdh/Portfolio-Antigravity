import React from 'react';
import { motion } from 'framer-motion';
import Button from './ui/Button';
import { getGeneralWaUrl } from '../utils/whatsapp';

export default function CTA() {
  const ctaPhoto = "/projects/project_8.jpg";
  const generalWaUrl = getGeneralWaUrl();

  return (
    <section id="contact" style={{ backgroundColor: '#0A0A0A', padding: '0', width: '100%', overflow: 'hidden' }}>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
          gap: '0',
          width: '100%',
        }}
      >
        {/* Left Column: Full-height Industrial Construction Photo (100% Full-Bleed) */}
        <div style={{ height: '380px', position: 'relative', overflow: 'hidden' }}>
          <img
            src={ctaPhoto}
            alt="Industrial construction structure"
            onError={(e) => {
              e.currentTarget.src = 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=1200&auto=format&fit=crop';
            }}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              display: 'block',
            }}
          />
        </div>

        {/* Right Column: Brand Blue Accent Block (Full-Bleed matching Albion Reference) */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          style={{
            backgroundColor: 'var(--color-primary-300)',
            color: '#ffffff',
            padding: 'clamp(48px, 6vw, 80px)',
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
              letterSpacing: '-0.5px',
            }}
          >
            Ready to work together?
          </h2>

          <Button
            href={generalWaUrl}
            target="_blank"
            rel="noopener noreferrer"
            variant="outline-light"
            showArrow={true}
            style={{ padding: '16px 36px', fontSize: '1rem' }}
          >
            Konsultasi Gratis
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
