import { scoreHints } from '../src/resources';

export const id = 'quiet';
export const type = 'quiet';
export const value = 39;
export const factorId = 'air_traffic';
export const factorId2 = 'bar';
export const factors = {
  [factorId]: 'Major',
  [factorId2]: 'Minor'
};
export const score = {
  value,
  factors
};
export const scoreDescription = {
  display: 'custom display',
  description: 'custom'
};
export const detailedScore = {
  ...score,
  hint: scoreHints[type],
  colorClass: '',
  descriptions: {
    factors: [],
    score: scoreDescription
  },
  score: {
    id,
    name: id
  },
};
