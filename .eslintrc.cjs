module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  extends: [
    'standard-with-typescript',
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
  ],
  overrides: [
    {
      env: {
        node: true,
      },
      files: [
        '.eslintrc.{js,cjs}',
        '*.ts',
        '*.tsx',
      ],
      parserOptions: {
        sourceType: 'script',
      },
    },
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,

  },
  plugins: [
    'react',
  ],
  rules: {
    '@typescript-eslint/explicit-function-return-type': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/jsx-indent': ['warn', 2, {
      checkAttributes: true,
      indentLogicalExpressions: true,
    }],
    '@typescript-eslint/restrict-template-expressions': 'off',
    '@typescript-eslint/no-confusing-void-expression': 'off',
    '@typescript-eslint/triple-slash-reference': 'off',
    'react/self-closing-comp': 'warn',
    'react/jsx-indent-props': ['warn', 2],
    'react/jsx-tag-spacing': ['warn', {
      closingSlash: 'never',
      beforeSelfClosing: 'always',
      afterOpening: 'never',
      beforeClosing: 'never',
    }],
    '@typescript-eslint/strict-boolean-expressions': 'off',
    '@typescript-eslint/no-misused-promises': 'off',
    '@typescript-eslint/no-floating-promises': 'off',
    'react/jsx-curly-brace-presence': ['error'],
    '@typescript-eslint/prefer-nullish-coalescing': 'off',
    /** https://typescript-eslint.io/rules/comma-dangle */
    'comma-dangle': 'off',
    '@typescript-eslint/comma-dangle': ['error', {
      arrays: 'always-multiline',
      objects: 'always-multiline',
      imports: 'always-multiline',
      exports: 'always-multiline',
      functions: 'only-multiline',
      generics: 'ignore',
    }],
    /** https://typescript-eslint.io/rules/indent/ */
    indent: 'off',
    '@typescript-eslint/indent': ['error', 2, {
      SwitchCase: 1,
      VariableDeclarator: 1,
      outerIIFEBody: 1,
      MemberExpression: 1,
      FunctionDeclaration: { parameters: 1, body: 1 },
      FunctionExpression: { parameters: 1, body: 1 },
      CallExpression: { arguments: 1 },
      ArrayExpression: 1,
      ObjectExpression: 1,
      ImportDeclaration: 1,
      flatTernaryExpressions: false,
      ignoreComments: false,
      ignoredNodes: ['TemplateLiteral *', 'JSXElement', 'JSXElement > *', 'JSXAttribute', 'JSXIdentifier', 'JSXNamespacedName', 'JSXMemberExpression', 'JSXSpreadAttribute', 'JSXExpressionContainer', 'JSXOpeningElement', 'JSXClosingElement', 'JSXFragment', 'JSXOpeningFragment', 'JSXClosingFragment', 'JSXText', 'JSXEmptyExpression', 'JSXSpreadChild'],
      offsetTernaryExpressions: true,
    }],
    /** https://typescript-eslint.io/rules/type-annotation-spacing/ */
    '@typescript-eslint/type-annotation-spacing': ['error'],
    /** https://typescript-eslint.io/rules/member-delimiter-style */
    '@typescript-eslint/member-delimiter-style': ['error', {
      multiline: {
        delimiter: 'comma',
        requireLast: true,
      },
      singleline: {
        delimiter: 'comma',
        requireLast: false,
      },
      multilineDetection: 'brackets',
    }],
    /** https://typescript-eslint.io/rules/no-unused-vars */
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': 'warn',
    /** https://typescript-eslint.io/rules/space-before-function-paren */
    'space-before-function-paren': 'off',
    '@typescript-eslint/space-before-function-paren': ['error', 'always'],
    /** https://typescript-eslint.io/rules/space-infix-ops */
    'space-infix-ops': 'off',
    '@typescript-eslint/space-infix-ops': ['error'],
    /** https://typescript-eslint.io/rules/semi */
    semi: 'off',
    '@typescript-eslint/semi': ['error', 'never'],
    /** https://typescript-eslint.io/rules/no-use-before-define/ */
    'no-use-before-define': 'off',
    '@typescript-eslint/no-use-before-define': 'error',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'no-console': ['warn', { allow: ['warn', 'error'] }],
    /** 限定集中在一處管理 env，禁止在其他檔案直接取用 `process.env` */
    'no-process-env': ['error'],
    'react/prop-types': 'off',
    'react/jsx-closing-bracket-location': ['warn', 'tag-aligned'],
    'jsx-quotes': ['warn', 'prefer-double'],
    'react/jsx-curly-spacing': ['warn', { when: 'never', children: true }],
    'react/jsx-fragments': 'warn',
    'react/jsx-equals-spacing': [2, 'never'],
    'object-shorthand': 'warn',
    'react/jsx-one-expression-per-line': ['error', { allow: 'single-child' || 'literal' }],
    'react/jsx-props-no-multi-spaces': 'error',
  },
}
