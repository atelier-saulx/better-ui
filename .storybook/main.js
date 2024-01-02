const config = {
  stories: ['../dist/**/*.stories.js'],
  addons: [
    '@storybook/addon-controls',
    '@storybook/addon-viewport',
    '@storybook/addon-docs',
  ],
  docs: {
    autodocs: true,
  },
  framework: {
    name: '@storybook/react-webpack5',
    options: {
      builder: {
        useSWC: true, // This flag is automatically set by Storybook for all new Webpack5 projects (except Angular) in Storybook 7.6
      },
    },
    swc: (config) => {
      return {}
    },
  },
}

module.exports = config
