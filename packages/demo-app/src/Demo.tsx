import * as React from 'React';
import constants from './constants';

import TotalHomeScore from '@shine-api/total-home-score';
import '@shine-api/total-home-score/dist/main.css';

export interface TestAppState {
  apiKey: string;
  lat: number;
  lon: number;
}

class TestApp extends React.Component<{},TestAppState> {
  constructor(props: any) {
    super(props);
    this.state = {
      ...constants
    };
  }

  componentDidMount() {
    const localApiKey = localStorage.getItem('ths_widget.demo.apiKey');

    if (localApiKey) {
      this.setState({ apiKey: localApiKey });
    }
  }

  callback(scores: any) {
    console.log(scores);
  }

  render() {
    const { apiKey, lat, lon } = this.state;

    if (!apiKey) {
      return (
        <div>
          Error. Please provide a valid api key from
          https://developers.solarialabs.com in the constants.ts file.
        </div>
      );
    }
  
    return (
      <TotalHomeScore apiKey={apiKey} lat={lat} lon={lon} callback={this.callback} />
    );
  }
}

export default TestApp;
