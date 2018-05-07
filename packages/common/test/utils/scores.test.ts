import { expect } from 'chai';

import { scoreDescriptions } from '../../src/resources';
import * as scoreUtils from '../../src/utils/scores';

describe('Score utils tests', () => {
  const score = Object.keys(scoreDescriptions.quiet)[0];
  const tweakedScore = Number(score) - 1;

  it('Returns noramlized score value based on bucket keys', () => {
    const normalizedScore = scoreUtils
      .findIdByScore(tweakedScore, scoreDescriptions.quiet);
    expect(normalizedScore).to.equal(score);
  });

  it('Returns default or normalized value based on bucket keys', () => {
    const descriptions = { 1: scoreDescriptions.quiet[score] };
    const normalizedScore = scoreUtils
      .findOrDefaultByScore(tweakedScore, descriptions);
    expect(normalizedScore).to.equal(0);
  });

  it('Formats score type for display', () => {
    expect(scoreUtils.parseType('quiet')).to.equal('Quiet');
  });

  it('Formats score type for display with special case for safety', () => {
    expect(scoreUtils.parseType('safety')).to.equal('Road Safety');
  });
});
