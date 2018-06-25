import * as React from 'react';

import { DetailedScore } from '@shine-api/common';

export interface ScoreTabProps extends DetailedScore {
  selectTab: Function;
  selected?: string;
}

const ScoreTab: React.SFC<ScoreTabProps> = 
  ({ score: { name }, colorClass, value, selected, selectTab }) => (
    <div
      className={`ths-score-tab${selected}`}
      onClick={() => selectTab(name)}
    >
      <div className={'score-tab-name'}>
        {name}
      </div>
      <div className={`score-tab-score score-${colorClass}-text`}>
        {value}
      </div>
    </div>
  );

export { ScoreTab };
