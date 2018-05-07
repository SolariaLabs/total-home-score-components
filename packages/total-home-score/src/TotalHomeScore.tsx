import * as React from 'react';
import { ScoreCard } from './components/ScoreCard';

import { fetchScores, totalHomeScoreIntro, Customizations, DetailedScore } from '@shine-api/common';

export interface TotalHomeScoreProps {
  apiKey: string;
  lat: number;
  lon: number;
  customizations?: Customizations;
}

export interface TotalHomeScoreState {
  scores: DetailedScore[];
}

class TotalHomeScore extends React.Component<TotalHomeScoreProps, TotalHomeScoreState> {
  constructor(props: TotalHomeScoreProps) {
    super(props);
    this.state = {
      scores: []
    };
  }

  componentDidMount() {
    const { apiKey, lat, lon, customizations } = this.props;
    fetchScores({ apiKey, lat, lon }, customizations)
      .then((scores: DetailedScore[]) => this.setState({ scores }));
  }
  render() {
    const { scores } = this.state;
    return (
      <div id={'total-home-score'} className={'total-home-score-widget'}>
        <div className={'total-home-score-intro'}>
          {totalHomeScoreIntro}
        </div>
        {scores.map((score, key) => <ScoreCard key={key} {...score} />)}
        <div className={'total-home-score-footer'}>
          Total Home Score is powered by
          <a href={'https://developers.solarialabs.com'} target="_blank">
            Shine API
          </a>
        </div>
      </div>
    );
  }
}

export default TotalHomeScore;
