import { DangerDSLType } from 'danger';
import { makePrHygiene } from './pr-hygiene';

declare var danger: DangerDSLType;
declare function message(message: string): void;
declare function warn(message: string): void;
declare function fail(message: string): void;

export const prHygiene = makePrHygiene({
  message,
  warn,
  fail,
  prTitle: danger.github.pr.title,
});
