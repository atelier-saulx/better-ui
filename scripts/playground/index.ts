import { dirname, join, relative } from 'path'
import { fileURLToPath } from 'url'
import { writeFileSync } from 'fs'
import { hash } from '@saulx/hash'
import klaw from 'klaw'

const __dirname = dirname(fileURLToPath(import.meta.url))
const SRC_DIR = join(__dirname, '../../src')
const TOP_DIR = join(__dirname, '../..')
const getStories = () => {
  let items: string[] = []
  klaw(SRC_DIR)
    .on('data', (item) => items.push(item.path))
    .on('end', () => {
      const files = items.filter((f) => /\.stories\.[a-z]{1,4}$/.test(f))
      const m: any = {}
      const fileIds: string[] = []
      let file = files
        .map((f) => {
          const id = 'f' + hash(f)
          m[id] = f
          fileIds.push(id)
          return `import * as ${id} from "../../${relative(TOP_DIR, f.replace(/\.tsx$/, '.js'))}"`
        })
        .join('\n')

      file += `\nexport const stories = [${fileIds.join(',')}]`

      writeFileSync(join(__dirname, 'stories.ts'), file)
    })
}

console.log(getStories())
