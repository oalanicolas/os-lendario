export default {
  '*.{ts,tsx}': ['eslint --fix', 'prettier --write'],
  '*.{json,yaml,yml}': ['prettier --write'],
  '*.css': ['prettier --write'],
  '*.md': ['prettier --write'],
};
