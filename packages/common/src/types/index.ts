export type GenericObject<V> = {
  [key: string]: V,
  [num: number]: V
};

export type Score = {
  value: number;
  factors: Factors;
};

export type Factors = {
  [factor: string]: string;
};

export type DetailedScore = Score & {
  colorClass: string;
  hint: string,
  score: {
    id: string,
    name: string
  };
  descriptions: Descriptions
};

export type Scores = GenericObject<Score>;

export type ApiParameters = {
  apiKey: string;
  lat: number;
  lon: number;
};

export type ApiResponse = {
  totalHomeScores: Scores;
};

export type DefaultFactorDescriptions = {
  [score: string]: GenericObject<string>;
};

export type DefaultStoreDescriptions = {
  [score: string]: GenericObject<ScoreDescriptions>;
};

export type CustomDescriptions = {
  factors: GenericObject<string>;
  score: GenericObject<ScoreDescriptions>;
};

export type Descriptions = {
  factors: string[];
  score: ScoreDescriptions;
};

export type ScoreDescriptions = {
  display: string;
  description: string; 
};

export type Customizations = {
  colors?: GenericObject<string>;
  descriptions?: GenericObject<CustomDescriptions>;
};
