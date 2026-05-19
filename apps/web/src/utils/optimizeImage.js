export function optimizeImage(url) {
    if (!url) return '';
    
    // Check if it is a Cloudinary URL
    if (url.includes('res.cloudinary.com')) {
        // Only apply if it doesn't already have formatting parameters
        if (!url.includes('f_auto') && !url.includes('q_auto')) {
            // Insert optimization parameters right after /upload/
            return url.replace('/upload/', '/upload/f_auto,q_auto/');
        }
    }
    
    return url;
}
