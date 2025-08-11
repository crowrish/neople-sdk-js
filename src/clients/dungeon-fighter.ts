import { BaseClient } from '../core/client';
import type { 
  DungeonFighter 
} from '../types';

export class DungeonFighterClient extends BaseClient {
  async searchCharacter(
    characterName: string, 
    serverId: string = 'all'
  ): Promise<{ rows: DungeonFighter.CharacterSearch[] }> {
    return this.request<{ rows: DungeonFighter.CharacterSearch[] }>(
      `/df/servers/${serverId}/characters`, {
        characterName,
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

  async searchAuction(params: Partial<DungeonFighter.AuctionSearchParams>): Promise<{ rows: DungeonFighter.AuctionItem[] }> {
    return this.request<{ rows: DungeonFighter.AuctionItem[] }>('/df/auction', params);
  }

  async searchItems(params: Partial<DungeonFighter.ItemSearchParams>): Promise<{ rows: DungeonFighter.ItemSearch[] }> {
    return this.request<{ rows: DungeonFighter.ItemSearch[] }>('/df/items', params);
  }

  async getItem(itemId: string): Promise<DungeonFighter.ItemDetail> {
    return this.request<DungeonFighter.ItemDetail>(`/df/items/${itemId}`);
  }
}