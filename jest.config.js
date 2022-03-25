module.exports = {
  preset: "ts-jest/presets/js-with-babel",
  setupFiles: ["<rootDir>/src/setupTests.ts"],
  collectCoverageFrom: ["<rootDir>/src/**/*.{ts,tsx}"],
  transformIgnorePatterns: ["/node_modules/(?!@nuvolo/nuux).+(js|jsx)$"],
  moduleNameMapper: {
    "^@components/(.*)": "<rootDir>/src/components/$1",
    "^@hooks/(.*)": "<rootDir>/src/hooks/$1",
    "^@routes/(.*)": "<rootDir>/src/routes/$1",
    "^@utils/(.*)": "<rootDir>/src/utils/$1",
    "^@views/(.*)": "<rootDir>/src/views/$1",
    "^src/(.*)": "<rootDir>/src/$1",
  },
};
