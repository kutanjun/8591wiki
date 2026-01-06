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
            "title": "真的嗎",
            "author": "Admin",
            "updatedAt": "2026-01-05",
            "subItems": []
          }
        ]
      }
    ]
  },
  {
    "id": "lol-001",
    "name": "英雄聯盟 (League of Legends)",
    "category": "線上遊戲",
    "coverImage": "https://picsum.photos/seed/lol/600/400",
    "sections": [
      {
        "type": "客服聯絡",
        "items": [
          {
            "id": "ct-1",
            "title": "騰訊客服對接規範",
            "content": "提供QQ號及充值記錄截圖，引導用戶前往微信小程序【騰訊客服】申訴。",
            "author": "CS_Lead",
            "updatedAt": "2024-04-15",
            "tags": [
              "申訴",
              "騰訊"
            ],
            "subItems": []
          }
        ]
      }
    ]
  },
  {
    "id": "zzz-001",
    "name": "絕區零 (Zenless Zone Zero)",
    "category": "手機遊戲",
    "coverImage": "https://upload-bbs.miyoushe.com/upload/2025/11/12/440336986/612f0459cb804d41f6ea147e5f778891_1406418948729606030.jpg?x-oss-process=image//resize,s_500/quality,q_80/auto-orient,0/interlace,1/format,jpg",
    "officialWebsite": "https://zenless.hoyoverse.com/zh-tw",
    "sections": [
      {
        "type": "遊戲術語",
        "items": []
      },
      {
        "type": "客服聯絡",
        "items": []
      },
      {
        "type": "遊戲機制",
        "items": []
      },
      {
        "type": "常見問題",
        "items": []
      },
      {
        "type": "案例實踐",
        "items": []
      }
    ]
  }
];
