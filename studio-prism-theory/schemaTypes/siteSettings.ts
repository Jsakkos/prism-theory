export default {
    name: 'siteSettings',
    title: 'Site Settings',
    type: 'document',
    fields: [
        {
            name: 'logo',
            title: 'Logo',
            type: 'image',
            options: {
                hotspot: true,
            },
        },
        {
            name: 'title',
            title: 'Site Title',
            type: 'string',
        },
        {
            name: 'description',
            title: 'Site Description',
            type: 'text',
        }
    ],
}