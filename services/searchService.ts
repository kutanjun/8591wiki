import { GameKB, GameCategory } from '../types';

export type SearchMatchSource = 'itemTitle' | 'subItemTitle' | 'subItemContent';

export type SearchDoc = {
  gameId: string;
  gameName: string;
  gameCategory: GameCategory;
  sectionType: string;
  itemId: string;
  itemTitle: string;
  subItemId?: string;
  subItemTitle?: string;
  text: string; // 用于搜索的文本（已归一化）
  matchSource: SearchMatchSource;
};

export type SearchHit = {
  gameId: string;
  gameName: string;
  gameCategory: GameCategory;
  sectionType: string;
  itemId: string;
  itemTitle: string;
  subItemId?: string;
  subItemTitle?: string;
  snippet: string;
  matchSource: SearchMatchSource;
  score: number;
};

const normalize = (s: string) => (s || '').toLowerCase();

export function buildSearchIndex(games: GameKB[]): SearchDoc[] {
  const docs: SearchDoc[] = [];

  games.forEach((g) => {
    g.sections.forEach((sec) => {
      const sectionType = String(sec.type);

      sec.items.forEach((item) => {
        // 大标题
        docs.push({
          gameId: g.id,
          gameName: g.name,
          gameCategory: g.category,
          sectionType,
          itemId: item.id,
          itemTitle: item.title,
          text: normalize(item.title),
          matchSource: 'itemTitle',
        });

        // 子版块
        (item.subItems || []).forEach((sub) => {
          docs.push({
            gameId: g.id,
            gameName: g.name,
            gameCategory: g.category,
            sectionType,
            itemId: item.id,
            itemTitle: item.title,
            subItemId: sub.id,
            subItemTitle: sub.title,
            text: normalize(sub.title),
            matchSource: 'subItemTitle',
          });
          docs.push({
            gameId: g.id,
            gameName: g.name,
            gameCategory: g.category,
            sectionType,
            itemId: item.id,
            itemTitle: item.title,
            subItemId: sub.id,
            subItemTitle: sub.title,
            text: normalize(sub.content || ''),
            matchSource: 'subItemContent',
          });
        });
      });
    });
  });

  return docs;
}

function calcScore(src: SearchMatchSource): number {
  if (src === 'subItemTitle') return 30;
  if (src === 'subItemContent') return 20;
  return 10;
}

export function searchBestHitPerGame(docs: SearchDoc[], query: string): SearchHit[] {
  const q = query.trim();
  const qn = normalize(q);
  if (!qn) return [];

  const bestByGame = new Map<string, SearchHit>();

  for (const d of docs) {
    if (!d.text.includes(qn)) continue;

    const hit: SearchHit = {
      gameId: d.gameId,
      gameName: d.gameName,
      gameCategory: d.gameCategory,
      sectionType: d.sectionType,
      itemId: d.itemId,
      itemTitle: d.itemTitle,
      subItemId: d.subItemId,
      subItemTitle: d.subItemTitle,
      // snippet 使用“原始含义”字段：标题就用标题，内容就截取内容
      snippet: d.matchSource === 'subItemContent' ? (d.text.slice(0, 80)) : (d.subItemTitle || d.itemTitle),
      matchSource: d.matchSource,
      score: calcScore(d.matchSource),
    };

    const prev = bestByGame.get(d.gameId);
    if (!prev || hit.score > prev.score) {
      bestByGame.set(d.gameId, hit);
    }
  }

  return Array.from(bestByGame.values()).sort((a, b) => b.score - a.score);
}

