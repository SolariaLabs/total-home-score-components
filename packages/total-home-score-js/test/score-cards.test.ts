import { expect } from 'chai';
import * as sinon from 'sinon';
import * as common from '@shine-api/common';

import * as scoreCards from '../src/score-cards';
import * as domHelper from '../src/dom-helper';
import { detailedScore, apiKey, lat, lon } from './constants';

describe('Score Card', () => {
  let buildElement: sinon.SinonStub;
  let div: sinon.SinonStub;
  let span: sinon.SinonStub;
  let ul: sinon.SinonStub;

  before(async () => {
    buildElement = sinon.stub(domHelper, 'buildElement')
      .callsFake(() => document.createElement('div'));
    div = sinon.stub(domHelper, 'div')
      .callsFake(() => document.createElement('div'));
    span = sinon.stub(domHelper, 'span')
      .callsFake(() => document.createElement('div'));
    ul = sinon.stub(domHelper, 'ul')
      .callsFake(() => document.createElement('div'));
  });

  after(() => {
    buildElement.restore();
    div.restore();
    span.restore();
    ul.restore();
  });

  it('Returns message and does not create nodes if parent does not exist', () => {
    scoreCards.loadScoreCards('fakeId', [detailedScore]);
    expect(buildElement.called).to.be.false;
  });

  it('Builds HTML elements if parent exists', () => {
    const parentId = 'parent';
    const parent = document.createElement('div');
    parent.setAttribute('id', parentId);
    document.body.appendChild(parent);
    scoreCards.loadScoreCards(parentId, [detailedScore]);
    expect(buildElement.called).to.be.true;
    expect(div.called).to.be.true;
    expect(span.called).to.be.true;
    expect(ul.called).to.be.true;
  });
});
