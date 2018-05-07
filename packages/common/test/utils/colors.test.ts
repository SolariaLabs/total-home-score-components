import { expect } from 'chai';
import * as sinon from 'sinon';

import * as scores from '../../src/utils/scores';
import * as colors from '../../src/utils/colors';

describe('Color utils tests', () => {
  let findOrDefaultByScore: sinon.SinonStub;

  beforeEach(() => {
    findOrDefaultByScore = sinon.stub(scores, 'findOrDefaultByScore')
      .callsFake((score, buckets) => score);
  });

  afterEach(() => {
    findOrDefaultByScore.restore();
  });

  it('Builds the color class based on score buckets', () => {
    Object.keys(colors.buckets)
      .forEach(color => 
        expect(colors.getColor(Number(color)))
          .to.equal(`score-${colors.buckets[Number(color)]}`)
      );
  });

});
