import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Button from './ui/Button';
import { publicApi } from '../lib/api';

const DEFAULT_PROJECTS = [
  {
    id: "fasad-acp-kppn-pekalongan",
    slug: "fasad-acp-kppn-pekalongan",
    title: 'Pekerjaan Fasad ACP Gedung Kantor KPPN Pekalongan',
    category: 'Fasad ACP & Eksterior',
    image: '/projects/project_1.jpg',
  },
  {
    id: "the-old-heritage-mr-erwan",
    slug: "the-old-heritage-mr-erwan",
    title: 'The Old Heritage Rumah Hunian Mr. Erwan',
    category: 'Design & Build',
    image: '/projects/project_2.jpg',
  },
  {
    id: "the-verdant-pavilion-ibu-dewi",
    slug: "the-verdant-pavilion-ibu-dewi",
    title: 'The Verdant Pavilion Rumah Hunian Ibu Dewi',
    category: 'Design & Build',
    image: '/projects/project_4.jpg',
  },
];

export default function Projects() {
  const [featuredProjects, setFeaturedProjects] = useState(DEFAULT_PROJECTS);

  useEffect(() => {
    publicApi.getProjects()
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          const mapped = data.slice(0, 3).map(p => ({
            id: p.id || p.slug,
            slug: p.slug,
            title: p.title,
            category: p.category || 'Portfolio',
            image: p.coverImageUrl || DEFAULT_PROJECTS[0].image,
          }));
          setFeaturedProjects(mapped);
        }
      })
      .catch(() => {});
  }, []);

  return (
    <section id="projects" className="section-padding" style={{ backgroundColor: '#f4f6f9', borderTop: '1px solid var(--color-border)' }}>
      <div className="container">
        {/* Header */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            gap: '24px',
            marginBottom: '50px',
          }}
        >
          <div style={{ maxWidth: '640px' }}>
            <span className="section-tag">FEATURED PROJECTS</span>
            <h2
              style={{
                fontSize: 'clamp(2.2rem, 3.8vw, 3rem)',
                fontWeight: 800,
                color: 'var(--color-text-main)',
                lineHeight: 1.12,
              }}
            >
              We build the structures and infrastructure
            </h2>
          </div>

          <div>
            <Button to="/proyek" variant="primary">
              All Projects
            </Button>
          </div>
        </div>

        {/* 3 Column Image Cards */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '32px',
          }}
        >
          {featuredProjects.map((project) => (
            <Link
              key={project.id}
              to={`/proyek/${project.slug}`}
              style={{ textDecoration: 'none' }}
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  cursor: 'pointer',
                }}
                onMouseEnter={(e) => {
                  const img = e.currentTarget.querySelector('.proj-card-img');
                  if (img) img.style.transform = 'scale(1.06)';
                }}
                onMouseLeave={(e) => {
                  const img = e.currentTarget.querySelector('.proj-card-img');
                  if (img) img.style.transform = 'scale(1)';
                }}
              >
                <div
                  style={{
                    height: '360px',
                    borderRadius: '4px',
                    overflow: 'hidden',
                    marginBottom: '20px',
                    backgroundColor: '#e2e8f0',
                  }}
                >
                  <img
                    src={project.image}
                    alt={project.title}
                    className="proj-card-img"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      transition: 'transform 0.5s ease',
                    }}
                  />
                </div>

                <span
                  style={{
                    fontSize: '0.8rem',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                    color: 'var(--color-text-muted)',
                    marginBottom: '8px',
                  }}
                >
                  {project.category}
                </span>

                <h3
                  style={{
                    fontSize: '1.25rem',
                    fontWeight: 700,
                    color: 'var(--color-text-main)',
                    lineHeight: 1.3,
                  }}
                >
                  {project.title}
                </h3>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
