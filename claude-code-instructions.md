# Neople SDK 개발 지침 (Claude Code용)

## 🎯 프로젝트 개요

네오플 오픈API를 위한 Node.js/TypeScript SDK를 개발합니다. 기존에 성공적으로 배포한 `neople-openapi-types` 패키지를 기반으로 실제 API 호출 기능을 제공하는 SDK를 만듭니다.

### 목표
- TypeScript 우선 개발로 완벽한 타입 안전성 제공
- 다양한 HTTP 클라이언트 라이브러리 지원 (Axios, Fetch, Got, node-fetch)
- Node.js 백엔드 및 Next.js 환경에서 사용 가능
- 개발자 친화적인 API 설계

## 📦 패키지 정보

### 패키지명
`neople-sdk-js`

### 의존성 구조
```json
{
  "name": "neople-sdk-js",
  "version": "0.1.0",
  "dependencies": {
    "neople-openapi-types": "^0.1.0"
  },
  "peerDependencies": {
    "axios": ">=0.21.0",
    "node-fetch": ">=2.0.0",
    "got": ">=11.0.0"
  },
  "peerDependenciesMeta": {
    "axios": { "optional": true },
    "node-fetch": { "optional": true },
    "got": { "optional": true }
  },
  "devDependencies": {
    "typescript": "^5.0.0",
    "@types/node": "^20.0.0",
    "jest": "^29.0.0",
    "axios": "^1.0.0",
    "node-fetch": "^3.0.0",
    "got": "^13.0.0"
  }
}
```

## 🏗️ 프로젝트 구조

```
neople-sdk/
├── src/
│   ├── core/
│   │   ├── client.ts          # 기본 클라이언트 클래스
│   │   ├── http.ts            # HTTP 어댑터 인터페이스
│   │   └── error.ts           # 에러 클래스 정의
│   ├── adapters/
│   │   ├── fetch-adapter.ts   # Fetch API 어댑터 (기본값)
│   │   ├── axios-adapter.ts   # Axios 어댑터
│   │   ├── node-fetch-adapter.ts # node-fetch 어댑터
│   │   ├── got-adapter.ts     # Got 어댑터
│   │   └── index.ts
│   ├── clients/
│   │   ├── base-client.ts     # 기본 클라이언트
│   │   ├── dungeon-fighter.ts # 던전앤파이터 클라이언트
│   │   ├── cyphers.ts         # 사이퍼즈 클라이언트
│   │   └── index.ts
│   ├── types/
│   │   └── index.ts           # neople-openapi-types 재사용
│   ├── utils/
│   │   ├── url-builder.ts     # URL 생성 유틸리티
│   │   └── validator.ts       # 입력값 검증
│   └── index.ts               # 메인 엔트리포인트
├── examples/
│   ├── basic-usage/
│   ├── express-server/
│   ├── nextjs-api/
│   └── nextjs-server-actions/
├── tests/
│   ├── unit/
│   └── integration/
├── package.json
├── tsconfig.json
├── README.md
└── LICENSE
```

## 🔌 HTTP 어댑터 시스템

### 기본 인터페이스
```typescript
interface HttpAdapter {
  get<T>(url: string, config?: RequestConfig): Promise<T>;
}

interface RequestConfig {
  headers?: Record<string, string>;
  timeout?: number;
  params?: Record<string, any>;
}
```
```

### 구현할 어댑터들
1. **FetchAdapter** - Node.js 18+ 내장 fetch 사용 (기본값, GET 요청만)
2. **AxiosAdapter** - 가장 인기 있는 HTTP 클라이언트 (GET 요청만)
3. **NodeFetchAdapter** - 구버전 Node.js 지원용 (GET 요청만)
4. **GotAdapter** - Node.js 최적화된 클라이언트 (GET 요청만)

> 💡 **참고**: 네오플 오픈API는 모든 엔드포인트가 GET 방식이므로, GET 메서드만 구현합니다.

## 🎨 API 설계

### 기본 사용법
```typescript
import { NeopleDFClient } from 'neople-sdk';

// 기본 사용법 (Fetch 어댑터)
const client = new NeopleDFClient(process.env.NEOPLE_API_KEY);

// 특정 어댑터 사용
import { AxiosAdapter } from 'neople-sdk/adapters';
import axios from 'axios';

const client = new NeopleDFClient(
  apiKey,
  new AxiosAdapter(axios.create({ timeout: 5000 }))
);
```

### 던전앤파이터 API 예시
```typescript
// 캐릭터 검색 (GET)
const characters = await client.df.searchCharacter('홍길동');

// 캐릭터 정보 (GET)
const character = await client.df.getCharacter('characterId');

// 캐릭터 장비 (GET)
const equipment = await client.df.getCharacterEquipment('characterId');

// 경매장 검색 (GET)
const auction = await client.df.searchAuction({
  itemName: '해방무기',
  limit: 10
});

// 아이템 정보 (GET)
const item = await client.df.getItem('itemId');
```

> 💡 **참고**: 네오플 오픈API는 데이터 조회만 제공하므로 모든 요청이 GET 방식입니다.

## 🎯 지원 환경

### ✅ 완벽 지원
- **Backend Node.js** (Express, Fastify, Koa 등)
- **Next.js API Routes** (Pages Router, App Router)
- **Next.js Server Actions** (App Router 13+)
- **Serverless Functions** (Vercel, Netlify)
- **AWS Lambda**
- **Discord/Telegram 봇**

### 🚫 지원하지 않음
- 브라우저 환경 (CORS 정책으로 인한 제한)

## 🚀 개발 우선순위

### Phase 1: 기본 구조 
1. 프로젝트 초기화 및 TypeScript 설정
2. HTTP 어댕터 인터페이스 정의
3. FetchAdapter 구현 (기본값)
4. 기본 클라이언트 클래스 개발
5. 에러 핸들링 시스템

### Phase 2: 핵심 기능
1. AxiosAdapter 구현
2. 던전앤파이터 기본 API (캐릭터 검색, 정보 조회)
3. URL 빌더 및 유틸리티 함수
4. 기본 테스트 작성

### Phase 3: 확장 기능 
1. NodeFetchAdapter, GotAdapter 구현
2. 던전앤파이터 고급 API (장비, 스킬, 경매장)
3. 입력값 검증 및 에러 처리 강화
4. 예제 코드 작성

## 🔧 개발 가이드라인

### TypeScript 설정
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "lib": ["ES2020"],
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "declaration": true,
    "declarationMap": true,
    "sourceMap": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist", "tests"]
}
```

### 네이밍 컨벤션
- **클래스**: PascalCase (`NeopleDFClient`, `FetchAdapter`)
- **메서드**: camelCase (`getCharacter`, `searchCharacter`)
- **인터페이스**: PascalCase (`HttpAdapter`, `RequestConfig`)
- **타입**: PascalCase, neople-openapi-types에서 재사용

### 에러 처리
```typescript
export class NeopleApiError extends Error {
  constructor(
    public status: number,
    public message: string,
    public response?: any
  ) {
    super(message);
    this.name = 'NeopleApiError';
  }
}

// 사용 예시 - GET 요청에서 발생하는 에러들
try {
  const character = await client.df.getCharacter('invalidId');
} catch (error) {
  if (error instanceof NeopleApiError) {
    console.log(`API Error: ${error.status} - ${error.message}`);
  }
}
```

## 📝 필수 구현 사항

### 1. 기본 클라이언트
```typescript
export class NeopleDFClient {
  constructor(
    private apiKey: string,
    private httpAdapter: HttpAdapter = new FetchAdapter()
  ) {}

  // 던전앤파이터 클라이언트 접근
  get df() {
    return new DungeonFighterClient(this.apiKey, this.httpAdapter);
  }
}
```

### 2. HTTP 어댑터
각 어댑터는 동일한 인터페이스를 구현하되, 해당 라이브러리의 특성을 최대한 활용

### 3. 타입 안전성
neople-openapi-types 패키지의 타입을 최대한 활용하여 완벽한 타입 안전성 보장

### 4. 테스트
- 각 어댑터별 단위 테스트
- API 호출 통합 테스트 (Mock 사용)
- 타입 정확성 테스트

## 📚 예제 코드

### Express.js 서버
```typescript
import express from 'express';
import { NeopleDFClient } from 'neople-sdk';

const app = express();
const client = new NeopleDFClient(process.env.NEOPLE_API_KEY);

app.get('/api/character/:name', async (req, res) => {
  try {
    const characters = await client.df.searchCharacter(req.params.name);
    res.json(characters);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
```

### Next.js API Route
```typescript
// app/api/character/[name]/route.ts
import { NeopleDFClient } from 'neople-sdk';

const client = new NeopleDFClient(process.env.NEOPLE_API_KEY);

export async function GET(
  request: Request,
  { params }: { params: { name: string } }
) {
  try {
    const characters = await client.df.searchCharacter(params.name);
    return Response.json(characters);
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
```

### Next.js Server Actions
```typescript
// app/actions/character.ts
'use server'

import { NeopleDFClient } from 'neople-sdk';

const client = new NeopleDFClient(process.env.NEOPLE_API_KEY);

export async function getCharacterData(formData: FormData) {
  const characterName = formData.get('characterName') as string;
  
  try {
    const characters = await client.df.searchCharacter(characterName);
    return { success: true, data: characters };
  } catch (error) {
    return { success: false, error: error.message };
  }
}
```

## ⚖️ 라이선스 및 법적 고려사항

### 패키지 라이선스
MIT License 사용

### README에 필수 포함 내용
```markdown
## ⚠️ 중요 공지사항

이 SDK는 네오플 오픈 API를 위한 TypeScript/JavaScript 클라이언트입니다.
- [네오플 오픈 API 서비스 이용약관](https://developers.neople.co.kr/contents/policy)을 반드시 준수해야 합니다
- API 데이터의 상업적 이용은 제한됩니다  
- API 사용 시 "네오플 오픈 API 서비스" 출처 표시가 필요합니다
- 모든 API 데이터의 권리는 ㈜네오플에 있습니다
```

## 🎯 성공 지표

### 기술적 목표
- TypeScript 100% 커버리지
- 모든 주요 HTTP 클라이언트 지원
- Zero breaking changes policy
- 완벽한 타입 안전성

### 품질 목표
- 테스트 커버리지 90% 이상
- 완벽한 JSDoc 문서화
- 풍부한 사용 예제
- 직관적인 API 설계

---

**시작 순서**: 
1. 프로젝트 초기화 및 기본 구조 설정
2. FetchAdapter부터 구현 시작
3. 기본 클라이언트 클래스 개발
4. 던전앤파이터 캐릭터 검색 API부터 구현

Claude Code와 함께 단계별로 차근차근 개발해보세요! 🚀