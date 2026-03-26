// Jest configuration for Save That Again backend unit tests
/** @type {import('jest').Config} */
module.exports = {
	preset: 'ts-jest',
	testEnvironment: 'node',
	roots: ['<rootDir>/__tests__'],
	moduleNameMapper: {
		'^@/(.*)$': '<rootDir>/$1',
	},
};
