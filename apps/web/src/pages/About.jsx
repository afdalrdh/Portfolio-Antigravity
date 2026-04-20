import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { publicApi } from '../lib/api';
import * as SiIcons from 'react-icons/si';
import * as FiIcons from 'react-icons/fi';
import * as FaIcons from 'react-icons/fa';
import './About.css';

// Safe dynamic icon renderer
const renderIcon = (iconCode) => {
    if (!iconCode) return null;
    if (iconCode.startsWith('Si') && SiIcons[iconCode]) { const Icon = SiIcons[iconCode]; return <Icon />; }
    if (iconCode.startsWith('Fi') && FiIcons[iconCode]) { const Icon = FiIcons[iconCode]; return <Icon />; }
    if (iconCode.startsWith('Fa') && FaIcons[iconCode]) { const Icon = FaIcons[iconCode]; return <Icon />; }
    return <span>{iconCode.slice(0, 2)}</span>;
};

export default function About() {
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(true)
    const [selectedImg, setSelectedImg] = useState(null)

    useEffect(() => {
        if (selectedImg) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [selectedImg]);

    useEffect(() => {
        publicApi.getAbout()
            .then(setData)
            .catch(console.error)
            .finally(() => setLoading(false))
    }, [])

    if (loading) {
        return <div className="container" style={{ paddingTop: '120px', textAlign: 'center' }}><p className="text-secondary">Loading...</p></div>
    }

    return (
        <div className="container animate-fade-in about-page">
            <section className="about-bio">
                {data?.page?.bioDescription && (
                    <div className="bio-paragraphs delay-100 animate-fade-in" dangerouslySetInnerHTML={{ __html: data.page.bioDescription }} />
                )}

                <div className="tool-icons delay-200 animate-fade-in">
                    {(data?.tools || []).map((tool, idx) => (
                        <div key={tool.id || idx} className="tool-icon" title={tool.name}>
                            {renderIcon(tool.iconCode)}
                        </div>
                    ))}
                </div>
            </section>

            <hr className="divider delay-200 animate-fade-in" />

            <section className="about-details delay-300 animate-fade-in">
                <div className="experience-col">
                    <h2 className="section-title">Experience</h2>
                    <div className="timeline-list">
                        {(data?.experiences || []).map(exp => (
                            <div key={exp.id} className="timeline-item hover-translate">
                                <div className="timeline-logo font-script">
                                    {exp.logoUrl ? <img src={exp.logoUrl} alt={exp.company} /> : (exp.company || '').slice(0, 2)}
                                </div>
                                <div className="timeline-content">
                                    <h3 className="timeline-role">{exp.title} <strong>{exp.company}</strong></h3>
                                    <p className="timeline-duration">
                                        {exp.dateStart} - {exp.dateEnd}
                                        {exp.contractType ? ` · ${exp.contractType}` : ''}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="cert-col delay-300 animate-fade-in">
                    <h2 className="section-title">Licenses & certifications</h2>
                    <div className="timeline-list">
                        {(data?.certifications || []).map(cert => (
                            <div key={cert.id} className="timeline-item hover-translate">
                                <div className="timeline-logo font-script" style={{ backgroundColor: 'var(--bg-secondary)' }}>
                                    {cert.logoUrl ? <img src={cert.logoUrl} alt={cert.issuer} /> : (cert.issuer || '').slice(0, 2)}
                                </div>
                                <div className="timeline-content">
                                    <h3 className="timeline-role">{cert.title}</h3>
                                    <p className="timeline-duration">
                                        {cert.issuer} · {cert.dateStart}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="gallery-section delay-300 animate-fade-in">
                <div className="gallery-carousel">
                    {(data?.galleryImages || []).map((img, idx) => (
                        <div key={img.id || idx} className="gallery-item hover-lift" onClick={() => setSelectedImg(img.imageUrl)}>
                            <img src={img.imageUrl} alt="Gallery item" loading="lazy" />
                        </div>
                    ))}
                </div>
            </section>

            <footer className="home-footer delay-300 animate-fade-in">
                <p className="text-secondary text-sm">
                    All designs on this website were created by Afdal Ramdan.
                </p>
                <p className="text-secondary text-sm" style={{ textAlign: 'right' }}>
                    © {new Date().getFullYear()} Afdal Ramdan.<br />All rights reserved.
                </p>
            </footer>

            {/* Lightbox Modal Using Portal */}
            {selectedImg && createPortal(
                <div className="lightbox-overlay" onClick={() => setSelectedImg(null)}>
                    <button className="lightbox-close" onClick={() => setSelectedImg(null)}>&times;</button>
                    <img src={selectedImg} className="lightbox-img" alt="Enlarged view" onClick={(e) => e.stopPropagation()} />
                </div>,
                document.body
            )}
        </div>
    )
}
