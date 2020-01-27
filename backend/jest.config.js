module.exports = {
    globals: {
        "ts-jest": {
            tsConfig: "tsconfig.json"
        }
    },
    moduleFileExtensions: ["ts", "js", "json"],
    transform: {
        "^.+\\.(ts|tsx)$": "ts-jest"
    },
    testRegex: ["(/__tests__/.*|(\\.|/)\\.(test|integration))\\.(tsx?)$"],
    testEnvironment: "node",
    moduleDirectories: ["node_modules", "src"]
};
