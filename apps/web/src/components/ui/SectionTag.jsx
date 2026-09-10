import React from 'react';

export default function SectionTag({ children, light = false, className = '', style = {} }) {
  return (
    <div
      className={`section-tag ${light ? 'section-tag-light' : ''} ${className}`}
      style={style}
    >
      {children}
    </div>
  );
}
