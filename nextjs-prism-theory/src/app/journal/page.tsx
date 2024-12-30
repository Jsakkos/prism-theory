import { groq } from 'next-sanity'
import { client } from '@/sanity/client'
import PhotoJournal from '@/components/PhotoJournal'

const query = groq`{
  "photos": *[_type == "photo"] | order(dateTaken desc) {
    _id,
    title,
    image,
    dateTaken,
    location,
    description,
    alt
  },
  "settings": *[_type == "siteSettings"][0] {
    title,
    description,
    logo
  }
}`

export default async function JournalPage() {
    const data = await client.fetch(query)
    return <PhotoJournal photos={data.photos} settings={data.settings} />
}