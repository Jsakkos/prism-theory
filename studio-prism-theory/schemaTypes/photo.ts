export default {
    name: 'photo',
    title: 'Photo',
    type: 'document',
    fields: [
        {
            name: 'title',
            title: 'Title',
            type: 'string',
        },
        {
            name: 'image',
            title: 'Image',
            type: 'image',
            options: {
                hotspot: true,
            },
            validation: Rule => Rule.required()
        },
        {
            name: 'category',
            title: 'Category',
            type: 'string',
            options: {
                list: [
                    { title: 'Landscape', value: 'landscape' },
                    { title: 'Minimalist', value: 'minimalist' },
                ],
            },
        },
        {
            name: 'alt',
            title: 'Alt Text',
            type: 'string',
        },
        {
            name: 'dateTaken',
            title: 'Date Taken',
            type: 'date',
            options: {
                dateFormat: 'YYYY-MM-DD'
            }
        },
        {
            name: 'location',
            title: 'Location',
            type: 'string',
        },
        {
            name: 'description',
            title: 'Description',
            type: 'text'
        }
    ],
}