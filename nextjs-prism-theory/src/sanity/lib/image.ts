import imageUrlBuilder from '@sanity/image-url'
import { client } from '../client'
import { SanityImageSource } from '@sanity/image-url/lib/types/types'

const builder = imageUrlBuilder(client)

export const urlForImage = (source: SanityImageSource) => {
    return builder.image(source).auto('format')
}