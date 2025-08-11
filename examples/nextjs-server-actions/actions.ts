// app/actions/character.ts
'use server'

import { NeopleDFClient, NeopleApiError } from 'neople-sdk-js';

const dfClient = new NeopleDFClient(process.env.NEOPLE_DF_API_KEY!);

export async function searchCharacterAction(formData: FormData) {
  const characterName = formData.get('characterName') as string;
  const serverId = formData.get('serverId') as string || undefined;
  
  try {
    const result = await dfClient.searchCharacter(characterName, serverId);
    
    return {
      success: true,
      data: result
    };
  } catch (error) {
    if (error instanceof NeopleApiError) {
      return {
        success: false,
        error: error.message,
        status: error.status
      };
    }
    
    return {
      success: false,
      error: '서버 내부 오류가 발생했습니다.'
    };
  }
}

export async function getCharacterDetailAction(serverId: string, characterId: string) {
  try {
    const result = await dfClient.getCharacter(serverId, characterId);
    
    return {
      success: true,
      data: result
    };
  } catch (error) {
    if (error instanceof NeopleApiError) {
      return {
        success: false,
        error: error.message,
        status: error.status
      };
    }
    
    return {
      success: false,
      error: '서버 내부 오류가 발생했습니다.'
    };
  }
}

export async function getCharacterEquipmentAction(serverId: string, characterId: string) {
  try {
    const result = await dfClient.getCharacterEquipment(serverId, characterId);
    
    return {
      success: true,
      data: result
    };
  } catch (error) {
    if (error instanceof NeopleApiError) {
      return {
        success: false,
        error: error.message,
        status: error.status
      };
    }
    
    return {
      success: false,
      error: '서버 내부 오류가 발생했습니다.'
    };
  }
}

export async function searchAuctionAction(formData: FormData) {
  const itemName = formData.get('itemName') as string;
  const limit = parseInt(formData.get('limit') as string) || 10;
  
  try {
    const result = await dfClient.searchAuction({
      itemName,
      limit
    });
    
    return {
      success: true,
      data: result
    };
  } catch (error) {
    if (error instanceof NeopleApiError) {
      return {
        success: false,
        error: error.message,
        status: error.status
      };
    }
    
    return {
      success: false,
      error: '서버 내부 오류가 발생했습니다.'
    };
  }
}