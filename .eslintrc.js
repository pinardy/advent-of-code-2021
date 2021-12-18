module.exports = {
  root: true,
  "env": {
    "es6": true,
    "node": true,
    "mocha": true,
  },
  "parserOptions": {
    "ecmaVersion": 8
  },
  extends: [
    'eslint:recommended'
  ],
  "overrides": [
    {
      parser: '@typescript-eslint/parser',
      plugins: [
        '@typescript-eslint',
      ],
      "files": ["**/*.ts"],
      // "excludedFiles": "**/*.js",
      parserOptions: {
        tsconfigRootDir: __dirname,
        project: ['./tsconfig.lint.json'],
      },
      extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking'
      ]
    }
  ]
};
