import { findOrDefaultByScore } from './scores';
import { GenericObject } from '../types';

export const buckets: GenericObject<string> = {
  20: 'low', 
  40: 'below-average', 
  60: 'average', 
  80: 'above-average', 
  100: 'high'
};

export const getColor = (score: number): string =>
  `${buckets[findOrDefaultByScore(score, buckets)]}`;
