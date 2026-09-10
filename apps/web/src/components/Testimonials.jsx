import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

export default function Testimonials() {
  const bgImg = "https://assets-global.website-files.com/6175e5f51349efa3b3120baa/617c967a42c0beed800a8b23_contact.jpg";

  const testimonials = [
    {
      quote: "Ullamcorper auctor a, integer arcu ullamcorper ultrices. Pretium gravida nunc morbi etiam. Accumsan mauris, etiam rhoncus nulla id porta. In ullamcorper ut massa augue netus. Nunc at consequat.",
      author: "REGINALD WEBB",
      company: "Grand Carrefour Health",
    },
    {
      quote: "Albion delivered our complex elementary school project two months ahead of schedule without a single compromise on build quality or safety compliance. Truly exceptional partners.",
      author: "SARAH JENKINS",
      company: "Cinder Dell District",
    },
    {
      quote: "Their virtual design & construction BIM workflow saved our commercial office tower over $400k in potential rework costs. I recommend them unequivocally.",
      author: "DAVID STERLING",
      company: "Sterling Development Group",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <section
      style={{
        position: 'relative',
        minHeight: '520px',
        width: '100%',
        backgroundColor: '#0c1015',
        color: '#ffffff',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
      }}
    >
      {/* Background Image Overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `url(${bgImg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.45,
          zIndex: 1,
        }}
      />

      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(90deg, rgba(12, 16, 21, 0.85) 0%, rgba(12, 16, 21, 0.5) 100%)',
          zIndex: 2,
        }}
      />

      <div className="container" style={{ position: 'relative', zIndex: 10, padding: '100px 24px' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '60px',
            alignItems: 'center',
          }}
        >
          {/* Empty Left Column to push content right like reference screenshot */}
          <div style={{ display: 'none' }} className="desktop-spacer" />

          {/* Right Column Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            style={{ maxWidth: '620px', marginLeft: 'auto' }}
          >
            <span className="section-tag section-tag-light">TESTIMONIALS</span>

            <h2
              style={{
                fontSize: 'clamp(2.4rem, 4vw, 3.5rem)',
                fontWeight: 800,
                color: '#ffffff',
                lineHeight: 1.1,
                marginBottom: '32px',
              }}
            >
              What our clients say
            </h2>

            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4 }}
              >
                <p
                  style={{
                    fontSize: 'clamp(1.1rem, 2vw, 1.25rem)',
                    lineHeight: 1.6,
                    color: '#e2e8f0',
                    marginBottom: '28px',
                    fontWeight: 400,
                  }}
                >
                  "{testimonials[currentIndex].quote}"
                </p>

                <div>
                  <h4 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#ffffff', letterSpacing: '0.05em' }}>
                    {testimonials[currentIndex].author}
                  </h4>
                  <p style={{ fontSize: '0.9rem', color: '#94a3b8', fontWeight: 500 }}>
                    {testimonials[currentIndex].company}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Slide Arrows */}
            <div style={{ display: 'flex', gap: '12px', marginTop: '32px' }}>
              <button
                onClick={() => setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1))}
                style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '4px',
                  border: '1px solid rgba(255,255,255,0.3)',
                  backgroundColor: 'rgba(255,255,255,0.05)',
                  color: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.2rem',
                }}
              >
                <FiChevronLeft />
              </button>

              <button
                onClick={() => setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1))}
                style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '4px',
                  border: '1px solid rgba(255,255,255,0.3)',
                  backgroundColor: 'rgba(255,255,255,0.05)',
                  color: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.2rem',
                }}
              >
                <FiChevronRight />
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
