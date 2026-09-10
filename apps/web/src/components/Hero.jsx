import React from 'react';
import { motion } from 'framer-motion';
import { FiArrowUpRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';

export default function Hero() {
  const videoMp4 = "https://cdn.prod.website-files.com/6175e5f51349efa3b3120baa/6179fd5c38ec05cd8ff9df2b_background_video-transcode.mp4";
  const videoWebm = "https://cdn.prod.website-files.com/6175e5f51349efa3b3120baa/6179fd5c38ec05cd8ff9df2b_background_video-transcode.webm";
  const fallbackPoster = "https://assets-global.website-files.com/6175e5f51349efa3b3120baa/617b347a79be8351ce06894c_gallery_2.jpg";

  const bottomNavItems = [
    {
      title: 'KONSTRUKSI',
      link: '/layanan/konstruksi',
    },
    {
      title: 'DESIGN & BUILD',
      link: '/layanan/design-build',
    },
    {
      title: 'FABRIKASI',
      link: '/layanan/fabrikasi',
    },
  ];

  return (
    <section
      id="home"
      style={{
        position: 'relative',
        minHeight: '100vh',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        paddingTop: 'var(--header-height)',
        backgroundColor: '#0a0d12',
        color: '#ffffff',
        overflow: 'hidden',
      }}
    >
      {/* Background HTML5 Video */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 1,
          overflow: 'hidden',
        }}
      >
        <video
          autoPlay
          loop
          muted
          playsInline
          poster={fallbackPoster}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            filter: 'brightness(0.65) contrast(1.05)',
          }}
        >
          <source src={videoMp4} type="video/mp4" />
          <source src={videoWebm} type="video/webm" />
        </video>

        {/* Gradient Dark Overlay */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'linear-gradient(180deg, rgba(10, 13, 18, 0.4) 0%, rgba(10, 13, 18, 0.75) 100%)',
          }}
        />
      </div>

      {/* Main Center Content */}
      <div
        className="container"
        style={{
          position: 'relative',
          zIndex: 10,
          flexGrow: 1,
          display: 'flex',
          alignItems: 'center',
          paddingTop: '80px',
          paddingBottom: '60px',
        }}
      >
        <div style={{ maxWidth: '840px' }}>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            style={{
              fontSize: 'clamp(2.8rem, 6vw, 5rem)',
              fontWeight: 800,
              lineHeight: 1.05,
              color: '#ffffff',
              letterSpacing: '-0.02em',
              marginBottom: '36px',
              textShadow: '0 4px 20px rgba(0,0,0,0.5)',
            }}
          >
            Membangun Tuntas, Unggul Dalam Kualitas
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}
          >
            <Link
              to="/kontak"
              className="btn-primary"
              style={{
                padding: '16px 36px',
                fontSize: '1rem',
                fontWeight: 600,
              }}
            >
              Konsultasi Gratis
            </Link>
            <Link
              to="/proyek"
              className="btn-outline-white"
              style={{
                padding: '16px 36px',
                fontSize: '1rem',
                fontWeight: 600,
              }}
            >
              Lihat Proyek
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Bottom Bar matching Albion Webflow layout */}
      <div
        style={{
          position: 'relative',
          zIndex: 10,
          width: '100%',
          paddingBottom: '40px',
        }}
      >
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: '24px',
            }}
          >
            {bottomNavItems.map((item, idx) => (
              <Link
                key={idx}
                to={item.link}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  borderTop: '1px solid rgba(255, 255, 255, 0.4)',
                  paddingTop: '16px',
                  color: '#ffffff',
                  transition: 'all 0.3s ease',
                  textDecoration: 'none',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderTopColor = 'var(--color-primary)';
                  e.currentTarget.style.color = 'var(--color-primary)';
                  const arrow = e.currentTarget.querySelector('.item-arrow');
                  if (arrow) arrow.style.transform = 'translate(3px, -3px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderTopColor = 'rgba(255, 255, 255, 0.4)';
                  e.currentTarget.style.color = '#ffffff';
                  const arrow = e.currentTarget.querySelector('.item-arrow');
                  if (arrow) arrow.style.transform = 'translate(0, 0)';
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                  <span
                    style={{
                      fontSize: '0.95rem',
                      fontWeight: 800,
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                    }}
                  >
                    {item.title}
                  </span>
                  <FiArrowUpRight
                    className="item-arrow"
                    style={{
                      fontSize: '1.4rem',
                      transition: 'transform 0.25s ease',
                    }}
                  />
                </div>
              </Link>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
