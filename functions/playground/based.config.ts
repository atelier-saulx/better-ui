import { BasedFunctionConfig } from '@based/functions'

        const config: BasedFunctionConfig = {
          type: 'app',
          name: 'playground-app',
          public: true,
          main: './app.tsx',
          path: '/playground',
        }

        export default config