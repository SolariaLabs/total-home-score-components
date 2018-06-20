import { THS_API } from '../constants';
import { setUser, transformScore, SupportScores } from '../utils';
import {
  ApiParameters,
  ApiResponse,
  Customizations,
  DetailedScore,
  Event,
  GenericObject
} from '../types';

const configuration: GenericObject<string> = {};

export const url = (endpoint: string, params: GenericObject<any> = {}): string =>
  `${THS_API.URL}/${endpoint}?app=widget&apikey=${configuration['apiKey']}&${
    Object.keys(params)
      .map(key => `${key.toLowerCase()}=${params[key]}`)
      .join('&')
  }`;

export const setApiKey = (apiKey: string): String =>
  configuration['apiKey'] = apiKey;

export const fetchScores = 
  async (apiParams: ApiParameters, customizations?: Customizations):
    Promise<DetailedScore[]> => {
    const thsResponse = await fetch(url(THS_API.REPORTS, apiParams));
    const { totalHomeScores } = (await thsResponse.json()) as ApiResponse;
    setUser(thsResponse.headers.get('x-vcap-request-id') || '');
    return Object.keys(totalHomeScores)
      .sort((a: string, b: string) =>
        Object.keys(SupportScores).indexOf(a) - 
        Object.keys(SupportScores).indexOf(b)
      )
      .map(transformScore(totalHomeScores, customizations));
  };

export const sendEvent = async (events: Event[]): Promise<any> =>
  fetch(url(THS_API.ANALYTICS), {
    body: JSON.stringify({ events }),
    headers: {
      'content-type': 'application/json'
    },
    redirect: 'follow',
    referrer: 'client',
    referrerPolicy: 'origin-when-cross-origin',
    method: 'POST',
    mode: 'cors'
  });
