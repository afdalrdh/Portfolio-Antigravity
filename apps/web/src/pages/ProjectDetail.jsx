import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { publicApi } from '../lib/api'
import './ProjectDetail.css'

export default function ProjectDetail() {
    const { slug } = useParams()
    const [project, setProject] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [showScrollTop, setShowScrollTop] = useState(false)

    useEffect(() => {
        if (!slug) return
        publicApi.getProject(slug)
            .then(setProject)
            .catch((err) => setError(err.message))
            .finally(() => setLoading(false))
    }, [slug])

    useEffect(() => {
        const handleScroll = () => setShowScrollTop(window.scrollY > 300)
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

    if (loading) {
        return <div className="container" style={{ paddingTop: '120px', textAlign: 'center' }}><p className="text-secondary">Loading...</p></div>
    }

    if (error || !project) {
        return (
            <div className="container" style={{ paddingTop: '120px', textAlign: 'center' }}>
                <h2>Project not found</h2>
                <p className="text-secondary">The project you're looking for doesn't exist or is not published.</p>
                <Link to="/" className="text-accent" style={{ marginTop: '16px', display: 'inline-block' }}>&larr; Back to home</Link>
            </div>
        )
    }

    const renderBlock = (block) => {
        switch (block.type) {
            case 'narrative':
                return (
                    <section key={block.id} className="pd-narrative animate-fade-in" style={{ marginTop: '64px' }}>
                        <h2 className="pd-narrative-title text-secondary">{block.title}</h2>
                        <p className="pd-narrative-text">{block.text}</p>
                    </section>
                )
            case 'image_main':
                return (
                    <div key={block.id} className="pd-main-image animate-fade-in hover-lift" style={{ marginTop: '40px' }}>
                        <img src={block.imageUrl} alt={project.title} loading="lazy" />
                    </div>
                )
            case 'image_grid':
                return (
                    <div key={block.id} className="pd-grid-images animate-fade-in" style={{ marginTop: '40px' }}>
                        {block.imageUrl && (
                            <div className="pd-image-card hover-lift">
                                <img src={block.imageUrl} alt="Detail 1" loading="lazy" />
                            </div>
                        )}
                        {block.imageUrl2 && (
                            <div className="pd-image-card hover-lift">
                                <img src={block.imageUrl2} alt="Detail 2" loading="lazy" />
                            </div>
                        )}
                    </div>
                )
            case 'design_system':
                return (
                    <section key={block.id} className="pd-design-system animate-fade-in" style={{ marginTop: '40px' }}>
                        <div className="pd-colors">
                            <h2 className="ds-title">Brand Colors</h2>
                            <div className="color-grid">
                                {(block.colors || []).map((color, i) => (
                                    <div key={i} className="color-swatch" style={{ background: color }}>
                                        <span className="color-label" style={{ color: i >= 4 ? '#fff' : undefined }}>{color}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        {block.fontFamily && (
                            <div className="pd-typography">
                                <div className="typo-left">
                                    <div className="typo-aa">Aa</div>
                                    <div className="typo-name">{block.fontFamily}</div>
                                    <p className="typo-desc">Primary Typeface used for clear legibility and modern aesthetic.</p>
                                </div>
                                <div className="typo-right">
                                    <div className="typo-weight" style={{ fontWeight: 400 }}>Regular - The quick brown fox jumps over the lazy dog</div>
                                    <div className="typo-weight" style={{ fontWeight: 500 }}>Medium - The quick brown fox jumps over the lazy dog</div>
                                    <div className="typo-weight" style={{ fontWeight: 600 }}>SemiBold - The quick brown fox jumps over the lazy dog</div>
                                    <div className="typo-weight" style={{ fontWeight: 700 }}>Bold - The quick brown fox jumps over the lazy dog</div>
                                </div>
                            </div>
                        )}
                    </section>
                )
            default:
                return null
        }
    }

    return (
        <>
            <div className="container animate-fade-in project-detail-page">
                <header className="pd-header delay-100 animate-fade-in">
                    <Link to="/" className="back-button">&larr; Back to home</Link>
                    <h1 className="pd-title">{project.title}</h1>
                    <p className="pd-meta">
                        {project.company} {project.year}
                        {project.liveLink && (
                            <><span style={{ margin: '0 8px', color: 'var(--text-secondary)' }}>·</span><a href={project.liveLink} target="_blank" rel="noreferrer">{project.liveLink}</a></>
                        )}
                    </p>
                </header>

                {(project.blocks || []).map(renderBlock)}

                <footer className="home-footer">
                    <p className="text-secondary text-sm">
                        All designs on this website were created by Afdal Ramdan.
                    </p>
                    <p className="text-secondary text-sm" style={{ textAlign: 'right' }}>
                        © {new Date().getFullYear()} Afdal Ramdan. All rights reserved.
                    </p>
                </footer>
            </div>

            {showScrollTop && (
                <button className="scroll-top-btn animate-fade-in" onClick={scrollToTop} aria-label="Scroll to top">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m5 12 7-7 7 7" /><path d="M12 19V5" /></svg>
                </button>
            )}
        </>
    )
}
