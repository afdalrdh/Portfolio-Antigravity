import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiArrowUpRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { publicApi } from '../lib/api';

const DEFAULT_NEWS = [
  {
    id: "cara-menentukan-kebutuhan-jasa-konstruksi",
    slug: "cara-menentukan-kebutuhan-jasa-konstruksi",
    title: 'Cara Menentukan Kebutuhan Jasa Konstruksi untuk Proyek Anda',
    excerpt: 'Memulai proyek pembangunan membutuhkan pemahaman mendasar mengenai scope pekerjaan dan penentuan jenis kontraktor.',
  },
  {
    id: "apa-yang-perlu-disiapkan-sebelum-renovasi-rumah",
    slug: "apa-yang-perlu-disiapkan-sebelum-renovasi-rumah",
    title: 'Apa yang Perlu Disiapkan Sebelum Memulai Renovasi Rumah?',
    excerpt: 'Renovasi rumah tanpa perencanaan matang sering memicu masalah kebocoran biaya dan waktu. Simak persiapan penting.',
  },
  {
    id: "design-and-build-satu-alur-perencanaan-eksekusi",
    slug: "design-and-build-satu-alur-perencanaan-eksekusi",
    title: 'Design & Build: Satu Alur dari Perencanaan hingga Pelaksanaan',
    excerpt: 'Pelajari efisiensi biaya dan kemudahan kontrol proyek dalam satu komando terpadu perencanaan dan konstruksi.',
  },
];

export default function News() {
  const [newsList, setNewsList] = useState(DEFAULT_NEWS);

  useEffect(() => {
    publicApi.getArticles()
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          const mapped = data.slice(0, 3).map(a => ({
            id: a.id || a.slug,
            slug: a.slug,
            title: a.title,
            excerpt: a.excerpt || a.content?.substring(0, 120) || '',
          }));
          setNewsList(mapped);
        }
      })
      .catch(() => {});
  }, []);

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
            <Link
              key={article.id}
              to={`/artikel/${article.slug}`}
              style={{ textDecoration: 'none' }}
            >
              <motion.article
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
                  const arrow = e.currentTarget.querySelector('.article-arrow');
                  if (arrow) {
                    arrow.style.transform = 'translate(3px, -3px)';
                    arrow.style.color = 'var(--color-primary)';
                  }
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderTopColor = '#e2e8f0';
                  const arrow = e.currentTarget.querySelector('.article-arrow');
                  if (arrow) {
                    arrow.style.transform = 'translate(0, 0)';
                    arrow.style.color = '#94a3b8';
                  }
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
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
