import { client } from '@/sanity/client'
import PortfolioLayout from '@/components/PortfolioLayout'

async function getData() {
  const photos = await client.fetch(`*[_type == "photo"]{
    _id,
    title,
    category,
    image,
    alt
  }`)

  const settings = await client.fetch(`*[_type == "siteSettings"][0]{
    logo,
    title,
    description
  }`)

  return {
    photos,
    settings
  }
}

export default async function Home() {
  const { photos, settings } = await getData()

  return <PortfolioLayout photos={photos} settings={settings} />
}