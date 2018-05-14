import * as React from 'react';
import { Loading } from './components/Loading';
import { ScoreCard } from './components/ScoreCard';
import { ScoreError } from './components/ScoreError';

import { fetchScores, totalHomeScoreIntro, Customizations, DetailedScore } from '@shine-api/common';

export interface TotalHomeScoreProps {
  apiKey: string;
  lat: number;
  lon: number;
  callback?: Function;
  customizations?: Customizations;
}

export interface TotalHomeScoreState {
  scores?: DetailedScore[];
}

class TotalHomeScore extends React.Component<TotalHomeScoreProps, TotalHomeScoreState> {
  constructor(props: TotalHomeScoreProps) {
    super(props);
    this.state = {};
  }

  async componentDidMount() {
    const { apiKey, lat, lon, callback, customizations } = this.props;
    const scores: DetailedScore[] = await
      fetchScores({ apiKey, lat, lon }, customizations);

    if (callback) {
      callback(scores);
    }

    this.setState({ scores });
  }

  render() {
    const { scores } = this.state;
    const scoreDisplay = scores
      ? scores.length > 0
        ? scores.map((score, key) => <ScoreCard key={key} {...score} />)
        : <ScoreError />
      : <Loading />;
    return (
      <div id={'total-home-score'} className={'total-home-score-widget'}>
        <div className={'total-home-score-intro'}>
          {totalHomeScoreIntro}
        </div>
        {scoreDisplay}
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
