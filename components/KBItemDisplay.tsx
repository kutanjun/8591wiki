import React from 'react';
import { KBItem } from '../types';
import KBSubItemDisplay from './KBSubItemDisplay';

interface KBItemDisplayProps {
  item: KBItem;
  highlightAnchor?: string;
}

const KBItemDisplay: React.FC<KBItemDisplayProps> = ({ item, highlightAnchor }) => {
  const style: React.CSSProperties = {};
  if (item.textColor) style.color = item.textColor;
  if (item.backgroundColor) style.backgroundColor = item.backgroundColor;

  // 如果有子板块，使用新的层级结构
  if (item.subItems && item.subItems.length > 0) {
    return (
      <div
        id={`item-${item.id}`}
        className={`p-6 bg-gray-50 rounded-xl border hover:bg-white hover:shadow-md transition-all mb-6 ${highlightAnchor === `item-${item.id}` ? 'border-orange-500 ring-2 ring-orange-200' : 'border-gray-200'}`}
        style={style}
      >
        <h4 className="font-bold text-2xl mb-6" style={{ color: item.textColor || 'inherit' }}>
          {item.title}
        </h4>
        <div className="space-y-4">
          {item.subItems.map((subItem) => (
            <KBSubItemDisplay
              key={subItem.id}
              subItem={subItem}
              highlight={highlightAnchor === `sub-${subItem.id}`}
            />
          ))}
        </div>
      </div>
    );
  }

  // 兼容旧格式
  return (
    <div className="p-6 bg-gray-50 rounded-xl border border-gray-200 hover:bg-white hover:shadow-md transition-all" style={style}>
      <h4 className="font-bold text-slate-800 text-lg mb-3" style={{ color: item.textColor || 'inherit' }}>
        {item.title}
      </h4>
      <div 
        className="leading-relaxed text-slate-600"
        dangerouslySetInnerHTML={{ __html: item.content }}
      />
    </div>
  );
};

export default KBItemDisplay;
