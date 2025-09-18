import React, { useState } from 'react';

const ImageDebug = ({ src, alt, className = "w-full h-64 object-contain bg-gray-100" }) => {
  const [imageStatus, setImageStatus] = useState('loading');
  const [error, setError] = useState(null);

  const handleLoad = () => {
    setImageStatus('loaded');
    setError(null);
  };

  const handleError = (e) => {
    setImageStatus('error');
    setError(e.target.src);
    console.error('Image failed to load:', e.target.src);
  };

  return (
    <div className="relative">
      <img
        src={src}
        alt={alt}
        className={className}
        onLoad={handleLoad}
        onError={handleError}
      />
      {imageStatus === 'error' && (
        <div className="absolute inset-0 bg-red-100 flex items-center justify-center text-red-600 text-sm">
          <div className="text-center">
            <div>❌ Image failed to load</div>
            <div className="text-xs mt-1 break-all">{error}</div>
          </div>
        </div>
      )}
      {imageStatus === 'loading' && (
        <div className="absolute inset-0 bg-gray-100 flex items-center justify-center text-gray-600 text-sm">
          <div>⏳ Loading...</div>
        </div>
      )}
    </div>
  );
};

export default ImageDebug;
