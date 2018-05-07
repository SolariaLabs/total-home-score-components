import { factorDescriptionsByScore, scoreDescriptions } from '../resources';
import { findIdByScore, findOrDefaultByScore } from '.';
import {
  CustomDescriptions,
  Customizations,
  Descriptions,
  DetailedScore,
  Factors,
  ScoreDescriptions, 
} from '../types';

export const getFactorDescriptions =
  (id: string, factors: Factors, custom?: CustomDescriptions): string[] =>
    Object.keys(factors)
    .map((factor: string) => 
      (custom && custom.factors && custom.factors[factor])
        ? custom.factors[factor]
        : factorDescriptionsByScore[id][factor]
    );

export const getScoreDescriptions = 
  (id: string, value: number, custom?: CustomDescriptions): ScoreDescriptions => {
    const customDescriptions = custom ? custom.score : {}; 
    const customDescId = findIdByScore(value, customDescriptions);
    const defaultDescId = findOrDefaultByScore(value, scoreDescriptions[id]);
    return ((customDescId) 
      ? (customDescriptions[customDescId])
      : scoreDescriptions[id][defaultDescId]);
  };

export const getDescriptions = 
  (details: DetailedScore, customizations?: Customizations): Descriptions => {
    const { factors, score: { id }, value } = details;
    const customDescriptions = customizations 
      && customizations.descriptions 
      && customizations.descriptions[id];
    return {
      factors: getFactorDescriptions(id, factors, customDescriptions),
      score: getScoreDescriptions(id, value, customDescriptions)
    };
  };
