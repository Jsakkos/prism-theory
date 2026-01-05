import PhotoJournal from '@/components/PhotoJournal'
import { photos } from '@/data/photos'
import { siteSettings } from '@/data/settings'

export default function JournalPage() {
    // Sort photos by dateTaken in descending order
    const sortedPhotos = [...photos].sort((a, b) =>
        new Date(b.dateTaken).getTime() - new Date(a.dateTaken).getTime()
    );

    return <PhotoJournal photos={sortedPhotos} settings={siteSettings} />
}