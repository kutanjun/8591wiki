
export enum GameCategory {
  ONLINE = '線上遊戲', // 線上遊戲 (PC)
  MOBILE = '手機遊戲', // 手機遊戲
  STEAM = 'Steam'      // Steam 遊戲
}

export enum SectionType {
  MECHANICS = '遊戲機制',
  CONTACT = '客服聯絡',
  PRACTICE = '案例實踐',
  TERMINOLOGY = '遊戲術語',
  FAQ = '常見問題',
  // SECURITY = '交易安全', // Deprecated
  TUTORIAL = '操作指南'
}

// 自定义板块类型（存储在localStorage中）
export interface CustomSectionType {
  id: string;
  name: string;
}

// 子板块（知识点）
export interface KBSubItem {
  id: string;
  title: string;
  content: string;
  tags: string[];
  image?: string; // 单张图片URL
  imageGallery?: string[]; // 图册（多张图片）
  video?: string; // 视频URL
  textColor?: string; // 文字颜色
  backgroundColor?: string; // 背景颜色
}

// 大标题板块
export interface KBItem {
  id: string;
  title: string; // 大标题，如：一、如何註冊與登入
  author: string;
  updatedAt: string;
  subItems: KBSubItem[]; // 子板块列表
  // 保留旧字段以兼容
  content?: string;
  tags?: string[];
  image?: string;
  imageGallery?: string[];
  video?: string;
  gameUpdateInfo?: string;
  additionalContent?: {
    label: string;
    value: string;
  }[];
  textColor?: string; // 文字颜色
  backgroundColor?: string; // 背景颜色
}

export interface KBSection {
  type: SectionType;
  items: KBItem[];
}

export interface GameKB {
  id: string;
  name: string;
  category: GameCategory;
  coverImage: string;
  bannerImage?: string; // Banner 图片（独立于封面图）
  bannerTitle?: string; // Banner 标题（用于显示游戏版本信息）
  bannerLink?: string; // Banner 跳转链接
  sections: KBSection[];
  officialWebsite?: string; // 游戏官网链接
}

// 即将上线/更新游戏
export interface UpcomingGame {
  id: string;
  name: string;
  releaseDate: string; // 上线时间或更新时间
  highlight: string; // 特别关注点
}

// 热门搜索项
export interface HotSearchItem {
  id: string;
  gameName: string; // 游戏名
  sectionName: string; // 板块名 (大标题)
  keyword: string; // 关键词
  path: string; // 完整路径或ID引用，用于跳转
  count?: number; // 搜索次数（预留）
}

// 首页 Banner
export interface BannerItem {
  id: string;
  imageUrl: string;
  linkUrl?: string;
  title?: string; // Banner 标题/描述
}

