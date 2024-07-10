import React, { useState, useRef } from 'react';
import Image from 'next/image';

const ZoomableImage = ({ src, alt }) => {
    const [isZoomed, setIsZoomed] = useState(false);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const imageRef = useRef(null);

    const handleMouseEnter = () => {
        setIsZoomed(true);
    };

    const handleMouseLeave = () => {
        setIsZoomed(false);
    };

    const handleMouseMove = (e) => {
        if (imageRef.current) {
            const { left, top, width, height } = imageRef.current.getBoundingClientRect();
            const x = (e.clientX - left) / width * 100;
            const y = (e.clientY - top) / height * 100;
            setMousePosition({ x, y });
        }
    };

    return (
        <div
            className="zoomable-image-container"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onMouseMove={handleMouseMove}
        >
            <div className={`zoomable-image ${isZoomed ? 'blurred' : ''}`}>
                <Image
                    ref={imageRef}
                    src={src}
                    alt={alt}
                    layout="fill" // Adjust layout as per your design needs
                    objectFit="contain" // Adjust objectFit as per your design needs
                />
            </div>

            {isZoomed && (
                <div
                    className="zoomed-image"
                    style={{
                        backgroundImage: `url(${src})`,
                        backgroundPosition: `${mousePosition.x}% ${mousePosition.y}%`
                    }}
                />
            )}
        </div>
    );
};

export default ZoomableImage;