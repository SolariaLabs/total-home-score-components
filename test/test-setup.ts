import * as Enzyme from 'enzyme';
import * as chai from 'chai';
import * as Adapter from 'enzyme-adapter-react-16';
import * as chaiEnzyme from 'chai-enzyme';
import { JSDOM } from 'jsdom';

const { window } = new JSDOM('<!DOCTYPE html><html><head></head><body></body></html>');

Enzyme.configure({ adapter: new Adapter() });

chai.use(chaiEnzyme());

(global as any)['window'] = window;
(global as any)['document'] = window.document;
