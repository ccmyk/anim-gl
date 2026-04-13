import globals from 'globals';

export default [
  {
    ignores: ['node_modules/**', 'dist/**', 'scripts/**', 'public/uploads/**', '**/*.d.ts'],
  },
  {
    files: ['src/**/*.{js,jsx,ts,tsx}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.node,
        gsap: 'readonly',
        clamp: 'readonly',
        lerp: 'readonly',
        Scroll: 'readonly',
      },
    },
    rules: {
      'no-undef': 'off',
      'no-unused-vars': 'off',
      'no-empty': 'off',
      'no-self-assign': 'off',
      'no-constant-condition': 'off',
    },
  },
];