import * as React from 'react';
import { Loading } from './components/Loading';
import { ScoreContainer } from './containers/ScoreContainer';
import { ScoreError } from './components/ScoreError';

import { fetchScores, setApiKey, Customizations, DetailedScore } from '@shine-api/common';

export interface TotalHomeScoreProps {
  apiKey: string;
  lat: number;
  lon: number;
  callback?: Function;
  customizations?: Customizations;
}

export interface TotalHomeScoreState {
  scores?: DetailedScore[];
  error?: any;
}

class TotalHomeScore extends React.Component<TotalHomeScoreProps, TotalHomeScoreState> {
  constructor(props: TotalHomeScoreProps) {
    super(props);
    this.state = {};
  }

  async componentDidMount() {
    const { callback, customizations, ...apiParams } = this.props;
    const scores: DetailedScore[] = await fetchScores(apiParams, customizations);

    if (callback) {
      callback(scores);
    }

    this.setState({ scores });
  }

  render() {
    const { lat, lon } = this.props;
    const { scores } = this.state;
    const scoreBody = scores
      ? scores.length > 0
        ? <ScoreContainer scores={scores} lat={lat} lon={lon} />
        : <ScoreError />
      : <Loading />;
    return (
      <div id={'total-home-score'} className={'total-home-score-widget'}>
        {scoreBody}
      </div>
    );
  }
}

export default TotalHomeScore;
