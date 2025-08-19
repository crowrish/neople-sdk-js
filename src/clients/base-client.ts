import { BaseClient } from '../core/client';
import { DungeonFighterClient } from './dungeon-fighter';
import { CyphersClient } from './cyphers';
import type { DungeonFighter, Cyphers, DFServer } from '../types';

export class NeopleDFClient extends BaseClient {
  private _df?: DungeonFighterClient;

  private get df(): DungeonFighterClient {
    if (!this._df) {
      this._df = new DungeonFighterClient(this.apiKey, this.httpAdapter, this.baseUrl);
    }
    return this._df;
  }

  // 던전앤파이터 메서드들을 직접 노출
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
    return this.df.searchCharacter(characterName, serverId, params);
  }

  async getCharacter(serverId: string, characterId: string): Promise<DungeonFighter.CharacterBasic> {
    return this.df.getCharacter(serverId, characterId);
  }

  async getCharacterEquipment(serverId: string, characterId: string): Promise<DungeonFighter.CharacterEquipment> {
    return this.df.getCharacterEquipment(serverId, characterId);
  }

  async getCharacterStatus(serverId: string, characterId: string): Promise<DungeonFighter.CharacterStatus> {
    return this.df.getCharacterStatus(serverId, characterId);
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
    return this.df.searchAuction(params);
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
    return this.df.searchItems(params);
  }

  async getItem(itemId: string): Promise<DungeonFighter.ItemDetail> {
    return this.df.getItem(itemId);
  }

  async getServers(): Promise<{ rows: DFServer[] }> {
    return this.df.getServers();
  }

  async getJobs(): Promise<any> {
    return this.df.getJobs();
  }

  async getCharacterAvatar(serverId: string, characterId: string): Promise<DungeonFighter.CharacterAvatar> {
    return this.df.getCharacterAvatar(serverId, characterId);
  }

  async getCharacterCreature(serverId: string, characterId: string): Promise<DungeonFighter.CharacterCreature> {
    return this.df.getCharacterCreature(serverId, characterId);
  }

  async getCharacterFlag(serverId: string, characterId: string): Promise<DungeonFighter.CharacterFlag> {
    return this.df.getCharacterFlag(serverId, characterId);
  }

  async getCharacterTalisman(serverId: string, characterId: string): Promise<any> {
    return this.df.getCharacterTalisman(serverId, characterId);
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
    return this.df.getCharacterTimeline(serverId, characterId, params);
  }

  async getSetItem(setItemId: string): Promise<DungeonFighter.SetItemInfo> {
    return this.df.getSetItem(setItemId);
  }

  async searchSetItems(params: {
    setItemName?: string;
    hashtag?: string;
    limit?: number;
    wordType?: 'match' | 'front' | 'full';
  }): Promise<any> {
    return this.df.searchSetItems(params);
  }

  async getMultiItems(itemIds: string): Promise<{ rows: DungeonFighter.ItemDetail[] }> {
    return this.df.getMultiItems(itemIds);
  }

  async getMultiSetItems(setItemIds: string): Promise<{ rows: DungeonFighter.SetItemInfo[] }> {
    return this.df.getMultiSetItems(setItemIds);
  }

  async getCharactersByFame(serverId: string): Promise<any> {
    return this.df.getCharactersByFame(serverId);
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
    return this.df.getAuctionSold(params);
  }

  async getAvatarMarketSale(params?: any): Promise<any> {
    return this.df.getAvatarMarketSale(params);
  }

  async getAvatarMarketSold(params?: any): Promise<any> {
    return this.df.getAvatarMarketSold(params);
  }

  async getAvatarMarketItem(goodsNo: number): Promise<any> {
    return this.df.getAvatarMarketItem(goodsNo);
  }

  async getAvatarMarketSoldItem(goodsNo: number): Promise<any> {
    return this.df.getAvatarMarketSoldItem(goodsNo);
  }

  async getCharacterSkillStyle(serverId: string, characterId: string): Promise<any> {
    return this.df.getCharacterSkillStyle(serverId, characterId);
  }

  async getCharacterBuffSkillEquipment(serverId: string, characterId: string): Promise<any> {
    return this.df.getCharacterBuffSkillEquipment(serverId, characterId);
  }

  async getCharacterBuffSkillAvatar(serverId: string, characterId: string): Promise<any> {
    return this.df.getCharacterBuffSkillAvatar(serverId, characterId);
  }

  async getCharacterBuffSkillCreature(serverId: string, characterId: string): Promise<any> {
    return this.df.getCharacterBuffSkillCreature(serverId, characterId);
  }

  async getSkillsByJob(jobId: string, jobGrowId?: string): Promise<any> {
    return this.df.getSkillsByJob(jobId, jobGrowId);
  }

  async getSkillDetail(jobId: string, skillId: string): Promise<any> {
    return this.df.getSkillDetail(jobId, skillId);
  }

  async getMultiSkills(jobId: string, skillIds: string): Promise<any> {
    return this.df.getMultiSkills(jobId, skillIds);
  }

  async getItemShop(itemId: string): Promise<any> {
    return this.df.getItemShop(itemId);
  }

  async getAuctionItem(auctionNo: string): Promise<any> {
    return this.df.getAuctionItem(auctionNo);
  }

  async getAvatarMarketHashtags(): Promise<any> {
    return this.df.getAvatarMarketHashtags();
  }

  async getItemHashtags(): Promise<any> {
    return this.df.getItemHashtags();
  }
}

export class NeopleCyphersClient extends BaseClient {
  private _cyphers?: CyphersClient;

  private get cyphers(): CyphersClient {
    if (!this._cyphers) {
      this._cyphers = new CyphersClient(this.apiKey, this.httpAdapter, this.baseUrl);
    }
    return this._cyphers;
  }

  // 사이퍼즈 메서드들을 직접 노출
  async searchPlayer(
    nickname: string, 
    params?: { 
      wordType?: 'match' | 'full'; 
      limit?: number;
    }
  ): Promise<{ rows: Cyphers.PlayerSearchResult[] }> {
    return this.cyphers.searchPlayer(nickname, params);
  }

  async getPlayerInfo(playerId: string): Promise<Cyphers.PlayerInfo> {
    return this.cyphers.getPlayerInfo(playerId);
  }

  async getPlayerMatches(
    playerId: string,
    params?: {
      gameTypeId?: string;
      startDate?: string;
      endDate?: string;
      limit?: number;
      next?: string;
    }
  ): Promise<Cyphers.PlayerMatches> {
    return this.cyphers.getPlayerMatches(playerId, params);
  }


  async getMatchDetail(matchId: string): Promise<any> {
    return this.cyphers.getMatchDetail(matchId);
  }

  async getOverallRanking(params?: {
    playerId?: string;
    offset?: number;
    limit?: number;
  }): Promise<Cyphers.RankingInfo> {
    return this.cyphers.getOverallRanking(params);
  }

  async getCharacterRanking(
    characterId: string,
    rankingType: 'winCount' | 'winRate' | 'killCount' | 'assistCount' | 'exp',
    params?: {
      playerId?: string;
      offset?: number;
      limit?: number;
    }
  ): Promise<Cyphers.RankingInfo> {
    return this.cyphers.getCharacterRanking(characterId, rankingType, params);
  }

  async searchCyphersItems(params: {
    itemName: string;
    limit?: number;
    wordType?: 'match' | 'front' | 'full';
    characterId?: string;
    slotCode?: string;
    rarityCode?: string;
    seasonCode?: string;
  }): Promise<{ rows: Cyphers.ItemSearchResult[] }> {
    return this.cyphers.searchItems(params);
  }

  async getCyphersInfo(params?: Cyphers.CypherInfoParams): Promise<{ rows: Cyphers.CypherSearchResult[] }> {
    return this.cyphers.getCyphersInfo(params);
  }


  async getTsjRanking(
    tsjType: 'melee' | 'ranged',
    params?: {
      playerId?: string;
      offset?: number;
      limit?: number;
    }
  ): Promise<Cyphers.RankingInfo> {
    return this.cyphers.getTsjRanking(tsjType, params);
  }

  async getCyphersItemDetail(itemId: string): Promise<Cyphers.ItemDetail> {
    return this.cyphers.getItemDetail(itemId);
  }

  async getCyphersMultiItems(itemIds: string): Promise<{ rows: Cyphers.ItemDetail[] }> {
    return this.cyphers.getMultiItems(itemIds);
  }
}