import { TOTAL_HOME_SCORE_API } from '../constants';
import { transformScore, SupportScores } from '../utils';
import {
  ApiParameters,
  ApiResponse,
  Customizations,
  DetailedScore
} from '../types';

export const buildUrl = ({ apiKey, lat, lon }: ApiParameters): string =>
  `${TOTAL_HOME_SCORE_API}?apikey=${apiKey}&lat=${lat}&lon=${lon}&app=widget`;

export const fetchScores = 
  async (apiParams: ApiParameters, customizations?: Customizations):
    Promise<DetailedScore[]> => {
    const thsResponse = await fetch(buildUrl(apiParams));
    const { totalHomeScores } = (await thsResponse.json()) as ApiResponse;
    return Object.keys(totalHomeScores)
      .sort((a: string, b: string) =>
        Object.keys(SupportScores).indexOf(a) - 
        Object.keys(SupportScores).indexOf(b)
      )
      .map(transformScore(totalHomeScores, customizations));
  };
