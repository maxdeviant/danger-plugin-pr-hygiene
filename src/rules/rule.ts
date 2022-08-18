import { Either } from 'fp-ts/Either';

export type Rule = (prTitle: string) => Either<Violation[], void>;

export interface Violation {
  span: [number, number];
}
