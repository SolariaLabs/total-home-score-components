import * as React from 'react';
import { ScoreTab } from '../components/ScoreTab';
import { LeftArrow } from '../svgs/LeftArrow';
import { RightArrow } from '../svgs/RightArrow';

import { track, DetailedScore } from '@shine-api/common';

export interface STCProps {
  scores: DetailedScore[];
  selectTab: Function;
  selectedIndex: number;
}

export interface STCState {
  startIndex: number;
  totalVisible?: number;
}

class ScoreTabContainer extends React.Component<STCProps, STCState> {
  private node: HTMLDivElement | null;

  constructor(props: STCProps) {
    super(props);
    this.node = null;
    this.state = {
      startIndex: 0
    };

    this.calculateTabs = this.calculateTabs.bind(this);
  }

  componentDidMount() {
    track(`Tab Selected - Quiet`);
    window.addEventListener('resize', this.calculateTabs);
    this.calculateTabs();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.calculateTabs);
  }

  calculateTabs() {
    if (!this.node) {
      return;
    }
    const { scores } = this.props;
    const { startIndex, totalVisible = scores.length } = this.state;
    const { clientWidth } = this.node;
    const minTabWidth = 145;
    const numberOfTabs = Math.floor(clientWidth / minTabWidth);
    const newTotalVisible = numberOfTabs > scores.length
      ? scores.length : numberOfTabs;
    
    if (newTotalVisible !== totalVisible) {
      const newStart = 0;
      return this.setState({ totalVisible: newTotalVisible, startIndex: newStart });
    }

  }

  next() {
    const { scores } = this.props;
    const { startIndex, totalVisible = scores.length } = this.state;
    if (scores.length > totalVisible + startIndex) {
      this.setState({ startIndex: startIndex + 1 });
    }
  }

  previous() {
    const { scores } = this.props;
    const { startIndex, totalVisible = scores.length } = this.state;
    if (startIndex > 0) {
      this.setState({ startIndex: startIndex - 1 });
    }
  }

  render() {
    const { scores, selectedIndex, selectTab } = this.props;
    const { startIndex, totalVisible = scores.length } = this.state;
    const disablePrevArrow = (startIndex === 0)
      ? 'disabled'
      : '';
    const disableNextArrow = (scores.length > totalVisible + startIndex)
      ? ''
      : 'disabled';
    const enableNav = (scores.length > totalVisible)
      ? 'visible'
      : '';
    const tabs = scores.map((score, key) => (
      <ScoreTab 
        {...score}
        key={key}
        selected={selectedIndex === key ? '-selected' : ''}
        selectTab={(name: string) => selectTab(key, name)}
      />
    ));

    return (
      <div className={'ths-score-tab-container'} ref={node => this.node = node}>
        <div
          className={`ths-score-tab-previous ${enableNav} ${disablePrevArrow}`} 
          onClick={() => this.previous()} 
        >
          <LeftArrow />
        </div>
        {tabs.slice(startIndex, totalVisible + startIndex)}
        <div
          className={`ths-score-tab-next ${enableNav} ${disableNextArrow}`}
          onClick={() => this.next()}
        >
          <RightArrow />
        </div>
      </div>
    );
  }
}

export { ScoreTabContainer };
