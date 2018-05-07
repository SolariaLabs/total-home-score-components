import * as React from 'react';
import { expect } from 'chai';
import { shallow, ShallowWrapper } from 'enzyme';

import * as sinon from 'sinon';
import * as shineApi from '@shine-api/common';

import { detailedScore, lat, lon, apiKey } from './constants';
import TotalHomeScore from '../src/TotalHomeScore';
import { ScoreCard } from '../src/components/ScoreCard';

describe('Total Home Score React Widget', () => {
  let wrapper: ShallowWrapper<any, any>;
  let fetchScores: sinon.SinonStub;

  beforeEach(() => {
    fetchScores = sinon.stub(shineApi, 'fetchScores')
      .callsFake(() => Promise.resolve([]));
    wrapper = shallow(<TotalHomeScore apiKey={apiKey} lat={lat} lon={lon} />);
  });

  afterEach(() => {
    fetchScores.restore();
  });
  
  it('Renders properly', () => {
    expect(wrapper).to.have.id('total-home-score');
    expect(wrapper.find('#total-home-score').children().first())
      .to.have.className('total-home-score-intro');
    expect(wrapper.find('#total-home-score').children().last())
      .to.have.className('total-home-score-footer');
  });

  it('Renders with score cards', () => {
    wrapper.setState({ scores: [detailedScore] });
    expect(wrapper).to.contain(<ScoreCard {...detailedScore} />);
  });
});
