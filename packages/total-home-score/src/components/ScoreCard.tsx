import * as React from 'react';

import { DetailedScore } from '@shine-api/common';

const ScoreCard: React.SFC<DetailedScore> = 
  ({ hint, colorClass, value, factors, descriptions }) =>
    (
    <div className={'ths-score-card'}>
        <div className={'score-overview-container'}>
          <div className={'score-circle-container'}>
            <div className={'score-circle score-' + colorClass}>
              {value}
            </div>
          </div>
          <div className={'score-level-title'}>
            {descriptions.score.display}
            <i data-toggle="tooltip" title={hint} className={'fa fa-question-circle'}/>
          </div>
        </div>
        <div className={'score-details-container'}>
          <div className={'score-level-container'}>
            <div className={'score-level-description'}>
              {descriptions.score.description}
            </div>
          </div>
          <div className={'score-factor-details'}>
          <div className={'score-factors-title'}>
            Why were points deducted?
          </div>
          <ul className={'score-factor-list'}>
            { 
              descriptions.factors
                .map((factorDescription: string, key: number) =>
                  <li key={key}>{factorDescription}</li>)
            }
          </ul>
      </div>
        </div>
    </div>
  );

ScoreCard.defaultProps = {
  descriptions: {
    factors: [],
    score: {
      display: '',
      description: ''
    }
  }
};

export { ScoreCard };
