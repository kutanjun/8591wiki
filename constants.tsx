import { GameKB, GameCategory, SectionType, BannerItem, UpcomingGame } from './types';

// 数据版本号：用于强制更新本地数据（当代码中的版本号 > 本地存储的版本号时）
export const DATA_VERSION = '2026-01-14-v1768405842097';

export const INITIAL_BANNERS: BannerItem[] = [
  {
    "id": "1767708157466",
    "imageUrl": "https://upload.8591.com.tw//deal/202601/BwAywesgRA3HYNfdWx7PB0O39Z4JNqejYqseSC96.png",
    "linkUrl": "https://endfield.gryphline.com/zh-tw#home",
    "title": "全球公測定檔1月22日"
  },
  {
    "id": "1767708198303",
    "imageUrl": "https://upload.8591.com.tw//deal/202601/dLBHnC7ENIXsqYWrsDPFf7lkb0BzxPerOoIUk6Jv.png",
    "linkUrl": "https://wutheringwaves.kurogames.com/zh-tw/main/news/detail/3913",
    "title": "3.0版本我們生而眺望 已上線"
  }
];

export const INITIAL_HOT_GAME_IDS: string[] = [
  "mc-001",
  "zzz-001",
  "1767707626410"
];

export const INITIAL_UPCOMING_GAMES: UpcomingGame[] = [
  {
    "id": "1767706108618",
    "name": "明日方舟：終末地",
    "releaseDate": "2026-01-22",
    "highlight": "全球定檔"
  }
];

export const INITIAL_GAMES: GameKB[] = [
  {
    "id": "mc-001",
    "name": "鳴潮 (Wuthering Waves)",
    "category": "手機遊戲",
    "coverImage": "https://upload.8591.com.tw//deal/202601/AZVGQ7ikjN2m0PYLXb1yaAVVSEU2KxxsMQesCA0d.png",
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
    ],
    "officialWebsite": "https://wutheringwaves.kurogames.com/zh-tw/main/",
    "bannerImage": "https://upload.8591.com.tw//deal/202601/dLBHnC7ENIXsqYWrsDPFf7lkb0BzxPerOoIUk6Jv.png",
    "bannerTitle": "鳴潮3.0版本已上線",
    "bannerLink": "https://wutheringwaves.kurogames.com/zh-tw/main/news/detail/3913"
  },
  {
    "id": "lol-001",
    "name": "英雄聯盟 (League of Legends)",
    "category": "線上遊戲",
    "coverImage": "https://upload.8591.com.tw//deal/202601/RcbUe4nqJpAaSSLs5bBfSUgx5SVPkk61u4kR5qO9.png",
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
    ],
    "officialWebsite": "https://www.leagueoflegends.com/zh-tw/",
    "bannerLink": "https://www.leagueoflegends.com/zh-tw/news/game-updates/patch-26-1-notes/",
    "bannerTitle": "英雄聯盟2026年全新賽季",
    "bannerImage": "https://upload.8591.com.tw//deal/202601/ocT4pszeAvZtLMYURohTONRkSA4Y3T2aoNsi2qCA.png"
  },
  {
    "id": "zzz-001",
    "name": "絕區零 (Zenless Zone Zero)",
    "category": "手機遊戲",
    "coverImage": "https://upload.8591.com.tw//deal/202601/kPD2RCQzku34OT9IYW4fx41prL8QAy55Ix7Xd1pc.png",
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
    ],
    "bannerLink": "https://zenless.hoyoverse.com/zh-tw/news/161728",
    "bannerTitle": "絕區零2.5版本已上線",
    "bannerImage": "https://upload.8591.com.tw//deal/202601/oBGjMVpVNk43ARfesQLfkpP3uo148i987dp5SKtD.png"
  },
  {
    "id": "1767707610045",
    "name": "Garena傳說對決",
    "category": "手機遊戲",
    "coverImage": "https://upload.8591.com.tw//deal/202601/DQbKRGyVu5kGbQGusYJLLc2F6Et4pSjvqcHpihvK.png",
    "sections": [
      {
        "type": "遊戲機制",
        "items": [
          {
            "id": "1768315270264",
            "title": "一、如何註冊及登入",
            "author": "Admin",
            "updatedAt": "2026-01-13",
            "subItems": [
              {
                "id": "1768315280003",
                "title": "☠遊戲帳號如何註冊",
                "content": "1、Garena官方帳號註冊，而FB、Google、Line、蘋果ID是直接登入，有伺服器可以選擇",
                "tags": [],
                "textColor": "#FF5722",
                "image": "https://upload.8591.com.tw//deal/202601/HucCHPd5BsJJKbEg4B4KAZBeRKvWbGRHo96TEiiz.png",
                "imageGallery": []
              },
              {
                "id": "1768315527663",
                "title": "☠遊戲帳號如何登入",
                "content": "2、登入時選擇：Apple、Garena、Google、Line、FB、遊客的一種，安卓手機有Garena、Google、Line、FB可以選擇，但無法使用遊客登入，只有蘋果才可以用遊客登入",
                "tags": [],
                "textColor": "#FF5722",
                "image": "https://upload.8591.com.tw//deal/202601/o7JjDFDOPNEio65AtjAKzMJj8abVOIYAwJ7ifjEy.png",
                "imageGallery": []
              },
              {
                "id": "1768315620761",
                "title": "遊戲玩法介紹",
                "content": "定位：Moba、5V5、團戰\n玩法：每個玩家可選則不同的角色、定位，主要以5V5的模式進行多人即時對戰，通過提升裝備、協作策略等方式，最終與隊友完成幾百對方陣營取得勝利",
                "tags": [],
                "textColor": "#FF5722",
                "video": "https://www.youtube.com/watch?v=78Fa4Cbh0sI",
                "imageGallery": []
              }
            ],
            "textColor": "#FF5722"
          },
          {
            "id": "1768315732901",
            "title": "二、遊戲帳號的綁定相關",
            "author": "Admin",
            "updatedAt": "2026-01-13",
            "subItems": [
              {
                "id": "1768315749453",
                "title": "1、不同登入方式的區別",
                "content": "不同登入方式的區別",
                "tags": [],
                "textColor": "#FF5722",
                "image": "https://upload.8591.com.tw//deal/202601/nIfe6lEmhZRkmm4OcQF2HU8s4rYaECvZsgfFvezE.png",
                "imageGallery": []
              },
              {
                "id": "1768315796373",
                "title": "2、不同登入方式的影響",
                "content": "安卓手機登入有Garena、FB、Line、google四種方式可登入；蘋果手機登入有Garena、FB、Apple ID、Line、google、遊客六種方式登入\n\n若Garena與FB連接一起，並且FB為空號，那麼在Garena創建角色之後，不管使用Garena登入，還是FB登入，都會進入相同遊戲角色\n\n若FB已經有單獨創建過角色，即使綁定Garena一起，也是2個獨立開來的帳號\n【專業術語】若FB已停用，交易時無法連同FB提供給買家，通常叫臉書斷連",
                "tags": [],
                "textColor": "#FF5722",
                "imageGallery": []
              },
              {
                "id": "1768315823437",
                "title": "3、註冊條件的限制",
                "content": "現有的Garena註冊條件當中，是必須要填寫【信箱】才能註冊成功，那麼是怎麼出現無綁無連的帳號？ 【查看連結】\n【原因】在《傳說對決》早期版本（2017-2019年期間），允許通過“遊客模式”或“快速註冊”直接生成帳號（僅需用戶名+密碼），無需強制綁定郵箱而後續於2020年逐步調整註冊規則，才有要求新帳戶必須綁定信箱，如果該帳號未去綁定信箱或手機，理論上應該是無法更改密碼",
                "tags": [],
                "textColor": "#FF5722",
                "imageGallery": []
              },
              {
                "id": "1768315835110",
                "title": "4、Garena有哪些安全設定？",
                "content": "安全設定",
                "tags": [],
                "textColor": "#FF5722",
                "image": "https://upload.8591.com.tw//deal/202601/fx9n2HQACaB2PQonzmJbEVNOZvS4Ts3DvrHU6UMs.png",
                "imageGallery": []
              },
              {
                "id": "1768315877291",
                "title": "5、如何修改密碼",
                "content": "修改流程：\n1、帳戶中心-安全https://account.garena.com/\n2、變更密碼>>通過電子信箱/手機號碼（有綁定的話）獲取驗證",
                "tags": [],
                "textColor": "#FF5722",
                "image": "https://upload.8591.com.tw//deal/202601/afJHwOkDlmQr0F9ipbFtxOTfvi7hReBd3CxrhtiD.png",
                "imageGallery": []
              },
              {
                "id": "1768315925824",
                "title": "6、Garena帳號忘記密碼如何找回",
                "content": "①填寫 email/帳號 or 手機號碼\n②選擇驗證方式 email（提示首位） or 手機號碼（提示末兩位）or帳號（提示前後各2位）\n即帳號、信箱、手機需明確知道2種，會提示部分信息（參考判斷）\n\n● 例：填寫帳號>>驗證可選信箱或手機任一接收驗證碼\n● 填寫信箱>>驗證可填帳號或手機，再接收驗證碼（填帳號時驗證碼會發送至信箱）\n③曾用FB登入Garena，可用FB修改密碼（僅遊戲內頁面顯示）\n● 仍需要填郵箱或電話來接收驗證碼（FB替代了帳號填寫這步",
                "tags": [],
                "textColor": "#FF5722",
                "imageGallery": [
                  "https://upload.8591.com.tw//deal/202601/PqYhTVKQn2A5ckqln9U59CwrNxNCA8Lb83436QTc.png",
                  "https://upload.8591.com.tw//deal/202601/JcekaGa6uOSM5Q6g084bJqwn20tYfTyQF2cNEFhw.png",
                  "https://upload.8591.com.tw//deal/202601/61Cf8rXW1t82rd9dN6xA7TpNA1wAwvWNO8ukngEI.png",
                  "https://upload.8591.com.tw//deal/202601/8Sc4GWnFk6qeNO7jegERW8p25jditsPzAqvZDwvI.png"
                ]
              },
              {
                "id": "1768316002176",
                "title": "7、Garena帳號綁定過FB也可以找回密碼",
                "content": "曾用FB登入Garena，可用FB修改密碼（僅遊戲內頁面顯示） \n● 仍需要填郵箱或電話來接收驗證碼（FB替代了帳號填寫這步）",
                "tags": [],
                "textColor": "#FF5722",
                "imageGallery": [
                  "https://upload.8591.com.tw//deal/202601/i7cnhoeFRRtlKRBXi6fMJnuuaAt5qBWJDCswe8zj.png",
                  "https://upload.8591.com.tw//deal/202601/isdGRViFHeLxtWB4qGymTWQ3qt0PIqwxjRkHe0Gq.png",
                  "https://upload.8591.com.tw//deal/202601/kaE1mTgxl6RYukge7T5VFa6VnDIxUpOktWADZ8BT.png",
                  "https://upload.8591.com.tw//deal/202601/Ttv1E6AZUg0EIE8xJ8de8D8T3ZaRJS9OMcpMhrqo.png",
                  "https://upload.8591.com.tw//deal/202601/OjiQBfRUzkYZ6lUdKeQBStScI8tFcWOeAFfQNNm1.png"
                ]
              }
            ],
            "textColor": "#FF5722"
          },
          {
            "id": "1768316093059",
            "title": "三、FB帳號相關說明",
            "author": "Admin",
            "updatedAt": "2026-01-13",
            "subItems": [
              {
                "id": "1768316101235",
                "title": "8、FB的註冊流程",
                "content": "<span style=\"color: red\">☠重點說明</span>\n為什麼會將FB帳號的註冊及登入方式進行特別說明，主要是以前Garena帳號可以跟FB連結，在有綁定FB帳號的情況下，會影響Garena帳號的使用安全\n\n①什麼是FB？\nFB是指臉書的一個社交平台，台灣地區的遊戲，大部分可以使用臉書帳號去登入遊戲，屬於第三方平台\n\n②FB是如何註冊的？\nFB註冊流程比較簡單：\n→輸入註冊姓名\n→選擇出生日期\n→選擇性別\n→輸入註冊的信箱及密碼\n→獲取對應信箱驗證碼即可註冊成功\n\n<span style=\"color: red\">③為什麼FB登入的，要整組移交帳號呢？</span>\n註冊FB的時候，填寫的信箱是登入的媒介，如果受登入影響，可能需要獲取信箱的驗證碼，則還要去對應信箱渠道去查看驗證碼\n\n參考註冊的第二步，就需要獲取信箱驗證碼，如果賣家移交時，沒有移交整組信箱資料，買家的登入可能會有安全隱患",
                "tags": [],
                "textColor": "#FF5722",
                "imageGallery": [
                  "https://upload.8591.com.tw//deal/202601/LuPm6l23yXsxoh04oavLDdDxmU9ZGSeMr0k8nPIS.png",
                  "https://upload.8591.com.tw//deal/202601/Q2cxrTrlgpAxUHFlyUF9ILAK3d2wUE3BNchlD8gd.png",
                  "https://upload.8591.com.tw//deal/202601/VOHbm1hb1qMab0jssDigmo3v3jKTGhlchwHX7Lcp.png"
                ]
              },
              {
                "id": "1768316270258",
                "title": "9、賣家移交FB資料後，買家應該做哪些資料的修改確保自己的帳號安全？",
                "content": "買家需要進行兩步修改驗證，即修改FB帳號的登入驗證資料，以及登入信箱的相關資料\n\n第一步：登入FB帳號，添加相關綁定的資料\n以手機版FB參考為例：\n①登入至FB點擊設定，在帳戶中心-個人詳情-聯絡方式\n移除原本有的聯絡方式，重新添加屬於買家自己的聯絡電話或信箱\n②在密碼和安全的選項中，查看是否有啟用雙重驗證\n若是，可以移除原本的WhatsApp驗證，添加買家自己的WhatsApp驗證\n\n第二步：確認好登確認好登入的信箱是哪一類信箱\n以微軟信箱為例：\n1.登入至微軟信箱個人資料\n2.將原本的個人資料進行修改，特別是【帳戶信息】，如果原本賣家有添加自己的其他備用信箱，需要移除，買家可以添加屬於自己的備用登入信箱\n3.甚至可以在帳戶【安全】中，添加更多登入選項，以防帳號被盜\n\n<span style=\"color: red\">其他信箱登入的種類較多，修改流程也會有所不一樣，我們就主要提醒買家自行去更改了</span>",
                "tags": [],
                "textColor": "#FF5722",
                "imageGallery": [
                  "https://upload.8591.com.tw//deal/202601/ZW2EE1s83TfcghzSJAcVO6GfTo4XHJBqpn4SO9rr.png",
                  "https://upload.8591.com.tw//deal/202601/vos1573kRVb04rzbpt9SrLYzPoQK7D4Z7PSoYPAs.png",
                  "https://upload.8591.com.tw//deal/202601/lXFM4a8RPdIXdpZR5fNpCv3rLbppOYvEsjmen4ja.png",
                  "https://upload.8591.com.tw//deal/202601/tjBciUSaOduWFITeHGCTS0s8LsuyCabjZOeQVMMG.png",
                  "https://upload.8591.com.tw//deal/202601/aPJR0yWOy4Ui9kswflE1BT0Nd7GFNmrZHsqoQRPk.png"
                ]
              },
              {
                "id": "1768316364980",
                "title": "10、FB的帳號是否能進行修改？",
                "content": "理論上是可以進行修改的，主要邏輯是通過添加其他帳號，再刪掉現有的帳號，就可以用新的帳號去登入了\n\n<span style=\"color: red\">但此方法暫時未通過實際的驗證，因此我們不主動轉達給會員</span>\n以下是理論的修改FB帳號的步驟，僅為參考！！！\n第一步：登入FB帳號，添加相關綁定的資料\n以電腦版FB參考為例：\n1.登入至FB點擊設定和隱私-設定，在帳戶管理中心點擊【個人資料】\n2.選擇【個人檔案】，點擊新增帳號-Meta帳號\n3.添加一組新的郵箱，來作為登入的媒介\n如果此信箱是未註冊的，系統可能會提醒你要註冊\n\n第二步：添加成功之後，就可以嘗試用新的信箱看能否登入此帳號如果可以，後續也可以嘗試刪除原本的信箱了，繼而來實現\n\n<span style=\"color: red\">【溫馨提醒】</span>\n因此方案暫時無法透過實踐來驗證可行性，每次註冊新的FB帳號時都被永久封鎖，導致實踐的步驟有產生困難，所以主要是通過AI+已看到的界面來進行推測",
                "tags": [],
                "textColor": "#FF5722",
                "imageGallery": [
                  "https://upload.8591.com.tw//deal/202601/uI5cXd9FcpN0eJu6ZwkLOdnq5hVee1JMQN6sf8Xy.png",
                  "https://upload.8591.com.tw//deal/202601/wEYpzSuJ3XtInkwRrWykuej2q7wWRo1zZTFyd8u2.png",
                  "https://upload.8591.com.tw//deal/202601/o6iXN1bAkKQEg7ukUyAXVOPojqzdLaoDnzUcDrWD.png",
                  "https://upload.8591.com.tw//deal/202601/uLRmmAKqk9IfSTjW6OTtfxZa7UbDFN0Upq1nfFA4.png"
                ]
              }
            ],
            "textColor": "#FF5722"
          }
        ]
      },
      {
        "type": "客服聯絡",
        "items": [
          {
            "id": "1768316477978",
            "title": "聯絡Garena官方處理流程",
            "author": "Admin",
            "updatedAt": "2026-01-13",
            "subItems": [
              {
                "id": "1768316484739",
                "title": "一、產生交易糾紛，買家如何寫信給官方找回帳號",
                "content": "①先登入Garena用戶中心\n②選擇【線上回報單】進行填寫問題，通常是1-2個工作日會有回覆或打開鏈接提交 【點擊打開回報單網頁】\n③寫信之後，可能官方會確認身份，咨詢與帳號註冊等詳細資料，如右圖，非一手賣家很難提供這些資料的，官方的問題挺刁難的4.後續等待官方回覆，可在該網頁 【點擊打開回報單網頁】",
                "tags": [],
                "textColor": "#FF5722",
                "image": "https://upload.8591.com.tw//deal/202601/aXTo3NRBoUq6Fe2JOCdRUOpxxvGpF05CwqaeS1af.png",
                "imageGallery": []
              },
              {
                "id": "1768316529148",
                "title": "二、官方無法提供詳細證明情況下，如何解決交易糾紛問題？",
                "content": "如果被鎖帳號，一些常見的可能官方不會給予完整回覆，這樣子就比較難定位是否賣家的問題，需要從刊登、即時通訊、出售帳號記錄等方面下手若最終無法判斷是否賣家問題，只能引導雙方協商或買家考量報警處理",
                "tags": [],
                "textColor": "#FF5722",
                "image": "https://upload.8591.com.tw//deal/202601/vdzSfq8opUgpPcQXZwOJ6m0elrmNqHtKzOoRBOU0.png",
                "imageGallery": []
              },
              {
                "id": "1768316623585",
                "title": "三、帳號是純FB綁定，如果FB被找回導致無法登入，是否能聯絡遊戲官方處理？",
                "content": "答案：無法，因買家的帳號是由FB綁定登入，被影響是第三方鏈接，官方是無法直接處理，可參考以下案例： 【點擊查看案例】",
                "tags": [],
                "textColor": "#FF5722",
                "image": "https://upload.8591.com.tw//deal/202601/sOjilfBinESqMX5inGgRNNbYAWB8WIuA9RmZ3OJl.png",
                "imageGallery": []
              }
            ],
            "textColor": "#FF5722"
          }
        ]
      },
      {
        "type": "遊戲術語",
        "items": [
          {
            "id": "1768316681588",
            "title": "傳說對決常見的遊戲術語",
            "author": "Admin",
            "updatedAt": "2026-01-13",
            "subItems": [
              {
                "id": "1768316699590",
                "title": "一、遊戲內有哪些常見的遊戲術語或需要瞭解的內容",
                "content": "<span style=\"color: orange\">☠不同登入方式儲值品相的差異</span>\n①遊戲內常見的儲值品相，大致分為三種\n→遊戲內可直接儲值的品相（圖一）\n→網頁儲值：可通過貝殼幣餘額點數或Visa信用卡等方式儲值購買（圖二）\n→貝殼幣序號儲值：通過選擇固定的面額，用相應面額的貝殼幣序號進行兌換（圖三）",
                "tags": [],
                "textColor": "#FF5722",
                "imageGallery": [
                  "https://upload.8591.com.tw//deal/202601/GE7q6Fja69Bai80rtyYPFQlWUJmPjMBj6YVzyekF.png",
                  "https://upload.8591.com.tw//deal/202601/NrbsybuODcYrsLfu3wWHkG4GyZJktgn8MWdZM3vl.png",
                  "https://upload.8591.com.tw//deal/202601/m1ofX178riW5PXzOCNntpcKfxgwWXF5woSHUvg4c.png"
                ]
              },
              {
                "id": "1768316838847",
                "title": "☠代練交易，買賣雙方之間提及到的段位是什麼內容？",
                "content": "在傳說對決內，有一種叫排位模式的遊戲玩法，10位玩家通過5V5的方式，在考驗個人實力及團隊協作的情況下獲取遊戲勝利，勝利者獲取到對應星星數來晉升段位， 段位越高上分的難度就越大，因此對於玩家來說，這種一種實力的象征\n同時，遊戲中會隨著時間更新不同的賽季，遊戲段位會隨著賽季的結束而重置，並根據段位的差異獲得不同的獎勵\n因此不同追求的玩家，為了獲得更高的段位或者更好的獎勵，但受限於自身實力影響，會找代練/帶練來提升自己的段位，滿足自己在遊戲內的追求感",
                "tags": [],
                "textColor": "#FF5722",
                "imageGallery": [
                  "https://upload.8591.com.tw//deal/202601/e2Nv3547EnBYCfeZKTj46csPcJCgosq30xRrp21h.png",
                  "https://upload.8591.com.tw//deal/202601/Pj7p2X9dcrVm9R3uhw98l8kIRRdUNRPGuq9femwa.png",
                  "https://upload.8591.com.tw//deal/202601/9sCJDKNFOvZofys1Fj8ou1LwlCiOb6eT7FLInNFg.png"
                ]
              },
              {
                "id": "1768316889047",
                "title": "☠遊戲的UID是什麼，傳說對決遊戲如何查看UID？",
                "content": "遊戲內的UID，是用於唯一識別玩家身分的一串數字或字符組合，類似於現實中的身分證號\n<span style=\"color: red\">特點：具有唯一性，每個玩家的UID在特定遊戲或伺服器中是獨一無二的，即使玩家更換設備/改名字，UID都保持不變</span>\n\n<span style=\"color: red\">在8591內有什麼作用？</span>\n在帳號重複系統來說能檢測賣家是否重複出售帳號的標誌，當賣家重複出售的遊戲帳號時，兩筆交易的UID重複時，具有較高程度的重複出售嫌疑，客服在判斷時多了一項可靠的依據",
                "tags": [],
                "textColor": "#FF5722",
                "imageGallery": [
                  "https://upload.8591.com.tw//deal/202601/uNMeOjxZa6aLizgNq5TRaG9SX8tQKnQfLPyeRFH7.png",
                  "https://upload.8591.com.tw//deal/202601/eVceVzAvBXiHKJbaG6dDyk26tUysfX9ZtBoJVV0f.png"
                ]
              }
            ],
            "textColor": "#FF5722"
          }
        ]
      },
      {
        "type": "常見問題",
        "items": [
          {
            "id": "1768316973171",
            "title": "一、雙方交易時的注意事項",
            "author": "Admin",
            "updatedAt": "2026-01-13",
            "subItems": [
              {
                "id": "1768316977305",
                "title": "☠購買帳號時注意的事項",
                "content": "①買家購買到帳號之後，要怎麼確認帳號是否符合要求呢？\n→遊戲內主要查看帳號的對戰記錄、UID以及是否有綁定信箱、以及英雄數、造型數\n→帳號安全方面：需要登入garena官網的會員中心確認綁定的情況\nPS：僅有Garena登入的方式才能確認，FB登入方式沒什麼用\n②移交Garena帳號跟純FB的話，檢查方式也會有所不同，區分如下：\n→有Garena的帳號，可以去會員中心查看並修改綁定（如密碼、手機以及帳號登入、修改記錄），如右圖\n→只有純FB的帳號，只能去另一個鏈接查看綁定情況，一旦綁定就無法取消驗證/修改，也無法查看帳號登入/修改記錄，因為主要是用FB登入的\n③在移交FB情況下，買家如何得知是否綁定garena，來判斷賣家是否移交完整資料\n\n【點擊查看案例】 買家通過garena成功用FB登入，則代表garena帳號與FB是綁定的，不過該APP已無法下載了，此方法後續無法驗證",
                "tags": [],
                "textColor": "#FF5722",
                "image": "https://upload.8591.com.tw//deal/202601/azdseECb9u9bkx8VtwHOSN0FuPZuzxqWXkbQ4Qk9.png",
                "imageGallery": []
              }
            ],
            "textColor": "#FF5722"
          }
        ]
      },
      {
        "type": "案例實踐",
        "items": [
          {
            "id": "1768317029202",
            "title": "案例的處理流程及思路",
            "author": "Admin",
            "updatedAt": "2026-01-13",
            "subItems": [
              {
                "id": "1768317035315",
                "title": "案例1的申訴流程",
                "content": "點擊查看案例1\n買家反饋帳號被搶登\n申訴內容：被搶登多次賣家一直扯前帳要他賠一點錢也不要一直說要報警\n\n處理思路：\n買家說被搶登，我們是否有很好的判定思路，一般的遊戲我們是很難確認到此問題點，但傳說對決，或者是說Garena的遊戲，我們是有下手點去解決的\n一、通過賣場確認買家遊戲的登入方式，是Garena帳號登入，還是FB登入方式\n①如果是Garena的登入方式，我們將有很好的下手點，可以讓買家登入Garena網址，自己去查看【登入記錄】，並說明哪個時間點是他人導致\n我們再通過買家提供的IP，通過8591的後台去搜尋，看是否能抓到賣家的可疑性\nGarena網址：https://tw.support.garena.com/\n②如果是FB的登入方式，那就無法通過登入Garena網址去查看【登入記錄】了，因此網址只支援Garena帳號登入的方式去查看，此時只能引導買家去提交表單，跟官方確認具體被搶登的資料",
                "tags": [],
                "textColor": "#FF5722",
                "imageGallery": [
                  "https://upload.8591.com.tw//deal/202601/nwZBhn5VY1jw64B7BKI9ejeUXwLoFSlSwWfJXhs7.png",
                  "https://upload.8591.com.tw//deal/202601/AjC21uWNG1iyxK8tEkyBNCrmpUDTxY5lt1rwrhp1.png"
                ]
              },
              {
                "id": "1768317103507",
                "title": "案例2的處理思路",
                "content": "點擊查看案例2\n自己購買的決勝時刻信箱被移除，導致現在無法登入\n申訴內容：之前買了一個3000的決勝帳號有問題信箱整組單綁信箱現在信箱整組被移掉對方一直不負責一直說是被鎖是我的問題\n\n\n處理思路：\n雖然此筆交易是決勝時刻，並非傳說對決，但都是Garena旗下的遊戲，理論都是相同可以確認的\n一、通過買家的描述，此帳號是通過FB方式進行登入，並且也有修改相關資料，但現在被改走，自己無法登入成功\n因此我們應該如何處理呢？\n①引導買家寫信至官方，確認哪個帳號，在什麼時間被改了資料，應該如何找回？　　　　　　　　 ⛝\n②協助聯絡賣家確認，告知買家的情況，請賣家協助買家處理？　　　　　　　　　　　　　　　　✔✔✔\n③引導買家至FB官方確認，FB帳號是資料被改情況以及如何找回？　　　　　　　　　　　　　　 ✔✔✔",
                "tags": [],
                "textColor": "#FF5722",
                "imageGallery": [
                  "https://upload.8591.com.tw//deal/202601/CNaInwqscq8JsHkAL0drmqRwejHlWjpKKEbGWTPX.png",
                  "https://upload.8591.com.tw//deal/202601/9P4KqXKIEg8bQIBQf8P3qYyZLi3BChJxReeSnWV1.png",
                  "https://upload.8591.com.tw//deal/202601/0hyqkc4ZIq4QaepIFxO9tpIPCOzSQKpJ0pEQpsz4.png"
                ]
              },
              {
                "id": "1768317260497",
                "title": "案例2的處理流程",
                "content": "二、即FB無法登入的問題，除賣家的協助之外，應該是要讓買家與FB確認，但通常很難解決\n①通過各種爬文，以及豆包等搜尋，也只能找到網頁協助，無法找到提交表單或FB客服的渠道，最終需要賣家協助或考量報警處理了\n②唯一找到的申訴網址，在無法登入狀態只能跟著系統一步步操作，基本上很難解決\nFB申述網址：https://www.facebook.com/hacked\n如果能登入進去，就可以根據問題去提交反饋",
                "tags": [],
                "textColor": "#FF5722",
                "imageGallery": [
                  "https://upload.8591.com.tw//deal/202601/bbyUvqQVvMW3w1mhkGVky1Dc2dv2k6aJGIGIE4Dr.png",
                  "https://upload.8591.com.tw//deal/202601/fZViTx4ums8apHPsCEmnHlIxK7rfhOeiSxQz4BY2.png",
                  "https://upload.8591.com.tw//deal/202601/sNR09NpLFeNuItC6FTNYvIaXerdV6bZY8wbFqrt6.png",
                  "https://upload.8591.com.tw//deal/202601/qJdI41DQt8Pwp29DPlTyEFde9L3hkiFdS0c2nTzF.png"
                ]
              },
              {
                "id": "1768317330690",
                "title": "案例3的處理思路",
                "content": "點擊查看案例3\n請問如果我買了帳號後才得知是二手帳號，對方無法處理前帳主強制都登入該如何處理？由賣方陳述我希望能夠正常的遊玩我所購買的， 如果無法處理是否能夠退款？我目前完全聯想不到賣家，因此尋求8591客服第三方的服務\n\n處理思路：\n1、聯絡前的檢視\n①查看帳號刊登的來源方式，是否有綁定資料\n②通過留言板、即時通訊判斷買家是否有修改資料的相關訊息\n③此遊戲帳號有幾次的交易記錄\n④賣家是否有餘額可以圈存\n\n2、聯絡賣家確認的問題\n①刊登與實際不符的原因\n②與買家交易時，移交了哪些資料，修改了哪些資料\n③現在需要與買家協商處理\n\n3、聯絡買家確認的問題\n①確認賣家移交了哪些資料，修改了哪些資料，哪些還沒更改？\n<span style=\"color: red\">②買家使用Garena登入，需引導至Garena網頁，去查看【IP相關登入記錄】</span>",
                "tags": [],
                "textColor": "#FF5722",
                "imageGallery": [
                  "https://upload.8591.com.tw//deal/202601/vQ4WmffXdbxzyUsgzuvMDBKKHDvcJhWNPD4o9phN.png",
                  "https://upload.8591.com.tw//deal/202601/ijjDuq8RTAZi8HYBiM6eJgPiXv8V5j0LUdQVwbYw.png",
                  "https://upload.8591.com.tw//deal/202601/APUzwS627QycJmRyk0QllOu8PDGQtNoHByvQunI0.png"
                ]
              },
              {
                "id": "1768317481550",
                "title": "案例4的處理思路",
                "content": "點擊查看案例4\n\n買家反饋收到的是FB信箱帳號，也有更改密碼，但現在帳號被找回，買家跟朋友都無法登入，並且提示找不到帳號\n一、出現的情況梳理思路：\n1.買家拿到FB資料之後，因為風控原因無法改FB密碼，需要一個月的冷卻時間，但信箱密碼已改\n2.FB帳號內未有直接修改帳號的功能，是怎麼產生此問題的\n3.買家疑似與朋友共用遊戲帳號，是否買家朋友盜了帳號\n4.買家能否提供詳細證明確認是賣家的問題\n二、根據此筆交易糾紛的發展，無法直接判斷是賣家問題，買家也未有證明提供證實，那我們可以引導買家考慮報警處理",
                "tags": [],
                "textColor": "#FF5722",
                "imageGallery": [
                  "https://upload.8591.com.tw//deal/202601/qn1HfAFFHrm357dRJIssoSFuDbR9V2fonkayZXOo.png"
                ]
              },
              {
                "id": "1768317543108",
                "title": "案例4的處理流程",
                "content": "三、什麼原因會產生此問題呢？\n可能是有人通過綁定新的備用登入帳號，再把原本的帳號移除導致\n1.帳戶→設定與隱私→設定\n2.進入帳號管理中心\n3.點擊個人檔案，新增了備用的新信箱帳號，最終把舊的移除出現至今情況\n但此方式只是猜測的，客服暫時無法直接實現此步驟，因為註冊新的帳號立馬被FB官方永久封鎖，故無法測試實現",
                "tags": [],
                "textColor": "#FF5722",
                "imageGallery": [
                  "https://upload.8591.com.tw//deal/202601/hQggpl5fMCRqy9a7IlfEkY4UgxAQfBlc36W9FWvs.png",
                  "https://upload.8591.com.tw//deal/202601/tEnruJmTONwUAYDVnsRyTA6DABfHSfZ3EOcBT4AA.png",
                  "https://upload.8591.com.tw//deal/202601/iI8lEhzBkZC3Qt6aGYTtnGlsgYSdbAkuAwykdFw2.png"
                ]
              }
            ],
            "textColor": "#FF5722"
          }
        ]
      }
    ]
  },
  {
    "id": "1767707626410",
    "name": "原神Genshin Impact",
    "category": "手機遊戲",
    "coverImage": "https://upload.8591.com.tw//deal/202601/L9EzMcmqdDZIXdRSsNDPvBsoqWK07i0cE5vLO0o5.png",
    "sections": [
      {
        "type": "遊戲機制",
        "items": []
      },
      {
        "type": "客服聯絡",
        "items": []
      },
      {
        "type": "遊戲術語",
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
    ],
    "bannerLink": "https://genshin.hoyoverse.com/zh-tw/",
    "bannerTitle": "如果在冬夜一個旅人「月之四」版本已上線",
    "bannerImage": "https://upload.8591.com.tw//deal/202601/n1fBrRXdNdlfWD6J1RU1Kw60Uq3EZ8gb1mkZ6xBL.png"
  },
  {
    "id": "1767707641258",
    "name": "特戰英豪Valorant",
    "category": "線上遊戲",
    "coverImage": "https://upload.8591.com.tw//deal/202601/6zMCx7pOQFmebHYETp9nyuSmq6Z5yriOssTdFGBJ.png",
    "sections": [
      {
        "type": "遊戲機制",
        "items": [
          {
            "id": "1768309017066",
            "title": "一、如何註冊及登入",
            "author": "Admin",
            "updatedAt": "2026-01-13",
            "subItems": [
              {
                "id": "1768309027379",
                "title": "1、通過遊戲或網頁，點擊註冊帳號或進行登入，或直接使用Google、Facebook、Apple、Xbox、PlayStation去登入",
                "content": "</table><table style=\"width: 100%; border-collapse: collapse; margin: 1em 0;\">\n  <thead>\n    <tr style=\"background-color: #f8fafc;\">\n      <th style=\"border: 1px solid #cbd5e1; padding: 8px; font-weight: bold; text-align: left;\">註冊流程</th>\n    </tr>\n  </thead>\n  <tbody>\n    <tr>\n      <td style=\"border: 1px solid #cbd5e1; padding: 8px;\">第一步：輸入電子郵件</td>\n    </tr>\n    <tr>\n      <td style=\"border: 1px solid #cbd5e1; padding: 8px;\">第二步：輸入出生日期</td>\n    </tr>\n    <tr>\n      <td style=\"border: 1px solid #cbd5e1; padding: 8px;\">第三步：輸入使用者名稱</td>\n    </tr>\n    <tr>\n      <td style=\"border: 1px solid #cbd5e1; padding: 8px;\">第四步：輸入登入密碼</td>\n    </tr>\n  </tbody>\n</table>",
                "tags": [],
                "imageGallery": [],
                "textColor": "#FF5722"
              },
              {
                "id": "1768309216222",
                "title": "2、遊戲定位",
                "content": "定位：FPS、第一人稱視角\n玩法：以槍戰的第一人稱射擊遊戲為核心展開的遊戲模式\n\n遊戲官網：https://playvalorant.com/zh-tw/\n查看玩法：https://www.bilibili.com/video/BV15z411i7U4/?vd_source=a27bb2081267c12d386a2af2e8e5531d",
                "tags": [],
                "imageGallery": [],
                "textColor": "#FF5722"
              }
            ],
            "textColor": "#FF5722"
          },
          {
            "id": "1768310136673",
            "title": "二、遊戲帳號的綁定相關",
            "author": "Admin",
            "updatedAt": "2026-01-13",
            "subItems": [
              {
                "id": "1768310182873",
                "title": "1. Riot ID",
                "content": "可自行設定ID，讓遊戲內其他人可以搜尋到你進行添加，每90天可以改一次",
                "tags": [],
                "image": "https://upload.8591.com.tw//deal/202601/y9ggL7Y3uUGN1JYCFrMCdnlqzgLHnxlzRwa2sYX9.png",
                "imageGallery": [],
                "textColor": "#FF5722"
              },
              {
                "id": "1768311631257",
                "title": "2. 個人資訊",
                "content": "可自行設定驗證的信箱，而註冊地跟生日是無法更改",
                "tags": [],
                "textColor": "#FF5722",
                "image": "https://upload.8591.com.tw//deal/202601/KxfZtI0cqoxp6cW5LvXYRcwfJRlrDZdd27U1lspQ.png",
                "imageGallery": []
              },
              {
                "id": "1768311675277",
                "title": "3. Riot帳號登入",
                "content": "使用者名稱在註冊之後就無法更改，密碼可隨時更改",
                "tags": [],
                "textColor": "#FF5722",
                "image": "https://upload.8591.com.tw//deal/202601/AkIdDu9idvXxmLxF4VS3ZGiWjJSSEAh2DQQlwfAG.png",
                "imageGallery": []
              }
            ],
            "textColor": "#FF5722"
          },
          {
            "id": "1768311714116",
            "title": "三、如何修改信箱",
            "author": "Admin",
            "updatedAt": "2026-01-13",
            "subItems": [
              {
                "id": "1768311720864",
                "title": "☠第一步",
                "content": "1、直接在電郵地址輸入新的信箱，系統就會發送郵件到新的信箱裡面去了",
                "tags": [],
                "textColor": "#FF5722",
                "image": "https://upload.8591.com.tw//deal/202601/Jq1XVbPFJFIjlTk1G1nGuhV88t9hYBlWsH9ykhRL.png",
                "imageGallery": []
              },
              {
                "id": "1768311758082",
                "title": "☠第二步",
                "content": "2、在新的郵件裡面點擊驗證修改即可完成",
                "tags": [],
                "textColor": "#FF5722",
                "image": "https://upload.8591.com.tw//deal/202601/38GmeM233hi8BMNNS7IgMvHbvUSkPbcOSPUP4noV.png",
                "imageGallery": []
              },
              {
                "id": "1768311812931",
                "title": "☠第三步",
                "content": "3、原信箱就會收到一個修改信，這代表對方可以登入帳號修改（可以了解到：如果帳號被盜，買家通常是可以收到修改信通知）",
                "tags": [],
                "textColor": "#FF5722",
                "image": "https://upload.8591.com.tw//deal/202601/A4iF8TwXEGuqq9Wk7NHXxt9U5DaKkoDSlN7uuzWd.png",
                "imageGallery": []
              }
            ],
            "textColor": "#FF5722"
          },
          {
            "id": "1768311888711",
            "title": "四、忘記帳密資料如何找回？",
            "author": "Admin",
            "updatedAt": "2026-01-13",
            "subItems": [
              {
                "id": "1768311898129",
                "title": "☠忘記使用者名稱找回步驟",
                "content": "1、在遊戲官網，點擊立刻玩-登入-選擇【無法登入嗎？】\n①如果忘記使用者名稱，需要輸入綁定的信箱\n第一步：需要輸入綁定的信箱\n第二步：輸入信箱之後，會收到一則信件，就可以獲取到使用者名稱",
                "tags": [],
                "textColor": "#FF5722",
                "image": "",
                "imageGallery": [
                  "https://upload.8591.com.tw//deal/202601/SG6lxLvDARP00OHmGvfHTyjOUCIOiGxbTtGqYnNy.png",
                  "https://upload.8591.com.tw//deal/202601/syjA6UHxfvstYqSrirFkM1Tmh0FIRGyIfRfodhxI.png"
                ]
              },
              {
                "id": "1768311971081",
                "title": "☠忘記密碼的找回步驟",
                "content": "②如果忘記密碼的找回方式\n第一步：需要使用者名稱\n第二步：輸入使用者名稱之後，綁定的信箱會收到一封信件【申請密碼變更】\n第二步：點擊信件，可通過獲取的連接去重設密碼",
                "tags": [],
                "textColor": "#FF5722",
                "imageGallery": [
                  "https://upload.8591.com.tw//deal/202601/TIgfbDiWwrTKua50MnaelbltkMiZQVAirgeux4yg.png",
                  "https://upload.8591.com.tw//deal/202601/3LEjQ1wzTsoOqW9OpT1yP5PZAFgzaZXp1QU0aaEG.png"
                ]
              }
            ],
            "textColor": "#FF5722"
          }
        ]
      },
      {
        "type": "客服聯絡",
        "items": [
          {
            "id": "1768312051069",
            "title": "一、產生交易糾紛，買家如何寫信給官方找回帳號？",
            "author": "Admin",
            "updatedAt": "2026-01-13",
            "subItems": [
              {
                "id": "1768312056559",
                "title": "☠寄信流程",
                "content": "1、重要問題點：\n遊戲官方主要認註冊時的相關資料，特別是初始信箱，可能初始信箱沒有對的話，就算其他資料填寫正確，也不一定能處理\n<span style=\"color: red\">所以如果產生交易糾紛時，賣家未曾提供過初始信箱資料，我們是沒有必要引導買家去寫信給遊戲官方</span>\n2、若有初始資料時，可按照極速流程寫信給遊戲官方\n遊戲官方主要認註冊時的相關資料，特別是初始信箱，可能初始信箱沒有對的話，就算其他資料填寫正確，也不一定能處理\n①登入至特戰英豪官網：選擇提交表單-特戰英豪的遊戲 <span style=\"color: #f44336;class=\"inline-link\"><a href=\"https://support.riotgames.com/hc/zh-tw\" target=\"_blank\">【點擊打開至特戰英豪表單網址】</a></span>\n②選擇問題類型-復原我的帳號\n③按照官網表單內容，填寫帳號內的相關信息，例如初始信箱等資料\n④填寫完之後，官方會回覆到你留下的信箱，並等待結果\n⑤如果審核通過，官方會回覆兩封信極速件，一封是回覆告知結果，一封是可操作修改帳密的連接\n⑥一旦審核通過，官方是直接將原本的信箱恢復到初始信箱，並且舊的信箱不會有任何通知",
                "tags": [],
                "textColor": "#FF5722",
                "imageGallery": [
                  "https://upload.8591.com.tw//deal/202601/QefSMOjHzu18MDo1nT0ZhYa8o4CHYZWuSmuAjPi6.png",
                  "https://upload.8591.com.tw//deal/202601/UUEEom87LDMs8ntGIWmfIqI3xgC5zgDHci1IPIhe.png",
                  "https://upload.8591.com.tw//deal/202601/YEAaNJMnsAaS3sBqjWHjWRatvu8zT3xeC3sQSVV8.png",
                  "https://upload.8591.com.tw//deal/202601/r8u8UQJ4BfbrOx2U83YsMCilIcAfaRSmdMLrxc6k.png",
                  "https://upload.8591.com.tw//deal/202601/gb088ZiXMF5izFiDbQj20RatKQnQtecv1rBYplvd.png",
                  "https://upload.8591.com.tw//deal/202601/XA5WhuEu4qo72aN2UIyfCAsefYhlmMfxAuP319pA.png",
                  "https://upload.8591.com.tw//deal/202601/7b8YbHM4Am5QLKVDzQr4kyIH5WaYhTPOzCNHR5DK.png",
                  "https://upload.8591.com.tw//deal/202601/hONudUTwrYW5Sp1Knm341hINzepiJGuczHnSknqM.png",
                  "https://upload.8591.com.tw//deal/202601/s6so6WJTEN2X9ENWjjFVtOuUGpefVJgOHnAYiow1.png"
                ]
              }
            ],
            "textColor": "#FF5722"
          },
          {
            "id": "1768312505752",
            "title": "二、通過帳號復原工具找回",
            "author": "Admin",
            "updatedAt": "2026-01-13",
            "subItems": [
              {
                "id": "1768312513655",
                "title": "☠寄信流程",
                "content": "1、第一步 打開查看 <span style=\"color: #f44336;class=\"inline-link\"><a href=\"https://support-valorant.riotgames.com/hc/zh-tw/articles/360046229573-%E5%B8%B3%E8%99%9F%E5%BE%A9%E5%8E%9F?tref=ticketrelatedarticles\" target=\"_blank\">【點擊打開至特戰英豪復原工具網址】</a></span>\n①需要填寫使用者名稱或者Riot ID或召喚師名稱\n②回答填寫的問題內容\n③填寫註冊時的出生日期\n\n2、第二步\n①填寫註冊時的初始信箱\n②選擇是否能使用該信箱\n③此帳號中還使用過哪些電子郵件信箱\n④是否能登入這些電子郵件信箱\n3、第三步\n填寫寄送帳號復原資訊的電子郵件信箱\n4、第四步\n等待官方的處理結果，如果認為你還不是帳號持有人，就需要通過表單填寫更詳細的資料來確認\n結論：無論是提交表單還是帳號復原工具，都需要用到初始信箱資料",
                "tags": [],
                "textColor": "#FF5722",
                "imageGallery": [
                  "https://upload.8591.com.tw//deal/202601/bnj3zQu1KLVT54qM7CNy7U9QulxC2tG9D5DJa3o7.png",
                  "https://upload.8591.com.tw//deal/202601/mAZXBolGyVP0fC9mC8qohg9iRbkZETbeq7ZaeZEQ.png",
                  "https://upload.8591.com.tw//deal/202601/8PRdcrywdXz3pYiQwTimnIFD674TtKkHCQ30fDOG.png"
                ]
              }
            ],
            "textColor": "#FF5722"
          }
        ]
      },
      {
        "type": "遊戲術語",
        "items": [
          {
            "id": "1768312819961",
            "title": "一、特戰英豪不合常理的一面",
            "author": "Admin",
            "updatedAt": "2026-01-13",
            "subItems": [
              {
                "id": "1768312824674",
                "title": "☠客戶端與網頁端登入錯誤的提示差異",
                "content": "買家反饋帳密被更改資料，通過PC端登入之後提示“系統中沒有與你的登入資訊相符的帳號”\n買家懷疑是原帳主或賣家把【使用者名稱】進行更改，導致帳號現在被找回無法登入\n<span style=\"color: red\">但其實本質【使用者名稱】是無法更改，只是輸入密碼不對\n</span>客戶端會提示沒有相符的帳號，但如果通過網頁端登入只是會顯示使用者名稱或密碼可能有誤",
                "tags": [],
                "textColor": "#FF5722",
                "imageGallery": [
                  "https://upload.8591.com.tw//deal/202601/vC97DoaJM3pFBhaLWEWDSUS5ZCpNNeqL9r9h9qCk.png",
                  "https://upload.8591.com.tw//deal/202601/P35PkPOtJ3nwIlp7UWgmOfz3039pFN4BPG5OA3ru.png"
                ]
              }
            ],
            "textColor": "#FF5722"
          }
        ]
      },
      {
        "type": "常見問題",
        "items": [
          {
            "id": "1768312908305",
            "title": "一、雙方交易時的注意事項",
            "author": "Admin",
            "updatedAt": "2026-01-13",
            "subItems": [
              {
                "id": "1768312914650",
                "title": "☠交易時的注意事項",
                "content": "1、確認買家自己購買的遊戲帳號賣家能否提供初始資料\n→主要通過賣家刊登的內容確認，或雙方可通過聊一聊確認\n→如果能提供初始資料，盡量越全越好，如：初始信箱、首次初始資料、出生日期、首次儲值記錄等\n\n2、確認遊戲帳號內的商品是否與刊登相符\n→稀有槍支造型套裝\n→近戰武器造型\n→帳號等級及排位\n此遊戲販售主要的價值是在槍支、近戰武器造型\n\n3、確認遊戲帳號的綁定內容及解綁\n如遊戲機制裡提到的第三方綁定，不用登入也可以直接移除",
                "tags": [],
                "textColor": "#FF5722",
                "image": "https://upload.8591.com.tw//deal/202601/zY5Z2zW4WwMq1P44CfhaQIOG2zxyyd1EU9eLymUh.png",
                "imageGallery": []
              }
            ],
            "textColor": "#FF5722"
          },
          {
            "id": "1768312985052",
            "title": "二、遇到會員反饋各類問題如何處理",
            "author": "Admin",
            "updatedAt": "2026-01-13",
            "subItems": [
              {
                "id": "1768312989417",
                "title": "☠不同問題的應對方式",
                "content": "1、買家反饋帳號被初始，登入遊戲帳號遊戲提示帳號不相符\n\n→提供截圖（如下面）\n我們需要有哪些處理思路呢？\n①當在遊戲客戶端登入時輸入不正確的密碼，都是提示沒有相符的帳號\n②如果是在網頁端登入官網，輸入錯密碼會提示【使用者名稱或密碼錯誤】\n③那麼買家應該如何處理？\n因此買家在提供此頁面的時候，並不足以判斷是被初始找回，可能存在買家輸入錯密碼，或者確實被盜的可能\n\n更多還是需要以確認是否有收到修改信的通知進行確認",
                "tags": [],
                "textColor": "#FF5722",
                "imageGallery": [
                  "https://upload.8591.com.tw//deal/202601/vC97DoaJM3pFBhaLWEWDSUS5ZCpNNeqL9r9h9qCk.png",
                  "https://upload.8591.com.tw//deal/202601/P35PkPOtJ3nwIlp7UWgmOfz3039pFN4BPG5OA3ru.png"
                ]
              },
              {
                "id": "1768313071625",
                "title": "☠不同問題的應對方式",
                "content": "2、買家反饋自己綁定的信箱突然收到通知信\n→提供截圖（如下面）\n我們需要有哪些處理思路呢？\n①首先需要瞭解此頁面是怎麼出現的？是否跟初始有關\n→通過測試：\n產生此問題，一般是有人在官網點擊【忘記帳密】-【忘記密碼】，輸入【用戶名】之後，系統會發送信件至驗證的信箱內，再透過點擊鏈接去變更帳密\n\n②那麼買家應該如何處理？\n→通認帳號密碼是否有被更改？如果沒有\n建議啟用帳號登入的雙重驗證（即使用帳號密碼登入時需要信箱驗證），倘若是一手帳主後續通過客服利用初始資料找回，設置也沒有用\n\n→安撫會員\n我們可以協助聯絡賣家確認，如果賣家並非一手，就請賣家協助處理，看能不能找到一手賣家提供初始資料，或後續被初始資料找回可以如何協助處理",
                "tags": [],
                "textColor": "#FF5722",
                "image": "https://upload.8591.com.tw//deal/202601/BqYDs9m47jwv9GdEybzhx6ieozBMMBipY40YIvIb.png",
                "imageGallery": []
              },
              {
                "id": "1768314137234",
                "title": "☠不同問題的應對方式",
                "content": "3、買家反饋帳密被改，並且收到修改信\n→提供截圖（如下面）\n我們需要有哪些處理思路呢？\n①通過我們了解的遊戲機制，當到遊戲官網登入帳號之後，可以自行修改信箱，修改成功之後，原信箱就會收到修改信的通知\n\n②產生的可能性：\n→買家自己修改了信箱忘記了，導致有反饋至8591\n→買家給的圖檔是曾經修改成功信箱的截圖，與此筆交易可能無關\n→買家的問題，外洩帳密或者訪問來源不明網址，導致被他人盜號\n→原有賣家的問題，通過第三方登入方式將信箱修改，但可能性很低，因為買家可以自己去移除掉第三方綁定的裝置\n\n③那麼買家應該如何處理？\n可以告知：根據買家反饋的問題，綜合以往交易糾紛的經驗，此問題是通過遊戲官網登入帳號進行修改信箱，原信箱才會收到修改通知信。\n<span style=\"color: red\">如果並非買家個人所為，那帳號應該是被盜了，並且自己未有初始資料的話，建議可以聯絡賣家協商看看是否能協助處理</span>",
                "tags": [],
                "textColor": "#FF5722",
                "image": "https://upload.8591.com.tw//deal/202601/bDTq2PR721qYvlQ2zLDwQxJs8y7dUSHqIg1VESs1.png",
                "imageGallery": []
              }
            ],
            "textColor": "#FF5722"
          }
        ]
      },
      {
        "type": "案例實踐",
        "items": [
          {
            "id": "1768314227268",
            "title": "交易糾紛處理思路",
            "author": "Admin",
            "updatedAt": "2026-01-13",
            "subItems": [
              {
                "id": "1768314232644",
                "title": "案例1的申訴內容",
                "content": "點擊查看案例1\n\n買家反饋帳號密碼被更改了，拿到帳號的時候有修改了信箱\n查看賣家有引發多筆交易糾紛，客服就與買家確認帳號被改的一些細節問題，如下\n\n1、請您提供無法登入的頁面（圖二）\n2、買賣雙方交易時，您修改了哪些資料？\n<span style=\"color: red\">EMAIL以及密碼</span>\n3、是否有更改過使用者名稱？若有，現在是否能在遊戲搜尋到？\n<span style=\"color: red\">有改過,帳號沒有更改過。無法搜尋到了</span>\n4、被改帳密時，您的信箱是否能收到修改信的郵件？\n<span style=\"color: red\">無法,因被自助找回機器人改回(被初始改回不會有email紀錄)</span>\n5、您如何確認被賣家找回或初始資料找回？\n<span style=\"color: red\">同四</span>\n6、近期是否有登入過“活動網站”\n<span style=\"color: red\">無</span>\n7、除了您之外，是否有其他人知道帳密資料？\n<span style=\"color: red\">賣家而已 知道帳號 email以做更改</span>\n8、近期是否有通過公眾場所登入遊戲帳號？（如網咖等）\n<span style=\"color: red\">都在自家遊玩</span>\n\n現如果是您遇到買家的回覆，請問會如何處理呢？",
                "tags": [],
                "textColor": "#FF5722",
                "image": "https://upload.8591.com.tw//deal/202601/FEe0ZK99PWiruyvqIieNNexSsxzxsvsgFWcRcjH6.png",
                "imageGallery": []
              },
              {
                "id": "1768314658201",
                "title": "案例1的處理思路",
                "content": "買家反饋帳號密碼被更改了，拿到帳號的時候有修改了信箱\n\n現在以下哪些思路是正確的？\n\n1.買家提供的修改信箱截圖，可確認是帳號被盜　　　　　　　　⛝\n2.引導買家寫信與官方確認帳號被改的原因及找回方式　　　　　⛝\n3.賣家帳號刊登及移交不詳，需要賣家協助買家找回　　　　　✔✔✔\n4.買家帳密被改，直接引導買家採取法律途徑處理　　　　　　　⛝\n5.賣家刊登不詳，聯絡不到賣家需要直接停權處理　　　　　　　⛝\n6.如果是現在遇到，賣家帳號已售出半年，不強制處理　　　　　⛝\n\n因此此筆交易糾紛的處理方式為：\n①通過買家回覆申訴表示未收到任何通知信，申訴提供的被修改信箱的圖檔，有可能是之前更改就存在的，故不能直接判斷為被盜行為，可以先與買家確認下這一張修改通知信的情況\n②買家並非一手帳號持有人，賣家出售時如果未提供初始資料，無法單方面直接寫信給官方確認被改的情況，並且在確認時確認沒有收到修改通知信，那就需要賣家協助配合處理",
                "tags": [],
                "textColor": "#FF5722",
                "imageGallery": []
              },
              {
                "id": "1768314753763",
                "title": "案例2的申訴內容",
                "content": "點擊查看案例2\n買家反饋帳號密碼被更改了，並且有提供相關圖檔\n\n現在以下哪些思路是正確的？\n1.買家提供的修改信箱截圖，可確認是帳號被盜　　　　　　　✔✔✔\n2.引導買家寫信與官方確認帳號被改的原因及找回方式　　　　　⛝\n3.賣家帳號移交不完整，需要賣家協助買家找回　　　　　　　✔✔✔\n4.買家帳密被改，直接引導買家採取法律途徑處理　　　　　　　⛝\n5.賣家不願意處理，聯絡不到賣家需要直接停權處理　　　　　　⛝\n",
                "tags": [],
                "textColor": "#FF5722",
                "image": "https://upload.8591.com.tw//deal/202601/T6Djk8qGTNY57SsoGDylTnJ3YCWhoKYMPHCTAu2F.png",
                "imageGallery": []
              },
              {
                "id": "1768314907307",
                "title": "案例2的處理思路",
                "content": "因此此筆交易糾紛的處理方式為：\n\n通過買家提供的對話圖檔可以確認到，買家疑似提供過帳密給他人登入帳號，導致電子信箱被更改，確認是由買家的web開頭信箱被改為tho開頭信箱，屬於被盜類型\n\n因此，買家反饋之後我們可以與其說明帳號被盜，我們可以協助賣家確認，讓他盡量協助處理， 只是問題本身不是因為賣家因素造成，賣家無法協助的話，客服中心不會強制處理",
                "tags": [],
                "textColor": "#FF5722",
                "imageGallery": []
              },
              {
                "id": "1768315069001",
                "title": "案例3的申訴內容",
                "content": "買家反饋帳號密碼被更改了，想用信箱更改我的密碼 但我的信箱收不到信件 應該是被更改了\n\n現在以下哪些思路是正確的？\n1.買家提供的被申請密碼變更截圖，疑似帳號被盜　　　　　　　　⛝\n2.引導買家寫信與官方確認帳號被改的原因及找回方式　　　　　　⛝\n3.賣家沒有提供初始資料，需要賣家協助配合處理　　　　　　　✔✔✔\n4.如果賣家無法配合，需要引導買家考慮報警處理　　　　　　　✔✔✔\n5.買家提供的證明，不足以證明帳號是被初始找回　　　　　　　✔✔✔",
                "tags": [],
                "textColor": "#FF5722",
                "imageGallery": [
                  "https://upload.8591.com.tw//deal/202601/t0Wh5jp8sSXXcoQ7H7ma0n5J4mrYlamstZ1QP5zw.png",
                  "https://upload.8591.com.tw//deal/202601/F2q2ZyFSEEVAv5JmBuGTZYXo9n45crnyBDEWK5nI.png"
                ]
              },
              {
                "id": "1768315116968",
                "title": "案例3的處理思路",
                "content": "因此此筆交易糾紛的處理方式為：\n通過買家提供的證明，只能判定到此帳號曾經使用忘記，輸入了使用者名稱，導致有收到變更密碼的信件，但無法直接判斷一定就是初始找回\n\n因此，買家反饋之後我們可以聯絡賣家，請其協助買家進行處理，如果賣家未有初始資料，就需要雙方溝通確認了",
                "tags": [],
                "textColor": "#FF5722",
                "imageGallery": []
              }
            ],
            "textColor": "#FF5722"
          }
        ]
      }
    ],
    "bannerTitle": "《特戰英豪》12.00版本賽季更新",
    "bannerImage": "https://upload.8591.com.tw//deal/202601/Mx7gR0TShOFp14L4RQYXqaZMPlg2YDKYnPfAbS5N.png",
    "bannerLink": "https://playvalorant.com/zh-tw/news/game-updates/valorant-patch-notes-12-00/",
    "officialWebsite": "https://playvalorant.com/zh-tw/"
  },
  {
    "id": "1768317911938",
    "name": "明日方舟：終末地",
    "category": "手機遊戲",
    "coverImage": "https://upload.8591.com.tw//deal/202601/MlDwTThhwnHnqSZljOaCoMhiMFORR53Chrnrqjwk.png",
    "sections": [
      {
        "type": "遊戲機制",
        "items": []
      },
      {
        "type": "客服聯絡",
        "items": []
      },
      {
        "type": "遊戲術語",
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
    ],
    "bannerImage": "https://upload.8591.com.tw//deal/202601/BwAywesgRA3HYNfdWx7PB0O39Z4JNqejYqseSC96.png",
    "bannerTitle": "1月22日即將公測",
    "bannerLink": "https://endfield.gryphline.com/zh-tw#home"
  }
];
