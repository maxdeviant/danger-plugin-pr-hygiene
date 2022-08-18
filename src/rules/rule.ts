import { Either } from 'fp-ts/Either';

export type Rule = (prTitle: string) => Either<string[], void>;
