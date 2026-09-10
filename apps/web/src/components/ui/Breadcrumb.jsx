import React from 'react';
import { Link } from 'react-router-dom';
import { FiChevronRight } from 'react-icons/fi';

export default function Breadcrumb({ items = [] }) {
  return (
    <nav
      aria-label="Breadcrumb"
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        fontSize: '0.85rem',
        color: 'var(--color-neutral-300)',
        marginBottom: '20px',
        flexWrap: 'wrap',
      }}
    >
      <Link to="/" style={{ color: 'var(--color-neutral-300)', textDecoration: 'none' }}>
        Beranda
      </Link>
      {items.map((item, idx) => (
        <React.Fragment key={idx}>
          <FiChevronRight style={{ fontSize: '0.75rem', color: 'var(--color-neutral-400)' }} />
          {item.to ? (
            <Link to={item.to} style={{ color: 'var(--color-neutral-300)', textDecoration: 'none' }}>
              {item.label}
            </Link>
          ) : (
            <span style={{ color: 'var(--color-primary-200)', fontWeight: 600 }}>{item.label}</span>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
}
