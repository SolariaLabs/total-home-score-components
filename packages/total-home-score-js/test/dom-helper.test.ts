import { expect } from 'chai';

import * as domHelper from '../src/dom-helper';

describe('Dom Helpers', () => {
  const id = 'id';
  const child = document.createElement('div');

  it('Builds a div element with no children', () => {
    const element = domHelper.buildElement('div', { id });
    expect(element.id).to.equal(id);
    expect(element.nodeName).to.equal('DIV');
    expect(element.children).to.have.lengthOf(0);
  });

  it('Builds a div element with 1 child', () => {
    const element = domHelper.buildElement('div', { id }, [child]);
    expect(element.id).to.equal(id);
    expect(element.nodeName).to.equal('DIV');
    expect(element.children).to.have.lengthOf(1);
  });

  it('Builds a ul element with 1 child', () => {
    const element = domHelper.ul({ id }, ['child']);
    expect(element.id).to.equal(id);
    expect(element.nodeName).to.equal('UL');
    expect(element.children).to.have.lengthOf(1);
  });

  it('Builds a div element via helper', () => {
    const element = domHelper.div({ id });
    expect(element.id).to.equal(id);
    expect(element.nodeName).to.equal('DIV');
    expect(element.children).to.have.lengthOf(0);
  });

  it('Builds a div element via helper with child', () => {
    const element = domHelper.div({ id }, child);
    expect(element.id).to.equal(id);
    expect(element.nodeName).to.equal('DIV');
    expect(element.children).to.have.lengthOf(1);
  });

  it('Builds a span element with child', () => {
    const element = domHelper.span({ id }, child);
    expect(element.id).to.equal(id);
    expect(element.nodeName).to.equal('SPAN');
    expect(element.children).to.have.lengthOf(1);
  });
});
