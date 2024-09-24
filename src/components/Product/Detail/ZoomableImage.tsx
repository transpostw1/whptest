import React, { useState, useRef } from 'react';
import Image from 'next/image';

interface Props{
    src:any;
    alt:any;
}
const ZoomableImage:React.FC<Props>= ({src,alt}) => {
    const [isZoomed, setIsZoomed] = useState<boolean>(false);
    const [mousePosition, setMousePosition] = useState<any>({ x: 0, y: 0 });
    const imageRef = useRef<any>(null);

    const handleMouseEnter = () => {
        setIsZoomed(true);
    };

    const handleMouseLeave = () => {
        setIsZoomed(false);
    };

    const handleMouseMove = (e:any) => {
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
                    unoptimized
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