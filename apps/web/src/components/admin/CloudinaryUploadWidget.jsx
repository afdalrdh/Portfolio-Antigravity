import { useEffect, useRef } from 'react';

const CloudinaryUploadWidget = ({ onUploadSuccess, buttonText = "Upload Image", className = "btn-outline" }) => {
    const cloudinaryRef = useRef();
    const widgetRef = useRef();

    useEffect(() => {
        const initWidget = () => {
            cloudinaryRef.current = window.cloudinary;
            widgetRef.current = cloudinaryRef.current.createUploadWidget({
                cloudName: 'dd6rhidl4',
                uploadPreset: 'portfolio_uploads',
                sources: ['local', 'url', 'camera', 'google_drive'],
                multiple: false,
                clientAllowedFormats: ['image'],
                maxImageFileSize: 5000000, // 5MB
                theme: 'minimal'
            }, function (error, result) {
                if (!error && result && result.event === "success") {
                    onUploadSuccess(result.info.secure_url);
                }
            });
        };

        if (!document.getElementById('cloudinary-widget-script')) {
            const script = document.createElement('script');
            script.id = 'cloudinary-widget-script';
            script.src = 'https://upload-widget.cloudinary.com/global/all.js';
            script.async = true;
            script.onload = () => {
                initWidget();
            };
            document.body.appendChild(script);
        } else if (window.cloudinary) {
            initWidget();
        }
    }, [onUploadSuccess]);

    return (
        <button 
            type="button" 
            className={className} 
            style={{ padding: '6px 12px', fontSize: '0.85rem', marginLeft: '8px' }}
            onClick={() => widgetRef.current?.open()}
        >
            {buttonText}
        </button>
    );
};

export default CloudinaryUploadWidget;
