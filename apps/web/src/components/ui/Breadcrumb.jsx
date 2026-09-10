import React from 'react';
import { Link } from 'react-router-dom';
import { FiChevronRight } from 'react-icons/fi';

export default function Breadcrumb({ items = [] }) {
  if (!items || items.length === 0) return null;

  return (
    <nav
      aria-label="Breadcrumb"
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
        fontSize: '0.85rem',
        color: 'rgba(255, 255, 255, 0.8)',
        marginBottom: '20px',
        flexWrap: 'wrap',
      }}
    >
      {items.map((item, idx) => (
        <React.Fragment key={idx}>
          {item.to ? (
            <Link 
              to={item.to} 
              style={{ 
                color: 'rgba(255, 255, 255, 0.85)', 
                textDecoration: 'none',
                fontWeight: 500,
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                transition: 'color 0.2s ease',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#ffffff')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255, 255, 255, 0.85)')}
            >
              <span>{item.label}</span>
              <FiChevronRight style={{ fontSize: '0.8rem', color: 'rgba(255, 255, 255, 0.65)' }} />
            </Link>
          ) : (
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ color: '#ffffff', fontWeight: 600 }}>{item.label}</span>
              <FiChevronRight style={{ fontSize: '0.8rem', color: 'rgba(255, 255, 255, 0.65)' }} />
            </div>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
}
