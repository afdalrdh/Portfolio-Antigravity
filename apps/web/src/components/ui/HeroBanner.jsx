import React from 'react';
import Breadcrumb from './Breadcrumb';
import SectionTag from './SectionTag';
import { optimizeImage } from '../../utils/optimizeImage';

/**
 * Reusable Dark Architectural Hero Banner
 * 
 * Composition:
 * Real Image (as background / absolute position with object-fit: cover)
 * + Dark Overlay (rgba(0, 0, 0, 0.55) to rgba(0, 0, 0, 0.75) for visual depth & text readability)
 * + White Editorial Typography
 * + Blue Accent Tags / Subtitles
 */
export default function HeroBanner({
  bgImage,
  overlayOpacity = 0.65,
  breadcrumbItems = [],
  tag,
  title,
  subtitle,
  children,
  style = {},
  imageAlt = "PT Arsi Karya Unggul",
}) {
  const optimizedBg = optimizeImage(bgImage);

  return (
    <section
      style={{
        position: 'relative',
        backgroundColor: '#0f172a', // Dark architectural slate fallback
        color: '#ffffff',
        paddingTop: 'calc(var(--header-height) + 48px)',
        paddingBottom: '72px',
        overflow: 'hidden',
        minHeight: '340px',
        display: 'flex',
        alignItems: 'center',
        ...style,
      }}
    >
      {/* Real Background Image */}
      {optimizedBg && (
        <img
          src={optimizedBg}
          alt={imageAlt}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center',
            zIndex: 1,
            // Ensure no CLS by letting object-fit fill
          }}
          loading="eager" // Hero / LCP images must load eagerly
        />
      )}

      {/* Dark Overlay Layer for Text Readability & Architectural Depth */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: `rgba(10, 16, 26, ${overlayOpacity})`,
          backgroundImage: 'linear-gradient(180deg, rgba(15, 23, 42, 0.75) 0%, rgba(10, 16, 26, 0.60) 50%, rgba(15, 23, 42, 0.85) 100%)',
          zIndex: 2,
        }}
      />

      {/* Content Container */}
      <div
        className="container"
        style={{
          position: 'relative',
          zIndex: 3,
          width: '100%',
        }}
      >
        {/* Detail Page Breadcrumbs Only (Top level passes empty array) */}
        {breadcrumbItems && breadcrumbItems.length > 0 && (
          <Breadcrumb items={breadcrumbItems} />
        )}

        {tag && <SectionTag light>{tag}</SectionTag>}

        {title && (
          <h1
            style={{
              color: '#ffffff',
              fontSize: 'clamp(2.1rem, 4.2vw, 3.6rem)',
              marginBottom: subtitle ? '16px' : '0px',
              lineHeight: 1.2,
              fontWeight: 700,
              letterSpacing: '-0.02em',
              textShadow: '0 2px 10px rgba(0, 0, 0, 0.4)',
            }}
          >
            {title}
          </h1>
        )}

        {subtitle && (
          <p
            style={{
              fontSize: 'clamp(1rem, 1.8vw, 1.15rem)',
              color: 'var(--color-primary-200)',
              maxWidth: '720px',
              lineHeight: 1.6,
              margin: 0,
              textShadow: '0 1px 4px rgba(0, 0, 0, 0.3)',
            }}
          >
            {subtitle}
          </p>
        )}

        {children}
      </div>
    </section>
  );
}
