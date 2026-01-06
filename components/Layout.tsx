
import React from 'react';
import { GameCategory, GameKB } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  activeCategory: GameCategory | 'HOME' | 'ADMIN';
  setActiveCategory: (cat: GameCategory | 'HOME' | 'ADMIN') => void;
  gameName?: string;
  onBackToHome?: () => void;
  isAdminLoggedIn?: boolean;
  selectedGame?: GameKB | null;
  onEditGame?: (game: GameKB) => void;
  searchQuery?: string;
  onSearch?: (query: string) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, activeCategory, setActiveCategory, gameName, onBackToHome, selectedGame, searchQuery = '', onSearch }) => {
  const [localQuery, setLocalQuery] = React.useState(searchQuery);

  React.useEffect(() => {
    setLocalQuery(searchQuery);
  }, [searchQuery]);

  const submitSearch = () => {
    const q = localQuery.trim();
    if (onSearch) onSearch(q);
  };

  const isGameDetailPage = !!gameName;

  return (
    <div className="flex flex-col min-h-screen">
      {/* Black Gold Header */}
      <header className="sticky top-0 z-50 bg-[#121212] text-white px-8 py-3 flex items-center justify-between shadow-2xl">
        {isGameDetailPage ? (
          <>
            {/* 游戏详情页：左上角显示游戏名字 */}
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold text-[#ff8c00] acg-title tracking-widest">{gameName}</span>
            </div>

            {/* 右上角导航按钮 */}
            <nav className="flex items-center gap-1">
              {[
                { id: 'HOME', label: '首頁' },
                { id: GameCategory.ONLINE, label: '線上遊戲' },
                { id: GameCategory.MOBILE, label: '手機遊戲' },
                { id: GameCategory.STEAM, label: 'Steam' },
              ].map((item) => (
                <button 
                  key={item.id}
                  onClick={() => {
                    if (selectedGame && onBackToHome) {
                      onBackToHome();
                    }
                    setActiveCategory(item.id as any);
                  }}
                  onMouseDown={(e) => e.preventDefault()}
                  className={`px-4 py-2 rounded-md text-xs font-bold transition-all ${activeCategory === item.id ? 'nav-item-active' : 'text-gray-300 hover:text-white'}`}
                >
                  {item.label}
                </button>
              ))}
            </nav>
          </>
        ) : (
          <>
            {/* 普通页面：显示logo */}
            <div 
              className="flex items-center gap-2 cursor-pointer"
              onClick={() => setActiveCategory('HOME')}
            >
              <span className="text-xl font-bold text-[#ff8c00] acg-title tracking-widest">8591熱門遊戲知識庫</span>
            </div>

            {/* Search Bar matching screenshot */}
            <div className="flex-1 max-w-xl mx-8 flex h-10">
              <input 
                type="text" 
                value={localQuery}
                onChange={(e) => setLocalQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    submitSearch();
                  }
                }}
                placeholder="搜尋核心、機制、術語..." 
                className="flex-1 bg-white/10 text-white px-5 rounded-l-md outline-none focus:bg-white/20 border-y border-l border-white/20 text-sm"
              />
              <button
                onClick={submitSearch}
                className="bg-[#ff3b30] text-white px-6 rounded-r-md font-bold text-xs hover:bg-[#ff4d00] transition-colors"
              >
                搜尋
              </button>
            </div>

            <nav className="flex items-center gap-1">
              {[
                { id: 'HOME', label: '首頁' },
                { id: GameCategory.ONLINE, label: '線上遊戲' },
                { id: GameCategory.MOBILE, label: '手機遊戲' },
                { id: GameCategory.STEAM, label: 'Steam' },
              ].map((item) => (
                <button 
                  key={item.id}
                  onClick={() => {
                    setActiveCategory(item.id as any);
                  }}
                  className={`px-4 py-2 rounded-md text-xs font-bold transition-all ${activeCategory === item.id ? 'nav-item-active' : 'text-gray-300 hover:text-white'}`}
                >
                  {item.label}
                </button>
              ))}
              <button 
                onClick={() => {
                  setActiveCategory('ADMIN');
                }}
                className={`p-2 ml-4 rounded-md transition-colors ${activeCategory === 'ADMIN' ? 'text-[#ff4d00]' : 'text-gray-400 hover:text-white'}`}
              >
                ⚙️
              </button>
            </nav>
          </>
        )}
      </header>

      {/* Main Container */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-6 py-12">
        {children}
      </main>

      <footer className="py-8 text-center text-gray-400 text-[10px] tracking-widest uppercase">
        © 8591 客服專用知識庫 • 讓你我的服務更專業
      </footer>
    </div>
  );
};

export default Layout;
