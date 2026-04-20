import { useState, useEffect } from 'react'
import { publicApi } from '../lib/api'
import * as SiIcons from 'react-icons/si';
import * as FiIcons from 'react-icons/fi';
import * as FaIcons from 'react-icons/fa';
import './Home.css'

const renderIcon = (iconName) => {
    if (!iconName) return null;
    const name = iconName.replace(/\s/g, '');
    const tryCode = `Si${name}`;
    if (SiIcons[tryCode]) { const Icon = SiIcons[tryCode]; return <Icon />; }
    if (SiIcons[name]) { const Icon = SiIcons[name]; return <Icon />; }
    if (FiIcons[name]) { const Icon = FiIcons[name]; return <Icon />; }
    if (FaIcons[name]) { const Icon = FaIcons[name]; return <Icon />; }
    // Add fallback simple SVG code since we don't know the CMS code
    if (name === 'Instagram') return <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>;
    if (name === 'LinkedIn') return <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>;
    if (name === 'Dribbble') return <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><path d="M8.56 2.75c4.37 6.03 6.02 9.42 8.03 17.72m2.54-15.38c-3.72 4.35-8.94 5.66-16.88 5.85m19.5 1.9c-3.5-.93-6.63-.82-8.94 0-2.58.92-5.01 2.86-7.44 6.32"></path></svg>;
    return <span>{iconName}</span>;
}

export default function Home() {
    const [homeData, setHomeData] = useState(null)
    const [projects, setProjects] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        Promise.all([publicApi.getHome(), publicApi.getProjects()])
            .then(([home, projs]) => {
                setHomeData(home)
                setProjects(projs)
            })
            .catch(console.error)
            .finally(() => setLoading(false))
    }, [])

    if (loading) {
        return <div className="container" style={{ paddingTop: '120px', textAlign: 'center' }}><p className="text-secondary">Loading...</p></div>
    }


    return (
        <div className="container animate-fade-in">
            <header className="home-hero">
                <div className="hero-profile">
                    <img
                        src={homeData?.page?.profileImageUrl || ''}
                        alt="Afdal Ramdan"
                        className="profile-img hover-lift"
                    />
                </div>
                <div className="hero-content">
                    <h1 className="hero-text" dangerouslySetInnerHTML={{ __html: homeData?.page?.heroHeadline || '' }} />
                    <a href={homeData?.page?.ctaUrl || '#'} target="_blank" rel="noreferrer" className="hero-cta text-accent font-medium hover-lift" style={{ width: 'fit-content' }}>
                        {homeData?.page?.ctaText || 'Contact me!'}
                    </a>

                    <div className="social-links delay-100 animate-fade-in">
                        {(homeData?.socialLinks || []).map((link) => (
                            <a key={link.id} href={link.url} aria-label={link.name} target="_blank" rel="noreferrer">
                                {renderIcon(link.name)}
                            </a>
                        ))}
                    </div>
                </div>
            </header>

            <section className="projects-section delay-200 animate-fade-in">
                <div className="projects-grid">
                    {projects.map((project, index) => (
                        <a href={`/project/${project.slug}`} key={project.id} className="project-card hover-lift" style={{ animationDelay: `${(index + 3) * 100}ms` }}>
                            <div className="project-title-wrapper">
                                <h2 className="project-title">{project.title}</h2>
                            </div>
                            <div className="project-image-wrapper">
                                <img src={project.coverImageUrl} alt={project.title} loading="lazy" />
                            </div>
                        </a>
                    ))}
                </div>
            </section>

            <footer className="home-footer delay-300 animate-fade-in">
                <p className="text-secondary text-sm">
                    All designs on this website were created by Afdal Ramdan. Some of the featured works are conceptual pieces and may not represent real products.
                </p>
                <p className="text-secondary text-sm" style={{ textAlign: 'right' }}>
                    © {new Date().getFullYear()} Afdal Ramdan.<br />All rights reserved.
                </p>
            </footer>
        </div>
    )
}
