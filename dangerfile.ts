import { prHygiene } from "./";

console.log("Checking PR hygiene");
prHygiene({
  rules: {
    noConventionalCommits: {
      level: "warn",
    },
  },
});
