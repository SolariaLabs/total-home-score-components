import * as React from 'React';
import constants from './constants';

import TotalHomeScore from '@shine-api/total-home-score';
import '@shine-api/total-home-score/dist/main.css';

const { apiKey, lat, lon } = constants;

const callback = (scores: any[]) => console.log(scores);

const TestApp = () =>
  (
    <TotalHomeScore apiKey={apiKey} lat={lat} lon={lon} callback={callback} />
  );

export default TestApp;
