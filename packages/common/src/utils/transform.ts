import { Scores, Customizations, Score, DetailedScore } from '../types';
import { getColor, getDescriptions, parseType } from '../utils';
import { scoreHints } from '../resources';

export const addColor = ({ value }: Score) => ({
  colorClass: getColor(value)
});

export const addScoreName = (type: string) => () => ({
  score: {
    id: type,
    name: parseType(type)
  }
});

export const normalizeValues = (score: Score) => ({
  value: Math.round(score.value)
});

export const mapDescriptions = (customizations?: Customizations) =>
  (score: DetailedScore) => ({
    descriptions: getDescriptions(score, customizations)
  });

export const addHint = (type: string) => () => ({
  hint: scoreHints[type]
});

export const transformers = (type: string, custom?: Customizations) =>
  [
    addColor,
    addHint(type),
    addScoreName(type),
    normalizeValues,
    mapDescriptions(custom)
  ];

export const transformScore = (scores: Scores, custom?: Customizations) =>
  (type: string): DetailedScore =>
    transformers(type, custom)
      .reduce(
        (transformedScore: DetailedScore, transform: Function) =>
          ({ ...transformedScore, ...transform(transformedScore) }), 
        scores[type]
      );
