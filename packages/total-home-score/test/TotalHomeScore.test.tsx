import * as React from 'react';
import { expect } from 'chai';
import { mount, ReactWrapper } from 'enzyme';

import * as sinon from 'sinon';
import * as shineApi from '@shine-api/common';

import { detailedScore, lat, lon, apiKey } from './constants';
import TotalHomeScore from '../src/TotalHomeScore';
import { ScoreCard } from '../src/components/ScoreCard';

describe('Total Home Score React Widget', () => {
  let wrapper: ReactWrapper<any, any>;
  let callback: sinon.SinonStub;
  let fetchScores: sinon.SinonStub;

  beforeEach(() => {
    callback = sinon.stub();
    fetchScores = sinon.stub(shineApi, 'fetchScores')
      .callsFake(() => Promise.resolve([]));
    wrapper = mount(
      <TotalHomeScore apiKey={apiKey} lat={lat} lon={lon} callback={callback} />
    );
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

  it('Calls callback function', async () => {
    const instance = wrapper.instance() as TotalHomeScore;
    await instance.componentDidMount();
    expect(callback.calledWith([])).to.be.true;
  });
});
