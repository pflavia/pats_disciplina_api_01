module.exports = {
  //  preset: 'ts-jest',
  testEnvironment: 'node',
  //  testPathIgnorePatterns: ['<rootDir>/dist/', '<rootDir>/node_modules/'],
  reporters: [
    "default",
    ["jest-stare",
      {
        resultDir: "results/jest-stare",
        reportTitle: "jest-stare!",
        additionalResultsProcessors: ["jest-junit"],
        coverageLink: "../../coverage/lcov-report/index.html",
        jestStareConfigJson: "jest-stare.json",
        jestGlobalConfigJson: "globalStuff.json"
      }]]
};