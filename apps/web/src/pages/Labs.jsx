import { useState, useEffect, useRef } from 'react';
import { publicApi } from '../lib/api';
import { FiSearch, FiX, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import './Labs.css';
import { Helmet } from 'react-helmet-async';
import { AnimatePresence, motion } from 'framer-motion';

export default function Labs() {
    const [creations, setCreations] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    
    // Filters
    const [searchQuery, setSearchQuery] = useState('');
    const [activeCategory, setActiveCategory] = useState('');
    
    // Lightbox
    const [selectedImage, setSelectedImage] = useState(null);

    const scrollRef = useRef(null);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);

    // Debounce search
    const [debouncedSearch, setDebouncedSearch] = useState('');

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearch(searchQuery);
        }, 300);
        return () => clearTimeout(timer);
    }, [searchQuery]);

    useEffect(() => {
        const fetchCreations = async () => {
            setLoading(true);
            try {
                const [creationsData, categoriesData] = await Promise.all([
                    publicApi.getCreations(debouncedSearch, activeCategory),
                    publicApi.getCategories()
                ]);
                setCreations(creationsData || []);
                setCategories(categoriesData || []);
            } catch (error) {
                console.error("Failed to load labs data", error);
            } finally {
                setLoading(false);
            }
        };
        fetchCreations();
    }, [debouncedSearch, activeCategory]);

    const handleCategoryClick = (cat) => {
        setActiveCategory(prev => prev === cat ? '' : cat);
    };

    const handleMouseDown = (e) => {
        setIsDragging(true);
        setStartX(e.pageX - scrollRef.current.offsetLeft);
        setScrollLeft(scrollRef.current.scrollLeft);
    };

    const handleMouseLeave = () => {
        setIsDragging(false);
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    const handleMouseMove = (e) => {
        if (!isDragging) return;
        e.preventDefault();
        const x = e.pageX - scrollRef.current.offsetLeft;
        const walk = (x - startX) * 2;
        scrollRef.current.scrollLeft = scrollLeft - walk;
    };

    const handlePrev = (e) => {
        e.stopPropagation();
        if (!selectedImage || creations.length === 0) return;
        const currentIndex = creations.findIndex(c => c.id === selectedImage.id);
        const prevIndex = (currentIndex - 1 + creations.length) % creations.length;
        setSelectedImage(creations[prevIndex]);
    };

    const handleNext = (e) => {
        e.stopPropagation();
        if (!selectedImage || creations.length === 0) return;
        const currentIndex = creations.findIndex(c => c.id === selectedImage.id);
        const nextIndex = (currentIndex + 1) % creations.length;
        setSelectedImage(creations[nextIndex]);
    };

    const closeLightbox = () => {
        setSelectedImage(null);
    };

    return (
        <>
            <Helmet>
                <title>Labs - Creations | Afdal Ramdan</title>
                <meta name="description" content="Explore my conceptual designs, experiments, and creative works." />
            </Helmet>

            <motion.div 
                className="labs-page"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
            >
                <div className="labs-container">
                    
                    <div className="labs-header">
                        <div className="labs-search">
                            <FiSearch className="labs-search-icon" />
                            <input 
                                type="text" 
                                placeholder="Search creations..." 
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>

                        {categories.length > 0 && (
                            <div className="labs-categories-wrapper">
                                <div 
                                    className="labs-categories"
                                    ref={scrollRef}
                                    onMouseDown={handleMouseDown}
                                    onMouseLeave={handleMouseLeave}
                                    onMouseUp={handleMouseUp}
                                    onMouseMove={handleMouseMove}
                                    style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
                                >
                                    <button 
                                        className={`category-pill ${activeCategory === '' ? 'active' : ''}`}
                                        onClick={() => setActiveCategory('')}
                                    >
                                        All
                                    </button>
                                    {categories.map((cat, idx) => (
                                        <button 
                                            key={idx}
                                            className={`category-pill ${activeCategory === cat ? 'active' : ''}`}
                                            onClick={() => handleCategoryClick(cat)}
                                        >
                                            {cat}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {loading ? (
                        <div className="masonry-grid">
                            {[250, 300, 200, 350, 280, 220, 310, 260].map((height, i) => (
                                <div key={i} className="masonry-item skeleton-item" style={{ height: `${height}px` }}></div>
                            ))}
                        </div>
                    ) : (
                        <div className="masonry-grid">
                            {creations.map((item) => (
                                <div 
                                    key={item.id} 
                                    className="masonry-item"
                                    onClick={() => setSelectedImage(item)}
                                >
                                    <img src={item.imageUrl} alt={item.title} loading="lazy" />
                                    <div className="masonry-item-overlay">
                                        <h3 className="masonry-item-title">{item.title}</h3>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                    
                    {!loading && creations.length === 0 && (
                        <div style={{ textAlign: 'center', padding: '60px 0' }}>
                            <p className="text-secondary">No creations found.</p>
                        </div>
                    )}
                </div>
            </motion.div>

            {/* Lightbox */}
            <AnimatePresence>
                {selectedImage && (
                    <motion.div 
                        className="lightbox-overlay"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={closeLightbox}
                    >
                        <button className="lightbox-nav lightbox-prev" onClick={handlePrev}>
                            <FiChevronLeft />
                        </button>
                        <motion.div 
                            className="lightbox-content"
                            initial={{ scale: 0.95 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0.95 }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button className="lightbox-close" onClick={closeLightbox}>
                                <FiX />
                            </button>
                            <img src={selectedImage.imageUrl} alt={selectedImage.title} />
                            <h2 className="lightbox-title">{selectedImage.title}</h2>
                        </motion.div>
                        <button className="lightbox-nav lightbox-next" onClick={handleNext}>
                            <FiChevronRight />
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
