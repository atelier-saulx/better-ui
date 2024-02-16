import { FormProps } from '../../index.js'
import { BasedSchema, display } from '@based/schema'
import humanizeString from 'humanize-string'
import { getImg } from '../Form/Reference.js'
import { readInfoField } from '../Form/utils.js'

export const getData = (
  v: any,
  fields?: FormProps['fields'],
  schema?: BasedSchema,
): any => {
  if (!fields) {
    return v
  }

  const newObj: any = {
    title: readInfoField(v, { type: 'object', properties: fields }),
  }

  for (const fi in fields) {
    const f = fields[fi]

    if (f.type === 'string' && f.format === 'basedId') {
      newObj.id = v[fi]
    } else if (f.type === 'string' && f.contentMediaType) {
      newObj.src = v[fi]
      newObj.mimeType = v.mimeType ?? f.contentMediaType
      if (newObj.mimeType === '*/*') {
        delete newObj.mimeType
      }
    } else if (f.type === 'string') {
      if (fi === 'description') {
        newObj.description = v[fi]
      }
    } else if (f.type === 'timestamp') {
      newObj.date = display(
        v[fi],
        f.display ? f : { type: 'timestamp', display: 'human' },
      )
    } else if (f.type === 'number') {
      newObj.result = {
        name: f.title ?? humanizeString(fi),
        value: display(
          v[fi],
          f.display ? f : { type: 'number', display: 'short' },
        ),
      }
    } else if (f.type === 'reference') {
      const img = v[fi] && getImg(v[fi], schema, f)
      if (img) {
        newObj.src = img
        newObj.mimeType = v.mimeType
      } else {
        newObj.src = ''
        newObj.mimeType = v.mimeType
      }
    }
  }

  if (v.src && !newObj.src) {
    newObj.src = v.src
    newObj.mimeType = v.mimeType
  }

  // for image need to do sizing from cf
  return newObj
}
