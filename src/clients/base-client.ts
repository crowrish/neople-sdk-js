import { BaseClient } from '../core/client';
import { DungeonFighterClient } from './dungeon-fighter';
import { CyphersClient } from './cyphers';
import type { DungeonFighter, Cyphers } from '../types';

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
    serverId: string = 'all'
  ): Promise<{ rows: DungeonFighter.CharacterSearch[] }> {
    return this.df.searchCharacter(characterName, serverId);
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

  async searchAuction(params: Partial<DungeonFighter.AuctionSearchParams>): Promise<{ rows: DungeonFighter.AuctionItem[] }> {
    return this.df.searchAuction(params);
  }

  async searchItems(params: Partial<DungeonFighter.ItemSearchParams>): Promise<{ rows: DungeonFighter.ItemSearch[] }> {
    return this.df.searchItems(params);
  }

  async getItem(itemId: string): Promise<DungeonFighter.ItemDetail> {
    return this.df.getItem(itemId);
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
    params?: { wordType?: 'match' | 'full'; limit?: number }
  ): Promise<{ rows: Cyphers.PlayerSearchResult[] }> {
    return this.cyphers.searchPlayer(nickname, params);
  }

  async getPlayerInfo(playerId: string): Promise<Cyphers.PlayerInfo> {
    return this.cyphers.getPlayerInfo(playerId);
  }

  async getPlayerMatches(
    playerId: string,
    params?: Partial<Cyphers.PlayerMatchesParams>
  ): Promise<Cyphers.PlayerMatches> {
    return this.cyphers.getPlayerMatches(playerId, params);
  }

  async getPlayerEquipment(playerId: string): Promise<any> {
    return this.cyphers.getPlayerEquipment(playerId);
  }

  async getMatchDetail(matchId: string): Promise<any> {
    return this.cyphers.getMatchDetail(matchId);
  }

  async getOverallRanking(params?: Cyphers.OverallRankingParams): Promise<Cyphers.RankingInfo> {
    return this.cyphers.getOverallRanking(params);
  }

  async getCharacterRanking(
    characterId: string,
    rankingType: 'winCount' | 'winRate' | 'killCount' | 'assistCount' | 'exp',
    params?: Partial<Cyphers.CharacterRankingParams>
  ): Promise<Cyphers.RankingInfo> {
    return this.cyphers.getCharacterRanking(characterId, rankingType, params);
  }

  async searchCyphersItems(params: Cyphers.ItemSearchParams): Promise<{ rows: Cyphers.ItemSearchResult[] }> {
    return this.cyphers.searchItems(params);
  }

  async getCyphersInfo(params?: Cyphers.CypherInfoParams): Promise<{ rows: Cyphers.CypherSearchResult[] }> {
    return this.cyphers.getCyphersInfo(params);
  }

  async getRecommendItems(characterId: string): Promise<any> {
    return this.cyphers.getRecommendItems(characterId);
  }
}