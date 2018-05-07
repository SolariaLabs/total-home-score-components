import * as React from 'React';
import constants from './constants';

import TotalHomeScore from '@shine-api/total-home-score';
import '@shine-api/total-home-score/dist/main.css';

const { apiKey, lat, lon } = constants;

const TestApp = () =>
  (
    <div className={'card'}>
      <div className={'card-header'}>
        Total Home Score
      </div>
      <div className={'card-body'}>
        <TotalHomeScore apiKey={apiKey} lat={lat} lon={lon}/>
      </div>
    </div>
  );

export default TestApp;
