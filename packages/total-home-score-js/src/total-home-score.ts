import { fetchScores, log, ApiParameters, DetailedScore } from '@shine-api/common';
import { controllers } from './controllers';
import * as TotalHomeScore from './components/TotalHomeScore.hbs';

declare global {
  interface Window { 
    TotalHomeScore: any; 
  }
}

type TotalHomeScoreProps = ApiParameters & {
  id: string;
};

const displayWidgetContainer = () => {
  const { TotalHomeScore: thsProps } = window;
  const parent = document.getElementById(thsProps.id);

  if (!parent) {
    log(`Missing parent element: [${thsProps.id}]`);
    return Promise.reject({});
  }

  parent.innerHTML = TotalHomeScore({ loading: true });

  fetchScores(thsProps)
    .then((scores: DetailedScore[]) => {
      thsProps.scores = scores;
      parent.innerHTML = TotalHomeScore({ scores, selectedScore: scores[0] });
      controllers.forEach((controller: Function) => controller());
    });

};

export const loadTHSWidget = () => {
  const { TotalHomeScore: thsProps } = window;

  document.removeEventListener('DOMContentLoaded', loadTHSWidget);

  if (!thsProps) {
    log('Missing required parameters for loading Total Home Score Widget.');
    return Promise.reject({});
  }

  return displayWidgetContainer();
};

document.addEventListener('DOMContentLoaded', loadTHSWidget);
