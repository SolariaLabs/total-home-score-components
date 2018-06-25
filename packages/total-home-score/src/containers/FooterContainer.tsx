import * as React from 'react';

import { Footer } from '../components/Footer';

import { track } from '@shine-api/common';

export interface FCProps {
  lat: number;
  lon: number;
}

export interface FCState {
  areScoresUseful?: boolean;
}

class FooterContainer extends React.Component<FCProps, FCState> {
  constructor(props: any) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const { lat, lon } = this.props;
    const savedFeedback =
      localStorage.getItem(`ths_widget.feedback.${lat}.${lon}`);
    if (savedFeedback) {
      this.setState(JSON.parse(savedFeedback));
    }
  }

  feedback(areScoresUseful: boolean) {
    const { lat, lon } = this.props;
    const event = areScoresUseful ? 'Thumbs up' : 'Thumbs down';
    localStorage.setItem(
      `ths_widget.feedback.${lat}.${lon}`, 
      JSON.stringify({ areScoresUseful }));
    track(`Feedback - ${event}`, { lat, lon }, true);
    this.setState({ areScoresUseful });
  }

  render() {
    const { areScoresUseful } = this.state;
    const footerProps = (areScoresUseful != null)
      ? areScoresUseful
        ? { thumbsUp: 'selected', thumbsDown: '' }
        : { thumbsUp: '', thumbsDown: 'selected' }
      : { thumbsUp: '', thumbsDown: '' };

    return (
      <Footer 
        feedback={(usefulScores: boolean) => this.feedback(usefulScores)} 
        {...footerProps}
      />
    );
  }
}
  
export { FooterContainer };
