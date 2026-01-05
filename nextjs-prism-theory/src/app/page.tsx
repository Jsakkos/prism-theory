import PortfolioLayout from '@/components/PortfolioLayout'
import { photos } from '@/data/photos'
import { siteSettings } from '@/data/settings'

export default function Home() {
  return <PortfolioLayout photos={photos} settings={siteSettings} />
}