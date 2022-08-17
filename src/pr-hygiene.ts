import { DangerDSLType } from 'danger';
import { useImperativeMood } from './rules';

declare var danger: DangerDSLType;
declare function warn(message: string): void;

export interface PrHygieneOptions {}

export const prHygiene = ({}: PrHygieneOptions) => {
  useImperativeMood({ warn })(danger.github.pr.title);
};
