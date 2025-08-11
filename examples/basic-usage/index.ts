import { NeopleDFClient, NeopleCyphersClient } from 'neople-sdk-js';

// 환경변수에서 API 키 읽기
const dfApiKey = process.env.NEOPLE_DF_API_KEY;
const cyphersApiKey = process.env.NEOPLE_CYPHERS_API_KEY;

if (!dfApiKey) {
  throw new Error('NEOPLE_DF_API_KEY environment variable is required');
}

if (!cyphersApiKey) {
  throw new Error('NEOPLE_CYPHERS_API_KEY environment variable is required');
}

// 클라이언트 초기화
const dfClient = new NeopleDFClient(dfApiKey);
const cyphersClient = new NeopleCyphersClient(cyphersApiKey);

async function main() {
  try {
    // 던전앤파이터 예제
    console.log('🎮 던전앤파이터 API 테스트');
    
    // 캐릭터 검색
    const searchResult = await dfClient.searchCharacter('홍길동');
    console.log('캐릭터 검색 결과:', searchResult);
    
    if (searchResult.rows && searchResult.rows.length > 0) {
      const character = searchResult.rows[0];
      
      // 캐릭터 상세 정보 조회
      const characterDetail = await dfClient.getCharacter('cain', character.characterId);
      console.log('캐릭터 상세 정보:', characterDetail);
      
      // 캐릭터 장비 정보 조회
      const equipment = await dfClient.getCharacterEquipment('cain', character.characterId);
      console.log('캐릭터 장비 정보:', equipment);
    }
    
    // 아이템 검색
    const itemSearch = await dfClient.searchItems({ itemName: '해방무기' });
    console.log('아이템 검색 결과:', itemSearch);
    
    // 경매장 검색
    const auctionSearch = await dfClient.searchAuction({ itemName: '해방무기', limit: 5 });
    console.log('경매장 검색 결과:', auctionSearch);
    
    console.log('\\n🎯 사이퍼즈 API 테스트');
    
    // 플레이어 검색
    const playerSearch = await cyphersClient.searchPlayer('테스트');
    console.log('플레이어 검색 결과:', playerSearch);
    
    if (playerSearch.rows && playerSearch.rows.length > 0) {
      const player = playerSearch.rows[0];
      
      // 플레이어 상세 정보 조회
      const playerDetail = await cyphersClient.getPlayerInfo(player.playerId);
      console.log('플레이어 상세 정보:', playerDetail);
      
      // 플레이어 매치 기록 조회
      const playerMatches = await cyphersClient.getPlayerMatches(player.playerId, { 
        gameTypeId: 'rating', 
        limit: 5 
      });
      console.log('플레이어 매치 기록:', playerMatches);
    }
    
    // 전체 랭킹 조회
    const ranking = await cyphersClient.getOverallRanking({ limit: 10 });
    console.log('전체 랭킹:', ranking);
    
    // 사이퍼 정보 조회
    const cyphersInfo = await cyphersClient.getCyphersInfo({ limit: 5 });
    console.log('사이퍼 정보:', cyphersInfo);
    
  } catch (error) {
    console.error('API 호출 중 오류 발생:', error);
  }
}

main();