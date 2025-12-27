import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  stories: ['../components/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@storybook/addon-a11y',
  ],
  framework: '@storybook/react-vite',
  docs: {
    autodocs: 'tag',
  },
};
export default config;