import { fetchScores, ApiParameters, DetailedScore } from '@shine-api/common';
import { loadScoreCards } from './score-cards';

declare global {
  interface Window { 
    TotalHomeScore: any; 
  }
}

type TotalHomeScoreProps = ApiParameters & {
  id: string;
};

export const loadTHSWidget = (totalHomeProps?: TotalHomeScoreProps) => {
  if (!totalHomeProps) {
    console.error('Missing required parameters for loading Total Home Score Widget.');
    return Promise.resolve();
  }

  return fetchScores(totalHomeProps)
    .then((scores: DetailedScore[]) => loadScoreCards(totalHomeProps.id, scores));
};


loadTHSWidget(window.TotalHomeScore);
