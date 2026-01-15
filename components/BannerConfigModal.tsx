import React, { useState, useRef } from 'react';
import { GameKB } from '../types';

interface BannerConfigModalProps {
  game: GameKB;
  onClose: () => void;
  onSave: (bannerTitle: string, bannerLink: string, bannerImage: string) => void;
}

const BannerConfigModal: React.FC<BannerConfigModalProps> = ({ game, onClose, onSave }) => {
  const [bannerTitle, setBannerTitle] = useState(game.bannerTitle || '');
  const [bannerLink, setBannerLink] = useState(game.bannerLink || '');
  const [bannerImage, setBannerImage] = useState(game.bannerImage || '');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('請選擇圖片文件！');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert('圖片大小不能超過 5MB！');
      return;
    }

    setIsUploading(true);

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      setBannerImage(base64String);
      setIsUploading(false);
      
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    };
    reader.onerror = () => {
      alert('圖片讀取失敗，請重試！');
      setIsUploading(false);
    };
    reader.readAsDataURL(file);
  };

  const handleSave = () => {
    onSave(bannerTitle, bannerLink, bannerImage);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-2xl font-black text-slate-800">Banner 配置</h3>
          <p className="text-sm text-slate-500 mt-1">設置 Banner 圖片、標題和跳轉鏈接</p>
        </div>
        
        <div className="p-6 space-y-6">
          {/* Banner 标题 */}
          <div>
            <label className="block text-sm font-black text-slate-700 mb-2">
              Banner 標題 <span className="text-xs text-slate-400">(例如：傳說對決 v1.0.0)</span>
            </label>
            <input
              type="text"
              value={bannerTitle}
              onChange={(e) => setBannerTitle(e.target.value)}
              className="w-full px-4 py-3 bg-gray-50 rounded-xl border-2 border-gray-200 focus:border-orange-400 focus:outline-none text-slate-700 font-bold"
              placeholder="輸入 Banner 標題..."
            />
            <p className="text-xs text-slate-400 mt-1">標題將顯示在 Banner 底部，讓客服直觀了解當前遊戲版本</p>
          </div>

          {/* Banner 链接 */}
          <div>
            <label className="block text-sm font-black text-slate-700 mb-2">
              Banner 跳轉鏈接 <span className="text-xs text-slate-400">(選填)</span>
            </label>
            <input
              type="url"
              value={bannerLink}
              onChange={(e) => setBannerLink(e.target.value)}
              className="w-full px-4 py-3 bg-gray-50 rounded-xl border-2 border-gray-200 focus:border-orange-400 focus:outline-none text-slate-700 font-bold"
              placeholder="https://example.com"
            />
            <p className="text-xs text-slate-400 mt-1">設置後，點擊 Banner 或標題將跳轉到該鏈接</p>
          </div>

          {/* Banner 图片 */}
          <div>
            <label className="block text-sm font-black text-slate-700 mb-2">
              Banner 圖片
            </label>
            <div className="flex gap-3">
              <button
                onClick={() => fileInputRef.current?.click()}
                disabled={isUploading}
                className="px-4 py-3 bg-blue-500 hover:bg-blue-600 disabled:bg-blue-300 text-white rounded-xl font-bold text-sm transition-all"
              >
                {isUploading ? '⏳ 上傳中...' : '📷 選擇圖片'}
              </button>
              {bannerImage && (
                <button
                  onClick={() => setBannerImage('')}
                  className="px-4 py-3 bg-red-500 hover:bg-red-600 text-white rounded-xl font-bold text-sm transition-all"
                >
                  🗑️ 清除圖片
                </button>
              )}
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
            {bannerImage && (
              <div className="mt-4">
                <img 
                  src={bannerImage} 
                  alt="Banner 預覽" 
                  className="w-full h-48 object-cover rounded-xl border-2 border-gray-200"
                />
              </div>
            )}
            <p className="text-xs text-slate-400 mt-1">
              建議使用 1600×800（2:1）圖片；留空則使用封面圖作為 Banner
            </p>
          </div>
        </div>

        <div className="p-6 border-t border-gray-200 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-6 py-3 bg-gray-200 hover:bg-gray-300 text-slate-700 rounded-xl font-bold transition-all"
          >
            取消
          </button>
          <button
            onClick={handleSave}
            className="px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-xl font-bold transition-all"
          >
            💾 保存
          </button>
        </div>
      </div>
    </div>
  );
};

export default BannerConfigModal;
