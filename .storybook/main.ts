import type { StorybookConfig } from '@storybook/react-webpack5'

const config: StorybookConfig = {
  stories: ['../**/*.stories.tsx'],
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
    options: {},
  },
  webpackFinal: (config) => {
    return {
      ...config,
      resolve: {
        ...config.resolve,
        // modules: [path.resolve("./src"), ...config.resolve.modules],
        fallback: {
          timers: false,
          tty: false,
          os: false,
          fs: false,
          stream: false,
          path: false,
          http: false,
          https: false,
          zlib: false,
          util: false,
          // ...config.resolve.fallback,
        },
      },
    }
  },
}

export default config
