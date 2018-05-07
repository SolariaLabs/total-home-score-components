import * as React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';

import { detailedScore } from '../constants';
import { ScoreCard } from '../../src/components/ScoreCard';

describe('ScoreCard Component', () => {
  it('Renders properly', () => {
    const wrapper = shallow(<ScoreCard {...detailedScore} />);
    expect(wrapper).to.have.className('score-widget-body');
    expect(wrapper.children().first())
      .to.have.className('score-title');
    expect(wrapper.find('.score-circle').exists()).to.be.true;
    expect(wrapper.find('.score-level-title').exists()).to.be.true;
    expect(wrapper.find('.score-factors-title').exists()).to.be.true;
    expect(wrapper.find('.score-factor-list').exists()).to.be.true;
  });
});
