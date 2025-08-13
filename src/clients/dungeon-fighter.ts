import { BaseClient } from '../core/client';
import type { 
  DungeonFighter,
  DFServer
} from '../types';

export class DungeonFighterClient extends BaseClient {
  async searchCharacter(
    characterName: string, 
    serverId: string = 'all',
    params?: {
      jobId?: string;
      jobGrowId?: string;
      isAllJobGrow?: boolean;
      wordType?: 'match' | 'full';
      limit?: number;
    }
  ): Promise<{ rows: DungeonFighter.CharacterSearch[] }> {
    return this.request<{ rows: DungeonFighter.CharacterSearch[] }>(
      `/df/servers/${serverId}/characters`, {
        characterName,
        ...params,
      }
    );
  }

  async getCharacter(serverId: string, characterId: string): Promise<DungeonFighter.CharacterBasic> {
    return this.request<DungeonFighter.CharacterBasic>(`/df/servers/${serverId}/characters/${characterId}`);
  }

  async getCharacterEquipment(serverId: string, characterId: string): Promise<DungeonFighter.CharacterEquipment> {
    return this.request<DungeonFighter.CharacterEquipment>(`/df/servers/${serverId}/characters/${characterId}/equip/equipment`);
  }

  async getCharacterStatus(serverId: string, characterId: string): Promise<DungeonFighter.CharacterStatus> {
    return this.request<DungeonFighter.CharacterStatus>(`/df/servers/${serverId}/characters/${characterId}/status`);
  }

  async searchAuction(params: {
    itemId?: string;
    itemName?: string;
    itemIds?: string;
    limit?: number;
    sort?: string;
    wordType?: 'match' | 'front' | 'full';
    minLevel?: number;
    maxLevel?: number;
    minReinforce?: number;
    maxReinforce?: number;
    rarity?: string;
    minPrice?: number;
    maxPrice?: number;
  }): Promise<{ rows: DungeonFighter.AuctionItem[] }> {
    return this.request<{ rows: DungeonFighter.AuctionItem[] }>('/df/auction', params);
  }

  async searchItems(params: {
    itemName?: string;
    hashtag?: string;
    limit?: number;
    wordType?: 'match' | 'front' | 'full';
    minLevel?: number;
    maxLevel?: number;
    rarity?: string;
  }): Promise<{ rows: DungeonFighter.ItemSearch[] }> {
    return this.request<{ rows: DungeonFighter.ItemSearch[] }>('/df/items', params);
  }

  async getItem(itemId: string): Promise<DungeonFighter.ItemDetail> {
    return this.request<DungeonFighter.ItemDetail>(`/df/items/${itemId}`);
  }

  async getServers(): Promise<{ rows: DFServer[] }> {
    return this.request<{ rows: DFServer[] }>('/df/servers');
  }

  async getJobs(): Promise<any> {
    return this.request<any>('/df/jobs');
  }

  async getCharacterAvatar(serverId: string, characterId: string): Promise<DungeonFighter.CharacterAvatar> {
    return this.request<DungeonFighter.CharacterAvatar>(`/df/servers/${serverId}/characters/${characterId}/equip/avatar`);
  }

  async getCharacterCreature(serverId: string, characterId: string): Promise<DungeonFighter.CharacterCreature> {
    return this.request<DungeonFighter.CharacterCreature>(`/df/servers/${serverId}/characters/${characterId}/equip/creature`);
  }

  async getCharacterFlag(serverId: string, characterId: string): Promise<DungeonFighter.CharacterFlag> {
    return this.request<DungeonFighter.CharacterFlag>(`/df/servers/${serverId}/characters/${characterId}/equip/flag`);
  }

  async getCharacterTalisman(serverId: string, characterId: string): Promise<any> {
    return this.request<any>(`/df/servers/${serverId}/characters/${characterId}/equip/talisman`);
  }

  async getCharacterTimeline(
    serverId: string, 
    characterId: string, 
    params?: {
      startDate?: string;
      endDate?: string;
      limit?: number;
      code?: string;
      next?: string;
    }
  ): Promise<DungeonFighter.Timeline> {
    return this.request<DungeonFighter.Timeline>(`/df/servers/${serverId}/characters/${characterId}/timeline`, params);
  }

  async getSetItem(setItemId: string): Promise<DungeonFighter.SetItemInfo> {
    return this.request<DungeonFighter.SetItemInfo>(`/df/setitems/${setItemId}`);
  }

  async searchSetItems(params: {
    setItemName?: string;
    hashtag?: string;
    limit?: number;
    wordType?: 'match' | 'front' | 'full';
  }): Promise<any> {
    return this.request<any>('/df/setitems', params);
  }

  async getMultiItems(itemIds: string): Promise<{ rows: DungeonFighter.ItemDetail[] }> {
    return this.request<{ rows: DungeonFighter.ItemDetail[] }>('/df/multi/items', { itemIds });
  }

  async getMultiSetItems(setItemIds: string): Promise<{ rows: DungeonFighter.SetItemInfo[] }> {
    return this.request<{ rows: DungeonFighter.SetItemInfo[] }>('/df/multi/setitems', { setItemIds });
  }

  async getCharactersByFame(serverId: string): Promise<any> {
    return this.request<any>(`/df/servers/${serverId}/characters-fame`);
  }

  async getAuctionSold(params: {
    itemId?: string;
    itemName?: string;
    limit?: number;
    wordType?: 'match' | 'front' | 'full';
    minLevel?: number;
    maxLevel?: number;
    rarity?: string;
  }): Promise<{ rows: DungeonFighter.AuctionSold[] }> {
    return this.request<{ rows: DungeonFighter.AuctionSold[] }>('/df/auction-sold', params);
  }

  async getAvatarMarketSale(params?: {
    limit?: number;
    title?: string;
    jobId?: string;
    avatarSet?: boolean;
    avatarRarity?: string;
    minPrice?: number;
    maxPrice?: number;
    hashtag?: string;
    emblemCode?: number;
  }): Promise<any> {
    return this.request<any>('/df/avatar-market/sale', params);
  }

  async getAvatarMarketSold(params?: {
    limit?: number;
    title?: string;
    jobId?: string;
    avatarSet?: boolean;
    avatarRarity?: string;
    minPrice?: number;
    maxPrice?: number;
    hashtag?: string;
    emblemCode?: number;
    soldDateType?: string;
  }): Promise<any> {
    return this.request<any>('/df/avatar-market/sold', params);
  }

  async getAvatarMarketItem(goodsNo: number): Promise<any> {
    return this.request<any>(`/df/avatar-market/sale/${goodsNo}`);
  }

  async getAvatarMarketSoldItem(goodsNo: number): Promise<any> {
    return this.request<any>(`/df/avatar-market/sold/${goodsNo}`);
  }

  async getCharacterSkillStyle(serverId: string, characterId: string): Promise<any> {
    return this.request<any>(`/df/servers/${serverId}/characters/${characterId}/skill/style`);
  }

  async getCharacterBuffSkillEquipment(serverId: string, characterId: string): Promise<any> {
    return this.request<any>(`/df/servers/${serverId}/characters/${characterId}/skill/buff/equip/equipment`);
  }

  async getCharacterBuffSkillAvatar(serverId: string, characterId: string): Promise<any> {
    return this.request<any>(`/df/servers/${serverId}/characters/${characterId}/skill/buff/equip/avatar`);
  }

  async getCharacterBuffSkillCreature(serverId: string, characterId: string): Promise<any> {
    return this.request<any>(`/df/servers/${serverId}/characters/${characterId}/skill/buff/equip/creature`);
  }

  async getSkillsByJob(jobId: string, jobGrowId?: string): Promise<any> {
    const params = jobGrowId ? { jobGrowId } : {};
    return this.request<any>(`/df/skills/${jobId}`, params);
  }

  async getSkillDetail(jobId: string, skillId: string): Promise<any> {
    return this.request<any>(`/df/skills/${jobId}/${skillId}`);
  }

  async getMultiSkills(jobId: string, skillIds: string): Promise<any> {
    return this.request<any>(`/df/multi/skills/${jobId}`, { skillIds });
  }

  async getItemShop(itemId: string): Promise<any> {
    return this.request<any>(`/df/items/${itemId}/shop`);
  }

  async getAuctionItem(auctionNo: string): Promise<any> {
    return this.request<any>(`/df/auction/${auctionNo}`);
  }

  async getAvatarMarketHashtags(): Promise<any> {
    return this.request<any>('/df/avatar-market/hashtag');
  }

  async getItemHashtags(): Promise<any> {
    return this.request<any>('/df/item-hashtag');
  }
}