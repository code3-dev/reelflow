export const INSTAGRAM_BASE_URL = 'https://www.instagram.com';

export const INSTAGRAM_ENDPOINTS = {
  POST: '/p',
  GRAPHQL: '/api/graphql'
} as const;

export const GRAPHQL_HEADERS = {
  'Accept': '*/*',
  'Accept-Language': 'en-US,en;q=0.5',
  'Content-Type': 'application/x-www-form-urlencoded',
  'X-FB-Friendly-Name': 'PolarisPostActionLoadPostQueryQuery',
  'X-CSRFToken': 'RVDUooU5MYsBbS1CNN3CzVAuEP8oHB52',
  'X-IG-App-ID': '1217981644879628',
  'X-FB-LSD': 'AVqbxe3J_YA',
  'X-ASBD-ID': '129477',
  'Sec-Fetch-Dest': 'empty',
  'Sec-Fetch-Mode': 'cors',
  'Sec-Fetch-Site': 'same-origin',
  'User-Agent': 'Mozilla/5.0 (Linux; Android 11; SAMSUNG SM-G973U) AppleWebKit/537.36 (KHTML, like Gecko) SamsungBrowser/14.2 Chrome/87.0.4280.141 Mobile Safari/537.36'
} as const;

export const WEBPAGE_HEADERS = {
  'accept': '*/*',
  'host': 'www.instagram.com',
  'referer': 'https://www.instagram.com/',
  'DNT': '1',
  'Sec-Fetch-Dest': 'document',
  'Sec-Fetch-Mode': 'navigate',
  'Sec-Fetch-Site': 'same-origin',
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/117.0'
} as const;