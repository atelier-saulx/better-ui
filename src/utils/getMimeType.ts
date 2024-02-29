import { BasedSchemaContentMediaType } from '@based/schema'

const imageDataRe = /^data:image\/(png|jpg|jpeg|gif|dds|svg);base64/
const extensionImageRe = /\.(png|jpg|jpeg|gif|dds|svg|webp)$/

const videoDataRe = /^data:video\/(webm|mov|mp4|hls|dash|ts);base64/
const extensionVideoRe = /\.(webm|mov|mp4|hls|dash|ts)$/

const imgNames = /(avatar)|(picture)|(logo)|(photo)/

export const getMimeType = (
  src: string,
): BasedSchemaContentMediaType | 'directory' => {
  src = src.replace(/\?.+$/, '')

  if (src.startsWith('data:')) {
    if (imageDataRe.test(src)) {
      return 'image/*'
    }

    if (videoDataRe.test(src)) {
      return 'video/*'
    }
  }

  if (extensionImageRe.test(src) || imgNames.test(src)) {
    return 'image/*'
  }

  if (extensionVideoRe.test(src)) {
    return 'video/*'
  }

  const ext = src.split('.')

  // @ts-ignore TMP here
  return '*/' + ext[ext.length - 1]
}
