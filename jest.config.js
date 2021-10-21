module.exports = {
  preset: 'ts-jest/presets/js-with-ts',
  testEnvironment: 'jsdom',
  setupFiles: ['jest-canvas-mock'],
  verbose: true,
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.ts', '!src/**/index.ts', '!src/app/game-config.ts'],
  coverageReporters: ['text', 'html'],
  moduleNameMapper: {
    '\\.(jpg|ico|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/test/mocks/file-mock.js',
    '\\.(css|less|scss|sass)$': '<rootDir>/test/mocks/style-mock.js'
  }
};
