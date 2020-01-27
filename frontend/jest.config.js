module.exports = {
    globals: {
        "ts-jest": {
            tsConfig: "tsconfig.json"
        }
    },
    moduleFileExtensions: [
        "ts",
        "tsx",
        "js",
        "json",
    ],
    transform: {
        "^.+\\.(ts|tsx)$": "ts-jest"
    },
    testRegex: [
        "(/__tests__/.*|(\\.|/)\\.(test|integration))\\.(tsx?)$"
    ],
    testEnvironment: "jsdom",
    moduleDirectories: [
        "node_modules",
        "src"
    ],
};
