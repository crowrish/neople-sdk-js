# neople-sdk-js


[![English](https://img.shields.io/badge/README-English-blue)](./README.en.md)
[![Documentation](https://img.shields.io/badge/Documentation-GitHub%20Pages-green)](https://crowrish.github.io/neople-sdk-js-docs/)
[![npm version](https://img.shields.io/npm/v/neople-sdk-js)](https://www.npmjs.com/package/neople-sdk-js)

<img width="1200" height="400" alt="Frame 2" src="https://github.com/user-attachments/assets/49ffab27-7b04-45c6-9daa-e53ca605b1f2" />



네오플 오픈 API를 위한 TypeScript SDK

이 SDK는 네오플 오픈 API를 위한 TypeScript/JavaScript 클라이언트입니다.
[네오플 오픈 API 서비스 이용약관](https://developers.neople.co.kr/contents/policy)을 반드시 준수해야 합니다.

> **참고**: 이 문서는 2025년 8월 19일 기준으로 작성되었습니다.

## Documentation
[https://crowrish.github.io/neople-sdk-js-docs](https://crowrish.github.io/neople-sdk-js-docs)

## 설치

```bash
npm install neople-sdk-js
```

## 빠른 시작

### 던전앤파이터

```typescript
import { NeopleDFClient } from 'neople-sdk-js';

const dfClient = new NeopleDFClient(process.env.NEOPLE_DF_API_KEY);

// 캐릭터 검색
const characters = await dfClient.searchCharacter('홍길동');

// 캐릭터 정보 조회
const character = await dfClient.getCharacter('cain', 'characterId');

// 캐릭터 장비 정보 조회
const equipment = await dfClient.getCharacterEquipment('cain', 'characterId');
```

### 사이퍼즈

```typescript
import { NeopleCyphersClient } from 'neople-sdk-js';

const cyphersClient = new NeopleCyphersClient(process.env.NEOPLE_CYPHERS_API_KEY);

// 플레이어 검색
const players = await cyphersClient.searchPlayer('플레이어닉네임');

// 플레이어 정보 조회
const playerInfo = await cyphersClient.getPlayerInfo('playerId');

// 플레이어 매치 기록 조회
const matches = await cyphersClient.getPlayerMatches('playerId', { gameTypeId: 'rating' });
```

## 주요 기능

- 완전한 TypeScript 지원으로 타입 안전성 보장
- **기본적으로 Node.js 내장 fetch 사용 (의존성 없음)**
- 다양한 HTTP 클라이언트 지원 (Axios, Fetch, Got, node-fetch)
- Node.js 백엔드 및 Next.js 환경 지원
- 포괄적인 에러 처리
- 풍부한 JSDoc 문서화
- 던전앤파이터와 사이퍼즈 API 각각 별도 API 키 지원
- URL만 생성하는 전용 빌더 클래스 제공
- **네오플 오픈 API 100% 완전 지원 (던전앤파이터 34개, 사이퍼즈 11개 총 45개 API)**
- **99.57% 테스트 커버리지로 검증된 안정성 (202개 테스트)**

## 지원하는 API

### 던전앤파이터 API(34개)
- **기본 정보**
  - `getServers()` - 서버 목록 조회
  - `getJobs()` - 직업 목록 조회
- **캐릭터**
  - `searchCharacter()` - 캐릭터 검색
  - `getCharacter()` - 캐릭터 기본 정보 조회
  - `getCharacterStatus()` - 캐릭터 능력치 정보 조회
  - `getCharacterEquipment()` - 캐릭터 장비 정보 조회
  - `getCharacterAvatar()` - 캐릭터 아바타 정보 조회
  - `getCharacterCreature()` - 캐릭터 크리처 정보 조회
  - `getCharacterFlag()` - 캐릭터 휘장 정보 조회
  - `getCharacterTalisman()` - 캐릭터 탈리스만 정보 조회
  - `getCharacterSkill()` - 캐릭터 스킬 정보 조회
  - `getCharacterBuff()` - 캐릭터 버프 정보 조회
  - `getCharacterTimeline()` - 캐릭터 타임라인 조회
  - `getCharactersByFame()` - 명성별 캐릭터 검색
- **스킬**
  - `getCharacterSkillStyle()` - 캐릭터 스킬 스타일 조회
  - `getCharacterBuffSkillEquipment()` - 버프 스킬 강화 장비 조회
  - `getCharacterBuffSkillAvatar()` - 버프 스킬 강화 아바타 조회
  - `getCharacterBuffSkillCreature()` - 버프 스킬 강화 크리처 조회
  - `getSkillsByJob()` - 직업별 스킬 목록 조회
  - `getSkillDetail()` - 스킬 상세 정보 조회
  - `getMultiSkills()` - 다중 스킬 조회
- **아이템**
  - `searchItems()` - 아이템 검색
  - `getItem()` - 아이템 상세 정보 조회
  - `getSetItem()` - 세트 아이템 정보 조회
  - `searchSetItems()` - 세트 아이템 검색
  - `getMultiItems()` - 다중 아이템 조회
  - `getMultiSetItems()` - 다중 세트 아이템 조회
  - `getItemShop()` - 아이템 상점 정보 조회
- **경매장**
  - `searchAuction()` - 경매장 검색
  - `getAuctionSold()` - 경매장 판매 완료 내역 조회
  - `getAuctionItem()` - 경매 아이템 상세 정보 조회
- **아바타 마켓**
  - `getAvatarMarketSale()` - 아바타 마켓 판매 상품 조회
  - `getAvatarMarketSold()` - 아바타 마켓 판매 완료 상품 조회
  - `getAvatarMarketItem()` - 아바타 마켓 특정 상품 조회
  - `getAvatarMarketSoldItem()` - 아바타 마켓 판매 완료 상품 상세 조회
- **해시태그**
  - `getAvatarMarketHashtags()` - 아바타 마켓 해시태그 목록 조회
  - `getItemHashtags()` - 아이템 해시태그 목록 조회

### 사이퍼즈 API(11개)
- **플레이어**
  - `searchPlayer()` - 플레이어 검색
  - `getPlayerInfo()` - 플레이어 정보 조회
  - `getPlayerMatches()` - 플레이어 매치 기록 조회
- **매치**
  - `getMatchDetail()` - 매치 상세 정보 조회
- **랭킹**
  - `getOverallRanking()` - 전체 랭킹 조회
  - `getCharacterRanking()` - 캐릭터별 랭킹 조회
  - `getTsjRanking()` - 투신전 랭킹 조회
- **아이템 & 캐릭터**
  - `searchCyphersItems()` - 아이템 검색
  - `getCyphersItemDetail()` - 아이템 상세 정보 조회
  - `getCyphersMultiItems()` - 다중 아이템 조회
  - `getCyphersInfo()` - 사이퍼 정보 조회

## 지원 환경

### 완벽 지원
- Backend Node.js (Express, Fastify, Koa 등)
- Next.js API Routes (Pages Router, App Router)
- Next.js Server Actions (App Router 13+)
- 서버리스 함수 (Vercel, Netlify)
- AWS Lambda
- Discord/Telegram 봇

### 지원하지 않음
- 브라우저 환경 (CORS 정책으로 인한 제한)

## API 키 설정

던전앤파이터와 사이퍼즈는 각각 다른 API 키를 사용합니다:

```bash
# .env 파일
NEOPLE_DF_API_KEY=your_dungeon_fighter_api_key
NEOPLE_CYPHERS_API_KEY=your_cyphers_api_key
```

## 사용 예제

### Express.js 서버

```typescript
import express from 'express';
import { NeopleDFClient } from 'neople-sdk-js';

const app = express();
const dfClient = new NeopleDFClient(process.env.NEOPLE_DF_API_KEY);

app.get('/api/character/:name', async (req, res) => {
  try {
    const result = await dfClient.searchCharacter(req.params.name);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
```

### Next.js API Route

```typescript
// app/api/character/[name]/route.ts
import { NeopleDFClient } from 'neople-sdk-js';

const dfClient = new NeopleDFClient(process.env.NEOPLE_DF_API_KEY);

export async function GET(
  request: Request,
  { params }: { params: { name: string } }
) {
  try {
    const result = await dfClient.searchCharacter(params.name);
    return Response.json(result);
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
```

## URL만 생성하기

HTTP 클라이언트를 직접 제어하거나, URL만 필요한 경우를 위한 전용 클래스를 제공합니다.

### 던전앤파이터 URL 생성

```typescript
import { NeopleDFUrlBuilder } from 'neople-sdk-js';

const urlBuilder = new NeopleDFUrlBuilder(process.env.NEOPLE_DF_API_KEY);

// URL 생성
const characterUrl = urlBuilder.searchCharacter('홍길동', 'cain');
const equipmentUrl = urlBuilder.getCharacterEquipment('cain', 'characterId');
const auctionUrl = urlBuilder.searchAuction({ itemName: '해방무기', limit: 10 });

// 원하는 HTTP 클라이언트로 직접 호출
const response = await fetch(characterUrl);
const data = await response.json();
```

### 사이퍼즈 URL 생성

```typescript
import { NeopleCyphersUrlBuilder } from 'neople-sdk-js';

const urlBuilder = new NeopleCyphersUrlBuilder(process.env.NEOPLE_CYPHERS_API_KEY);

// URL 생성
const playerUrl = urlBuilder.searchPlayer('플레이어닉네임');
const matchUrl = urlBuilder.getPlayerMatches('playerId', { gameTypeId: 'rating' });
const rankingUrl = urlBuilder.getOverallRanking({ limit: 10 });

// axios나 다른 HTTP 클라이언트 사용
const response = await axios.get(playerUrl);
```

### 배치 URL 생성

```typescript
const urls = urlBuilder.batch([
  builder => builder.searchCharacter('플레이어1'),
  builder => builder.searchCharacter('플레이어2'),
  builder => builder.searchAuction({ itemName: '무기' })
]);

// 여러 URL을 동시에 처리
const promises = urls.map(url => fetch(url));
const responses = await Promise.all(promises);
```

## 지원하는 HTTP 클라이언트

SDK는 **기본적으로 Node.js 내장 fetch를 사용**하며, 어댑터 패턴을 통해 다양한 HTTP 클라이언트 라이브러리를 지원합니다:

### FetchAdapter (기본값)
**별도 의존성 없이 Node.js 18+ 내장 fetch를 사용합니다.**

```typescript
import { NeopleDFClient, FetchAdapter } from 'neople-sdk-js';

// 기본 어댑터 (내장 fetch 사용, 의존성 없음)
const client = new NeopleDFClient(process.env.NEOPLE_DF_API_KEY);

// 또는 명시적으로 FetchAdapter 사용
const clientWithFetch = new NeopleDFClient(
  process.env.NEOPLE_DF_API_KEY,
  new FetchAdapter()
);

// API 호출 예제 - 내부적으로 Node.js 내장 fetch 사용
const result = await client.searchCharacter('홍길동');
console.log(result);
```

### AxiosAdapter
axios 라이브러리 사용

```typescript
import { NeopleDFClient, AxiosAdapter } from 'neople-sdk-js';
import axios from 'axios';

const client = new NeopleDFClient(
  process.env.NEOPLE_DF_API_KEY,
  new AxiosAdapter(axios.create({ 
    timeout: 5000,
    retry: 3 
  }))
);

// API 호출 예제
const result = await client.searchCharacter('홍길동');
console.log(result);
```

### NodeFetchAdapter
구버전 Node.js 지원용 (node-fetch 라이브러리 사용)

```typescript
import { NeopleDFClient, NodeFetchAdapter } from 'neople-sdk-js';
import fetch from 'node-fetch';

const client = new NeopleDFClient(
  process.env.NEOPLE_DF_API_KEY,
  new NodeFetchAdapter(fetch)
);

// API 호출 예제
const result = await client.searchCharacter('홍길동');
console.log(result);
```

### GotAdapter
Got 라이브러리 사용 (Node.js 최적화)

```typescript
import { NeopleDFClient, GotAdapter } from 'neople-sdk-js';
import got from 'got';

const client = new NeopleDFClient(
  process.env.NEOPLE_DF_API_KEY,
  new GotAdapter(got.extend({
    timeout: { request: 5000 },
    retry: { limit: 2 }
  }))
);

// API 호출 예제
const result = await client.searchCharacter('홍길동');
console.log(result);
```

## 에러 처리

모든 HTTP 어댑터는 다양한 라이브러리의 에러를 `NeopleApiError`로 통일합니다.

```typescript
import { NeopleDFClient, NeopleApiError } from 'neople-sdk-js';

const client = new NeopleDFClient(process.env.NEOPLE_DF_API_KEY);

try {
  const result = await client.searchCharacter('존재하지않는캐릭터');
} catch (error) {
  if (error instanceof NeopleApiError) {
    console.log(`API 오류: ${error.status} - ${error.message}`);
    // error.response에서 원본 응답 데이터 확인 가능
  } else {
    console.log('네트워크 오류:', error.message);
  }
}
```

### 어댑터별 에러 처리 통일화

각 HTTP 라이브러리마다 다른 에러 형태를 동일하게 처리합니다:

```typescript
// FetchAdapter 사용 시
const fetchClient = new NeopleDFClient(apiKey, new FetchAdapter());

// AxiosAdapter 사용 시  
const axiosClient = new NeopleDFClient(apiKey, new AxiosAdapter(axios.create()));

// GotAdapter 사용 시
const gotClient = new NeopleDFClient(apiKey, new GotAdapter(got.extend()));

// 모든 클라이언트에서 동일한 에러 처리
[fetchClient, axiosClient, gotClient].forEach(async (client) => {
  try {
    await client.searchCharacter('잘못된요청');
  } catch (error) {
    if (error instanceof NeopleApiError) {
      // 어댑터와 관계없이 항상 동일한 에러 타입
      console.log(`상태 코드: ${error.status}`);
      console.log(`에러 메시지: ${error.message}`);
    }
  }
});
```

**주요 에러 타입:**
- **HTTP 에러** (`status > 0`): API 서버 응답 에러 (404, 500 등)
- **네트워크 에러** (`status = 0`): 네트워크 연결 문제


## 라이선스

MIT

## 기여하기

버그 리포트, 기능 요청, Pull Request를 환영합니다!

## 참조 링크

- [Neople Open API 개발자 사이트](https://developers.neople.co.kr/) - 네오플 공식 API 개발자 포털
- [SDK 문서 사이트](https://crowrish.github.io/neople-sdk-js-docs/) - 완전한 SDK 사용법과 API 레퍼런스
- [npm 패키지](https://www.npmjs.com/package/neople-sdk-js) - neople-sdk-js npm 패키지 페이지
- [neople-openapi-types](https://github.com/leegeunhyeok/neople-openapi-types) - Neople Open API 타입 정의 패키지
