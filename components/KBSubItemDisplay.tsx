import React from 'react';
import { KBSubItem } from '../types';
import ImageZoom from './ImageZoom';
import ImageGallery from './ImageGallery';

interface KBSubItemDisplayProps {
  subItem: KBSubItem;
  highlight?: boolean;
}

const getEmbedUrl = (url: string | undefined) => {
  if (!url) return '';
  try {
    // Handle YouTube watch URLs
    const youtubeMatch = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&?\/]+)/);
    if (youtubeMatch && youtubeMatch[1]) {
      return `https://www.youtube.com/embed/${youtubeMatch[1]}`;
    }
    // Return original URL if it's not a YouTube watch link
    return url;
  } catch (e) {
    console.error('Error parsing video URL:', e);
    return '';
  }
};

const KBSubItemDisplay: React.FC<KBSubItemDisplayProps> = ({ subItem, highlight }) => {
  const containerStyle: React.CSSProperties = {};
  if (subItem.backgroundColor) containerStyle.backgroundColor = subItem.backgroundColor;

  return (
    <div
      id={`sub-${subItem.id}`}
      className={`p-4 bg-white rounded-lg border mb-4 transition-all ${highlight ? 'border-orange-500 ring-2 ring-orange-200' : 'border-gray-200'}`}
      style={containerStyle}
    >
      <h5 
        className="font-bold text-lg mb-3 text-slate-800"
        style={{ color: subItem.textColor || 'inherit' }}
      >
        {subItem.title}
      </h5>
      <div 
        className="leading-relaxed mb-4 whitespace-pre-wrap"
        dangerouslySetInnerHTML={{ __html: subItem.content || '' }}
      />
      
      {/* 标签 */}
      {subItem.tags && subItem.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {subItem.tags.map((tag, idx) => (
            <span key={idx} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-bold">
              {tag}
            </span>
          ))}
        </div>
      )}
      
      {/* 单张图片 */}
      {subItem.image && (
        <ImageZoom imageUrl={subItem.image} alt={subItem.title} />
      )}
      
      {/* 图册 */}
      {subItem.imageGallery && subItem.imageGallery.length > 0 && (
        <ImageGallery images={subItem.imageGallery} />
      )}
      
      {/* 视频 */}
      {subItem.video && (
        <div className="my-4">
          <div className="relative w-full rounded-xl overflow-hidden bg-gray-100" style={{ paddingBottom: '56.25%' }}>
            <iframe
              src={getEmbedUrl(subItem.video)}
              className="absolute top-0 left-0 w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default KBSubItemDisplay;
