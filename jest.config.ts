import type { Config } from "jest";

const config: Config = {
  preset: "ts-jest",
  testEnvironment: "node",
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
  moduleFileExtensions: ["ts", "tsx", "js"],
  testMatch: ["<rootDir>/src/__test__/**/*.test.ts"],
  moduleNameMapper: {
    "\\.(css|scss|sass)$": "<rootDir>/jest/cssMock.js",
    "^next/font/(.*)$": "<rootDir>/jest/cssMock.js"
  },
};

export default config;