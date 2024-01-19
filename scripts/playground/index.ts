import { dirname, join, relative } from 'path'
import { fileURLToPath } from 'url'
import { writeFileSync } from 'fs'
import { hash } from '@saulx/hash'
import klaw from 'klaw'
import fs from 'fs-extra'

const __dirname = dirname(fileURLToPath(import.meta.url))
const SRC_DIR = join(__dirname, '../../src')
const TOP_DIR = join(__dirname, '../..')
const getStories = () => {
  let items: string[] = []
  klaw(SRC_DIR)
    .on('data', (item) => items.push(item.path))
    .on('end', async () => {
      const files = items.filter((f) => /\.stories\.[a-z]{1,4}$/.test(f))
      const m: any[] = []
      const fileIds: string[] = []

      const filesParsed = await Promise.all(
        files.map(async (f) => {
          const id = 'f' + hash(f)
          m.push({ path: f, id, file: (await fs.readFile(f)).toString() })
          fileIds.push(id)
          return `import * as ${id} from "../../${relative(TOP_DIR, f.replace(/\.tsx$/, '.js'))}"`
        }),
      )

      let file = filesParsed.join('\n')

      file += `\nexport const stories = [${fileIds.join(',')}]`

      file += `\nexport const parsedStories = [${m
        .map((v) => {
          return `{ id: "${v.id}", story: ${v.id}, path: "${v.path}", file: \`${v.file.replace(/\$\{/g, '\\$').replace(/`/g, '\\`')}\`}`
        })
        .join(',')}]`

      writeFileSync(join(__dirname, 'stories.ts'), file)
    })
}

console.log(getStories())
