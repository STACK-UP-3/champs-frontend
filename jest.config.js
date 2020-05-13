module.exports = {
	clearMocks: true,
	collectCoverageFrom: ['src/**/*.{js,jsx,mjs}'],
	coverageDirectory: 'coverage',
	moduleFileExtensions: ['js', 'json', 'jsx'],
	setupFiles: ['<rootDir>/enzyme.config.js'],
	testEnvironment: 'jsdom',
	testMatch: ['**/__tests__/**/*test.js?(x)', '**/?(*.)+(spec|test).js?(x)'],
	testPathIgnorePatterns: ['\\\\node_modules\\\\'],
	testURL: 'http://localhost:8080',
	transformIgnorePatterns: ['<rootDir>/node_modules/'],
	verbose: true,
	coverageThreshold: {
		global: {
			branches: 90,
			functions: 90,
			lines: 90,
			statements: 90,
		},
	},
};
