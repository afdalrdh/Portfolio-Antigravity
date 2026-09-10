import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiCheck, FiX, FiSettings, FiLayers, FiCompass, FiMaximize2 } from 'react-icons/fi';

export default function Services() {
  const [selectedService, setSelectedService] = useState(null);

  const blueprintImg = "https://cdn.prod.website-files.com/6175e5f51349efa3b3120baa/617b347a79be8351ce06894c_gallery_2.jpg";

  const galleryImages = [
    {
      url: "https://cdn.prod.website-files.com/6175e5f51349efa3b3120baa/617b347a7150444c86b1ba9f_gallery_1.jpg",
      alt: "Orange crane architectural structure against blue sky",
    },
    {
      url: "https://cdn.prod.website-files.com/6175e5f51349efa3b3120baa/617b347a79be8351ce06894c_gallery_2.jpg",
      alt: "Construction worker on high rise scaffolding",
    },
    {
      url: "https://cdn.prod.website-files.com/6175e5f51349efa3b3120baa/617b347aaf53432b4dc3c71b_gallery_3.jpg",
      alt: "Welding steel beam with sparks flying",
    },
  ];

  const servicesList = [
    {
      id: 1,
      num: '01',
      icon: <FiSettings style={{ fontSize: '1.35rem', color: '#1e293b' }} />,
      title: 'Construction services',
      desc: 'Eget odio non ac mi. Porttitor diam viverra est suspendisse. Fermentum est interdum.',
      fullDesc: 'Comprehensive general contracting and construction management services tailored for modern infrastructure. We manage full building cycles from foundation to delivery with peak safety protocols.',
      features: ['Structural Steel & Concrete', 'Site Supervision & Management', 'Safety & Regulatory Compliance', 'Turnkey Delivery Guarantee'],
    },
    {
      id: 2,
      num: '02',
      icon: <FiLayers style={{ fontSize: '1.35rem', color: '#1e293b' }} />,
      title: 'Interior construction',
      desc: 'Lacus non ultrices diam, placerat eu, tincidunt pulvinar lacus. Felis dui aliquet.',
      fullDesc: 'Transforming raw interior spaces into inspiring, high-performance environments. Specializing in corporate offices, medical facilities, retail centers, and luxury residences.',
      features: ['Custom Millwork & Finishes', 'MEP Fit-out', 'Acoustical & Ceiling Solutions', 'Ergonomic Space Optimization'],
    },
    {
      id: 3,
      num: '03',
      icon: <FiCompass style={{ fontSize: '1.35rem', color: '#1e293b' }} />,
      title: 'Virtual design and construction',
      desc: 'Lacus, pretium euismod ut tempus. Enim ante fermentum eget in id ridiculus.',
      fullDesc: 'Leveraging state-of-the-art Building Information Modeling (BIM) to detect clashes before break-ground, optimize energy usage, and streamline construction scheduling.',
      features: ['4D/5D BIM Modeling', 'Clash Detection Analysis', 'Laser Scanning & Site Mapping', 'Digital Twin Maintenance'],
    },
    {
      id: 4,
      num: '04',
      icon: <FiMaximize2 style={{ fontSize: '1.35rem', color: '#1e293b' }} />,
      title: 'Preconstruction services',
      desc: 'Natoque in sed mauris, sagittis. Nec id elementum, diam varius pharetra. Ullamcorper.',
      fullDesc: 'Laying the technical foundation for cost efficiency and feasibility. We deliver detailed cost estimation, value engineering, risk assessment, and supply chain procurement strategy.',
      features: ['Detailed Cost Estimating', 'Value Engineering', 'Zoning & Permitting Assistance', 'Risk Mitigation Planning'],
    },
  ];

  return (
    <section id="services" style={{ backgroundColor: '#0c1015', color: '#ffffff' }}>
      {/* 1. Dark Banner Section ("We know how to deliver your vision") */}
      <div style={{ padding: '100px 0', position: 'relative', overflow: 'hidden' }}>
        <div className="container">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '60px',
              alignItems: 'center',
            }}
          >
            {/* Left Photo: Blueprint Drawing */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
              style={{
                position: 'relative',
                borderRadius: '4px',
                overflow: 'hidden',
                boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
              }}
            >
              <img
                src={blueprintImg}
                alt="Architect drafting blueprint"
                style={{ width: '100%', height: '440px', objectFit: 'cover' }}
              />
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'radial-gradient(circle at right center, transparent 30%, #0c1015 95%)',
                }}
              />
            </motion.div>

            {/* Right Text */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
            >
              <span className="section-tag section-tag-light">WHAT WE DO</span>

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
                Id proin feugiat vitae ipsum tincidunt velit egestas. Ac posuere volutpat consectetur donec eu sed. Tincidunt tortor ac consectetur aliquam aliquet pellentesque. Mollis in gravida diam pharetra consectetur.
              </p>

              <a href="#services-list" className="btn-primary">
                Our Services
              </a>
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

      {/* 3. 4-Column Services Grid with Static Square Icon Badges (NO hover animation) */}
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
                {/* Static Square Icon Badge (No hover color shift) */}
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
                <span style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--color-primary)' }}>
                  SERVICE {selectedService.num}
                </span>
              </div>

              <h2 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '16px' }}>{selectedService.title}</h2>
              <p style={{ color: 'var(--color-text-muted)', lineHeight: 1.7, marginBottom: '24px' }}>
                {selectedService.fullDesc}
              </p>

              <h4 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '12px' }}>Key Scope & Deliverables:</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '32px' }}>
                {selectedService.features.map((f, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <FiCheck style={{ color: 'var(--color-primary)' }} />
                    <span style={{ fontWeight: 600, fontSize: '0.95rem' }}>{f}</span>
                  </div>
                ))}
              </div>

              <a
                href="#contact"
                onClick={() => setSelectedService(null)}
                className="btn-primary"
                style={{ width: '100%', justifyContent: 'center' }}
              >
                Request Proposal
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
