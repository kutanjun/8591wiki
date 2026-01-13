import React, { useState } from 'react';

const ImageZoom: React.FC<{ imageUrl: string; alt: string }> = ({ imageUrl, alt }) => {
  const [isZoomed, setIsZoomed] = useState(false);

  const [hasError, setHasError] = useState(false);

  const handleImageClick = () => {
    if (!hasError) {
      setIsZoomed(true);
    }
  };

  const handleCloseZoom = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      setIsZoomed(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setIsZoomed(false);
    }
  };

  if (hasError) {
    return (
      <div className="my-4 p-4 bg-red-50 rounded-xl border border-red-200 text-red-500 text-sm font-bold flex items-center gap-2">
        <span>⚠️ 圖片加載失敗，請檢查 URL 是否正確</span>
        <a href={imageUrl} target="_blank" rel="noreferrer" className="underline ml-2">
          在新窗口打開查看
        </a>
      </div>
    );
  }

  return (
    <>
      <div className="my-4 cursor-pointer hover:opacity-90 transition-opacity group" onClick={handleImageClick}>
        <div className="relative inline-block w-full">
          <img 
            src={imageUrl} 
            alt={alt}
            referrerPolicy="no-referrer"
            className="w-full rounded-xl border border-gray-200 bg-slate-50"
            style={{ maxHeight: '600px', objectFit: 'contain' }}
            onError={() => setHasError(true)}
          />
          <div className="absolute top-2 left-2 bg-black/50 text-white px-3 py-1 rounded-full text-xs opacity-0 group-hover:opacity-100 transition-opacity">
            點擊放大
          </div>
        </div>
      </div>

      {/* 放大Modal */}
      {isZoomed && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={handleCloseZoom}
          onKeyDown={handleKeyDown}
          tabIndex={0}
        >
          <button
            onClick={handleCloseZoom}
            className="absolute top-4 right-4 bg-white/20 hover:bg-white/30 text-white p-3 rounded-full transition-all text-2xl z-10"
          >
            ✕
          </button>
          <img
            src={imageUrl}
            alt={alt}
            referrerPolicy="no-referrer"
            className="max-w-full max-h-full w-auto h-auto object-contain"
            onClick={(e) => e.stopPropagation()}
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = 'none';
            }}
          />
        </div>
      )}
    </>
  );
};

export default ImageZoom;
