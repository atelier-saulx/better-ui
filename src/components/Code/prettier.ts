import type { Config } from 'prettier'
import load from 'load-script'

let prettier: any

export const formatCode = async (
  code: string,
  config: Config
): Promise<string> => {
  if (!prettier) {
    // @ts-ignore
    prettier = await load('https://unpkg.com/prettier@3.2.4/standalone.js')
  }
  return prettier.format(code, config)
}
