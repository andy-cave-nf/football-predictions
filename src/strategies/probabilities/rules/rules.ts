import type { Prediction } from '../types';

export class PredictionRuleError extends Error {
  constructor(
    public message: string,
    public options?: ErrorOptions
  ) {
    super(message, options);
    this.name = 'PredictionRuleError';
  }
}

export type PredictionRule = (predictions: Prediction) => void;

export const sumToOne: PredictionRule = (prediction: Prediction) => {
  const values = Object.values(prediction);
  const total = values.reduce((acc, cur) => acc + cur, 0);
  if (Math.abs(total - 1) >= 0.0005) {
    throw new PredictionRuleError('Predictions must sum to one');
  }
};

export const notNegative: PredictionRule = (prediction: Prediction) => {
  const values = Object.values(prediction);
  values.forEach((value) => {
    if (value < 0) {
      throw new PredictionRuleError('Predictions must be greater than 0');
    }
  });
};

export const DEFAULT_PREDICTION_RULES = [sumToOne, notNegative];
