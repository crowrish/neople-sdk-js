import { NeopleDFUrlBuilder, NeopleCyphersUrlBuilder } from 'neople-sdk-js/url-builders';

// 환경변수에서 API 키 읽기
const dfApiKey = process.env.NEOPLE_DF_API_KEY;
const cyphersApiKey = process.env.NEOPLE_CYPHERS_API_KEY;

if (!dfApiKey || !cyphersApiKey) {
  throw new Error('API 키가 설정되지 않았습니다. NEOPLE_DF_API_KEY와 NEOPLE_CYPHERS_API_KEY 환경변수를 설정하세요.');
}

// URL 빌더 초기화
const dfUrlBuilder = new NeopleDFUrlBuilder(dfApiKey);
const cyphersUrlBuilder = new NeopleCyphersUrlBuilder(cyphersApiKey);

async function demonstrateUrlUsage() {
  console.log('🔗 URL 생성 예제');
  
  // === 던전앤파이터 URL 생성 ===
  console.log('\\n📊 던전앤파이터 URLs:');
  
  const dfUrls = {
    characterSearch: dfUrlBuilder.searchCharacter('홍길동', 'cain'),
    characterInfo: dfUrlBuilder.getCharacter('cain', 'characterId'),
    characterEquipment: dfUrlBuilder.getCharacterEquipment('cain', 'characterId'),
    auctionSearch: dfUrlBuilder.searchAuction({ itemName: '해방무기', limit: 10 }),
    itemSearch: dfUrlBuilder.searchItems({ itemName: '해방무기' })
  };

  Object.entries(dfUrls).forEach(([name, url]) => {
    console.log(`${name}: ${url}`);
  });

  // === 사이퍼즈 URL 생성 ===
  console.log('\\n🎮 사이퍼즈 URLs:');
  
  const cyphersUrls = {
    playerSearch: cyphersUrlBuilder.searchPlayer('테스트플레이어'),
    playerInfo: cyphersUrlBuilder.getPlayerInfo('playerId'),
    playerMatches: cyphersUrlBuilder.getPlayerMatches('playerId', { 
      gameTypeId: 'rating', 
      limit: 10 
    }),
    overallRanking: cyphersUrlBuilder.getOverallRanking({ limit: 20 }),
    characterRanking: cyphersUrlBuilder.getCharacterRanking('characterId', 'winRate', { limit: 10 })
  };

  Object.entries(cyphersUrls).forEach(([name, url]) => {
    console.log(`${name}: ${url}`);
  });

  // === 배치 URL 생성 ===
  console.log('\\n📦 배치 URL 생성 예제:');
  
  const batchUrls = dfUrlBuilder.batch([
    builder => builder.searchCharacter('플레이어1'),
    builder => builder.searchCharacter('플레이어2'),
    builder => builder.searchCharacter('플레이어3'),
    builder => builder.searchAuction({ itemName: '무기' })
  ]);

  batchUrls.forEach((url, index) => {
    console.log(`배치 URL ${index + 1}: ${url}`);
  });

  // === 실제 HTTP 호출 예제 (fetch 사용) ===
  console.log('\\n🌐 실제 API 호출 예제:');
  
  try {
    const characterSearchUrl = dfUrlBuilder.searchCharacter('홍길동');
    console.log(`API 호출: ${characterSearchUrl}`);
    
    // 실제로 API를 호출하려면 아래 주석을 해제하세요
    // const response = await fetch(characterSearchUrl);
    // if (response.ok) {
    //   const data = await response.json();
    //   console.log('API 응답:', data);
    // } else {
    //   console.error('API 오류:', response.status, response.statusText);
    // }
    
    console.log('URL 생성 완료! (실제 API 호출은 주석 해제 후 실행하세요)');
    
  } catch (error) {
    console.error('오류 발생:', error);
  }
}

// === 커스텀 HTTP 클라이언트와 함께 사용하는 예제 ===
async function useWithCustomHttpClient() {
  console.log('\\n🔧 커스텀 HTTP 클라이언트 예제:');
  
  // 예시: 간단한 커스텀 HTTP 함수
  const customHttpClient = {
    async get(url: string) {
      console.log(`커스텀 GET 요청: ${url}`);
      // 실제 구현에서는 여기서 HTTP 요청을 수행
      return { data: '커스텀 응답 데이터' };
    }
  };

  const url = dfUrlBuilder.searchCharacter('테스트');
  const result = await customHttpClient.get(url);
  console.log('커스텀 클라이언트 응답:', result);
}

// 실행
demonstrateUrlUsage();
useWithCustomHttpClient();