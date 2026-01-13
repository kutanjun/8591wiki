
import React, { useState, useEffect } from 'react';
import { GameKB, GameCategory, SectionType, KBItem, CustomSectionType, UpcomingGame, BannerItem } from '../types';
import GameEditor from './GameEditor';

interface AdminPanelProps {
  games: GameKB[];
  onAddGame: (game: GameKB) => void;
  onUpdateGame: (game: GameKB) => void;
  onUpdateGameSection: (gameId: string, sectionType: string, items: KBItem[]) => void;
  onLogout?: () => void;
  customSectionTypes: CustomSectionType[];
  onAddCustomSectionType: (name: string) => void;
  onDeleteCustomSectionType: (id: string) => void;
  editingGameId?: string;
  getAllSectionTypes?: () => string[];
  onAddSectionType?: (name: string) => void;
  onDeleteSectionType?: (name: string) => void;
  onRenameSectionType?: (oldName: string, newName: string) => void;
  onImportGames?: (games: GameKB[]) => void;
  upcomingGames: UpcomingGame[];
  onUpdateUpcomingGames: (games: UpcomingGame[]) => void;
  hotGameIds: string[];
  onUpdateHotGameIds: (ids: string[]) => void;
  banners: BannerItem[];
  onUpdateBanners: (banners: BannerItem[]) => void;
  onImportBackup?: (data: any) => void;
  onClearSearchHistory?: () => void;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ 
  games, 
  onAddGame, 
  onUpdateGame, 
  onUpdateGameSection,
  onLogout,
  customSectionTypes,
  onAddCustomSectionType,
  onDeleteCustomSectionType,
  editingGameId,
  getAllSectionTypes,
  onAddSectionType,
  onDeleteSectionType,
  onRenameSectionType,
  onImportGames,
  upcomingGames,
  onUpdateUpcomingGames,
  hotGameIds,
  onUpdateHotGameIds,
  banners,
  onUpdateBanners,
  onImportBackup,
  onClearSearchHistory
}) => {
  const [editingGame, setEditingGame] = useState<GameKB | null>(null);
  const [newSectionTypeName, setNewSectionTypeName] = useState('');
  const [showSectionTypeManager, setShowSectionTypeManager] = useState(false);
  const [showExtrasManager, setShowExtrasManager] = useState(false);

  // Upcoming Games Form State
  const [newUpcomingName, setNewUpcomingName] = useState('');
  const [newUpcomingDate, setNewUpcomingDate] = useState('');
  const [newUpcomingHighlight, setNewUpcomingHighlight] = useState('');
  const [editingUpcomingId, setEditingUpcomingId] = useState<string | null>(null);

  // Hot Games Form State
  const [selectedHotGameId, setSelectedHotGameId] = useState('');

  // Banner Form State
  const [newBannerImage, setNewBannerImage] = useState('');
  const [newBannerImageUrl, setNewBannerImageUrl] = useState('');
  const [newBannerLink, setNewBannerLink] = useState('');
  const [newBannerTitle, setNewBannerTitle] = useState('');
  const [isUploadingBanner, setIsUploadingBanner] = useState(false);
  const bannerFileInputRef = React.useRef<HTMLInputElement>(null);

  const handleBannerFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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

    setIsUploadingBanner(true);

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      setNewBannerImage(base64String);
      setIsUploadingBanner(false);
      
      if (bannerFileInputRef.current) {
        bannerFileInputRef.current.value = '';
      }
    };
    reader.onerror = () => {
      alert('圖片讀取失敗，請重試！');
      setIsUploadingBanner(false);
    };
    reader.readAsDataURL(file);
  };

  // 如果传入了editingGameId，自动打开编辑模式
  useEffect(() => {
    if (editingGameId && !editingGame) {
      const gameToEdit = games.find(g => g.id === editingGameId);
      if (gameToEdit) {
        setEditingGame(gameToEdit);
      }
    }
  }, [editingGameId, games, editingGame]);
  const [name, setName] = useState('');
  const [category, setCategory] = useState<GameCategory>(GameCategory.MOBILE);
  const [coverImage, setCoverImage] = useState('https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?q=80&w=2071&auto=format&fit=crop');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name) {
      alert('⚠️ 請輸入遊戲名稱！');
      return;
    }

    const newGame: GameKB = {
      id: Date.now().toString(),
      name,
      category,
      coverImage,
      sections: getAllSectionTypes ? getAllSectionTypes().map(type => ({
        type,
        items: []
      })) : Object.values(SectionType).map(type => ({
        type,
        items: []
      }))
    };

    onAddGame(newGame);
    setName('');
    setCoverImage('https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?q=80&w=2071&auto=format&fit=crop');
    alert('🎉 新板塊已成功添加！');
  };

  // 如果正在編輯遊戲，顯示編輯器
  if (editingGame) {
    return (
      <GameEditor
        game={editingGame}
        onSave={(updatedGame) => {
          onUpdateGame(updatedGame);
          setEditingGame(null);
        }}
        onCancel={() => setEditingGame(null)}
        onUpdateSection={onUpdateGameSection}
        customSectionTypes={customSectionTypes}
        onAddCustomSectionType={onAddCustomSectionType}
        onDeleteCustomSectionType={onDeleteCustomSectionType}
        getAllSectionTypes={getAllSectionTypes}
        onAddSectionType={onAddSectionType}
        onDeleteSectionType={onDeleteSectionType}
        onRenameSectionType={onRenameSectionType}
      />
    );
  }

  return (
    <div className="max-w-4xl mx-auto mt-6">
      <div className="glass-card rounded-[4rem] p-16 border-8 border-white shadow-2xl shadow-slate-200 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-orange-400 to-pink-400 opacity-5 -mr-32 -mt-32 rounded-full blur-3xl"></div>
        
        <div className="flex items-center justify-between mb-16">
          <div className="flex items-center gap-6">
            <div className="w-16 h-16 bg-slate-800 rounded-3xl flex items-center justify-center text-white text-3xl shadow-2xl rotate-6">⚙️</div>
            <div>
              <h2 className="text-4xl font-black text-slate-800 acg-title">控制中心</h2>
              <p className="text-slate-400 font-bold mt-1">創建知識庫並分發培訓內容</p>
            </div>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => setShowExtrasManager(!showExtrasManager)}
              className="px-6 py-3 bg-pink-500 text-white rounded-xl font-bold hover:bg-pink-600 transition-all"
            >
              {showExtrasManager ? '📅 隱藏首頁板塊' : '📅 管理首頁板塊'}
            </button>
            <button
              onClick={() => setShowSectionTypeManager(!showSectionTypeManager)}
              className="px-6 py-3 bg-purple-500 text-white rounded-xl font-bold hover:bg-purple-600 transition-all"
            >
              {showSectionTypeManager ? '📋 隱藏板塊類型' : '⚙️ 管理板塊類型'}
            </button>
            {onLogout && (
              <button
                onClick={onLogout}
                className="px-6 py-3 bg-gray-200 text-gray-700 rounded-xl font-bold hover:bg-gray-300 transition-all"
              >
                登出
              </button>
            )}
          </div>
        </div>

        {/* 首页板块管理 (Upcoming & Hot Games) */}
        {showExtrasManager && (
          <div className="mb-12 space-y-8">
            {/* 即将上线/更新游戏管理 */}
            <div className="p-8 bg-white/80 rounded-[2.5rem] border-4 border-pink-200 shadow-xl">
              <h3 className="text-2xl font-black text-slate-800 mb-6 flex items-center gap-3">
                <span className="text-3xl">📅</span>
                即將上線/更新遊戲管理
              </h3>

              {/* Add New Upcoming Game */}
              <div className="mb-8 p-6 bg-pink-50 rounded-2xl border-2 border-pink-200">
                <label className="text-sm font-black text-pink-700 uppercase tracking-widest mb-4 block">
                  {editingUpcomingId ? '編輯遊戲' : '新增即將上線/更新遊戲'}
                </label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <input
                    type="text"
                    value={newUpcomingName}
                    onChange={(e) => setNewUpcomingName(e.target.value)}
                    placeholder="遊戲名稱"
                    className="px-4 py-3 bg-white rounded-xl border-2 border-pink-200 outline-none focus:border-pink-400 font-bold"
                  />
                  <input
                    type="date"
                    value={newUpcomingDate}
                    onChange={(e) => setNewUpcomingDate(e.target.value)}
                    className="px-4 py-3 bg-white rounded-xl border-2 border-pink-200 outline-none focus:border-pink-400 font-bold"
                  />
                  <input
                    type="text"
                    value={newUpcomingHighlight}
                    onChange={(e) => setNewUpcomingHighlight(e.target.value)}
                    placeholder="亮點 (e.g. 全新版本)"
                    className="px-4 py-3 bg-white rounded-xl border-2 border-pink-200 outline-none focus:border-pink-400 font-bold"
                  />
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => {
                      if (newUpcomingName && newUpcomingDate && newUpcomingHighlight) {
                        if (editingUpcomingId) {
                          onUpdateUpcomingGames(upcomingGames.map(g => 
                            g.id === editingUpcomingId 
                              ? { ...g, name: newUpcomingName, releaseDate: newUpcomingDate, highlight: newUpcomingHighlight }
                              : g
                          ));
                          setEditingUpcomingId(null);
                        } else {
                          const newItem: UpcomingGame = {
                            id: Date.now().toString(),
                            name: newUpcomingName,
                            releaseDate: newUpcomingDate,
                            highlight: newUpcomingHighlight
                          };
                          onUpdateUpcomingGames([...upcomingGames, newItem]);
                        }
                        setNewUpcomingName('');
                        setNewUpcomingDate('');
                        setNewUpcomingHighlight('');
                      }
                    }}
                    className="flex-1 py-3 bg-pink-500 text-white rounded-xl font-bold hover:bg-pink-600 transition-all shadow-lg"
                  >
                    {editingUpcomingId ? '💾 保存修改' : '➕ 添加到列表'}
                  </button>
                  {editingUpcomingId && (
                    <button
                      onClick={() => {
                        setEditingUpcomingId(null);
                        setNewUpcomingName('');
                        setNewUpcomingDate('');
                        setNewUpcomingHighlight('');
                      }}
                      className="px-6 py-3 bg-gray-200 text-gray-700 rounded-xl font-bold hover:bg-gray-300 transition-all"
                    >
                      取消
                    </button>
                  )}
                </div>
              </div>

              {/* List Upcoming Games */}
              <div className="space-y-3">
                {upcomingGames.map((item, index) => (
                  <div key={item.id} className="flex items-center justify-between p-4 bg-white rounded-xl border-2 border-gray-100">
                    <div className="flex items-center gap-4">
                      <div className="flex flex-col gap-1">
                        <button
                          onClick={() => {
                            if (index > 0) {
                              const newGames = [...upcomingGames];
                              [newGames[index - 1], newGames[index]] = [newGames[index], newGames[index - 1]];
                              onUpdateUpcomingGames(newGames);
                            }
                          }}
                          disabled={index === 0}
                          className="text-xs text-gray-400 hover:text-pink-500 disabled:opacity-20 font-bold"
                        >
                          ▲
                        </button>
                        <button
                          onClick={() => {
                            if (index < upcomingGames.length - 1) {
                              const newGames = [...upcomingGames];
                              [newGames[index], newGames[index + 1]] = [newGames[index + 1], newGames[index]];
                              onUpdateUpcomingGames(newGames);
                            }
                          }}
                          disabled={index === upcomingGames.length - 1}
                          className="text-xs text-gray-400 hover:text-pink-500 disabled:opacity-20 font-bold"
                        >
                          ▼
                        </button>
                      </div>
                      <span className="px-3 py-1 bg-pink-100 text-pink-600 rounded-lg font-black text-sm">
                        {item.releaseDate}
                      </span>
                      <span className="font-bold text-slate-800">{item.name}</span>
                      <span className="text-sm text-slate-500">({item.highlight})</span>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          setEditingUpcomingId(item.id);
                          setNewUpcomingName(item.name);
                          setNewUpcomingDate(item.releaseDate);
                          setNewUpcomingHighlight(item.highlight);
                        }}
                        className="px-3 py-1 bg-blue-100 text-blue-500 rounded-lg font-bold hover:bg-blue-200 transition-all text-sm"
                      >
                        編輯
                      </button>
                      <button
                        onClick={() => {
                          onUpdateUpcomingGames(upcomingGames.filter(g => g.id !== item.id));
                        }}
                        className="px-3 py-1 bg-red-100 text-red-500 rounded-lg font-bold hover:bg-red-200 transition-all text-sm"
                      >
                        刪除
                      </button>
                    </div>
                  </div>
                ))}
                {upcomingGames.length === 0 && (
                  <p className="text-center text-slate-400 py-4">暫無數據</p>
                )}
              </div>
            </div>

            {/* 首頁 Banner 管理 */}
            <div className="p-8 bg-white/80 rounded-[2.5rem] border-4 border-blue-200 shadow-xl">
              <h3 className="text-2xl font-black text-slate-800 mb-6 flex items-center gap-3">
                <span className="text-3xl">🖼️</span>
                首頁 Banner 管理 (最多5張)
              </h3>

              {/* Add Banner */}
              <div className="mb-8 p-6 bg-blue-50 rounded-2xl border-2 border-blue-200">
                <label className="text-sm font-black text-blue-700 uppercase tracking-widest mb-4 block">
                  添加新 Banner
                </label>
                <div className="space-y-4">
                  <div className="flex flex-col md:flex-row gap-4 items-start">
                     {/* Image Upload */}
                     <div className="flex-1 w-full">
                        <div className="flex gap-3 mb-3">
                          <button
                            onClick={() => bannerFileInputRef.current?.click()}
                            disabled={isUploadingBanner}
                            className="px-4 py-3 bg-blue-500 hover:bg-blue-600 disabled:bg-blue-300 text-white rounded-xl font-bold text-sm transition-all"
                          >
                            {isUploadingBanner ? '⏳ 上傳中...' : '📷 選擇圖片'}
                          </button>
                          {newBannerImage && (
                            <button
                              onClick={() => setNewBannerImage('')}
                              className="px-4 py-3 bg-red-500 hover:bg-red-600 text-white rounded-xl font-bold text-sm transition-all"
                            >
                              🗑️ 清除
                            </button>
                          )}
                        </div>
                        <input
                          ref={bannerFileInputRef}
                          type="file"
                          accept="image/*"
                          onChange={handleBannerFileChange}
                          className="hidden"
                        />
                        {(newBannerImage || newBannerImageUrl) && (
                          <img 
                            src={newBannerImage || newBannerImageUrl} 
                            alt="Preview" 
                            className="w-full h-32 object-cover rounded-xl border-2 border-gray-200"
                          />
                        )}
                     </div>

                     {/* Link Input & Add Button */}
                     <div className="flex-1 w-full flex flex-col gap-3">
                        <input
                          type="url"
                          value={newBannerImageUrl}
                          onChange={(e) => setNewBannerImageUrl(e.target.value)}
                          placeholder="圖片URL（可選，使用外部鏈接可避免亂碼）"
                          className="w-full px-4 py-3 bg-white rounded-xl border-2 border-blue-200 outline-none focus:border-blue-400 font-bold"
                        />
                        <input
                          type="text"
                          value={newBannerTitle}
                          onChange={(e) => setNewBannerTitle(e.target.value)}
                          placeholder="Banner 標題/描述 (選填)"
                          className="w-full px-4 py-3 bg-white rounded-xl border-2 border-blue-200 outline-none focus:border-blue-400 font-bold"
                        />
                        <input
                          type="url"
                          value={newBannerLink}
                          onChange={(e) => setNewBannerLink(e.target.value)}
                          placeholder="跳轉鏈接 (選填)"
                          className="w-full px-4 py-3 bg-white rounded-xl border-2 border-blue-200 outline-none focus:border-blue-400 font-bold"
                        />
                        <button
                          onClick={() => {
                            if (!newBannerImage && !newBannerImageUrl) {
                              alert('請先上傳圖片或填寫圖片URL！');
                              return;
                            }
                            if (banners.length >= 5) {
                              alert('最多只能添加5張 Banner！');
                              return;
                            }
                            const newBanner: BannerItem = {
                              id: Date.now().toString(),
                              imageUrl: newBannerImage || newBannerImageUrl,
                              linkUrl: newBannerLink.trim() || undefined,
                              title: newBannerTitle.trim() || undefined
                            };
                            onUpdateBanners([...banners, newBanner]);
                            setNewBannerImage('');
                            setNewBannerImageUrl('');
                            setNewBannerLink('');
                            setNewBannerTitle('');
                          }}
                          disabled={(!newBannerImage && !newBannerImageUrl) || banners.length >= 5}
                          className="w-full py-3 bg-blue-500 text-white rounded-xl font-bold hover:bg-blue-600 transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          ➕ 添加 Banner
                        </button>
                     </div>
                  </div>
                </div>
              </div>

              {/* List Banners */}
              <div className="space-y-3">
                {banners.map((banner, index) => (
                  <div key={banner.id} className="flex items-center gap-4 p-4 bg-white rounded-xl border-2 border-gray-100">
                    <img src={banner.imageUrl} className="w-24 h-16 rounded-lg object-cover" alt="Banner" />
                    <div className="flex-1">
                      {banner.title && (
                        <div className="font-bold text-slate-800 mb-1">{banner.title}</div>
                      )}
                      <div className="text-sm font-bold text-slate-500 truncate">
                        {banner.linkUrl ? `🔗 ${banner.linkUrl}` : '無跳轉鏈接'}
                      </div>
                    </div>
                    <button
                      onClick={() => {
                         onUpdateBanners(banners.filter(b => b.id !== banner.id));
                      }}
                      className="px-3 py-1 bg-red-100 text-red-500 rounded-lg font-bold hover:bg-red-200 transition-all text-sm"
                    >
                      刪除
                    </button>
                  </div>
                ))}
                {banners.length === 0 && (
                  <p className="text-center text-slate-400 py-4">暫無 Banner</p>
                )}
              </div>
            </div>

            {/* 热门游戏管理 */}
            <div className="p-8 bg-white/80 rounded-[2.5rem] border-4 border-orange-200 shadow-xl">
              <h3 className="text-2xl font-black text-slate-800 mb-6 flex items-center gap-3">
                <span className="text-3xl">👑</span>
                熱門遊戲管理 (最多6個)
              </h3>

              {/* Add Hot Game */}
              <div className="mb-8 p-6 bg-orange-50 rounded-2xl border-2 border-orange-200">
                <label className="text-sm font-black text-orange-700 uppercase tracking-widest mb-4 block">
                  添加熱門遊戲
                </label>
                <div className="flex gap-3">
                  <select
                    value={selectedHotGameId}
                    onChange={(e) => setSelectedHotGameId(e.target.value)}
                    className="flex-1 px-4 py-3 bg-white rounded-xl border-2 border-orange-200 outline-none focus:border-orange-400 font-bold text-slate-700"
                  >
                    <option value="">選擇遊戲...</option>
                    {games
                      .filter(g => !hotGameIds.includes(g.id))
                      .map(g => (
                        <option key={g.id} value={g.id}>{g.name} ({g.category})</option>
                      ))
                    }
                  </select>
                  <button
                    onClick={() => {
                      if (selectedHotGameId && hotGameIds.length < 6) {
                        onUpdateHotGameIds([...hotGameIds, selectedHotGameId]);
                        setSelectedHotGameId('');
                      } else if (hotGameIds.length >= 6) {
                        alert('最多只能添加6個熱門遊戲！');
                      }
                    }}
                    disabled={!selectedHotGameId || hotGameIds.length >= 6}
                    className="px-8 py-3 bg-orange-500 text-white rounded-xl font-bold hover:bg-orange-600 transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    ➕ 添加
                  </button>
                </div>
              </div>

              {/* List Hot Games */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {hotGameIds.map((id, index) => {
                  const game = games.find(g => g.id === id);
                  if (!game) return null;
                  return (
                    <div key={id} className="flex items-center gap-4 p-4 bg-white rounded-xl border-2 border-gray-100">
                      <div className="flex flex-col gap-1">
                        <button
                          onClick={() => {
                            if (index > 0) {
                              const newIds = [...hotGameIds];
                              [newIds[index - 1], newIds[index]] = [newIds[index], newIds[index - 1]];
                              onUpdateHotGameIds(newIds);
                            }
                          }}
                          disabled={index === 0}
                          className="text-xs text-gray-400 hover:text-orange-500 disabled:opacity-20 font-bold"
                        >
                          ▲
                        </button>
                        <button
                          onClick={() => {
                            if (index < hotGameIds.length - 1) {
                              const newIds = [...hotGameIds];
                              [newIds[index], newIds[index + 1]] = [newIds[index + 1], newIds[index]];
                              onUpdateHotGameIds(newIds);
                            }
                          }}
                          disabled={index === hotGameIds.length - 1}
                          className="text-xs text-gray-400 hover:text-orange-500 disabled:opacity-20 font-bold"
                        >
                          ▼
                        </button>
                      </div>
                      <img src={game.coverImage} className="w-16 h-16 rounded-lg object-cover" alt={game.name} />
                      <div className="flex-1">
                        <h4 className="font-bold text-slate-800">{game.name}</h4>
                        <span className="text-xs text-slate-500">{game.category}</span>
                      </div>
                      <button
                        onClick={() => {
                          onUpdateHotGameIds(hotGameIds.filter(gid => gid !== id));
                        }}
                        className="px-3 py-1 bg-red-100 text-red-500 rounded-lg font-bold hover:bg-red-200 transition-all text-sm"
                      >
                        移除
                      </button>
                    </div>
                  );
                })}
                {hotGameIds.length === 0 && (
                  <p className="col-span-2 text-center text-slate-400 py-4">暫無熱門遊戲</p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* 板块类型管理 */}
        {showSectionTypeManager && (
          <div className="mb-12 p-8 bg-white/80 rounded-[2.5rem] border-4 border-purple-200 shadow-xl">
            <h3 className="text-2xl font-black text-slate-800 mb-6 flex items-center gap-3">
              <span className="text-3xl">📋</span>
              板塊類型管理
            </h3>
            
            {/* 新增板块类型 */}
            <div className="mb-6 p-4 bg-purple-50 rounded-2xl border-2 border-purple-200">
              <label className="text-sm font-black text-purple-700 uppercase tracking-widest mb-2 block">
                新增板塊類型
              </label>
              <div className="flex gap-3">
                <input
                  type="text"
                  value={newSectionTypeName}
                  onChange={(e) => setNewSectionTypeName(e.target.value)}
                  placeholder="例如：遊戲版本、更新公告等"
                  className="flex-1 px-4 py-3 bg-white rounded-xl border-2 border-purple-200 outline-none focus:border-purple-400 text-slate-700 font-bold"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter' && newSectionTypeName.trim()) {
                      if (onAddSectionType) {
                        onAddSectionType(newSectionTypeName);
                      } else {
                        onAddCustomSectionType(newSectionTypeName);
                      }
                      setNewSectionTypeName('');
                    }
                  }}
                />
                <button
                  onClick={() => {
                    if (newSectionTypeName.trim()) {
                      if (onAddSectionType) {
                        onAddSectionType(newSectionTypeName);
                      } else {
                        onAddCustomSectionType(newSectionTypeName);
                      }
                      setNewSectionTypeName('');
                    }
                  }}
                  className="px-6 py-3 bg-purple-500 text-white rounded-xl font-bold hover:bg-purple-600 transition-all"
                >
                  ➕ 新增
                </button>
              </div>
            </div>

            {/* 板块类型列表 */}
            <div className="space-y-3">
              <h4 className="text-lg font-black text-slate-700 mb-3">現有板塊類型：</h4>
              {getAllSectionTypes && getAllSectionTypes().length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {getAllSectionTypes().map((sectionType) => (
                    <div
                      key={sectionType}
                      className="flex items-center justify-between p-4 bg-white rounded-xl border-2 border-gray-200 hover:border-purple-300 transition-all"
                    >
                      <span className="font-bold text-slate-700">{sectionType}</span>
                      <button
                        onClick={() => {
                          if (onDeleteSectionType) {
                            onDeleteSectionType(sectionType);
                          } else {
                            const customType = customSectionTypes.find(t => t.name === sectionType);
                            if (customType) {
                              onDeleteCustomSectionType(customType.id);
                            }
                          }
                        }}
                        className="px-4 py-2 bg-red-500 text-white rounded-lg font-bold hover:bg-red-600 transition-all text-sm"
                      >
                        刪除
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-slate-400 text-center py-4">暫無板塊類型</p>
              )}
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="space-y-4">
              <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-2">遊戲名稱</label>
              <input 
                type="text" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="例如：絕區零" 
                className="w-full px-8 py-5 bg-white/60 rounded-[2rem] border-2 border-white outline-none focus:bg-white focus:border-orange-400 focus:ring-4 focus:ring-orange-100 transition-all text-slate-700 font-bold shadow-sm"
              />
            </div>
            <div className="space-y-4">
              <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-2">所屬平台星系</label>
              <div className="flex gap-4 bg-white/60 p-2 rounded-[2rem] border-2 border-white shadow-sm">
                <button
                  type="button"
                  onClick={() => setCategory(GameCategory.ONLINE)}
                  className={`flex-1 py-4 rounded-[1.5rem] font-black transition-all ${category === GameCategory.ONLINE ? 'bg-slate-800 text-white shadow-xl' : 'text-slate-400 hover:text-slate-600'}`}
                >
                  💻 線上
                </button>
                <button
                  type="button"
                  onClick={() => setCategory(GameCategory.MOBILE)}
                  className={`flex-1 py-4 rounded-[1.5rem] font-black transition-all ${category === GameCategory.MOBILE ? 'bg-orange-500 text-white shadow-xl' : 'text-slate-400 hover:text-slate-600'}`}
                >
                  📱 手遊
                </button>
                <button
                  type="button"
                  onClick={() => setCategory(GameCategory.STEAM)}
                  className={`flex-1 py-4 rounded-[1.5rem] font-black transition-all ${category === GameCategory.STEAM ? 'bg-purple-600 text-white shadow-xl' : 'text-slate-400 hover:text-slate-600'}`}
                >
                  🎮 Steam
                </button>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-2">視覺封面鏈接 (IMAGE URL)</label>
            <div className="relative">
              <input 
                type="text" 
                value={coverImage}
                onChange={(e) => setCoverImage(e.target.value)}
                className="w-full px-8 py-5 bg-white/60 rounded-[2rem] border-2 border-white outline-none focus:bg-white focus:border-orange-400 transition-all text-slate-500 text-sm font-bold shadow-sm"
              />
              <span className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-200 text-xl">🖼️</span>
            </div>
          </div>

          <div className="pt-10">
            <button 
              type="submit"
              className="w-full py-6 btn-orange text-white rounded-[2rem] font-black text-xl hover:scale-[1.03] active:scale-95 shadow-2xl transition-all"
            >
              🚀 同步至培訓陣線
            </button>
          </div>
        </form>

        <div className="mt-16 p-8 bg-indigo-50/50 backdrop-blur rounded-[2.5rem] border-2 border-white flex gap-6 items-start">
          <div className="w-12 h-12 bg-indigo-500 text-white rounded-2xl flex items-center justify-center text-2xl shadow-lg">💡</div>
          <div>
            <h4 className="font-black text-indigo-900 mb-2">管理員指南：</h4>
            <p className="text-sm text-indigo-700 leading-relaxed font-bold">
              發佈新板塊後，系統會自動向全體客服推送「新遊學習任務」。請確保封面圖不僅美觀，且能代表該遊戲的核心氛圍。
            </p>
          </div>
        </div>
      </div>

      {/* 數據備份與恢復 */}
      <div className="mt-8 glass-card rounded-[2.5rem] p-8 border-4 border-white shadow-xl relative overflow-hidden">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-black text-slate-800 flex items-center gap-3">
            <span className="text-2xl">🗑️</span> 數據清理
          </h3>
        </div>
        
        <div className="flex gap-4">
          <button
            onClick={onClearSearchHistory}
            className="flex-1 py-4 bg-red-500 hover:bg-red-600 text-white rounded-2xl font-black transition-all shadow-lg flex items-center justify-center gap-2 active:scale-95"
          >
            <span>🧹</span> 清空熱門搜索歷史
          </button>
        </div>
      </div>

      {/* 數據備份與恢復 */}
      <div className="mt-8 glass-card rounded-[2.5rem] p-8 border-4 border-white shadow-xl relative overflow-hidden">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-black text-slate-800 flex items-center gap-3">
            <span className="text-2xl">💾</span> 數據備份與恢復
          </h3>
          <span className="text-xs font-bold text-slate-400 bg-slate-100 px-3 py-1 rounded-full">
            防止本地數據丟失
          </span>
        </div>
        
        <div className="flex gap-4">
          <button
            onClick={() => {
              const fullBackup = {
                games,
                banners,
                hotGameIds,
                upcomingGames,
                exportDate: new Date().toISOString()
              };
              const dataStr = JSON.stringify(fullBackup, null, 2);
              const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
              const exportFileDefaultName = `8591_gamekb_full_backup_${new Date().toISOString().slice(0,10)}.json`;
              const linkElement = document.createElement('a');
              linkElement.setAttribute('href', dataUri);
              linkElement.setAttribute('download', exportFileDefaultName);
              linkElement.click();
            }}
            className="flex-1 py-4 bg-emerald-500 hover:bg-emerald-600 text-white rounded-2xl font-black transition-all shadow-lg flex items-center justify-center gap-2 active:scale-95"
          >
            <span>📤</span> 導出全站備份 (JSON)
          </button>
          
          <div className="flex-1 relative">
            <input
              type="file"
              accept=".json"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (!file) return;
                
                if (!confirm('⚠️ 警告：導入數據將覆蓋當前所有遊戲、Banner、熱門設置等數據！\n建議先導出備份。\n\n確定要繼續嗎？')) {
                  e.target.value = '';
                  return;
                }

                const reader = new FileReader();
                reader.onload = (event) => {
                  try {
                    const json = JSON.parse(event.target?.result as string);
                    
                    // 檢測是否為全站備份格式
                    if (json.games || json.banners || json.upcomingGames) {
                      if (onImportBackup) {
                        onImportBackup(json);
                      } else if (Array.isArray(json) && onImportGames) {
                        // 兼容舊版純數組格式
                        onImportGames(json);
                        alert('✅ 舊版遊戲數據導入成功！');
                      }
                    } else if (Array.isArray(json) && onImportGames) {
                       // 兼容舊版純數組格式
                       onImportGames(json);
                       alert('✅ 遊戲數據導入成功！');
                    } else {
                      alert('❌ 數據格式錯誤！請確保文件是有效的備份文件。');
                    }
                  } catch (err) {
                    alert('❌ 文件解析失敗！');
                  }
                  e.target.value = '';
                };
                reader.readAsText(file);
              }}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
            />
            <button className="w-full h-full py-4 bg-blue-500 hover:bg-blue-600 text-white rounded-2xl font-black transition-all shadow-lg flex items-center justify-center gap-2 active:scale-95">
              <span>📥</span> 導入恢復 (JSON)
            </button>
          </div>
        </div>
      </div>

      {/* 開發者工具：生成代碼 */}
      <div className="mt-8 glass-card rounded-[2.5rem] p-8 border-4 border-white shadow-xl relative overflow-hidden bg-slate-800 text-white">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-black flex items-center gap-3">
            <span className="text-2xl">👨‍💻</span> 開發者發佈工具
          </h3>
          <span className="text-xs font-bold text-slate-400 bg-slate-700 px-3 py-1 rounded-full">
            Git 發佈前必做
          </span>
        </div>
        
        <div className="space-y-4">
          <p className="text-slate-300 text-sm">
            如果您希望將當前的數據（Banner、熱門遊戲、新遊戲）作為所有用戶的默認數據，請點擊下方按鈕，複製生成的代碼，並覆蓋項目中的 <code className="bg-slate-700 px-1 rounded">constants.tsx</code> 文件。
          </p>
          <button
            onClick={() => {
              const code = `import { GameKB, GameCategory, SectionType, BannerItem, UpcomingGame } from './types';

// 数据版本号：用于强制更新本地数据（当代码中的版本号 > 本地存储的版本号时）
export const DATA_VERSION = '${new Date().toISOString().slice(0, 10)}-v${Date.now()}';

export const INITIAL_BANNERS: BannerItem[] = ${JSON.stringify(banners, null, 2)};

export const INITIAL_HOT_GAME_IDS: string[] = ${JSON.stringify(hotGameIds, null, 2)};

export const INITIAL_UPCOMING_GAMES: UpcomingGame[] = ${JSON.stringify(upcomingGames, null, 2)};

export const INITIAL_GAMES: GameKB[] = ${JSON.stringify(games, null, 2)};
`;
              navigator.clipboard.writeText(code).then(() => {
                alert('✅ 代碼已複製到剪貼板！\n\n請打開項目中的 constants.tsx 文件，全選並粘貼覆蓋，然後提交 Git。');
              }).catch(() => {
                alert('❌ 複製失敗，請手動複製控制台輸出的內容');

              });
            }}
            className="w-full py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl font-black transition-all shadow-lg flex items-center justify-center gap-2 active:scale-95 border border-blue-400"
          >
            <span>📋</span> 生成並複製 constants.tsx 代碼
          </button>
        </div>
      </div>

      {/* 遊戲列表 */}
      <div className="mt-12">
        <div className="glass-card rounded-[4rem] p-12 border-8 border-white shadow-2xl">
          <h3 className="text-3xl font-black text-slate-800 acg-title mb-8">遊戲管理列表</h3>
          
          {games.length === 0 ? (
            <div className="text-center py-12 text-slate-400">
              <p>暫無遊戲，請先添加遊戲</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {games.map((game) => (
                <div key={game.id} data-game-id={game.id} className="bg-white/60 rounded-2xl p-6 border-2 border-white">
                  <div className="h-32 rounded-xl overflow-hidden mb-4">
                    <img 
                      src={game.coverImage} 
                      alt={game.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = 'none';
                      }}
                    />
                  </div>
                  <h4 className="text-xl font-black text-slate-800 mb-2">{game.name}</h4>
                  <p className="text-sm text-slate-500 mb-4">{game.category}</p>
                  <button
                    onClick={() => setEditingGame(game)}
                    className="w-full py-3 bg-gradient-to-r from-pink-500 to-red-500 text-white rounded-xl font-bold hover:scale-105 transition-all"
                  >
                    ✏️ 編輯遊戲
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
