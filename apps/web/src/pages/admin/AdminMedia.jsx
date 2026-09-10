import { useState, useEffect } from 'react';
import { adminApi } from '../../lib/api';
import CloudinaryUploadWidget from '../../components/admin/CloudinaryUploadWidget';
import { FiImage, FiCopy, FiTrash2, FiSearch, FiExternalLink } from 'react-icons/fi';
import './AdminMedia.css';

export default function AdminMedia() {
    const [mediaItems, setMediaItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [copiedId, setCopiedId] = useState(null);

    const fetchMedia = () => {
        setLoading(true);
        adminApi.getMedia()
            .then(data => setMediaItems(data || []))
            .catch(err => console.error('Failed to fetch media:', err))
            .finally(() => setLoading(false));
    };

    useEffect(() => {
        fetchMedia();
    }, []);

    const handleUploadSuccess = async (url, result) => {
        try {
            const info = result?.info || {};
            await adminApi.saveMedia({
                publicId: info.public_id || `upload_${Date.now()}`,
                url: url,
                secureUrl: info.secure_url || url,
                format: info.format || 'jpg',
                width: info.width || 0,
                height: info.height || 0,
                bytes: info.bytes || 0,
                folder: info.folder || 'arsikarya',
            });
            fetchMedia();
        } catch (err) {
            console.error('Failed to save media metadata:', err);
        }
    };

    const handleCopyUrl = (url, id) => {
        navigator.clipboard.writeText(url);
        setCopiedId(id);
        setTimeout(() => setCopiedId(null), 2000);
    };

    const handleDelete = async (id, publicId) => {
        if (!confirm(`Apakah Anda yakin ingin menghapus media "${publicId}"?`)) return;
        try {
            await adminApi.deleteMedia(id);
            fetchMedia();
        } catch (err) {
            alert('⚠️ Gagal menghapus media: ' + err.message);
        }
    };

    const filteredMedia = mediaItems.filter(item => {
        const query = searchQuery.toLowerCase();
        return !searchQuery || 
            item.publicId?.toLowerCase().includes(query) ||
            item.url?.toLowerCase().includes(query) ||
            item.format?.toLowerCase().includes(query);
    });

    const formatBytes = (bytes) => {
        if (!bytes) return '-';
        if (bytes < 1024) return bytes + ' B';
        if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
        return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
    };

    if (loading) {
        return (
            <div style={{ padding: '60px 0', textAlign: 'center', color: '#666' }}>
                <p>Memuat media library Cloudinary...</p>
            </div>
        );
    }

    return (
        <div className="admin-media-page">
            <div className="admin-page-header">
                <div>
                    <h3 className="page-heading">Media Library (Cloudinary)</h3>
                    <p className="page-subheading">Kelola berkas aset gambar proyek, layanan, artikel, dan situs Arsi Karya.</p>
                </div>
                <CloudinaryUploadWidget onUploadSuccess={handleUploadSuccess} />
            </div>

            {/* Search Bar */}
            <div className="filter-bar-card">
                <div className="search-wrap">
                    <FiSearch className="search-icon" />
                    <input 
                        type="text" 
                        className="search-input" 
                        placeholder="Cari nama file, Public ID, format..." 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
            </div>

            {/* Media Grid */}
            {filteredMedia.length > 0 ? (
                <div className="media-grid">
                    {filteredMedia.map((item) => (
                        <div key={item.id} className="media-card">
                            <div className="media-thumb-container">
                                <img src={item.url} alt={item.publicId} className="media-img" />
                                <div className="media-overlay-actions">
                                    <button 
                                        onClick={() => handleCopyUrl(item.url, item.id)} 
                                        className="btn-overlay"
                                        title="Salin URL"
                                    >
                                        <FiCopy size={14} />
                                        <span>{copiedId === item.id ? 'Tersalin!' : 'Copy URL'}</span>
                                    </button>
                                    <a 
                                        href={item.url} 
                                        target="_blank" 
                                        rel="noreferrer" 
                                        className="btn-overlay"
                                        title="Buka Gambar Original"
                                    >
                                        <FiExternalLink size={14} />
                                    </a>
                                </div>
                            </div>
                            <div className="media-card-info">
                                <span className="media-public-id" title={item.publicId}>
                                    {item.publicId?.split('/').pop() || item.publicId}
                                </span>
                                <div className="media-meta-row">
                                    <span>{item.format?.toUpperCase() || 'IMG'}</span>
                                    <span>•</span>
                                    <span>{item.width && item.height ? `${item.width}x${item.height}` : '-'}</span>
                                    <span>•</span>
                                    <span>{formatBytes(item.bytes)}</span>
                                </div>
                                <button 
                                    onClick={() => handleDelete(item.id, item.publicId)} 
                                    className="btn-delete-media"
                                >
                                    <FiTrash2 size={13} style={{ marginRight: '4px' }} />
                                    Hapus Aset
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="empty-gallery-box" style={{ padding: '60px' }}>
                    Belum ada media tersimpan di NeonDB. Gunakan tombol "Upload Gambar" di atas untuk menambahkan media.
                </div>
            )}
        </div>
    );
}
