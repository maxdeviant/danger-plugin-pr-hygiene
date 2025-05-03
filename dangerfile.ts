import { prHygiene } from "./";

prHygiene({
  rules: {
    noConventionalCommits: {
      level: "warn",
    },
  },
});
