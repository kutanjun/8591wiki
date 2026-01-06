import { GameKB, GameCategory, SectionType, BannerItem, UpcomingGame } from './types';

// 数据版本号：用于强制更新本地数据（当代码中的版本号 > 本地存储的版本号时）
export const DATA_VERSION = '2026-01-05-v1767627951331';

export const INITIAL_BANNERS: BannerItem[] = [];

export const INITIAL_HOT_GAME_IDS: string[] = [];

export const INITIAL_UPCOMING_GAMES: UpcomingGame[] = [];

export const INITIAL_GAMES: GameKB[] = [
  {
    "id": "mc-001",
    "name": "鳴潮 (Wuthering Waves)",
    "category": "手機遊戲",
    "coverImage": "https://picsum.photos/seed/wuthering/600/400",
    "sections": [
      {
        "type": "遊戲術語",
        "items": [
          {
            "id": "term-1",
            "title": "聲骸 (Echoes)",
            "content": "遊戲中核心培養系統，通過擊殺怪物獲得。交易時需注意是否為滿級聲骸或極品詞條。",
            "author": "Admin_XiaoMao",
            "updatedAt": "2024-05-20",
            "tags": [
              "培養",
              "核心"
            ],
            "subItems": []
          },
          {
            "id": "term-2",
            "title": "月卡/大月卡",
            "content": "貝幣與星聲的日常來源，接手帳號需確認剩餘天數。",
            "author": "Admin_XiaoMao",
            "updatedAt": "2024-05-21",
            "tags": [
              "付費"
            ],
            "subItems": []
          },
          {
            "id": "1767627945509",
            "标题": "真的吗",
            "作者": "管理员",
            "更新时间"："2026-01-05"，
            "子项目"：[]
          }
        输入：]
      }
    输入：]
  },
  {
    "id": "lol-001",
    "名称": "英雄联盟 (League of Legends)",
    "类别"："线上游戏"，
    "封面图片": "https://picsum.photos/seed/lol/600/400",
    "章节"：[
      {
        "类型": "客服联络",
        "项目"：[
          {
            "id": "ct-1",
            "title": "腾讯客服对接规范",
            "内容": "提供QQ号及充值记录截图，引导用户前往微信小程序【腾讯客服】申诉。",
            "作者": "CS_Lead",
            "更新时间": "2024-04-15",
            "标签"：[
              “申诉”,
              "騰訊"
            ]，
            "子项目"：[]
          }
        输入：]
      }
    输入：]
  },
  {
    "id": "zzz-001",
    "name": "絕區零 (Zenless Zone Zero)",
    "类别"："手机游戏"，
    "https://upload-bbs.miyoushe.com/upload/2025/11/12/440336986/612f0459cb804d41f6ea147e5f778891_1406418948729606030.jpg?x-oss-process=image//resize,s_500/quality,q_80/auto-orient,0/interlace,1/format,jpg",
    "官方网站": "https://zenless.hoyoverse.com/zh-tw",
    "章节"：[
      {
        "类型"："游戏术语"，
        "项目"：[]
      },
      {
        "类型": "客服联络",
        "项目"：[]
      },
      {
        "类型": "游戏机制",
        "项目"：[]
      },
      {
        "类型": "常见问题",
        "项目"：[]
      },
      {
        "类型": "案例实践",
        "项目"：[]
      }
    输入：]
  }
];
