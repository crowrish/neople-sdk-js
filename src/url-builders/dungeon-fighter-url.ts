import { BaseUrlBuilder } from './base-url-builder';
import type { DungeonFighter } from '../types';

export class NeopleDFUrlBuilder extends BaseUrlBuilder {
  /**
   * 캐릭터 검색 URL 생성
   * @param characterName 캐릭터 이름
   * @param serverId 서버 ID (기본값: 'all')
   */
  searchCharacter(characterName: string, serverId: string = 'all'): string {
    return this.buildUrl(`/df/servers/${serverId}/characters`, {
      characterName,
    });
  }

  /**
   * 캐릭터 기본 정보 조회 URL 생성
   * @param serverId 서버 ID
   * @param characterId 캐릭터 ID
   */
  getCharacter(serverId: string, characterId: string): string {
    return this.buildUrl(`/df/servers/${serverId}/characters/${characterId}`);
  }

  /**
   * 캐릭터 장비 정보 조회 URL 생성
   * @param serverId 서버 ID
   * @param characterId 캐릭터 ID
   */
  getCharacterEquipment(serverId: string, characterId: string): string {
    return this.buildUrl(`/df/servers/${serverId}/characters/${characterId}/equip/equipment`);
  }

  /**
   * 캐릭터 능력치 정보 조회 URL 생성
   * @param serverId 서버 ID
   * @param characterId 캐릭터 ID
   */
  getCharacterStatus(serverId: string, characterId: string): string {
    return this.buildUrl(`/df/servers/${serverId}/characters/${characterId}/status`);
  }

  /**
   * 캐릭터 아바타 정보 조회 URL 생성
   * @param serverId 서버 ID
   * @param characterId 캐릭터 ID
   */
  getCharacterAvatar(serverId: string, characterId: string): string {
    return this.buildUrl(`/df/servers/${serverId}/characters/${characterId}/equip/avatar`);
  }

  /**
   * 캐릭터 크리처 정보 조회 URL 생성
   * @param serverId 서버 ID
   * @param characterId 캐릭터 ID
   */
  getCharacterCreature(serverId: string, characterId: string): string {
    return this.buildUrl(`/df/servers/${serverId}/characters/${characterId}/equip/creature`);
  }

  /**
   * 캐릭터 국기 정보 조회 URL 생성
   * @param serverId 서버 ID
   * @param characterId 캐릭터 ID
   */
  getCharacterFlag(serverId: string, characterId: string): string {
    return this.buildUrl(`/df/servers/${serverId}/characters/${characterId}/equip/flag`);
  }

  /**
   * 캐릭터 탈리스만 정보 조회 URL 생성
   * @param serverId 서버 ID
   * @param characterId 캐릭터 ID
   */
  getCharacterTalisman(serverId: string, characterId: string): string {
    return this.buildUrl(`/df/servers/${serverId}/characters/${characterId}/equip/talisman`);
  }

  /**
   * 캐릭터 스킬 정보 조회 URL 생성
   * @param serverId 서버 ID
   * @param characterId 캐릭터 ID
   */
  getCharacterSkill(serverId: string, characterId: string): string {
    return this.buildUrl(`/df/servers/${serverId}/characters/${characterId}/skill/style`);
  }

  /**
   * 캐릭터 버프 정보 조회 URL 생성
   * @param serverId 서버 ID
   * @param characterId 캐릭터 ID
   */
  getCharacterBuff(serverId: string, characterId: string): string {
    return this.buildUrl(`/df/servers/${serverId}/characters/${characterId}/skill/buff`);
  }

  /**
   * 경매장 검색 URL 생성
   * @param params 검색 파라미터
   */
  searchAuction(params: Partial<DungeonFighter.AuctionSearchParams>): string {
    return this.buildUrl('/df/auction', params);
  }

  /**
   * 경매장 판매 내역 조회 URL 생성
   * @param params 검색 파라미터
   */
  getAuctionSold(params: Partial<DungeonFighter.AuctionSoldParams>): string {
    return this.buildUrl('/df/auction-sold', params);
  }

  /**
   * 아이템 검색 URL 생성
   * @param params 검색 파라미터
   */
  searchItems(params: Partial<DungeonFighter.ItemSearchParams>): string {
    return this.buildUrl('/df/items', params);
  }

  /**
   * 아이템 상세 정보 조회 URL 생성
   * @param itemId 아이템 ID
   */
  getItem(itemId: string): string {
    return this.buildUrl(`/df/items/${itemId}`);
  }

  /**
   * 세트 아이템 정보 조회 URL 생성
   * @param setItemId 세트 아이템 ID
   */
  getSetItem(setItemId: string): string {
    return this.buildUrl(`/df/setitems/${setItemId}`);
  }

  /**
   * 멀티 아이템 정보 조회 URL 생성
   * @param itemId 아이템 ID
   */
  getMultiItem(itemId: string): string {
    return this.buildUrl(`/df/multi/${itemId}`);
  }

  /**
   * 캐릭터 타임라인 조회 URL 생성
   * @param serverId 서버 ID
   * @param characterId 캐릭터 ID
   * @param params 조회 파라미터
   */
  getCharacterTimeline(
    serverId: string, 
    characterId: string, 
    params?: Partial<DungeonFighter.CharacterTimelineParams>
  ): string {
    return this.buildUrl(`/df/servers/${serverId}/characters/${characterId}/timeline`, params);
  }

  /**
   * 여러 URL을 배치로 생성
   * @param builders URL 빌더 함수들의 배열
   */
  batch(builders: ((builder: NeopleDFUrlBuilder) => string)[]): string[] {
    return builders.map(builder => builder(this));
  }
}