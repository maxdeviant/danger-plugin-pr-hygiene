export interface RuleContext {
  emit: () => void;
}

export type Rule = (ctx: RuleContext) => (prTitle: string) => void;
