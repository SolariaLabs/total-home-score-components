import { expect } from 'chai';
import * as sinon from 'sinon';

import { factorId, factorId2, id, factors, value, detailedScore } from '../constants';
import { factorDescriptionsByScore, scoreDescriptions } from '../../src/resources';
import * as scores from '../../src/utils/scores';
import * as descriptionUtils from '../../src/utils/descriptions';

describe('Description utils tests', () => {
  const customScore = {
    score: {},
    factors: {
      [factorId]: 'custom'
    }
  };
  let findIdByScore: sinon.SinonStub;
  let findOrDefaultByScore: sinon.SinonStub;

  beforeEach(() => {
    findIdByScore = sinon.stub(scores, 'findIdByScore')
      .callsFake((score, unused) => score);
    findOrDefaultByScore = sinon.stub(scores, 'findOrDefaultByScore')
      .callsFake((score, unused) => score);
  });

  afterEach(() => {
    findIdByScore.restore();
    findOrDefaultByScore.restore();
  });

  it('Retrieves default factor description if no custom descriptions', () => {
    expect(descriptionUtils.getFactorDescriptions(id, factors))
      .to.deep.equal([
        factorDescriptionsByScore[id][factorId],
        factorDescriptionsByScore[id][factorId2]
      ]);
  });

  it('Retrieves custom factor description if given custom descriptions', () => {
    expect(descriptionUtils.getFactorDescriptions(id, factors, customScore))
      .to.deep.equal([
        customScore.factors[factorId], 
        factorDescriptionsByScore[id][factorId2]
      ]);
  });

  it('Retrieves score description if no custom descriptions', () => {
    expect(descriptionUtils.getScoreDescriptions(id, value))
      .to.equal(scoreDescriptions[id][value]);
  });

  it('Retrieves custom score description if given custom descriptions', () => {
    const custom = {
      ...customScore,
      score: {
        [value]: {
          display: 'custom',
          description: 'custom'
        }
      }
    };
    expect(descriptionUtils.getScoreDescriptions(id, value, custom))
      .to.equal(custom.score[value]);
  });

  it('Retrieves descriptions', () => {
    const descriptions = descriptionUtils.getDescriptions(detailedScore);
    expect(descriptions).to.deep.equal({
      factors: [
        factorDescriptionsByScore[id][factorId],
        factorDescriptionsByScore[id][factorId2]
      ],
      score: scoreDescriptions[id][value]
    });
  });

  it('Retrieves descriptons with customizations', () => {
    const customizations = {
      descriptions: {
        [id]: customScore
      }
    };
    const descriptions = descriptionUtils.getDescriptions(detailedScore, customizations);
    expect(descriptions).to.deep.equal({
      factors: [
        customScore.factors[factorId],
        factorDescriptionsByScore[id][factorId2]
      ],
      score: scoreDescriptions[id][value]
    });
  });

});
