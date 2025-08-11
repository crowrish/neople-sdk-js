import { BaseClient } from '../core/client';
import type { 
  Cyphers 
} from '../types';

export class CyphersClient extends BaseClient {
  // 플레이어 검색
  async searchPlayer(
    nickname: string, 
    params?: { wordType?: 'match' | 'full'; limit?: number }
  ): Promise<{ rows: Cyphers.PlayerSearchResult[] }> {
    return this.request<{ rows: Cyphers.PlayerSearchResult[] }>('/cy/players', {
      nickname,
      ...params,
    });
  }

  // 플레이어 정보 조회
  async getPlayerInfo(playerId: string): Promise<Cyphers.PlayerInfo> {
    return this.request<Cyphers.PlayerInfo>(`/cy/players/${playerId}`);
  }

  // 플레이어 매치 기록 조회
  async getPlayerMatches(
    playerId: string,
    params?: Partial<Cyphers.PlayerMatchesParams>
  ): Promise<Cyphers.PlayerMatches> {
    return this.request<Cyphers.PlayerMatches>(`/cy/players/${playerId}/matches`, params);
  }

  // 플레이어 장비 정보 조회
  async getPlayerEquipment(playerId: string): Promise<any> {
    return this.request<any>(`/cy/players/${playerId}/battleitems`);
  }

  // 매치 상세 정보 조회
  async getMatchDetail(matchId: string): Promise<any> {
    return this.request<any>(`/cy/matches/${matchId}`);
  }

  // 전체 랭킹 조회
  async getOverallRanking(params?: Cyphers.OverallRankingParams): Promise<Cyphers.RankingInfo> {
    return this.request<Cyphers.RankingInfo>('/cy/ranking/ratingpoint', params);
  }

  // 캐릭터별 랭킹 조회
  async getCharacterRanking(
    characterId: string,
    rankingType: 'winCount' | 'winRate' | 'killCount' | 'assistCount' | 'exp',
    params?: Partial<Cyphers.CharacterRankingParams>
  ): Promise<Cyphers.RankingInfo> {
    return this.request<Cyphers.RankingInfo>(
      `/cy/ranking/characters/${characterId}/${rankingType}`,
      params
    );
  }

  // 아이템 검색
  async searchItems(params: Cyphers.ItemSearchParams): Promise<{ rows: Cyphers.ItemSearchResult[] }> {
    return this.request<{ rows: Cyphers.ItemSearchResult[] }>('/cy/battleitems', params);
  }

  // 사이퍼 정보 조회
  async getCyphersInfo(params?: Cyphers.CypherInfoParams): Promise<{ rows: Cyphers.CypherSearchResult[] }> {
    return this.request<{ rows: Cyphers.CypherSearchResult[] }>('/cy/characters', params);
  }

  // 캐릭터별 추천 아이템 조회
  async getRecommendItems(characterId: string): Promise<any> {
    return this.request<any>(`/cy/characters/${characterId}/items`);
  }
}