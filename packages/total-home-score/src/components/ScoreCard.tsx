import * as React from 'react';

import { DetailedScore } from '@shine-api/common';

const ScoreCard: React.SFC<DetailedScore> = 
  ({ hint, colorClass, value, factors, descriptions }) =>
    (
    <div className={'ths-score-card'}>
        <div className={'col-4 col-md-3 score-circle-container'}>
          <div className={'score-circle score-' + colorClass}>
            {value}
          </div>
        </div>
        <div className={'col-8 col-md-3 score-level-title'}>
          {descriptions.score.display}
          <i data-toggle="tooltip" title={hint} className={'fa fa-question-circle ml-1'}/>
        </div>
        <div className={'offset-4 offset-md-0 col-6 col-md-8'}>
          <div className={'score-level-container'}>
            <div className={'score-level-description'}>
              {descriptions.score.description}
            </div>
          </div>
        </div>
        <div className={'offset-md-3 col-md-8 score-factor-details'}>
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
