export default {
  extends: ["@commitlint/config-conventional"],
  ignores: [
    // Allow release commits to have longer lines
    (commit) => commit.includes("chore(release):"),
  ],
};
