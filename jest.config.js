module.exports = {
  clearMocks: true,
  verbose: true,
  collectCoverage: true,
  testEnvironment: "jsdom",
  moduleFileExtensions: ["js", "json", "jsx"],
  setupFiles: ["<rootDir>/enzyme.config.js"],
  testMatch: ["**/__tests__/**/*test.js?(x)", "**/?(*.)+(spec|test).js?(x)"],
  testPathIgnorePatterns: ["\\\\node_modules\\\\"],
  testURL: "http://localhost:8080",
  transformIgnorePatterns: [
    "[/\\\\]node_modules[/\\\\].+\\.(js|jsx|mjs)$",
    "^.+\\.module\\.(css|sass|scss)$"
  ],
  transform: {
    "^.+\\.(js|jsx)$": "babel-jest",
    "^.+\\.svg$": "<rootDir>/__tests__/__mocks__/svgMock.js"
  },
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "<rootDir>/__tests__/__mocks__/styleMock.js"
  },
  collectCoverageFrom: ["src/**/*.{js,jsx,mjs}"],
  coverageDirectory: "coverage",
  coverageThreshold: {
    global: {
      branches: 90,
      functions: 90,
      lines: 90,
      statements: 90
    }
  }
};
