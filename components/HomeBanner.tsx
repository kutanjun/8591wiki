import React, { useState, useEffect } from 'react';
import { BannerItem } from '../types';

const HomeBanner: React.FC<{ banners: BannerItem[] }> = ({ banners }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (banners.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % banners.length);
    }, 5000); // 5 seconds per slide
    return () => clearInterval(interval);
  }, [banners.length]);

  if (banners.length === 0) return null;

  return (
    <div 
      className="relative w-full rounded-[2.5rem] overflow-hidden shadow-2xl mb-12 group glass-card border-4 border-white/50 bg-black"
      style={{ paddingBottom: '50%' }}
    >
      {banners.map((banner, index) => {
        const isCurrent = index === currentIndex;
        const Content = () => (
          <>
            <img
              src={banner.imageUrl}
              alt="Banner"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                window.open(banner.imageUrl, '_blank');
              }}
              className="absolute top-4 left-4 bg-black/60 hover:bg-black/80 text-white px-3 py-1 rounded-full text-xs font-bold z-20"
            >
              查看完整圖片
            </button>
            {banner.title && (
              <div className="absolute bottom-0 left-0 p-6 md:p-8 w-full pointer-events-none">
                <h3 className="text-white text-xl md:text-3xl font-black drop-shadow-lg line-clamp-2">
                  {banner.title}
                </h3>
              </div>
            )}
            {banner.linkUrl && (
               <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors pointer-events-none" />
            )}
          </>
        );

        return banner.linkUrl ? (
          <a
            key={banner.id}
            href={banner.linkUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out block ${
              isCurrent ? 'opacity-100 z-10 pointer-events-auto' : 'opacity-0 z-0 pointer-events-none'
            }`}
          >
            <Content />
          </a>
        ) : (
          <div
            key={banner.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              isCurrent ? 'opacity-100 z-10 pointer-events-auto' : 'opacity-0 z-0 pointer-events-none'
            }`}
          >
            <Content />
          </div>
        );
      })}
      
      {/* Indicators */}
      {banners.length > 1 && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 z-20">
          {banners.map((_, index) => (
            <button
              key={index}
              onClick={(e) => {
                e.stopPropagation();
                setCurrentIndex(index);
              }}
              className={`w-2.5 h-2.5 rounded-full transition-all ${
                index === currentIndex 
                  ? 'bg-white scale-125 shadow-lg w-8' 
                  : 'bg-white/50 hover:bg-white/80'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default HomeBanner;
