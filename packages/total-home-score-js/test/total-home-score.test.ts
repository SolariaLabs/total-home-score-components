import { expect } from 'chai';
import * as sinon from 'sinon';
import * as common from '@shine-api/common';

import * as scoreCards from '../src/score-cards';
import { detailedScore, apiKey, lat, lon } from './constants';

describe('Total Home Score JS Widget', () => {
  let loadTHSWidget: Function;
  let fetchScores: sinon.SinonStub;
  let loadScoreCards: sinon.SinonStub;

  before(async () => {
    fetchScores = sinon.stub(common, 'fetchScores')
      .callsFake(() => Promise.resolve([detailedScore]));
    loadScoreCards = sinon.stub(scoreCards, 'loadScoreCards');
    ({ loadTHSWidget } = await import('../src/total-home-score'));
  });

  after(() => {
    fetchScores.restore();
    loadScoreCards.restore();
  });

  it('Does not fetch score on load if missing params', () => {
    expect(fetchScores.called).to.be.false;
    expect(loadScoreCards.called).to.be.false;
  });

  it('Fetches scores if given required params', async () =>
    loadTHSWidget({ apiKey, lat, lon, id: '' })
      .then(() => {
        expect(fetchScores.called).to.be.true;
        expect(loadScoreCards.called).to.be.true;
      })
  );
});
