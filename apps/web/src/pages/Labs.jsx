import { useState, useEffect, useMemo, useRef } from 'react';
import { publicApi } from '../lib/api';
import { FiSearch, FiX, FiChevronLeft, FiChevronRight, FiChevronDown, FiCheck } from 'react-icons/fi';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import './Labs.css';
import { Helmet } from 'react-helmet-async';
import { AnimatePresence, motion } from 'framer-motion';

export default function Labs() {
    const [allCreations, setAllCreations] = useState([]);
    const [loading, setLoading] = useState(true);
    
    // Filters
    const [searchQuery, setSearchQuery] = useState('');
    const [activeCategory, setActiveCategory] = useState('');
    
    // Dropdown state
    const [isCategoryOpen, setIsCategoryOpen] = useState(false);
    const [categorySearch, setCategorySearch] = useState('');
    const dropdownRef = useRef(null);
    
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
                // Fetch ALL creations to do client-side filtering and counting
                const creationsData = await publicApi.getCreations('', '');
                setAllCreations(creationsData || []);
            } catch (error) {
                console.error("Failed to load labs data", error);
            } finally {
                setLoading(false);
            }
        };
        fetchCreations();
    }, []);

    // Click outside to close dropdown
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsCategoryOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Compute categories with counts
    const categoriesWithCounts = useMemo(() => {
        const counts = {};
        allCreations.forEach(c => {
            if (!c.category) return;
            const parts = c.category.split(',').map(s => s.trim()).filter(Boolean);
            parts.forEach(p => {
                counts[p] = (counts[p] || 0) + 1;
            });
        });
        
        const sorted = Object.keys(counts).map(name => ({
            name,
            count: counts[name]
        })).sort((a, b) => b.count - a.count);
        
        return [
            { name: 'All', count: allCreations.length, isAll: true },
            ...sorted
        ];
    }, [allCreations]);

    // Filter categories based on category dropdown search
    const filteredCategories = useMemo(() => {
        if (!categorySearch) return categoriesWithCounts;
        const lowerSearch = categorySearch.toLowerCase();
        return categoriesWithCounts.filter(c => c.isAll || c.name.toLowerCase().includes(lowerSearch));
    }, [categoriesWithCounts, categorySearch]);

    // Filter creations based on main search and active category
    const displayCreations = useMemo(() => {
        return allCreations.filter(c => {
            const matchesSearch = !debouncedSearch || c.title?.toLowerCase().includes(debouncedSearch.toLowerCase());
            let matchesCategory = true;
            if (activeCategory) {
                const parts = (c.category || '').split(',').map(s => s.trim());
                matchesCategory = parts.includes(activeCategory);
            }
            return matchesSearch && matchesCategory;
        });
    }, [allCreations, debouncedSearch, activeCategory]);

    const handleCategorySelect = (catName) => {
        setActiveCategory(catName === 'All' ? '' : catName);
    };

    const handlePrev = (e) => {
        e.stopPropagation();
        if (!selectedImage || displayCreations.length === 0) return;
        const currentIndex = displayCreations.findIndex(c => c.id === selectedImage.id);
        const prevIndex = (currentIndex - 1 + displayCreations.length) % displayCreations.length;
        setSelectedImage(displayCreations[prevIndex]);
    };

    const handleNext = (e) => {
        e.stopPropagation();
        if (!selectedImage || displayCreations.length === 0) return;
        const currentIndex = displayCreations.findIndex(c => c.id === selectedImage.id);
        const nextIndex = (currentIndex + 1) % displayCreations.length;
        setSelectedImage(displayCreations[nextIndex]);
    };

    const closeLightbox = () => {
        setSelectedImage(null);
    };

    return (
        <>
            <Helmet>
                <title>Labs - Afdal Ramdan</title>
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
                        <h1 className="labs-title">Experiments & Explorations 🧪</h1>
                        
                        <div className="labs-header-actions">
                            <div className="labs-search">
                                <FiSearch className="labs-search-icon" />
                                <input 
                                    type="text" 
                                    placeholder="Search..." 
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>

                            <div className="labs-category-dropdown" ref={dropdownRef}>
                                <button 
                                    className="labs-category-btn"
                                    onClick={() => setIsCategoryOpen(!isCategoryOpen)}
                                >
                                    {activeCategory ? activeCategory : 'Category'} <FiChevronDown style={{ transform: isCategoryOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
                                </button>
                                
                                <AnimatePresence>
                                    {isCategoryOpen && (
                                        <motion.div 
                                            className="labs-dropdown-menu"
                                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                            animate={{ opacity: 1, y: 0, scale: 1 }}
                                            exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                            transition={{ duration: 0.15 }}
                                        >
                                            <div className="labs-dropdown-search">
                                                <FiSearch className="labs-dropdown-search-icon" />
                                                <input 
                                                    type="text" 
                                                    placeholder="Search category" 
                                                    value={categorySearch}
                                                    onChange={(e) => setCategorySearch(e.target.value)}
                                                />
                                            </div>
                                            <ul className="labs-dropdown-list">
                                                {filteredCategories.map((cat, idx) => {
                                                    const isActive = (cat.isAll && activeCategory === '') || activeCategory === cat.name;
                                                    return (
                                                        <li 
                                                            key={idx} 
                                                            className={`labs-dropdown-item ${isActive ? 'active' : ''}`}
                                                            onClick={() => handleCategorySelect(cat.name)}
                                                        >
                                                            <div className="labs-dropdown-item-left">
                                                                <div className={`labs-radio ${isActive ? 'checked' : ''}`}>
                                                                    {isActive && <div className="labs-radio-dot" />}
                                                                </div>
                                                                <span className="labs-cat-name">{cat.isAll ? '(All)' : cat.name}</span>
                                                            </div>
                                                            <span className="labs-cat-count">({cat.count})</span>
                                                        </li>
                                                    );
                                                })}
                                                {filteredCategories.length === 0 && (
                                                    <li className="labs-dropdown-empty">No categories found</li>
                                                )}
                                            </ul>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>
                    </div>

                    {loading ? (
                        <div className="masonry-grid">
                            {[250, 300, 200, 350, 280, 220, 310, 260].map((height, i) => (
                                <div key={i} className="masonry-item skeleton-box" style={{ height: `${height}px` }}></div>
                            ))}
                        </div>
                    ) : (
                        <div className="masonry-grid">
                            {displayCreations.map((item) => (
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
                    
                    {!loading && displayCreations.length === 0 && (
                        <div style={{ textAlign: 'center', padding: '60px 0' }}>
                            <p className="text-secondary">No creations found.</p>
                        </div>
                    )}

                    <footer className="home-footer">
                        <p className="text-secondary text-sm">
                            All designs on this website were created by Afdal Ramdan Daman Huri
                        </p>
                        <p className="text-secondary text-sm" style={{ textAlign: 'right' }}>
                            © 2026 All rights reserved.
                        </p>
                    </footer>
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
