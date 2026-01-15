import React from 'react';
import { GameKB } from '../types';
import BannerUploadButton from './BannerUploadButton';

interface BannerSectionProps {
  game: GameKB;
  isAdminLoggedIn: boolean;
  onUpdateBannerImage: (imageUrl: string) => void;
  onUpdateGame: (updatedGame: GameKB) => void;
  onEditGame: () => void;
}

const BannerSection: React.FC<BannerSectionProps> = ({ game, isAdminLoggedIn, onUpdateBannerImage, onUpdateGame, onEditGame }) => {
  // 优先使用 bannerImage，如果没有则使用 coverImage
  const bannerImageUrl = game.bannerImage || game.coverImage;

  const handleBannerClick = () => {
    if (game.bannerLink) {
      window.open(game.bannerLink, '_blank');
    }
  };

  const handleTitleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (game.bannerLink) {
      window.open(game.bannerLink, '_blank');
    }
  };

  return (
    <div 
      className="relative rounded-2xl overflow-hidden shadow-lg bg-gradient-to-r from-slate-200 to-slate-300 flex items-center justify-center"
      onClick={handleBannerClick}
      style={{ cursor: game.bannerLink ? 'pointer' : 'default', aspectRatio: '2 / 1', maxHeight: '260px', width: '100%' }}
    >
      <img 
        src={bannerImageUrl} 
        className="w-full h-full object-cover" 
        alt={game.name} 
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-transparent"></div>
      
      {bannerImageUrl && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            window.open(bannerImageUrl, '_blank');
          }}
          className="absolute top-4 left-4 bg-black/60 hover:bg-black/80 text-white px-3 py-1 rounded-full text-xs font-bold z-20"
        >
          查看完整圖片
        </button>
      )}
      
      {/* Banner 标题显示 */}
      {game.bannerTitle && (
        <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
          <div 
            onClick={handleTitleClick}
            className={`inline-block px-6 py-3 rounded-xl font-black text-xl text-white shadow-2xl backdrop-blur-sm border-2 border-white/30 ${
              game.bannerLink ? 'hover:bg-white/20 cursor-pointer transition-all hover:scale-105' : ''
            }`}
            style={{
              background: 'linear-gradient(135deg, rgba(255,255,255,0.25) 0%, rgba(255,255,255,0.1) 100%)',
            }}
          >
            {game.bannerTitle}
            {game.bannerLink && (
              <span className="ml-2 text-sm opacity-80">🔗</span>
            )}
          </div>
        </div>
      )}
      
      {/* 管理员操作按钮 */}
      {isAdminLoggedIn && (
        <div className="absolute top-4 right-4 flex gap-2 z-20">
          <BannerUploadButton
            game={game}
            onUpdateBannerImage={onUpdateBannerImage}
            onUpdateGame={onUpdateGame}
          />
          
          {/* 编辑游戏按钮 */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onEditGame();
            }}
            className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-xl font-bold text-sm shadow-lg transition-all"
            title="編輯遊戲"
          >
            ✏️ 編輯遊戲
          </button>
        </div>
      )}
    </div>
  );
};

export default BannerSection;
