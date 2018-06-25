import * as React from 'react';

import { ScoreCard } from '../components/ScoreCard';
import { ScoreTabContainer } from './ScoreTabContainer';
import { FooterContainer } from './FooterContainer';

import { track, DetailedScore } from '@shine-api/common';

export interface ScoreBodyProps {
  scores: DetailedScore[];
  lat: number;
  lon: number;
}

export interface ScoreBodyState {
  selectedIndex: number;
}

class ScoreContainer extends React.Component<ScoreBodyProps, ScoreBodyState> {
  constructor(props: ScoreBodyProps) {
    super(props);
    this.state = {
      selectedIndex: 0
    };
  }

  selectTab(selectedIndex: number, name: string) {
    track(`Tab Selected - ${name}`);
    this.setState({ selectedIndex });
  }

  render() {
    const { scores, lat, lon } = this.props;
    const { selectedIndex } = this.state;

    return (
      <div className={'ths-score-container'}>
        <ScoreTabContainer
          scores={scores}
          selectedIndex={selectedIndex}
          selectTab={(index: number, name: string) => this.selectTab(index, name)}
        />
        <ScoreCard {...scores[selectedIndex]} />
        <FooterContainer lat={lat} lon={lon} />
      </div>
    );
  }
}

export { ScoreContainer };
