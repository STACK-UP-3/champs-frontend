module.exports = {
	clearMocks: true,
	verbose: true,
	collectCoverage: true,
	testEnvironment: 'jsdom',
	moduleFileExtensions: ['js', 'json', 'jsx'],
	setupFiles: ['<rootDir>/enzyme.config.js'],
	testMatch: ['**/__tests__/**/*test.js?(x)', '**/?(*.)+(spec|test).js?(x)'],
	testPathIgnorePatterns: ['\\\\node_modules\\\\'],
	testURL: 'http://localhost:8080',
	transformIgnorePatterns: ['<rootDir>/node_modules/'],
	collectCoverageFrom: ['src/**/*.{js,jsx,mjs}'],
	coverageDirectory: 'coverage',
	coverageThreshold: {
		global: {
			branches: 10,
			functions: 10,
			lines: 10,
			statements: 10,
		},
	},
};
