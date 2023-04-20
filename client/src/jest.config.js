module.exports = {
    transform: {
      "^.+\\.[tj]sx?$": "babel-jest"
    },
    moduleFileExtensions: ["js", "jsx", "ts", "tsx"],
    testEnvironment: "node",
    transformIgnorePatterns: ["/node_modules/(?!(module-to-transpile)/)"],
  };