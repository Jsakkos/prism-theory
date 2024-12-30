// types.ts
interface Photo {
    id: number;
    category: 'landscape' | 'minimalist';
    src: string;
    alt: string;
    description?: string;
}