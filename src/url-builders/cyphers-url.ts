import { BaseUrlBuilder } from './base-url-builder';
import type { Cyphers } from '../types';

export class NeopleCyphersUrlBuilder extends BaseUrlBuilder {
  /**
   * 플레이어 검색 URL 생성
   * @param nickname 플레이어 닉네임
   * @param params 검색 옵션
   */
  searchPlayer(
    nickname: string,
    params?: { wordType?: 'match' | 'full'; limit?: number }
  ): string {
    return this.buildUrl('/cy/players', {
      nickname,
      ...params,
    });
  }

  /**
   * 플레이어 정보 조회 URL 생성
   * @param playerId 플레이어 ID
   */
  getPlayerInfo(playerId: string): string {
    return this.buildUrl(`/cy/players/${playerId}`);
  }

  /**
   * 플레이어 매치 기록 조회 URL 생성
   * @param playerId 플레이어 ID
   * @param params 조회 옵션
   */
  getPlayerMatches(
    playerId: string,
    params?: Partial<Cyphers.PlayerMatchesParams>
  ): string {
    return this.buildUrl(`/cy/players/${playerId}/matches`, params);
  }


  /**
   * 매치 상세 정보 조회 URL 생성
   * @param matchId 매치 ID
   */
  getMatchDetail(matchId: string): string {
    return this.buildUrl(`/cy/matches/${matchId}`);
  }

  /**
   * 전체 랭킹 조회 URL 생성
   * @param params 랭킹 조회 옵션
   */
  getOverallRanking(params?: Cyphers.OverallRankingParams): string {
    return this.buildUrl('/cy/ranking/ratingpoint', params);
  }

  /**
   * 캐릭터별 랭킹 조회 URL 생성
   * @param characterId 캐릭터 ID
   * @param rankingType 랭킹 타입
   * @param params 랭킹 조회 옵션
   */
  getCharacterRanking(
    characterId: string,
    rankingType: 'winCount' | 'winRate' | 'killCount' | 'assistCount' | 'exp',
    params?: Partial<Cyphers.CharacterRankingParams>
  ): string {
    return this.buildUrl(`/cy/ranking/characters/${characterId}/${rankingType}`, params);
  }

  /**
   * 아이템 검색 URL 생성
   * @param params 아이템 검색 옵션
   */
  searchItems(params: Cyphers.ItemSearchParams): string {
    return this.buildUrl('/cy/battleitems', params);
  }

  /**
   * 사이퍼 정보 조회 URL 생성
   * @param params 사이퍼 조회 옵션
   */
  getCyphersInfo(params?: Cyphers.CypherInfoParams): string {
    return this.buildUrl('/cy/characters', params);
  }


  /**
   * 여러 URL을 배치로 생성
   * @param builders URL 빌더 함수들의 배열
   */
  batch(builders: ((builder: NeopleCyphersUrlBuilder) => string)[]): string[] {
    return builders.map(builder => builder(this));
  }
}