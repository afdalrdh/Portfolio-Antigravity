import { useState, useEffect } from 'react'
import { publicApi } from '../lib/api'
import './About.css'

export default function About() {
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(true)

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
                    <div className="tool-icon">Fi</div>
                    <div className="tool-icon">Ps</div>
                    <div className="tool-icon">Ai</div>
                    <div className="tool-icon">Xd</div>
                    <div className="tool-icon">Wp</div>
                </div>
            </section>

            <hr className="divider delay-200 animate-fade-in" />

            <section className="about-details delay-300 animate-fade-in">
                <div className="experience-col">
                    <h2 className="section-title">Experience</h2>
                    <div className="timeline-list">
                        {(data?.experiences || []).map(exp => (
                            <div key={exp.id} className="timeline-item hover-translate">
                                <div className="timeline-logo font-script">{exp.initials}</div>
                                <div className="timeline-content">
                                    <h3 className="timeline-role">{exp.jobTitle} <strong>{exp.company}</strong></h3>
                                    <p className="timeline-duration">{exp.dateRange} · {exp.contractType}</p>
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
                                <div className="timeline-logo font-script" style={{ backgroundColor: 'var(--bg-secondary)' }}>{cert.initials}</div>
                                <div className="timeline-content">
                                    <h3 className="timeline-role">{cert.name}</h3>
                                    <p className="timeline-duration">{cert.issuer} · {cert.issueDate}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="gallery-section delay-300 animate-fade-in">
                <div className="gallery-grid">
                    {(data?.galleryImages || []).map((img) => (
                        <div key={img.id} className="gallery-item hover-lift">
                            <img src={img.imageUrl} alt="Gallery item" loading="lazy" />
                        </div>
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
