export default {
  name: 'blogCategory',
  title: 'Blog Category',
  type: 'document',
  icon: () => '🏷️',
  fields: [
    {
      name: 'name',
      title: 'Category Name',
      type: 'string',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96
      },
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text'
    },
    {
      name: 'color',
      title: 'Category Color',
      type: 'string',
      description: 'Color for category badges',
      options: {
        list: [
          { title: 'Blue', value: 'blue' },
          { title: 'Green', value: 'green' },
          { title: 'Purple', value: 'purple' },
          { title: 'Red', value: 'red' },
          { title: 'Yellow', value: 'yellow' },
          { title: 'Gray', value: 'gray' }
        ]
      }
    }
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'description'
    }
  }
} 