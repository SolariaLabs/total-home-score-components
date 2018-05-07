import * as React from 'react';

import { DetailedScore } from '@shine-api/common';

const ScoreCard: React.SFC<DetailedScore> = 
  ({ hint, score, colorClass, value, factors, descriptions }) =>
    (
    <div className={'score-widget-body'}>
      <div className={'row score-title'}>
        <span>{score.name} Score</span>
        <i data-toggle="tooltip" title={hint} className={'fa fa-question-circle'}/>
      </div>
      <div className={'row'}>
        <div className={'col-md-1 score-circle-container'}>
          <div className={'score-circle ' + colorClass}>
            {value}
          </div>
        </div>
        <div className={'col-md-3 score-level-container'}>
          <div className={'score-level-title'}>
            {descriptions.score.display}
          </div>
          <div className={'score-level-description'}>
            {descriptions.score.description}
          </div>
        </div>
        <div className={'col-md-6'}>
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
    </div>);

ScoreCard.defaultProps = {
  score: {
    id: '',
    name: ''
  },
  descriptions: {
    factors: [],
    score: {
      display: '',
      description: ''
    }
  }
};

export { ScoreCard };
