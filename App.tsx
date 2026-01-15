
import React, { useState, useEffect, useRef } from 'react';
import { BrowserRouter, useNavigate, useLocation } from 'react-router-dom';
import Layout from './components/Layout';
import AdminPanel from './components/AdminPanel';
import Login from './components/Login';
import ImageGallery from './components/ImageGallery';
import ImageZoom from './components/ImageZoom';
import HomeBanner from './components/HomeBanner';
import BannerSection from './components/BannerSection';
import BannerUploadButton from './components/BannerUploadButton';
import KBItemDisplay from './components/KBItemDisplay';
import { GameKB, GameCategory, SectionType, KBItem, CustomSectionType, KBSubItem, UpcomingGame, HotSearchItem, BannerItem } from './types';
import { INITIAL_GAMES, INITIAL_BANNERS, INITIAL_HOT_GAME_IDS, INITIAL_UPCOMING_GAMES, DATA_VERSION } from './constants';
import { buildSearchIndex, searchBestHitPerGame, SearchHit } from './services/searchService';

// 获取所有可用的板块类型（从localStorage）
const getAllAvailableSectionTypes = (): string[] => {
  const saved = localStorage.getItem('allSectionTypes');
  if (saved) {
    const types = JSON.parse(saved) as string[];
    // 过滤掉 '交易安全'
    return types.filter(t => t !== '交易安全');
  }
  // 默认板块类型
  return [
    SectionType.MECHANICS,
    SectionType.CONTACT,
    SectionType.TERMINOLOGY,
    SectionType.FAQ,
    SectionType.PRACTICE
  ];
};

// 保存所有板块类型
const saveAllSectionTypes = (types: string[]) => {
  localStorage.setItem('allSectionTypes', JSON.stringify(types));
};

// 获取所有板块类型（包括自定义的）- 保持向后兼容
const getAllSectionTypes = (): string[] => {
  return getAllAvailableSectionTypes();
};

// 获取自定义板块类型列表（保持向后兼容）
const getCustomSectionTypes = (): CustomSectionType[] => {
  const allTypes = getAllAvailableSectionTypes();
  const defaultTypes = Object.values(SectionType);
  // 找出不在默认类型中的，作为自定义类型
  return allTypes
    .filter(type => !defaultTypes.includes(type as SectionType))
    .map((name, index) => ({ id: `custom-${index}`, name }));
};

// 保存自定义板块类型（保持向后兼容）
const saveCustomSectionTypes = (types: CustomSectionType[]) => {
  const allTypes = getAllAvailableSectionTypes();
  const defaultTypes = Object.values(SectionType);
  const customNames = types.map(t => t.name);
  // 合并默认类型和自定义类型
  const newAllTypes = [...defaultTypes, ...customNames];
  saveAllSectionTypes(newAllTypes);
};

// 从URL参数解析页面状态
const parseUrlState = (pathname: string, games: GameKB[]): {
  category: GameCategory | 'HOME' | 'ADMIN' | 'SEARCH';
  gameId?: string;
  section?: string;
} => {
  if (pathname === '/admin' || pathname.startsWith('/admin')) {
    return { category: 'ADMIN' };
  }
  if (pathname === '/search') {
    return { category: 'SEARCH' };
  }
  if (pathname.startsWith('/game/')) {
    const parts = pathname.split('/');
    const gameId = parts[2];
    const section = parts[3] || undefined;
    return { category: 'HOME', gameId, section };
  }
  if (pathname === '/online') {
    return { category: GameCategory.ONLINE };
  }
  if (pathname === '/mobile') {
    return { category: GameCategory.MOBILE };
  }
  if (pathname === '/steam') {
    return { category: GameCategory.STEAM };
  }
  return { category: 'HOME' };
};

const AppContent: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // 檢查數據版本是否過期
  const isDataOutdated = () => {
    return localStorage.getItem('dataVersion') !== DATA_VERSION;
  };

  // 从localStorage加载游戏数据
  const loadGamesFromStorage = (): GameKB[] => {
    if (isDataOutdated()) return INITIAL_GAMES;
    try {
      const saved = localStorage.getItem('gamesData');
      if (saved) {
        const parsed = JSON.parse(saved);
        // 自动移除 '交易安全' 板块
        return parsed.map((game: GameKB) => ({
          ...game,
          sections: game.sections.filter((s: any) => s.type !== '交易安全')
        }));
      }
    } catch (e) {
      console.error('Failed to load games from storage:', e);
    }
    return INITIAL_GAMES;
  };

  // 保存游戏数据到localStorage
  const saveGamesToStorage = (gamesData: GameKB[]) => {
    try {
      localStorage.setItem('gamesData', JSON.stringify(gamesData));
    } catch (e) {
      console.error('Failed to save games to storage:', e);
    }
  };

  const loadUpcomingGames = (): UpcomingGame[] => {
    if (isDataOutdated()) return INITIAL_UPCOMING_GAMES;
    try {
      const saved = localStorage.getItem('upcomingGames');
      return saved ? JSON.parse(saved) : INITIAL_UPCOMING_GAMES;
    } catch (e) { return INITIAL_UPCOMING_GAMES; }
  };

  const loadHotGameIds = (): string[] => {
    if (isDataOutdated()) return INITIAL_HOT_GAME_IDS;
    try {
      const saved = localStorage.getItem('hotGameIds');
      return saved ? JSON.parse(saved) : INITIAL_HOT_GAME_IDS;
    } catch (e) { return INITIAL_HOT_GAME_IDS; }
  };

  const loadBanners = (): BannerItem[] => {
    if (isDataOutdated()) return INITIAL_BANNERS;
    try {
      const saved = localStorage.getItem('banners');
      return saved ? JSON.parse(saved) : INITIAL_BANNERS;
    } catch (e) { return INITIAL_BANNERS; }
  };

  const loadSearchClickLog = (): Array<{ key: string; timestamp: number }> => {
    try {
      const oldCounts = localStorage.getItem('searchClickCounts');
      if (oldCounts) {
        const parsedCounts = JSON.parse(oldCounts) as Record<string, number>;
        const log: Array<{ key: string; timestamp: number }> = [];
        const now = Date.now();
        Object.entries(parsedCounts).forEach(([key, count]) => {
          for (let i = 0; i < count; i++) {
            log.push({ key, timestamp: now - i * 86400000 });
          }
        });
        localStorage.setItem('searchClickLog', JSON.stringify(log));
        localStorage.removeItem('searchClickCounts');
        return log;
      }
      const saved = localStorage.getItem('searchClickLog');
      return saved ? JSON.parse(saved) : [];
    } catch (e) { return []; }
  };

  const [games, setGames] = useState<GameKB[]>(loadGamesFromStorage());
  const [upcomingGames, setUpcomingGames] = useState<UpcomingGame[]>(loadUpcomingGames());
  const [hotGameIds, setHotGameIds] = useState<string[]>(loadHotGameIds());
  const [banners, setBanners] = useState<BannerItem[]>(loadBanners());
  const [searchClickLog, setSearchClickLog] = useState<Array<{ key: string; timestamp: number }>>(loadSearchClickLog());
  const [hotSearchItems, setHotSearchItems] = useState<HotSearchItem[]>([]);
  const [upcomingPage, setUpcomingPage] = useState(1);

  // 更新本地數據版本號
  useEffect(() => {
    localStorage.setItem('dataVersion', DATA_VERSION);
  }, []);

  useEffect(() => {
    localStorage.setItem('upcomingGames', JSON.stringify(upcomingGames));
  }, [upcomingGames]);

  useEffect(() => {
    localStorage.setItem('hotGameIds', JSON.stringify(hotGameIds));
  }, [hotGameIds]);

  useEffect(() => {
    try {
      localStorage.setItem('banners', JSON.stringify(banners));
    } catch (e) {
      console.error('Failed to save banners to storage:', e);
      alert('Banner 圖片過大或存儲空間不足，請刪除部分或壓縮後重試');
    }
  }, [banners]);

  useEffect(() => {
    localStorage.setItem('searchClickLog', JSON.stringify(searchClickLog));
  }, [searchClickLog]);

  // 生成热门搜索数据（僅基於實際點擊統計）
  useEffect(() => {
    if (games.length > 0) {
      const allItems: HotSearchItem[] = [];
      const thirtyDaysAgo = Date.now() - 30 * 86400000;
      const clickCounts = searchClickLog
        .filter(entry => entry.timestamp >= thirtyDaysAgo)
        .reduce((counts, entry) => {
          counts[entry.key] = (counts[entry.key] || 0) + 1;
          return counts;
        }, {} as Record<string, number>);

      games.forEach(g => {
        g.sections.forEach(s => {
          s.items.forEach(item => {
            const id = `${g.id}-${item.id}`;
            allItems.push({
              id,
              gameName: g.name,
              sectionName: s.type,
              keyword: item.title,
              path: `/game/${g.id}/${encodeURIComponent(s.type)}?anchor=item-${item.id}`,
              count: clickCounts[id] || 0
            });
          });
        });
      });

      // 1. 先按点击量倒序排序
      // 2. 点击量相同的，按标题字母排序（避免每次刷新都变化）
      allItems.sort((a, b) => {
        const countDiff = (b.count || 0) - (a.count || 0);
        if (countDiff !== 0) return countDiff;
        return a.gameName.localeCompare(b.gameName) || a.keyword.localeCompare(b.keyword);
      });

      // 只保留有實際點擊過的項目（count > 0）
      const itemsWithClicks = allItems.filter(item => (item.count || 0) > 0);

      // 如果完全沒有點擊紀錄，熱門搜索保持為空
      if (itemsWithClicks.length === 0) {
        setHotSearchItems([]);
      } else {
        // 只取前 8 個
        setHotSearchItems(itemsWithClicks.slice(0, 8));
      }
    }
  }, [games, searchClickLog]);

  const [activeCategory, setActiveCategory] = useState<GameCategory | 'HOME' | 'ADMIN' | 'SEARCH'>('HOME');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGame, setSelectedGame] = useState<GameKB | null>(null);
  const [selectedGameSection, setSelectedGameSection] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState<SectionType>(SectionType.CONTACT);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [customSectionTypes, setCustomSectionTypes] = useState<CustomSectionType[]>(getCustomSectionTypes());
  
  // useEffect 已以 URL 为唯一真相，这个 ref 不再需要（保留可后续删除）
  const lastPathnameRef = useRef<string>('');

  // updateUrl 函数：更新 URL 路径（URL 作为唯一真相）
  const updateUrl = (category: GameCategory | 'HOME' | 'ADMIN' | 'SEARCH', gameId?: string, section?: string, query?: string) => {
    let path = '/';

    if (category === 'ADMIN') {
      path = '/admin';
    } else if (category === 'SEARCH') {
      const q = (query || '').trim();
      path = q ? `/search?q=${encodeURIComponent(q)}` : '/search';
    } else if (category === GameCategory.ONLINE) {
      path = '/online';
    } else if (category === GameCategory.MOBILE) {
      path = '/mobile';
    } else if (category === GameCategory.STEAM) {
      path = '/steam';
    } else if (gameId) {
      // 游戏详情/分区页必须使用 /game/...，不能复用 /mobile
      path = section
        ? `/game/${gameId}/${encodeURIComponent(section)}`
        : `/game/${gameId}`;
    }

    navigate(path);
  };

  const handleGameClick = (game: GameKB) => {
    const types = getAllSectionTypes();
    const validSection = types.find(t => {
      const s = game.sections.find(sec => sec.type === t);
      return s && s.items.length > 0;
    }) || types[0];
    updateUrl('HOME', game.id, validSection);
  };

  // 当games更新时，保存到localStorage
  useEffect(() => {
    saveGamesToStorage(games);
  }, [games]);

  // 根据 URL 更新状态：URL 是唯一真相
  useEffect(() => {
    const state = parseUrlState(location.pathname, games);

    const url = new URL(window.location.href);
    const q = url.searchParams.get('q') || '';

    // /game/... 需要先有 games 才能定位到具体游戏
    if (state.gameId && games.length === 0) {
      return;
    }

    if (state.category === 'SEARCH') {
      setSelectedGame(null);
      setSelectedGameSection(null);
      setActiveCategory('SEARCH');
      setSearchQuery(q);
      return;
    }

    if (state.gameId) {
      const game = games.find(g => g.id === state.gameId) || null;
      if (!game) {
        navigate('/', { replace: true });
        return;
      }

      // 如果没有 section，自动跳转到第一个有内容的 section
      if (!state.section) {
        const types = getAllSectionTypes();
        const validSection = types.find(t => {
          const s = game.sections.find(sec => sec.type === t);
          return s && s.items.length > 0;
        }) || types[0];
        navigate(`/game/${game.id}/${encodeURIComponent(validSection)}`, { replace: true });
        return;
      }

      setSelectedGame(game);
      setSelectedGameSection(state.section ? decodeURIComponent(state.section) : null);
      setActiveCategory(game.category);
      return;
    }

    setSelectedGame(null);
    setSelectedGameSection(null);
    setActiveCategory(state.category);
  }, [location.pathname, games, navigate]);


  // 检查登录状态
  useEffect(() => {
    const checkLoginStatus = () => {
      const loggedIn = localStorage.getItem('adminLoggedIn') === 'true';
      const loginTime = localStorage.getItem('adminLoginTime');
      
      // 检查是否在24小时内登录（可选：设置登录过期时间）
      if (loggedIn && loginTime) {
        const timeDiff = Date.now() - parseInt(loginTime);
        const hoursDiff = timeDiff / (1000 * 60 * 60);
        
        // 24小时后自动登出（可选）
        if (hoursDiff < 24) {
          setIsAdminLoggedIn(true);
        } else {
          localStorage.removeItem('adminLoggedIn');
          localStorage.removeItem('adminLoginTime');
          setIsAdminLoggedIn(false);
        }
      } else {
        setIsAdminLoggedIn(false);
      }
    };

    checkLoginStatus();
  }, []);

  const handleLogin = () => {
    setIsAdminLoggedIn(true);
    updateUrl('ADMIN');
  };

  const handleLogout = () => {
    localStorage.removeItem('adminLoggedIn');
    localStorage.removeItem('adminLoginTime');
    setIsAdminLoggedIn(false);
    if (activeCategory === 'ADMIN') {
      setActiveCategory('HOME');
      updateUrl('HOME');
      return;
    }
  };

  const highlightText = (text: string, keyword: string): React.ReactNode => {
    const k = keyword.trim();
    if (!k) return text;
    const parts = text.split(new RegExp(`(${k.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi'));
    return (
      <>
        {parts.map((p, i) =>
          p.toLowerCase() === k.toLowerCase() ? (
            <mark key={i} className="bg-yellow-200 text-slate-900 px-0.5 rounded">
              {p}
            </mark>
          ) : (
            <span key={i}>{p}</span>
          )
        )}
      </>
    );
  };

  const searchIndex = React.useMemo(() => buildSearchIndex(games), [games]);

  const handleRecordSearchClick = (gameId: string, sectionType: string, itemId: string, keyword: string) => {
    const key = `${gameId}-${itemId}`;
    const now = Date.now();
    const thirtyDaysAgo = now - 30 * 86400000;
    const newLog = [
      ...searchClickLog.filter(entry => entry.timestamp >= thirtyDaysAgo),
      { key, timestamp: now }
    ];
    setSearchClickLog(newLog);
  };

  const renderSearchContent = () => {
    const query = searchQuery.trim();
    const results = searchBestHitPerGame(searchIndex, query);

    return (
      <div className="space-y-6 animate-in fade-in zoom-in-95 duration-500">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-3xl font-black text-slate-800 mb-2">搜尋結果</h2>
          <p className="text-slate-500 text-sm">關鍵字：<span className="font-black">{query || '（空）'}</span></p>

          <div className="mt-6">
            {query.length === 0 ? (
              <div className="text-slate-400 italic">請輸入關鍵字，例如「登入」</div>
            ) : results.length === 0 ? (
              <div className="text-slate-400 italic">未有搜到該內容</div>
            ) : (
              <div className="space-y-3">
                {results.map((m, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      const anchor = m.subItemId ? `sub-${m.subItemId}` : `item-${m.itemId}`;
                      handleRecordSearchClick(m.gameId, m.sectionType, m.itemId, query);
                      navigate(`/game/${m.gameId}/${encodeURIComponent(m.sectionType)}?anchor=${encodeURIComponent(anchor)}&q=${encodeURIComponent(query)}`);
                    }}
                    className="w-full text-left p-4 rounded-xl border border-gray-200 hover:bg-gray-50 transition-all"
                  >
                    <div className="flex items-center justify-between gap-4">
                      <div className="font-black text-slate-800">{m.gameName}</div>
                      <div className="text-[10px] font-black px-2 py-1 rounded-full bg-gray-100 text-slate-600">{m.gameCategory}</div>
                    </div>
                    <div className="mt-1 flex items-center gap-2">
                      <div className="text-sm font-bold text-orange-600">{m.sectionType}</div>
                      <span className={`text-[10px] font-black px-2 py-0.5 rounded-full ${
                        m.matchSource === 'subItemTitle' ? 'bg-purple-100 text-purple-700'
                        : m.matchSource === 'subItemContent' ? 'bg-blue-100 text-blue-700'
                        : 'bg-orange-100 text-orange-700'
                      }`}>
                        {m.matchSource === 'subItemTitle' ? '子版塊標題'
                          : m.matchSource === 'subItemContent' ? '子版塊內容'
                          : '大標題'}
                      </span>
                    </div>
                    <div className="mt-1 text-xs text-slate-500">
                      {m.itemTitle}{m.subItemTitle ? ` / ${m.subItemTitle}` : ''}
                    </div>
                    <div className="mt-2 text-sm text-slate-600">
                      {highlightText(m.snippet, query)}
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  const handleAddGame = (newGame: GameKB) => {
    setGames([...games, newGame]);
    setActiveCategory('HOME');
    updateUrl('HOME');
  };

  const handleUpdateGame = (updatedGame: GameKB) => {
    setGames(games.map(game => game.id === updatedGame.id ? updatedGame : game));
  };

  const handleImportGames = (importedGames: GameKB[]) => {
    setGames(importedGames);
    saveGamesToStorage(importedGames);
  };

  const handleClearSearchHistory = () => {
    if (window.confirm('確定要清空所有熱門搜索歷史數據嗎？\n清空後，首頁的「熱門搜索」將會重新開始統計。')) {
      setSearchClickLog([]);
      alert('✅ 熱門搜索歷史已清空！');
    }
  };

  const handleUpdateGameSection = (gameId: string, sectionType: string, items: KBItem[]) => {
    setGames(games.map(game => {
      if (game.id === gameId) {
        // 检查section是否存在，如果不存在则创建
        const existingSection = game.sections.find(s => s.type === sectionType);
        if (!existingSection) {
          // 添加新的section
          return {
            ...game,
            sections: [...game.sections, { type: sectionType as SectionType, items }]
          };
        }
        // 更新现有section
        return {
          ...game,
          sections: game.sections.map(section => 
            section.type === sectionType 
              ? { ...section, items }
              : section
          )
        };
      }
      return game;
    }));
  };

  const handleAddSectionType = (name: string) => {
    const trimmedName = name.trim();
    if (!trimmedName) return;
    
    const allTypes = getAllAvailableSectionTypes();
    if (allTypes.includes(trimmedName)) {
      alert('該板塊類型已存在！');
      return;
    }
    
    const newAllTypes = [...allTypes, trimmedName];
    saveAllSectionTypes(newAllTypes);
    
    // 更新customSectionTypes（用于显示）
    const customTypes = getCustomSectionTypes();
    const newCustomType: CustomSectionType = {
      id: Date.now().toString(),
      name: trimmedName
    };
    const updatedCustomTypes = [...customTypes, newCustomType];
    setCustomSectionTypes(updatedCustomTypes);
    
    // 为所有游戏添加这个新的section
    const updatedGames = games.map(game => ({
      ...game,
      sections: [...game.sections, { type: trimmedName as SectionType, items: [] }]
    }));
    setGames(updatedGames);
    saveGamesToStorage(updatedGames);
    
    alert(`✅ 已新增板塊類型「${trimmedName}」！`);
  };

  const handleDeleteSectionType = (typeName: string) => {
    if (!confirm(`確定要刪除「${typeName}」嗎？這將刪除所有遊戲中該板塊的所有知識點！`)) {
      return;
    }
    
    const allTypes = getAllAvailableSectionTypes();
    const newAllTypes = allTypes.filter(t => t !== typeName);
    saveAllSectionTypes(newAllTypes);
    
    // 更新customSectionTypes（用于显示）
    const updatedCustomTypes = customSectionTypes.filter(t => t.name !== typeName);
    setCustomSectionTypes(updatedCustomTypes);
    
    // 从所有游戏中删除这个section
    const updatedGames = games.map(game => ({
      ...game,
      sections: game.sections.filter(s => s.type !== typeName)
    }));
    setGames(updatedGames);
    saveGamesToStorage(updatedGames);
    
    alert(`✅ 已刪除板塊類型「${typeName}」！`);
  };

  const handleRenameSectionType = (oldName: string, newName: string) => {
    const trimmedNewName = newName.trim();
    if (!trimmedNewName) {
      alert('名稱不能為空！');
      return;
    }
    
    if (trimmedNewName === oldName) {
      return;
    }

    const allTypes = getAllAvailableSectionTypes();
    if (allTypes.includes(trimmedNewName)) {
      alert('該板塊類型名稱已存在！');
      return;
    }

    // 更新全局板块类型列表
    const newAllTypes = allTypes.map(t => t === oldName ? trimmedNewName : t);
    saveAllSectionTypes(newAllTypes);
    
    // 更新customSectionTypes（用于显示）
    const updatedCustomTypes = customSectionTypes.map(t => 
      t.name === oldName ? { ...t, name: trimmedNewName } : t
    );
    setCustomSectionTypes(updatedCustomTypes);
    
    // 更新所有游戏中的板块类型名称
    const updatedGames = games.map(game => ({
      ...game,
      sections: game.sections.map(section => 
        section.type === oldName 
          ? { ...section, type: trimmedNewName as SectionType }
          : section
      )
    }));
    setGames(updatedGames);
    saveGamesToStorage(updatedGames);
    
    alert(`✅ 已將「${oldName}」重命名為「${trimmedNewName}」！`);
  };

  // 保持向后兼容
  const handleAddCustomSectionType = (name: string) => {
    handleAddSectionType(name);
  };

  const handleDeleteCustomSectionType = (id: string) => {
    const typeToDelete = customSectionTypes.find(t => t.id === id);
    if (typeToDelete) {
      handleDeleteSectionType(typeToDelete.name);
    }
  };

  // 获取游戏排序（从localStorage）
  const getGameOrder = (): string[] => {
    return JSON.parse(localStorage.getItem('gameOrder') || '[]') as string[];
  };

  // 保存游戏排序
  const saveGameOrder = (order: string[]) => {
    localStorage.setItem('gameOrder', JSON.stringify(order));
  };

  // 根据排序对游戏进行排序
  const getSortedGames = (gameList: GameKB[]): GameKB[] => {
    const order = getGameOrder();
    if (order.length === 0) return gameList;
    
    const ordered: GameKB[] = [];
    const unordered: GameKB[] = [];
    
    // 先按顺序添加
    order.forEach(id => {
      const game = gameList.find(g => g.id === id);
      if (game) ordered.push(game);
    });
    
    // 再添加未排序的
    gameList.forEach(game => {
      if (!order.includes(game.id)) {
        unordered.push(game);
      }
    });
    
    return [...ordered, ...unordered];
  };

  const handleMoveGame = (gameId: string, direction: 'up' | 'down', category?: GameCategory) => {
    const gameList = category 
      ? games.filter(g => g.category === category)
      : activeCategory === 'HOME' 
        ? games 
        : games.filter(g => g.category === activeCategory);
    
    const sortedGames = getSortedGames(gameList);
    const currentIndex = sortedGames.findIndex(g => g.id === gameId);
    if (currentIndex === -1) return;
    
    const newIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1;
    if (newIndex < 0 || newIndex >= sortedGames.length) return;
    
    // 交换位置
    const currentOrder = getGameOrder();
    const allGameIds = games.map(g => g.id);
    let newOrder = [...currentOrder];
    
    // 确保所有游戏ID都在order中
    allGameIds.forEach(id => {
      if (!newOrder.includes(id)) {
        newOrder.push(id);
      }
    });
    
    // 交换位置
    const gameId1 = sortedGames[currentIndex].id;
    const gameId2 = sortedGames[newIndex].id;
    const index1 = newOrder.indexOf(gameId1);
    const index2 = newOrder.indexOf(gameId2);
    [newOrder[index1], newOrder[index2]] = [newOrder[index2], newOrder[index1]];
    
    saveGameOrder(newOrder);
    
    const sortedAllGames = [...games].sort((a, b) => {
      const indexA = newOrder.indexOf(a.id);
      const indexB = newOrder.indexOf(b.id);
      return indexA - indexB;
    });

    setGames(sortedAllGames);
    saveGamesToStorage(sortedAllGames);
  };

  const filteredGames = activeCategory === 'HOME' 
    ? games 
    : games.filter(g => g.category === activeCategory);
  
  const sortedFilteredGames = getSortedGames(filteredGames);

  // 分区页自动滚动定位（用于搜索结果跳转）
  const lastScrolledAnchorRef = useRef<string | null>(null);
  useEffect(() => {
    if (!selectedGame || !selectedGameSection) return;

    const url = new URL(window.location.href);
    const anchor = url.searchParams.get('anchor');
    if (!anchor) return;

    // 去重：同一个 anchor 只滚动一次
    const key = `${selectedGame.id}::${selectedGameSection}::${anchor}`;
    if (lastScrolledAnchorRef.current === key) return;
    lastScrolledAnchorRef.current = key;

    const t = window.setTimeout(() => {
      const el = document.getElementById(anchor);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }

      // 用完后清理 URL 参数，避免刷新重复滚动/高亮
      try {
        const u = new URL(window.location.href);
        u.searchParams.delete('anchor');
        // q 用于搜索回填，可保留
        window.history.replaceState({}, '', u.pathname + (u.search ? u.search : ''));
      } catch {
        // ignore
      }
    }, 80);

    return () => window.clearTimeout(t);
  }, [selectedGame?.id, selectedGameSection]);

  const renderContent = () => {
    // 搜索页
    if (activeCategory === 'SEARCH') {
      return renderSearchContent();
    }

    // 优先检查 selectedGame，确保游戏详情页优先显示
    if (selectedGame) {
      // 获取所有板块类型（包括自定义的）
      const gameSectionButtons = getAllSectionTypes();

      // 如果选择了某个分类，显示该分类的内容
      if (selectedGameSection) {
        const url = new URL(window.location.href);
        const highlightAnchor = url.searchParams.get('anchor') || undefined;
        const section = selectedGame.sections.find(s => s.type === selectedGameSection);
        const gameSectionButtons = getAllSectionTypes();


        return (
          <div className="space-y-6 animate-in fade-in zoom-in-95 duration-500">
            <button
              onClick={() => updateUrl(selectedGame.category)}
              className="text-orange-600 font-bold text-sm hover:underline"
            >
              ← 返回{selectedGame.category}列表
            </button>

            {/* Banner 区域 - 可以替换为自定义图片 */}
            <BannerSection 
              game={selectedGame}
              isAdminLoggedIn={isAdminLoggedIn}
              onUpdateBannerImage={(imageUrl) => {
                const updatedGame = { ...selectedGame, bannerImage: imageUrl };
                handleUpdateGame(updatedGame);
                setSelectedGame(updatedGame);
              }}
              onUpdateGame={(updatedGame) => {
                handleUpdateGame(updatedGame);
                setSelectedGame(updatedGame);
              }}
              onEditGame={() => {
                const gameToEdit = games.find(g => g.id === selectedGame.id);
                if (gameToEdit) {
                  // 先滚动到页面顶部
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                  setActiveCategory('ADMIN');
                  updateUrl('ADMIN');
                  setTimeout(() => {
                    const gameCard = document.querySelector(`[data-game-id="${selectedGame.id}"]`);
                    if (gameCard) {
                      gameCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
                      const editButton = gameCard.querySelector('button') as HTMLButtonElement;
                      if (editButton && editButton.textContent?.includes('編輯')) {
                        editButton.click();
                      }
                    }
                  }, 300);
                }
              }}
            />

            {/* 分类切换按钮 - 等间距排布 */}
            <div className="flex justify-between gap-4 overflow-x-auto pb-2 scrollbar-hide">
              {gameSectionButtons.map((sectionType) => {
                const sectionData = selectedGame.sections.find(s => s.type === sectionType);
                const hasContent = sectionData && sectionData.items.length > 0;
                const isActive = selectedGameSection === sectionType;
                return (
                  <button
                    key={sectionType}
                    onClick={() => {
                      if (hasContent && selectedGame) {
                        updateUrl('HOME', selectedGame.id, sectionType);
                      }
                    }}
                    className={`flex-1 px-6 py-3 rounded-xl font-bold text-base whitespace-nowrap transition-all ${
                      isActive
                        ? 'bg-gradient-to-r from-pink-500 to-red-500 text-white shadow-lg'
                        : hasContent
                        ? 'bg-white text-slate-600 hover:bg-gray-100 shadow-sm'
                        : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    }`}
                    disabled={!hasContent}
                  >
                    {sectionType}
                  </button>
                );
              })}
            </div>

            {/* 内容区域 */}
            <div className="bg-white rounded-2xl shadow-lg p-8 min-h-[500px]">
              <h2 className="text-3xl font-black text-slate-800 mb-6 flex items-center gap-3">
                <span className="w-2 h-8 bg-gradient-to-b from-pink-500 to-red-500 rounded-full"></span>
                {selectedGameSection}
              </h2>
              <div className="space-y-4">
                {section && section.items.length > 0 ? section.items.map(item => (
                  <KBItemDisplay key={item.id} item={item} highlightAnchor={highlightAnchor} />
                )) : (
                  <div className="py-20 text-center text-slate-400 italic">
                    <p className="text-lg">暫無知識點</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      }

      // 显示游戏板块和按钮（游戏详情页）
      const gameBannerImage = selectedGame.bannerImage || selectedGame.coverImage;
      return (
        <div className="space-y-8 animate-in fade-in zoom-in-95 duration-500">
          <button 
            onClick={() => {
              // 游戏详情页返回到所属分类列表
              updateUrl(selectedGame.category);
            }}
            className="text-orange-600 font-bold text-sm hover:underline"
          >
            ← 返回{selectedGame.category}
          </button>
          
          <div 
            className="relative rounded-3xl overflow-hidden shadow-xl border-4 border-white flex items-center justify-center bg-black"
            style={{ aspectRatio: '2 / 1', maxHeight: '320px', width: '100%', cursor: selectedGame.bannerLink ? 'pointer' : 'default' }}
            onClick={() => {
              if (selectedGame.bannerLink) {
                window.open(selectedGame.bannerLink, '_blank');
              }
            }}
          >
            <img src={gameBannerImage} className="w-full h-full object-cover" alt={selectedGame.name} />
            {gameBannerImage && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  window.open(gameBannerImage, '_blank');
                }}
                className="absolute top-4 left-4 bg-black/60 hover:bg-black/80 text-white px-3 py-1 rounded-full text-xs font-bold z-20"
              >
                查看完整圖片
              </button>
            )}
            <div className="absolute inset-0 bg-gradient-to-r from-white/90 via-white/20 to-transparent flex items-center p-12">
              <div className="flex-1">
                <span className="px-3 py-1 bg-orange-500 text-white rounded-full text-[10px] font-black mb-3 inline-block">
                  {selectedGame.category}
                </span>
                <h2 className="text-5xl font-black text-slate-800 acg-title">{selectedGame.name}</h2>
                {selectedGame.bannerTitle && (
                  <div 
                    className="mt-4 inline-block px-6 py-2 bg-white/80 backdrop-blur-sm rounded-xl font-black text-lg text-slate-800 shadow-lg border-2 border-white/50"
                    onClick={(e) => {
                      e.stopPropagation();
                      if (selectedGame.bannerLink) {
                        window.open(selectedGame.bannerLink, '_blank');
                      }
                    }}
                    style={{ cursor: selectedGame.bannerLink ? 'pointer' : 'default' }}
                  >
                    {selectedGame.bannerTitle}
                    {selectedGame.bannerLink && (
                      <span className="ml-2 text-sm opacity-60">🔗</span>
                    )}
                  </div>
                )}
              </div>
              {isAdminLoggedIn && (
                <div className="flex gap-2">
                  <BannerUploadButton
                    game={selectedGame}
                    onUpdateBannerImage={(imageUrl) => {
                      const updatedGame = { ...selectedGame, bannerImage: imageUrl };
                      handleUpdateGame(updatedGame);
                      setSelectedGame(updatedGame);
                    }}
                    onUpdateGame={(updatedGame) => {
                      handleUpdateGame(updatedGame);
                      setSelectedGame(updatedGame);
                    }}
                  />
                </div>
              )}
            </div>
          </div>

          {/* 游戏板块按钮 */}
          <div className="grid grid-cols-2 gap-4 mt-8">
            {gameSectionButtons.map((sectionType) => {
              const section = selectedGame.sections.find(s => s.type === sectionType);
              const hasContent = section && section.items.length > 0;
              return (
                <button
                  key={sectionType}
                  onClick={() => updateUrl('HOME', selectedGame.id, sectionType)}
                  className={`w-full py-4 rounded-2xl font-bold text-lg transition-all ${
                    hasContent 
                      ? 'bg-gradient-to-r from-pink-500 to-red-500 text-white shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]' 
                      : 'bg-gradient-to-r from-pink-200 to-red-200 text-pink-300 cursor-not-allowed'
                  }`}
                  disabled={!hasContent}
                >
                  {sectionType}
                </button>
              );
            })}
          </div>
        </div>
      );
    }

    // 管理页
    if (activeCategory === 'ADMIN') {
      if (!isAdminLoggedIn) {
        return <Login onLogin={handleLogin} />;
      }
      return <AdminPanel 
        games={games} 
        onAddGame={handleAddGame} 
        onUpdateGame={handleUpdateGame}
        onUpdateGameSection={handleUpdateGameSection}
        onLogout={handleLogout}
        customSectionTypes={customSectionTypes}
        onAddCustomSectionType={handleAddCustomSectionType}
        onDeleteCustomSectionType={handleDeleteCustomSectionType}
        editingGameId={selectedGame?.id}
        getAllSectionTypes={getAllSectionTypes}
        onAddSectionType={handleAddSectionType}
        onDeleteSectionType={handleDeleteSectionType}
        onRenameSectionType={handleRenameSectionType}
        onImportGames={handleImportGames}
        upcomingGames={upcomingGames}
        onUpdateUpcomingGames={setUpcomingGames}
        hotGameIds={hotGameIds}
        onUpdateHotGameIds={setHotGameIds}
        banners={banners}
        onUpdateBanners={setBanners}
        onClearSearchHistory={handleClearSearchHistory}
      />;
    }

    // 分类列表页
    if (activeCategory === GameCategory.ONLINE) {
      const onlineGames = games.filter(g => g.category === GameCategory.ONLINE);
      return (
        <div className="space-y-12 animate-in fade-in zoom-in-95 duration-500">
          <section className="text-center space-y-4">
            <div className="flex items-center justify-center gap-4 mb-4">
              <span className="w-2 h-12 bg-orange-600 rounded-full"></span>
              <h1 className="text-6xl font-black text-slate-800 acg-title">線上遊戲</h1>
            </div>
          </section>

          {onlineGames.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {getSortedGames(onlineGames).map((game, index) => (
                <div key={game.id} className="relative group glass-card rounded-[2.5rem] overflow-hidden">
                  {isAdminLoggedIn && (
                    <div className="absolute top-2 right-2 z-20 flex flex-col gap-1">
                      <button
                        onClick={(e) => { e.stopPropagation(); handleMoveGame(game.id, 'up', GameCategory.ONLINE); }}
                        className="px-2 py-1 bg-black/60 text-white rounded-md text-xs"
                      >
                        ▲
                      </button>
                      <button
                        onClick={(e) => { e.stopPropagation(); handleMoveGame(game.id, 'down', GameCategory.ONLINE); }}
                        className="px-2 py-1 bg-black/60 text-white rounded-md text-xs"
                      >
                        ▼
                      </button>
                    </div>
                  )}
                  <div
                    onClick={() => handleGameClick(game)}
                    className="cursor-pointer"
                  >
                    <div className="h-56 relative overflow-hidden">
                      <img src={game.coverImage} className="w-full h-full object-cover" alt={game.name} />
                    </div>
                    <div className="p-8">
                      <h3 className="text-2xl font-black text-slate-800 mb-4">{game.name}</h3>
                      <div className="grid grid-cols-2 gap-3">
                        {getAllSectionTypes().map((sectionType) => {
                          const section = game.sections.find(s => s.type === sectionType);
                          const hasContent = section && section.items.length > 0;
                          return (
                            <button
                              key={sectionType}
                              onClick={(e) => {
                                e.stopPropagation();
                                if (hasContent) {
                                  updateUrl('HOME', game.id, sectionType);
                                } else {
                                  updateUrl('HOME', game.id);
                                }
                              }}
                              className={`w-full py-2.5 rounded-xl text-sm font-bold transition-all ${
                                hasContent 
                                  ? 'bg-gradient-to-r from-pink-500 to-red-500 text-white'
                                  : 'bg-gradient-to-r from-pink-200 to-red-200 text-pink-300 cursor-not-allowed'
                              }`}
                              disabled={!hasContent}
                            >
                              {sectionType}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-slate-400 text-lg">暫無線上遊戲資料</p>
            </div>
          )}
        </div>
      );
    }

    if (activeCategory === GameCategory.MOBILE) {
      const mobileGames = games.filter(g => g.category === GameCategory.MOBILE);
      return (
        <div className="space-y-12 animate-in fade-in zoom-in-95 duration-500">
          <section className="text-center space-y-4">
            <div className="flex items-center justify-center gap-4 mb-4">
              <span className="w-2 h-12 bg-blue-600 rounded-full"></span>
              <h1 className="text-6xl font-black text-slate-800 acg-title">手機遊戲</h1>
            </div>
          </section>

          {mobileGames.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {getSortedGames(mobileGames).map((game, index) => (
                <div key={game.id} className="relative group glass-card rounded-[2.5rem] overflow-hidden">
                  {isAdminLoggedIn && (
                    <div className="absolute top-2 right-2 z-20 flex flex-col gap-1">
                      <button
                        onClick={(e) => { e.stopPropagation(); handleMoveGame(game.id, 'up', GameCategory.MOBILE); }}
                        className="px-2 py-1 bg-black/60 text-white rounded-md text-xs"
                      >
                        ▲
                      </button>
                      <button
                        onClick={(e) => { e.stopPropagation(); handleMoveGame(game.id, 'down', GameCategory.MOBILE); }}
                        className="px-2 py-1 bg-black/60 text-white rounded-md text-xs"
                      >
                        ▼
                      </button>
                    </div>
                  )}
                  <div className="cursor-pointer">
                    <div 
                      className="relative overflow-hidden bg-black"
                      style={{ paddingBottom: '50%' }}
                      onClick={(e) => {
                        if (game.officialWebsite) {
                          e.stopPropagation();
                          window.open(game.officialWebsite, '_blank');
                        } else {
                          handleGameClick(game);
                        }
                      }}
                    >
                      <img 
                        src={game.coverImage} 
                        className="absolute inset-0 w-full h-full object-cover" 
                        alt={game.name} 
                      />
                    </div>
                    <div className="p-8">
                      <h3 className="text-2xl font-black text-slate-800 mb-4" onClick={() => handleGameClick(game)}>{game.name}</h3>
                      <div className="grid grid-cols-2 gap-3">
                        {getAllSectionTypes().map((sectionType) => {
                          const section = game.sections.find(s => s.type === sectionType);
                          const hasContent = section && section.items.length > 0;
                          return (
                            <button
                              key={sectionType}
                              onClick={(e) => {
                                e.stopPropagation();
                                if (hasContent) {
                                  updateUrl('HOME', game.id, sectionType);
                                } else {
                                  updateUrl('HOME', game.id);
                                }
                              }}
                              className={`w-full py-2.5 rounded-xl text-sm font-bold transition-all ${
                                hasContent 
                                  ? 'bg-gradient-to-r from-pink-500 to-red-500 text-white'
                                  : 'bg-gradient-to-r from-pink-200 to-red-200 text-pink-300 cursor-not-allowed'
                              }`}
                              disabled={!hasContent}
                            >
                              {sectionType}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-slate-400 text-lg">暫無手機遊戲資料</p>
            </div>
          )}
        </div>
      );
    }

    if (activeCategory === GameCategory.STEAM) {
      const steamGames = games.filter(g => g.category === GameCategory.STEAM);
      return (
        <div className="space-y-12 animate-in fade-in zoom-in-95 duration-500">
          <section className="text-center space-y-4">
            <div className="flex items-center justify-center gap-4 mb-4">
              <span className="w-2 h-12 bg-purple-600 rounded-full"></span>
              <h1 className="text-6xl font-black text-slate-800 acg-title">Steam專區</h1>
            </div>
          </section>

          {steamGames.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {getSortedGames(steamGames).map((game, index) => (
                <div key={game.id} className="relative group glass-card rounded-[2.5rem] overflow-hidden">
                  {isAdminLoggedIn && (
                    <div className="absolute top-2 right-2 z-20 flex flex-col gap-1">
                      <button
                        onClick={(e) => { e.stopPropagation(); handleMoveGame(game.id, 'up', GameCategory.STEAM); }}
                        className="px-2 py-1 bg-black/60 text-white rounded-md text-xs"
                      >
                        ▲
                      </button>
                      <button
                        onClick={(e) => { e.stopPropagation(); handleMoveGame(game.id, 'down', GameCategory.STEAM); }}
                        className="px-2 py-1 bg-black/60 text-white rounded-md text-xs"
                      >
                        ▼
                      </button>
                    </div>
                  )}
                  <div className="cursor-pointer">
                    <div 
                      className="h-56 relative overflow-hidden"
                      onClick={(e) => {
                        if (game.officialWebsite) {
                          e.stopPropagation();
                          window.open(game.officialWebsite, '_blank');
                        } else {
                          handleGameClick(game);
                        }
                      }}
                    >
                      <img src={game.coverImage} className="w-full h-full object-cover" alt={game.name} />
                    </div>
                    <div className="p-8">
                      <h3 className="text-2xl font-black text-slate-800 mb-4" onClick={() => handleGameClick(game)}>{game.name}</h3>
                      <div className="grid grid-cols-2 gap-3">
                        {getAllSectionTypes().map((sectionType) => {
                          const section = game.sections.find(s => s.type === sectionType);
                          const hasContent = section && section.items.length > 0;
                          return (
                            <button
                              key={sectionType}
                              onClick={(e) => {
                                e.stopPropagation();
                                if (hasContent) {
                                  updateUrl('HOME', game.id, sectionType);
                                } else {
                                  updateUrl('HOME', game.id);
                                }
                              }}
                              className={`w-full py-2.5 rounded-xl text-sm font-bold transition-all ${
                                hasContent 
                                  ? 'bg-gradient-to-r from-purple-500 to-indigo-500 text-white'
                                  : 'bg-gradient-to-r from-purple-200 to-indigo-200 text-purple-300 cursor-not-allowed'
                              }`}
                              disabled={!hasContent}
                            >
                              {sectionType}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-slate-400 text-lg">暫無 Steam 遊戲資料</p>
            </div>
          )}
        </div>
      );
    }

    // 首页
    return (
      <div className="space-y-12">
        <section className="text-center space-y-4">
          <h1 className="text-6xl font-black text-slate-800 acg-title">8591熱門遊戲知識庫</h1>
          <p className="text-2xl font-bold text-slate-500 mt-4 tracking-widest">讓你我的服務更專業</p>
        </section>

        {/* Home Banner */}
        <HomeBanner banners={banners} />

        {/* 1. 三大分类横向排列 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
           {/* Online */}
           <div 
            onClick={() => updateUrl(GameCategory.ONLINE)}
            className="group relative h-48 rounded-[2rem] overflow-hidden cursor-pointer glass-card transform transition-all hover:scale-[1.02] shadow-xl hover:shadow-2xl"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-orange-400/20 to-transparent z-10"></div>
            <img 
              src="https://upload.8591.com.tw//deal/202601/P2YyBQ4ylnOvkPRV0eyJIDIOAUmtpmbgVm8WydFu.png" 
              className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity" 
              alt="Online" 
            />
            <div className="absolute inset-0 p-8 z-20 flex flex-col justify-center items-center">
              <h2 className="text-3xl font-black text-slate-800 flex items-center gap-3 bg-white/80 px-6 py-3 rounded-full backdrop-blur-sm shadow-sm">
                <span className="w-3 h-3 bg-orange-500 rounded-full"></span>
                線上遊戲
              </h2>
            </div>
          </div>

           {/* Mobile */}
           <div 
            onClick={() => updateUrl(GameCategory.MOBILE)}
            className="group relative h-48 rounded-[2rem] overflow-hidden cursor-pointer glass-card transform transition-all hover:scale-[1.02] shadow-xl hover:shadow-2xl"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 to-transparent z-10"></div>
            <img 
              src="https://upload.8591.com.tw//deal/202601/6D0lRLyvDvSVELqmdKtoMf2fRAcpCpFpc557vTL8.png" 
              className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity" 
              alt="Mobile" 
            />
            <div className="absolute inset-0 p-8 z-20 flex flex-col justify-center items-center">
              <h2 className="text-3xl font-black text-slate-800 flex items-center gap-3 bg-white/80 px-6 py-3 rounded-full backdrop-blur-sm shadow-sm">
                <span className="w-3 h-3 bg-blue-500 rounded-full"></span>
                手機遊戲
              </h2>
            </div>
          </div>

           {/* Steam */}
           <div 
            onClick={() => updateUrl(GameCategory.STEAM)}
            className="group relative h-48 rounded-[2rem] overflow-hidden cursor-pointer glass-card transform transition-all hover:scale-[1.02] shadow-xl hover:shadow-2xl"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-purple-400/20 to-transparent z-10"></div>
            <img 
              src="https://upload.8591.com.tw//deal/202601/3YVptmg1kbDV8JrC8uIKfwEaTJFdiIWJPegQzjIw.png" 
              className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity" 
              alt="Steam" 
            />
            <div className="absolute inset-0 p-8 z-20 flex flex-col justify-center items-center">
              <h2 className="text-3xl font-black text-slate-800 flex items-center gap-3 bg-white/80 px-6 py-3 rounded-full backdrop-blur-sm shadow-sm">
                <span className="w-3 h-3 bg-purple-500 rounded-full"></span>
                Steam專區
              </h2>
            </div>
          </div>
        </div>

        {/* 2. 热门搜索 & 即将上线 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* 左侧：热门搜索 */}
          <div className="bg-white rounded-[2.5rem] p-8 shadow-xl border-4 border-white/50 bg-gradient-to-br from-white to-orange-50/30">
             <h3 className="text-2xl font-black text-slate-800 mb-6 flex items-center gap-3">
               <span className="text-3xl">🔥</span> 熱門搜索
             </h3>
             <div className="space-y-3">
               {hotSearchItems.length > 0 ? hotSearchItems.map((item, idx) => (
                 <div key={idx} 
                      className="flex items-center justify-between p-4 bg-white rounded-2xl border border-gray-100 hover:border-orange-200 hover:shadow-md cursor-pointer transition-all group"
                      onClick={() => navigate(item.path)}
                 >
                    <div className="flex items-center gap-4">
                      <span className={`w-8 h-8 flex items-center justify-center rounded-xl text-sm font-black shadow-sm ${idx < 3 ? 'bg-gradient-to-br from-orange-500 to-red-500 text-white' : 'bg-gray-100 text-gray-500'}`}>
                        {idx + 1}
                      </span>
                      <div className="flex flex-col">
                         <div className="flex items-center gap-2">
                            <span className="font-black text-slate-700 group-hover:text-orange-600 transition-colors">
                              {item.gameName}
                            </span>
                            <span className="text-[10px] bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">
                              {item.sectionName}
                            </span>
                         </div>
                         <span className="text-sm font-bold text-slate-500 mt-0.5">
                           {item.keyword}
                         </span>
                      </div>
                    </div>
                    <span className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-50 text-gray-400 group-hover:bg-orange-100 group-hover:text-orange-500 transition-all">→</span>
                 </div>
               )) : (
                 <div className="text-center text-slate-400 py-12 bg-gray-50/50 rounded-2xl border-2 border-dashed border-gray-200">
                   <p>暫無熱門搜索數據</p>
                   <p className="text-xs mt-2">請先添加遊戲和知識點</p>
                 </div>
               )}
             </div>
          </div>

          {/* 右侧：即将上线/更新 */}
          <div className="bg-white rounded-[2.5rem] p-8 shadow-xl border-4 border-white/50 bg-gradient-to-br from-white to-blue-50/30">
             <h3 className="text-2xl font-black text-slate-800 mb-6 flex items-center gap-3">
               <span className="text-3xl">🚀</span> 即將上線 / 更新
             </h3>
             <div className="space-y-4">
               {upcomingGames.length > 0 ? (
                 <>
                   {upcomingGames.slice((upcomingPage - 1) * 5, upcomingPage * 5).map((game) => (
                     <div key={game.id} className="p-5 bg-white rounded-2xl border border-blue-100 shadow-sm hover:shadow-md transition-all">
                        <div className="flex justify-between items-start mb-3">
                           <h4 className="font-bold text-xl text-slate-800">{game.name}</h4>
                           <span className="px-3 py-1.5 bg-blue-50 text-blue-600 text-xs font-black rounded-lg border border-blue-100">
                             {game.releaseDate}
                           </span>
                        </div>
                        <p className="text-sm font-bold text-slate-500 leading-relaxed bg-slate-50 p-3 rounded-xl">
                          {game.highlight}
                        </p>
                     </div>
                   ))}
                   
                   {upcomingGames.length > 5 && (
                     <div className="flex justify-center items-center gap-4 pt-4">
                       <button
                         onClick={() => setUpcomingPage(p => Math.max(1, p - 1))}
                         disabled={upcomingPage === 1}
                         className="px-4 py-2 rounded-lg bg-blue-50 text-blue-600 font-bold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-100 transition-colors"
                       >
                         上一頁
                       </button>
                       <span className="text-sm font-black text-slate-500">
                         {upcomingPage} / {Math.ceil(upcomingGames.length / 5)}
                       </span>
                       <button
                         onClick={() => setUpcomingPage(p => Math.min(Math.ceil(upcomingGames.length / 5), p + 1))}
                         disabled={upcomingPage >= Math.ceil(upcomingGames.length / 5)}
                         className="px-4 py-2 rounded-lg bg-blue-50 text-blue-600 font-bold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-100 transition-colors"
                       >
                         下一頁
                       </button>
                     </div>
                   )}
                 </>
               ) : (
                 <div className="text-center text-slate-400 py-12 bg-gray-50/50 rounded-2xl border-2 border-dashed border-gray-200">
                   <p>暫無即將上線遊戲</p>
                   <p className="text-xs mt-2">管理員可在後台添加</p>
                 </div>
               )}
             </div>
          </div>
        </div>

        {/* 3. 热门游戏 (Admin Configured) */}
        {hotGameIds.length > 0 && (
          <section className="space-y-8 pt-4">
            <h2 className="text-3xl font-black text-slate-800 flex items-center gap-3 ml-4">
              <span className="text-4xl">👑</span> 本月熱門遊戲
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
               {hotGameIds.map(id => {
                 const game = games.find(g => g.id === id);
                 if (!game) return null;
                 return (
                   <div key={game.id} 
                        className="group relative h-72 rounded-[2rem] overflow-hidden cursor-pointer shadow-lg hover:shadow-2xl transition-all hover:-translate-y-2 border-4 border-white"
                        onClick={() => handleGameClick(game)}
                   >
                      <img src={game.coverImage} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt={game.name} />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent p-8 flex flex-col justify-end">
                         <h3 className="text-3xl font-black text-white mb-3">{game.name}</h3>
                         <div className="flex gap-2">
                           <span className="inline-block px-3 py-1 bg-orange-500 text-white text-xs font-bold rounded-lg">
                             {game.category}
                           </span>
                           <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-md text-white text-xs font-bold rounded-lg border border-white/30">
                             熱門推薦
                           </span>
                         </div>
                      </div>
                   </div>
                 );
               })}
            </div>
          </section>
        )}
      </div>
    );
  };

  return (
    <Layout 
      activeCategory={activeCategory} 
      setActiveCategory={(cat) => { 
        window.scrollTo({ top: 0, behavior: 'smooth' });
        updateUrl(cat);
      }}
      searchQuery={searchQuery}
      onSearch={(q) => {
        setSearchQuery(q);
        updateUrl('SEARCH', undefined, undefined, q);
      }}
      gameName={selectedGame ? selectedGame.name : undefined}
      onBackToHome={() => {}}
      isAdminLoggedIn={isAdminLoggedIn}
      selectedGame={selectedGame}
      onEditGame={(game) => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        updateUrl('ADMIN');
        setTimeout(() => {
          const adminPanel = document.querySelector(`[data-game-id="${game.id}"]`);
          if (adminPanel) {
            adminPanel.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
        }, 300);
      }}
    >
      {renderContent()}
    </Layout>
  );
};

const App: React.FC = () => {
  return <AppContent />;
};

export default App;
