import { expect } from 'chai';
import * as sinon from 'sinon';

import { buildUrl, fetchScores } from '../../src/api';
import { TOTAL_HOME_SCORE_API } from '../../src/constants';
import * as utils from '../../src/utils';

describe('Common API tests', () => {
  const mockInput = {
    apiKey: 'mockKey',
    lat: 40,
    lon: 70
  };
  const mockResponse = {
    json: () =>
      Promise.resolve({
        totalHomeScores: {
          safety: {
            value: 0,
            factors: {}
          },
          quiet: {
            value: 1,
            factors: {
              air_traffic: 'Major'
            }
          }
        }
      })
  };
  let transformScore: sinon.SinonStub;

  beforeEach(() => {
    transformScore = sinon.stub(utils, 'transformScore')
      .callsFake(() => (key: string) => key);
    (global as any)['fetch'] = () => Promise.resolve(mockResponse);
  });

  afterEach(() => {
    transformScore.restore();
  });

  it('Constructs proper URL', () => {
    const url = buildUrl(mockInput);
    const expectedUrl = TOTAL_HOME_SCORE_API +
    `?apikey=${mockInput.apiKey}&lat=${mockInput.lat}&lon=${mockInput.lon}`;
    expect(url).to.equal(expectedUrl);
  });

  it('Calls THS Api', async () => {
    const stubbedScores = await fetchScores(mockInput);
    expect(transformScore.called).to.be.true;
    expect(stubbedScores[0]).to.equal('quiet', 'safety');
  });
});
