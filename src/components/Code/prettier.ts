import type { Config } from 'prettier'
import load from 'simple-load-script'

type Load = (url: string, confg: any) => Promise<any>
const loadScript: Load = <any>load

let prettierLoaded: any

const PLUGINS: string[] = ['typescript', 'estree', 'babel']

export const formatCode = async (
  code: string,
  config: Config | boolean,
  language: string,
  setError: (str: string) => void,
): Promise<string> => {
  if (!prettierLoaded) {
    prettierLoaded = await loadScript('https://unpkg.com/prettier@3.2.4', {
      inBody: true,
    })

    await Promise.all(
      PLUGINS.map((plugin) => {
        return loadScript(
          `https://unpkg.com/prettier@3.2.4/plugins/${plugin}.js`,
          {
            inBody: true,
          },
        )
      }),
    )
  }

  if (typeof config === 'boolean') {
    config = {
      parser: !PLUGINS.includes(language) ? 'typescript' : language,
      plugins: global.prettierPlugins,
      singleQuote: true,
      semi: false,
    }
  }

  try {
    const v = await global.prettier.format(code, config)
    setError('')
    return v
  } catch (err) {
    setError(err.message)
    return code
  }
}
