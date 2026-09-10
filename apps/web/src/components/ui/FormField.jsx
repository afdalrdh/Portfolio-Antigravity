import React from 'react';

export default function FormField({
  label,
  name,
  type = 'text',
  value,
  onChange,
  required = false,
  placeholder,
  error,
  options = [],
  rows = 4,
}) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
      {label && (
        <label htmlFor={name} style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--color-neutral-700)' }}>
          {label} {required && <span style={{ color: '#e11d48' }}>*</span>}
        </label>
      )}

      {type === 'select' ? (
        <select
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          style={{
            width: '100%',
            padding: '12px 14px',
            borderRadius: 'var(--radius-control)',
            border: error ? '1px solid #e11d48' : '1px solid var(--color-neutral-200)',
            fontSize: '0.925rem',
            backgroundColor: '#ffffff',
            color: 'var(--color-neutral-700)',
            fontFamily: 'inherit',
          }}
        >
          {options.map((opt, idx) => (
            <option key={idx} value={opt.value || opt}>
              {opt.label || opt}
            </option>
          ))}
        </select>
      ) : type === 'textarea' ? (
        <textarea
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          placeholder={placeholder}
          rows={rows}
          style={{
            width: '100%',
            padding: '12px 14px',
            borderRadius: 'var(--radius-control)',
            border: error ? '1px solid #e11d48' : '1px solid var(--color-neutral-200)',
            fontSize: '0.925rem',
            backgroundColor: '#ffffff',
            color: 'var(--color-neutral-700)',
            fontFamily: 'inherit',
          }}
        />
      ) : (
        <input
          id={name}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          required={required}
          placeholder={placeholder}
          style={{
            width: '100%',
            padding: '12px 14px',
            borderRadius: 'var(--radius-control)',
            border: error ? '1px solid #e11d48' : '1px solid var(--color-neutral-200)',
            fontSize: '0.925rem',
            backgroundColor: '#ffffff',
            color: 'var(--color-neutral-700)',
            fontFamily: 'inherit',
          }}
        />
      )}

      {error && <span style={{ fontSize: '0.8rem', color: '#e11d48', fontWeight: 500 }}>{error}</span>}
    </div>
  );
}
