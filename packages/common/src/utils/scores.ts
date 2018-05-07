export enum SupportScores {
  quiet = 'quiet',
  safety = 'safety',
  errand = 'errand',
  traffic = 'traffic',
  entertainment = 'entertainment'
}

export const findIdByScore = (score: number, descriptions: object) =>
  Object.keys(descriptions)
    .sort((a: string, b: string) => Number(a) - Number(b))
    .find((value: string) => score <= Number(value));

export const findOrDefaultByScore = (score: number, descriptions: object) =>
  findIdByScore(score, descriptions) 
  || Math.floor(Object.keys(descriptions).length / 2);

export const parseType = (type: string): string =>
  (type === 'safety') 
    ? 'Road Safety'
    : `${type.charAt(0).toLocaleUpperCase()}${type.slice(1)}`;
