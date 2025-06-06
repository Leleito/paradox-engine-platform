import { StructureBuilder } from 'sanity/structure'
import { 
  BookOpen, 
  FileText, 
  User, 
  Tag, 
  Settings,
  MessageSquare,
  CreditCard,
  Megaphone
} from 'lucide-react'

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure = (S: StructureBuilder) =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Book Content')
        .icon(BookOpen)
        .child(
          S.list()
            .title('Book Content')
            .items([
              S.listItem()
                .title('Chapters')
                .icon(BookOpen)
                .child(S.documentTypeList('chapter').title('Chapters')),
            ])
        ),
      S.listItem()
        .title('Blog')
        .icon(FileText)
        .child(
          S.list()
            .title('Blog')
            .items([
              S.listItem()
                .title('Posts')
                .icon(FileText)
                .child(S.documentTypeList('blogPost').title('Blog Posts')),
              S.listItem()
                .title('Categories')
                .icon(Tag)
                .child(S.documentTypeList('blogCategory').title('Categories')),
            ])
        ),
      S.listItem()
        .title('Marketing')
        .icon(Megaphone)
        .child(
          S.list()
            .title('Marketing')
            .items([
              S.listItem()
                .title('Testimonials')
                .icon(MessageSquare)
                .child(S.documentTypeList('testimonial').title('Testimonials')),
              S.listItem()
                .title('Call to Actions')
                .icon(Megaphone)
                .child(S.documentTypeList('cta').title('CTAs')),
            ])
        ),
      S.listItem()
        .title('Subscription Plans')
        .icon(CreditCard)
        .child(S.documentTypeList('subscriptionPlan').title('Subscription Plans')),
      S.listItem()
        .title('Authors')
        .icon(User)
        .child(S.documentTypeList('author').title('Authors')),
      S.divider(),
      S.listItem()
        .title('Site Settings')
        .icon(Settings)
        .child(
          S.document()
            .schemaType('siteSettings')
            .documentId('siteSettings')
        ),
    ]) 