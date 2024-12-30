// sanity-types.ts
export interface SanityPhoto {
    _id: string;
    _createdAt: string;
    title: string;
    category: 'landscape' | 'minimalist';
    image: {
        asset: {
            _ref: string;
            _type: 'reference';
        };
    };
    description?: string;
}