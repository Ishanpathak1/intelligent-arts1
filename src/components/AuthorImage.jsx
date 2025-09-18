import React, { useState } from 'react';

const AuthorImage = ({ 
  src, 
  alt, 
  className = "w-full h-64 object-contain bg-gray-100",
  fallbackSrc = "/default-author.webp"
}) => {
  const [imgSrc, setImgSrc] = useState(src);
  const [hasError, setHasError] = useState(false);

  const handleError = () => {
    if (!hasError) {
      setHasError(true);
      setImgSrc(fallbackSrc);
    }
  };

  return (
    <img
      src={imgSrc}
      alt={alt}
      className={className}
      onError={handleError}
    />
  );
};

export default AuthorImage;
