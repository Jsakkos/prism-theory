export interface Photo {
  id: string;
  filename: string;
  title: string;
  category: 'landscape' | 'minimalist';
  alt: string;
  dateTaken: string;
  location: string;
  description?: string;
  width: number;
  height: number;
}

export const photos: Photo[] = [
  {
    id: '1',
    filename: 'photo-01.JPG',
    title: '425 Market',
    category: 'minimalist',
    alt: 'Building with streaking clouds in the background, black and white',
    dateTaken: '2026-01-03',
    location: 'San Francisco, CA',
    width: 2048,
    height: 1371
  },
  {
    id: '2',
    filename: 'photo-02.JPG',
    title: 'Transamerica Pyramid',
    category: 'minimalist',
    alt: 'Transamerica Pyramid',
    dateTaken: '2024-12-01',
    location: 'San Francisco, CA',
    width: 4941,
    height: 3953
  },
  {
    id: '3',
    filename: 'photo-03.jpg',
    title: 'Crane',
    category: 'minimalist',
    alt: 'crane',
    dateTaken: '2014-11-22',
    location: 'Minneapolis, MN',
    width: 2432,
    height: 2431
  },
  {
    id: '4',
    filename: 'photo-04.jpg',
    title: 'UMN',
    category: 'minimalist',
    alt: 'building',
    dateTaken: '2013-06-01',
    location: 'Minneapolis, MN',
    width: 4223,
    height: 2784
  },
  {
    id: '5',
    filename: 'photo-05.jpg',
    title: 'Under the 35W Bridge',
    category: 'minimalist',
    alt: 'underpass',
    dateTaken: '2013-05-23',
    location: 'Minneapolis, MN',
    width: 2587,
    height: 4104
  },
  {
    id: '6',
    filename: 'photo-06.jpg',
    title: 'Abiqua Falls',
    category: 'landscape',
    alt: 'waterfall',
    dateTaken: '2012-03-04',
    location: 'Oregon',
    width: 4288,
    height: 2848
  },
  {
    id: '7',
    filename: 'photo-07.jpg',
    title: 'Burning Inside',
    category: 'minimalist',
    alt: 'flower',
    dateTaken: '2011-09-10',
    location: 'Portland, OR',
    width: 4288,
    height: 2848
  },
  {
    id: '8',
    filename: 'photo-08.jpg',
    title: 'Silk',
    category: 'landscape',
    alt: 'creek',
    dateTaken: '2011-04-03',
    location: 'Columbia River Gorge, OR',
    width: 4288,
    height: 2848
  },
  {
    id: '9',
    filename: 'photo-09.jpg',
    title: 'Solitude',
    category: 'minimalist',
    alt: 'person with a blanket',
    dateTaken: '2010-05-29',
    location: 'Joshua Tree National Park, CA',
    width: 5251,
    height: 5110
  }
];
