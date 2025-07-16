"use client";
import Image from "next/image";
import { useState } from "react";

interface OptimizedImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  priority?: boolean;
  quality?: number;
  loading?: "lazy" | "eager";
  sizes?: string;
  onLoad?: () => void;
  onError?: () => void;
  placeholder?: "blur" | "empty";
  blurDataURL?: string;
}

const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  width,
  height,
  className = "",
  priority = false,
  quality = 75, // Reduced default quality
  loading = "lazy",
  sizes = "(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw",
  onLoad,
  onError,
  placeholder = "blur",
  blurDataURL = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  const handleLoad = () => {
    setIsLoaded(true);
    onLoad?.();
  };

  const handleError = () => {
    setHasError(true);
    onError?.();
  };

  // Reduce image dimensions for mobile
  const optimizedWidth = width > 800 ? Math.floor(width * 0.8) : width;
  const optimizedHeight = height > 600 ? Math.floor(height * 0.8) : height;

  if (hasError) {
    return (
      <div 
        className={`bg-gray-200 flex items-center justify-center ${className}`}
        style={{ width: optimizedWidth, height: optimizedHeight }}
      >
        <span className="text-gray-500 text-sm">Image unavailable</span>
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <Image
        src={src}
        alt={alt}
        width={optimizedWidth}
        height={optimizedHeight}
        priority={priority}
        quality={quality}
        loading={loading}
        sizes={sizes}
        placeholder={placeholder}
        blurDataURL={blurDataURL}
        onLoad={handleLoad}
        onError={handleError}
        className={`transition-opacity duration-300 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        } ${className}`}
        style={{
          objectFit: 'cover',
          maxWidth: '100%',
          height: 'auto'
        }}
      />
      
      {!isLoaded && (
        <div 
          className="absolute inset-0 bg-gray-100 animate-pulse flex items-center justify-center"
          style={{ width: optimizedWidth, height: optimizedHeight }}
        >
          <div className="text-gray-400 text-xs">Loading...</div>
        </div>
      )}
    </div>
  );
};

export default OptimizedImage; 