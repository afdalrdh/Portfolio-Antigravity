import React from 'react';
import { motion } from 'framer-motion';
import { FiArrowUpRight } from 'react-icons/fi';

export default function News() {
  const newsList = [
    {
      id: 1,
      title: 'Albion celebrate new surgery center groundbreaking',
      excerpt: 'Etiam aliquet habitant orci scelerisque ultricies. Praesent turpis varius purus ut elementum dignissim.',
    },
    {
      id: 2,
      title: "Albion completes hospital's south pavilion",
      excerpt: 'Ultrices ullamcorper ut tincidunt eget ut. A mattis amet tempor id ultricies sit. Vivamus amet, enim auctor.',
    },
    {
      id: 3,
      title: 'Construction begins on new office building',
      excerpt: 'Aliquet aenean bibendum a est purus. Posuere tempor odio amet nibh sed turpis sed egestas nec.',
    },
  ];

  return (
    <section id="news" className="section-padding" style={{ backgroundColor: '#ffffff' }}>
      <div className="container">
        {/* Section Header */}
        <div style={{ maxWidth: '650px', marginBottom: '60px' }}>
          <span className="section-tag">LATEST NEWS</span>

          <h2
            style={{
              fontSize: 'clamp(2.2rem, 3.8vw, 3rem)',
              fontWeight: 800,
              color: 'var(--color-text-main)',
              lineHeight: 1.12,
            }}
          >
            It's an exciting time in the construction industry
          </h2>
        </div>

        {/* 3 Column Horizontal Articles */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '40px',
          }}
        >
          {newsList.map((article, idx) => (
            <motion.article
              key={article.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              viewport={{ once: true }}
              style={{
                display: 'flex',
                flexDirection: 'column',
                borderTop: '2px solid #e2e8f0',
                paddingTop: '24px',
                cursor: 'pointer',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderTopColor = 'var(--color-primary)';
                e.currentTarget.querySelector('.article-arrow').style.transform = 'translate(3px, -3px)';
                e.currentTarget.querySelector('.article-arrow').style.color = 'var(--color-primary)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderTopColor = '#e2e8f0';
                e.currentTarget.querySelector('.article-arrow').style.transform = 'translate(0, 0)';
                e.currentTarget.querySelector('.article-arrow').style.color = '#94a3b8';
              }}
            >
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '16px' }}>
                <h3
                  style={{
                    fontSize: '1.25rem',
                    fontWeight: 700,
                    color: 'var(--color-text-main)',
                    lineHeight: 1.3,
                  }}
                >
                  {article.title}
                </h3>
                <FiArrowUpRight
                  className="article-arrow"
                  style={{
                    fontSize: '1.4rem',
                    color: '#94a3b8',
                    transition: 'all 0.25s ease',
                    flexShrink: 0,
                    marginLeft: '12px',
                  }}
                />
              </div>

              <p
                style={{
                  fontSize: '0.95rem',
                  color: 'var(--color-text-muted)',
                  lineHeight: 1.6,
                }}
              >
                {article.excerpt}
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
