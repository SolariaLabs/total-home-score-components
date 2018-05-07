import { expect } from 'chai';
import * as sinon from 'sinon';

import { type, factors, score, value, detailedScore } from '../constants';
import { scoreHints } from '../../src/resources';
import * as utils from '../../src/utils';

describe('Transform utils tests', () => {
  let getColor: sinon.SinonStub;
  let parseType: sinon.SinonStub;
  let getDescriptions: sinon.SinonStub;

  beforeEach(() => {
    getColor = sinon.stub(utils, 'getColor')
      .callsFake(value => value);
    parseType = sinon.stub(utils, 'parseType')
      .callsFake(value => value);
    getDescriptions = sinon.stub(utils, 'getDescriptions')
      .callsFake(value => value);
  });

  afterEach(() => {
    getColor.restore();
    parseType.restore();
    getDescriptions.restore();
  });

  it('Calls getColor and returns colorClass', () => {
    expect(utils.addColor(score)).to.deep.equal({ colorClass: value });
  });

  it('Calls parseType and returns score object', () => {
    expect(utils.addScoreName(type)())
      .to.deep.equal({ score: detailedScore.score });
  });

  it('Rounds the given score value', () => {
    const value = 12.210931;
    expect(utils.normalizeValues({ ...score, value }).value)
      .to.equal(Math.round(value));
  });

  it('Gets descriptions for a given score', () => {
    expect(utils.mapDescriptions()(detailedScore))
      .to.deep.equal({ descriptions: detailedScore });
  }); 

  it('Looks up hint for a given score', () => {
    expect(utils.addHint(type)()).to.deep.equal({ hint: scoreHints[type] });
  });

  it('Calls tranformation functions', () => {
    const transformed = utils.transformScore({ [type]: score })(type);
    expect(transformed).to.have.all.keys(detailedScore);
    expect(getColor.called).to.be.true;
    expect(parseType.called).to.be.true;
    expect(getDescriptions.called).to.be.true;
  });
});
