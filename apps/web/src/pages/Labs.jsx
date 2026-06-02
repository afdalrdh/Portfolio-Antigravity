import { useState, useEffect } from 'react';
import { publicApi } from '../lib/api';
import './Labs.css';
import { Helmet } from 'react-helmet-async';
import { AnimatePresence, motion } from 'framer-motion';
import { FiSearch, FiX } from 'react-icons/fi';

export default function Labs() {
    const [creations, setCreations] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    
    // Filters
    const [searchQuery, setSearchQuery] = useState('');
    const [activeCategory, setActiveCategory] = useState('');
    
    // Lightbox
    const [selectedImage, setSelectedImage] = useState(null);

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
                            <div className="labs-categories">
                                <button 
                                    className={`category-pill ${activeCategory === '' ? 'active' : ''}`}
                                    onClick={() => handleCategoryClick('')}
                                >
                                    All
                                </button>
                                {categories.map(cat => (
                                    <button 
                                        key={cat}
                                        className={`category-pill ${activeCategory === cat ? 'active' : ''}`}
                                        onClick={() => handleCategoryClick(cat)}
                                    >
                                        {cat}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {loading && creations.length === 0 ? (
                        <div style={{ display: 'flex', justifyContent: 'center', padding: '40px' }}>
                            <p className="text-secondary">Loading creations...</p>
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
                                        <div className="masonry-item-categories">
                                            {item.category.split(',').map((cat, i) => (
                                                <span key={i} className="masonry-item-badge">{cat.trim()}</span>
                                            ))}
                                        </div>
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
                        onClick={() => setSelectedImage(null)}
                    >
                        <button className="lightbox-close" onClick={() => setSelectedImage(null)}>
                            <FiX />
                        </button>
                        <motion.div 
                            className="lightbox-content"
                            initial={{ scale: 0.95 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0.95 }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <img src={selectedImage.imageUrl} alt={selectedImage.title} />
                            <h2 className="lightbox-title">{selectedImage.title}</h2>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
