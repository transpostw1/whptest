"use client";
import { useEffect } from 'react';

const CriticalCSS = () => {
  useEffect(() => {
    // Inline critical CSS for above-the-fold content
    const criticalCSS = `
      /* Critical CSS for above-the-fold content */
      .slider-block {
        position: relative;
        width: 100%;
        margin-bottom: 1px;
      }
      
      .slider-main {
        width: 100%;
      }
      
      .slider-item {
        width: 100%;
      }
      
      .slider-item img {
        width: 100%;
        height: auto;
        display: block;
      }
      
      /* Critical layout styles */
      .overflow-x-hidden {
        overflow-x: hidden;
      }
      
      /* Critical navigation styles */
      .w-full {
        width: 100%;
      }
      
      /* Critical image styles */
      .object-cover {
        object-fit: cover;
      }
      
      .object-contain {
        object-fit: contain;
      }
      
      /* Critical loading states */
      .animate-pulse {
        animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
      }
      
      @keyframes pulse {
        0%, 100% {
          opacity: 1;
        }
        50% {
          opacity: .5;
        }
      }
      
      /* Critical responsive styles */
      @media (max-width: 768px) {
        .md\\:hidden {
          display: none;
        }
      }
      
      @media (min-width: 769px) {
        .md\\:block {
          display: block;
        }
      }
    `;

    // Create style element and inject critical CSS
    const style = document.createElement('style');
    style.id = 'critical-css';
    style.textContent = criticalCSS;
    
    // Insert at the beginning of head for highest priority
    const head = document.head;
    if (head.firstChild) {
      head.insertBefore(style, head.firstChild);
    } else {
      head.appendChild(style);
    }

    // Preload critical fonts
    const fontPreload = document.createElement('link');
    fontPreload.rel = 'preload';
    fontPreload.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300&display=swap';
    fontPreload.as = 'style';
    fontPreload.onload = () => {
      const fontLink = document.createElement('link');
      fontLink.rel = 'stylesheet';
      fontLink.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300&display=swap';
      document.head.appendChild(fontLink);
    };
    document.head.appendChild(fontPreload);

    // Preload critical images
    const criticalImages = [
      '/images/other/main_logo.png',
      '/images/other/logo2.png'
    ];

    criticalImages.forEach(src => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = src;
      document.head.appendChild(link);
    });

    return () => {
      // Cleanup
      const existingStyle = document.getElementById('critical-css');
      if (existingStyle) {
        existingStyle.remove();
      }
    };
  }, []);

  return null;
};

export default CriticalCSS; 