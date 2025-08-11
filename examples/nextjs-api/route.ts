// app/api/df/character/[name]/route.ts
import { NeopleDFClient, NeopleApiError } from 'neople-sdk-js';

const dfClient = new NeopleDFClient(process.env.NEOPLE_DF_API_KEY!);

export async function GET(
  request: Request,
  { params }: { params: { name: string } }
) {
  try {
    const { searchParams } = new URL(request.url);
    const serverId = searchParams.get('serverId') || undefined;
    
    const result = await dfClient.searchCharacter(params.name, serverId);
    
    return Response.json(result);
  } catch (error) {
    if (error instanceof NeopleApiError) {
      return Response.json(
        { error: error.message, status: error.status },
        { status: error.status }
      );
    }
    
    return Response.json(
      { error: '서버 내부 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}

// app/api/df/character/[serverId]/[characterId]/route.ts (별도 파일)
export async function GET_CHARACTER_DETAIL(
  request: Request,
  { params }: { params: { serverId: string; characterId: string } }
) {
  try {
    const result = await dfClient.getCharacter(params.serverId, params.characterId);
    
    return Response.json(result);
  } catch (error) {
    if (error instanceof NeopleApiError) {
      return Response.json(
        { error: error.message, status: error.status },
        { status: error.status }
      );
    }
    
    return Response.json(
      { error: '서버 내부 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}

// app/api/df/auction/route.ts (별도 파일)
export async function GET_AUCTION_SEARCH(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    
    const params: Record<string, any> = {};
    searchParams.forEach((value, key) => {
      params[key] = value;
    });
    
    const result = await dfClient.searchAuction(params);
    
    return Response.json(result);
  } catch (error) {
    if (error instanceof NeopleApiError) {
      return Response.json(
        { error: error.message, status: error.status },
        { status: error.status }
      );
    }
    
    return Response.json(
      { error: '서버 내부 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}