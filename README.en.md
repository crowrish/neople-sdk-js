# neople-sdk-js

[![Korean](https://img.shields.io/badge/README-한국어-red)](./README.md)

TypeScript SDK for Neople Open API

> **Note**: This documentation is written as of August 14, 2025.

This SDK is a TypeScript/JavaScript client for Neople Open API.
You must comply with [Neople Open API Terms of Service](https://developers.neople.co.kr/contents/policy).

## Documentation
[https://crowrish.github.io/neople-sdk-js-docs](https://crowrish.github.io/neople-sdk-js-docs)

## Installation

```bash
npm install neople-sdk-js
```

## Quick Start

### Dungeon Fighter Online

```typescript
import { NeopleDFClient } from 'neople-sdk-js';

const dfClient = new NeopleDFClient(process.env.NEOPLE_DF_API_KEY);

// Search characters
const characters = await dfClient.searchCharacter('character_name');

// Get character details
const character = await dfClient.getCharacter('cain', 'characterId');

// Get character equipment
const equipment = await dfClient.getCharacterEquipment('cain', 'characterId');
```

### Cyphers

```typescript
import { NeopleCyphersClient } from 'neople-sdk-js';

const cyphersClient = new NeopleCyphersClient(process.env.NEOPLE_CYPHERS_API_KEY);

// Search players
const players = await cyphersClient.searchPlayer('player_nickname');

// Get player information
const playerInfo = await cyphersClient.getPlayerInfo('playerId');

// Get player match records
const matches = await cyphersClient.getPlayerMatches('playerId', { gameTypeId: 'rating' });
```

## Features

- 🔥 Full TypeScript support with complete type safety
- 🚀 Multiple HTTP client support (Axios, Fetch, Got, node-fetch)
- 🎯 Supports Node.js backend and Next.js environments
- 🛡️ Comprehensive error handling
- 📖 Rich JSDoc documentation
- 🎮 Separate API keys support for Dungeon Fighter and Cyphers
- 🔗 Dedicated URL builder classes for URL-only usage
- **Uses Node.js built-in fetch by default (no dependencies)**
- **🎉 Complete Neople Open API support (34 Dungeon Fighter + 13 Cyphers = 47 total APIs)**

## Supported APIs

### Dungeon Fighter Online APIs
- **Basic Information**
  - `getServers()` - Server list
  - `getJobs()` - Job/class list
- **Characters**
  - `searchCharacter()` - Character search
  - `getCharacter()` - Character basic information
  - `getCharacterStatus()` - Character status information
  - `getCharacterEquipment()` - Character equipment information
  - `getCharacterAvatar()` - Character avatar information
  - `getCharacterCreature()` - Character creature information
  - `getCharacterFlag()` - Character flag information
  - `getCharacterTalisman()` - Character talisman information
  - `getCharacterSkill()` - Character skill information
  - `getCharacterBuff()` - Character buff information
  - `getCharacterTimeline()` - Character timeline
  - `getCharactersByFame()` - Search characters by fame
- **Skills**
  - `getCharacterSkillStyle()` - Character skill style
  - `getCharacterBuffSkillEquipment()` - Buff skill equipment enhancement
  - `getCharacterBuffSkillAvatar()` - Buff skill avatar enhancement
  - `getCharacterBuffSkillCreature()` - Buff skill creature enhancement
  - `getSkillsByJob()` - Skills by job/class
  - `getSkillDetail()` - Skill detail information
  - `getMultiSkills()` - Multiple skills information
- **Items**
  - `searchItems()` - Item search
  - `getItem()` - Item detail information
  - `getSetItem()` - Set item information
  - `searchSetItems()` - Set item search
  - `getMultiItems()` - Multiple items information
  - `getMultiSetItems()` - Multiple set items information
  - `getItemShop()` - Item shop information
- **Auction**
  - `searchAuction()` - Auction search
  - `getAuctionSold()` - Auction sold history
  - `getAuctionItem()` - Auction item detail
- **Avatar Market**
  - `getAvatarMarketSale()` - Avatar market sales
  - `getAvatarMarketSold()` - Avatar market sold items
  - `getAvatarMarketItem()` - Avatar market item detail
  - `getAvatarMarketSoldItem()` - Avatar market sold item detail
- **Hashtags**
  - `getAvatarMarketHashtags()` - Avatar market hashtags
  - `getItemHashtags()` - Item hashtags

### Cyphers APIs
- **Players**
  - `searchPlayer()` - Player search
  - `getPlayerInfo()` - Player information
  - `getPlayerMatches()` - Player match history
  - `getPlayerEquipment()` - Player equipment information
- **Matches**
  - `getMatchDetail()` - Match detail information
- **Rankings**
  - `getOverallRanking()` - Overall ranking
  - `getCharacterRanking()` - Character-specific ranking
  - `getTsjRanking()` - TSJ (Tournament of Souls and Justice) ranking
- **Items & Characters**
  - `searchCyphersItems()` - Cyphers item search
  - `getCyphersItemDetail()` - Cyphers item detail information
  - `getCyphersMultiItems()` - Multiple Cyphers items information
  - `getCyphersInfo()` - Cyphers character information
  - `getRecommendItems()` - Recommended items

## Supported Environments

### ✅ Fully Supported
- Backend Node.js (Express, Fastify, Koa, etc.)
- Next.js API Routes (Pages Router, App Router)
- Next.js Server Actions (App Router 13+)
- Serverless Functions (Vercel, Netlify)
- AWS Lambda
- Discord/Telegram bots

### 🚫 Not Supported
- Browser environments (due to CORS policy restrictions)

## API Key Setup

Dungeon Fighter and Cyphers use separate API keys:

```bash
# .env file
NEOPLE_DF_API_KEY=your_dungeon_fighter_api_key
NEOPLE_CYPHERS_API_KEY=your_cyphers_api_key
```

## Usage Examples

### Express.js Server

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

## URL-Only Usage

For users who want to control HTTP clients directly or only need URLs, we provide dedicated builder classes.

### Dungeon Fighter URL Generation

```typescript
import { NeopleDFUrlBuilder } from 'neople-sdk-js';

const urlBuilder = new NeopleDFUrlBuilder(process.env.NEOPLE_DF_API_KEY);

// Generate URLs
const characterUrl = urlBuilder.searchCharacter('character_name', 'cain');
const equipmentUrl = urlBuilder.getCharacterEquipment('cain', 'characterId');
const auctionUrl = urlBuilder.searchAuction({ itemName: 'weapon', limit: 10 });

// Use with your preferred HTTP client
const response = await fetch(characterUrl);
const data = await response.json();
```

### Cyphers URL Generation

```typescript
import { NeopleCyphersUrlBuilder } from 'neople-sdk-js';

const urlBuilder = new NeopleCyphersUrlBuilder(process.env.NEOPLE_CYPHERS_API_KEY);

// Generate URLs
const playerUrl = urlBuilder.searchPlayer('player_nickname');
const matchUrl = urlBuilder.getPlayerMatches('playerId', { gameTypeId: 'rating' });
const rankingUrl = urlBuilder.getOverallRanking({ limit: 10 });

// Use with axios or other HTTP clients
const response = await axios.get(playerUrl);
```

### Batch URL Generation

```typescript
const urls = urlBuilder.batch([
  builder => builder.searchCharacter('player1'),
  builder => builder.searchCharacter('player2'),
  builder => builder.searchAuction({ itemName: 'weapon' })
]);

// Process multiple URLs concurrently
const promises = urls.map(url => fetch(url));
const responses = await Promise.all(promises);
```

## Supported HTTP Clients

The SDK supports multiple HTTP client libraries through adapters:

### FetchAdapter (Default)
Uses Node.js 18+ built-in fetch

```typescript
import { NeopleDFClient, FetchAdapter } from 'neople-sdk-js';

// Default adapter (FetchAdapter)
const client = new NeopleDFClient(process.env.NEOPLE_DF_API_KEY);

// Or explicitly use FetchAdapter
const clientWithFetch = new NeopleDFClient(
  process.env.NEOPLE_DF_API_KEY,
  new FetchAdapter()
);

// API call example
const result = await client.searchCharacter('character_name');
console.log(result);
```

### AxiosAdapter
For axios library users

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

// API call example
const result = await client.searchCharacter('character_name');
console.log(result);
```

### NodeFetchAdapter
For older Node.js versions (using node-fetch library)

```typescript
import { NeopleDFClient, NodeFetchAdapter } from 'neople-sdk-js';
import fetch from 'node-fetch';

const client = new NeopleDFClient(
  process.env.NEOPLE_DF_API_KEY,
  new NodeFetchAdapter(fetch)
);

// API call example
const result = await client.searchCharacter('character_name');
console.log(result);
```

### GotAdapter
For Got library users (Node.js optimized)

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

// API call example
const result = await client.searchCharacter('character_name');
console.log(result);
```

## Error Handling

All HTTP adapters unify errors from various libraries into `NeopleApiError`.

```typescript
import { NeopleDFClient, NeopleApiError } from 'neople-sdk-js';

const client = new NeopleDFClient(process.env.NEOPLE_DF_API_KEY);

try {
  const result = await client.searchCharacter('nonexistent-character');
} catch (error) {
  if (error instanceof NeopleApiError) {
    console.log(`API Error: ${error.status} - ${error.message}`);
    // error.response contains original response data
  } else {
    console.log('Network Error:', error.message);
  }
}
```

### Unified Error Handling Across Adapters

Each HTTP library's different error formats are handled consistently:

```typescript
// Using FetchAdapter
const fetchClient = new NeopleDFClient(apiKey, new FetchAdapter());

// Using AxiosAdapter  
const axiosClient = new NeopleDFClient(apiKey, new AxiosAdapter(axios.create()));

// Using GotAdapter
const gotClient = new NeopleDFClient(apiKey, new GotAdapter(got.extend()));

// Identical error handling for all clients
[fetchClient, axiosClient, gotClient].forEach(async (client) => {
  try {
    await client.searchCharacter('invalid-request');
  } catch (error) {
    if (error instanceof NeopleApiError) {
      // Always same error type regardless of adapter
      console.log(`Status Code: ${error.status}`);
      console.log(`Error Message: ${error.message}`);
    }
  }
});
```

**Main Error Types:**
- **HTTP Errors** (`status > 0`): API server response errors (404, 500, etc.)
- **Network Errors** (`status = 0`): Network connection issues

## License

MIT

## Contributing

Bug reports, feature requests, and Pull Requests are welcome!

## References

- [Neople Open API Developer Site](https://developers.neople.co.kr/) - Official Neople API developer portal
- [Documentation](https://crowrish.github.io/neople-sdk-js-docs/) - Complete SDK documentation
- [npm Package](https://www.npmjs.com/package/neople-sdk-js) - neople-sdk-js npm package page
- [neople-openapi-types](https://github.com/leegeunhyeok/neople-openapi-types) - Neople Open API type definitions package