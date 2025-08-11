import express from 'express';
import { NeopleDFClient, NeopleCyphersClient, NeopleApiError } from 'neople-sdk-js';

const app = express();
const port = process.env.PORT || 3000;

// API 키 확인
const dfApiKey = process.env.NEOPLE_DF_API_KEY;
const cyphersApiKey = process.env.NEOPLE_CYPHERS_API_KEY;

if (!dfApiKey || !cyphersApiKey) {
  console.error('API 키가 설정되지 않았습니다. NEOPLE_DF_API_KEY와 NEOPLE_CYPHERS_API_KEY 환경변수를 설정하세요.');
  process.exit(1);
}

// 클라이언트 초기화
const dfClient = new NeopleDFClient(dfApiKey);
const cyphersClient = new NeopleCyphersClient(cyphersApiKey);

app.use(express.json());

// 던전앤파이터 API 엔드포인트
app.get('/api/df/character/search/:name', async (req, res) => {
  try {
    const { name } = req.params;
    const { serverId } = req.query;
    
    const result = await dfClient.searchCharacter(name, serverId as string);
    res.json(result);
  } catch (error) {
    if (error instanceof NeopleApiError) {
      res.status(error.status).json({ 
        error: error.message,
        status: error.status 
      });
    } else {
      res.status(500).json({ error: '서버 내부 오류' });
    }
  }
});

app.get('/api/df/character/:serverId/:characterId', async (req, res) => {
  try {
    const { serverId, characterId } = req.params;
    
    const result = await dfClient.getCharacter(serverId, characterId);
    res.json(result);
  } catch (error) {
    if (error instanceof NeopleApiError) {
      res.status(error.status).json({ 
        error: error.message,
        status: error.status 
      });
    } else {
      res.status(500).json({ error: '서버 내부 오류' });
    }
  }
});

app.get('/api/df/character/:serverId/:characterId/equipment', async (req, res) => {
  try {
    const { serverId, characterId } = req.params;
    
    const result = await dfClient.getCharacterEquipment(serverId, characterId);
    res.json(result);
  } catch (error) {
    if (error instanceof NeopleApiError) {
      res.status(error.status).json({ 
        error: error.message,
        status: error.status 
      });
    } else {
      res.status(500).json({ error: '서버 내부 오류' });
    }
  }
});

app.get('/api/df/auction/search', async (req, res) => {
  try {
    const params = req.query;
    
    const result = await dfClient.searchAuction(params);
    res.json(result);
  } catch (error) {
    if (error instanceof NeopleApiError) {
      res.status(error.status).json({ 
        error: error.message,
        status: error.status 
      });
    } else {
      res.status(500).json({ error: '서버 내부 오류' });
    }
  }
});

// 사이퍼즈 API 엔드포인트
app.get('/api/cyphers/player/search/:nickname', async (req, res) => {
  try {
    const { nickname } = req.params;
    const { wordType, limit } = req.query;
    
    const result = await cyphersClient.searchPlayer(nickname, {
      wordType: wordType as 'match' | 'full',
      limit: limit ? parseInt(limit as string) : undefined
    });
    res.json(result);
  } catch (error) {
    if (error instanceof NeopleApiError) {
      res.status(error.status).json({ 
        error: error.message,
        status: error.status 
      });
    } else {
      res.status(500).json({ error: '서버 내부 오류' });
    }
  }
});

app.get('/api/cyphers/player/:playerId', async (req, res) => {
  try {
    const { playerId } = req.params;
    
    const result = await cyphersClient.getPlayerInfo(playerId);
    res.json(result);
  } catch (error) {
    if (error instanceof NeopleApiError) {
      res.status(error.status).json({ 
        error: error.message,
        status: error.status 
      });
    } else {
      res.status(500).json({ error: '서버 내부 오류' });
    }
  }
});

app.get('/api/cyphers/player/:playerId/matches', async (req, res) => {
  try {
    const { playerId } = req.params;
    const params = req.query;
    
    const result = await cyphersClient.getPlayerMatches(playerId, params);
    res.json(result);
  } catch (error) {
    if (error instanceof NeopleApiError) {
      res.status(error.status).json({ 
        error: error.message,
        status: error.status 
      });
    } else {
      res.status(500).json({ error: '서버 내부 오류' });
    }
  }
});

app.get('/api/cyphers/ranking', async (req, res) => {
  try {
    const params = req.query;
    
    const result = await cyphersClient.getOverallRanking(params);
    res.json(result);
  } catch (error) {
    if (error instanceof NeopleApiError) {
      res.status(error.status).json({ 
        error: error.message,
        status: error.status 
      });
    } else {
      res.status(500).json({ error: '서버 내부 오류' });
    }
  }
});

// 헬스체크 엔드포인트
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

app.listen(port, () => {
  console.log(`🚀 서버가 http://localhost:${port} 에서 실행중입니다`);
  console.log('\\n사용 가능한 엔드포인트:');
  console.log('던전앤파이터:');
  console.log('- GET /api/df/character/search/:name?serverId=서버ID');
  console.log('- GET /api/df/character/:serverId/:characterId');
  console.log('- GET /api/df/character/:serverId/:characterId/equipment');
  console.log('- GET /api/df/auction/search?itemName=아이템명');
  console.log('\\n사이퍼즈:');
  console.log('- GET /api/cyphers/player/search/:nickname?wordType=검색방식&limit=개수');
  console.log('- GET /api/cyphers/player/:playerId');
  console.log('- GET /api/cyphers/player/:playerId/matches?gameTypeId=게임타입');
  console.log('- GET /api/cyphers/ranking?limit=개수');
  console.log('\\n기타:');
  console.log('- GET /health');
});