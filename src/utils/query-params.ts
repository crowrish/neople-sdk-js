/**
 * 객체를 URL 쿼리 파라미터 문자열로 변환
 * @param params 파라미터 객체
 * @returns 쿼리 파라미터 문자열 (? 포함)
 */
export function buildQueryString(params: Record<string, any>): string {
  const searchParams = new URLSearchParams();
  
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      if (Array.isArray(value)) {
        value.forEach(item => searchParams.append(key, String(item)));
      } else {
        searchParams.append(key, String(value));
      }
    }
  });

  const queryString = searchParams.toString();
  return queryString ? `?${queryString}` : '';
}

/**
 * URL에 쿼리 파라미터를 안전하게 추가
 * @param baseUrl 기본 URL
 * @param params 추가할 파라미터
 * @returns 완성된 URL
 */
export function appendQueryParams(baseUrl: string, params: Record<string, any>): string {
  if (!params || Object.keys(params).length === 0) {
    return baseUrl;
  }

  const url = new URL(baseUrl);
  
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      url.searchParams.append(key, String(value));
    }
  });

  return url.toString();
}

/**
 * URL에서 쿼리 파라미터를 객체로 파싱
 * @param url URL 문자열
 * @returns 파라미터 객체
 */
export function parseQueryParams(url: string): Record<string, string> {
  try {
    const urlObj = new URL(url);
    const params: Record<string, string> = {};
    
    urlObj.searchParams.forEach((value, key) => {
      params[key] = value;
    });
    
    return params;
  } catch {
    return {};
  }
}