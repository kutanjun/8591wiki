import React, { useState } from 'react';
import { GameKB } from '../types';
import BannerConfigModal from './BannerConfigModal';

interface BannerUploadButtonProps {
  game: GameKB;
  onUpdateBannerImage: (imageUrl: string) => void;
  onUpdateGame?: (updatedGame: GameKB) => void;
}

const BannerUploadButton: React.FC<BannerUploadButtonProps> = ({ game, onUpdateBannerImage, onUpdateGame }) => {
  const [showConfigModal, setShowConfigModal] = useState(false);

  const handleSaveConfig = (bannerTitle: string, bannerLink: string, bannerImage: string) => {
    if (onUpdateGame) {
      const updatedGame = {
        ...game,
        bannerTitle: bannerTitle.trim() || undefined,
        bannerLink: bannerLink.trim() || undefined,
        bannerImage: bannerImage || undefined,
      };
      onUpdateGame(updatedGame);
    } else {
      // 如果没有 onUpdateGame，只更新图片
      if (bannerImage) {
        onUpdateBannerImage(bannerImage);
      }
    }
  };

  return (
    <>
      <button
        onClick={() => setShowConfigModal(true)}
        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-3 rounded-xl font-bold text-sm shadow-lg transition-all"
        title="配置 Banner（圖片、標題、鏈接）"
      >
        ⚙️ 配置 Banner
      </button>
      
      {showConfigModal && (
        <BannerConfigModal
          game={game}
          onClose={() => setShowConfigModal(false)}
          onSave={handleSaveConfig}
        />
      )}
    </>
  );
};

export default BannerUploadButton;
