module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      [
        "module-resolver",
        {
          root: ["./src"],
          alias: {
            "@": "./src",
            "@components": "./src/components",
            "@assets": "./src/assets",
            "@hooks": "./src/hooks",
            "@context": "./src/context",
            "@constants": "./src/constants",
          },
        },
      ],
    ],
  };
};
