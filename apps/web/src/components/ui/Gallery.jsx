import React, { useState } from 'react';
import { FiX, FiMaximize2 } from 'react-icons/fi';

export default function Gallery({ images = [], title = 'Galeri Proyek' }) {
  const [activeImg, setActiveImg] = useState(null);

  if (!images || images.length === 0) return null;

  return (
    <div style={{ marginTop: '40px' }}>
      <h3 style={{ fontSize: '1.35rem', marginBottom: '20px', color: 'var(--color-neutral-700)' }}>{title}</h3>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '20px',
        }}
      >
        {images.map((imgUrl, idx) => (
          <div
            key={idx}
            onClick={() => setActiveImg(imgUrl)}
            style={{
              height: '240px',
              borderRadius: 'var(--radius-card)',
              overflow: 'hidden',
              position: 'relative',
              cursor: 'pointer',
              border: '1px solid var(--color-neutral-200)',
              backgroundColor: 'var(--color-neutral-100)',
            }}
            onMouseEnter={(e) => {
              const icon = e.currentTarget.querySelector('.zoom-icon');
              if (icon) icon.style.opacity = '1';
            }}
            onMouseLeave={(e) => {
              const icon = e.currentTarget.querySelector('.zoom-icon');
              if (icon) icon.style.opacity = '0';
            }}
          >
            <img src={imgUrl} alt={`${title} ${idx + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            <div
              className="zoom-icon"
              style={{
                position: 'absolute',
                inset: 0,
                backgroundColor: 'rgba(0,86,151,0.4)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#ffffff',
                fontSize: '1.8rem',
                opacity: 0,
                transition: 'opacity 0.2s ease',
              }}
            >
              <FiMaximize2 />
            </div>
          </div>
        ))}
      </div>

      {activeImg && (
        <div
          onClick={() => setActiveImg(null)}
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(10,10,10,0.9)',
            zIndex: 3000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '40px',
          }}
        >
          <button
            onClick={() => setActiveImg(null)}
            style={{
              position: 'absolute',
              top: '24px',
              right: '24px',
              color: '#ffffff',
              fontSize: '2rem',
            }}
          >
            <FiX />
          </button>
          <img
            src={activeImg}
            alt="Preview"
            style={{ maxWidth: '90vw', maxHeight: '85vh', borderRadius: '8px', objectFit: 'contain' }}
          />
        </div>
      )}
    </div>
  );
}
