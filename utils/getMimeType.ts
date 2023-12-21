import { BasedSchemaContentMediaType } from '@based/schema'

const imageDataRe = /^data:image\/(png|jpg|jpeg|gif);base64/
const extensionImageRe = /\.(png|jpg|jpeg|gif)$/

const videoDataRe = /^data:video\/(webm|mov|mp4|hls|dash|ts);base64/
const extensionVideoRe = /\.(webm|mov|mp4|hls|dash|ts)$/

export const getMimeType = (
  src: string
): BasedSchemaContentMediaType | 'directory' => {
  if (src.startsWith('data:')) {
    if (imageDataRe.test(src)) {
      return 'image/*'
    }

    if (videoDataRe.test(src)) {
      return 'video/*'
    }
  }

  if (extensionImageRe.test(src)) {
    return 'image/*'
  }

  if (extensionVideoRe.test(src)) {
    return 'video/*'
  }

  const ext = src.split('.')

  // @ts-ignore TMP here
  return '*/' + ext[ext.length - 1]
}
