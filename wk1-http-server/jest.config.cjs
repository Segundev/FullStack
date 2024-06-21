module.exports = {
    testEnvironment: 'node',
    roots: ['<rootDir>/tests'],
    moduleFileExtensions: ['js'],
    testMatch: ['**/?(*.)+(spec|test).js', '**/?(*.)+(spec|test).mjs'],
    transform: {},
    transformIgnorePatterns: ['node_modules/'],
};