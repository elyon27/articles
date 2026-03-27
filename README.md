# Supabase backend for the Articles site

This package gives you a ready backend structure for your articles site with:

- a Postgres table for article metadata
- two Storage buckets for PDFs and cover images
- RLS policies for public reading and authenticated admin writing
- frontend helper functions for upload, fetch, update, and delete
- a simple admin upload form

## Files

- `supabase/articles_backend.sql` — database schema, buckets, and policies
- `src/lib/supabase.js` — shared Supabase client
- `src/api/articles.js` — article CRUD and file upload helpers
- `admin/article-upload-form.html` — basic uploader UI

## Setup

1. Create a Supabase project.
2. In **SQL Editor**, run `supabase/articles_backend.sql`.
3. Add environment variables:
   - `VITE_SUPABASE_URL` or `NEXT_PUBLIC_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY` or `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. Install the client package:
   - `npm install @supabase/supabase-js`
5. Sign in an admin user through Supabase Auth before using the uploader.

## Data model

Each article record stores:

- title
- slug
- description
- excerpt
- author name
- PDF path and public URL
- cover image path and public URL
- categories array
- tags array
- publish flag
- publish date
- extra JSON metadata

## Recommended metadata structure

You can place extra frontend values inside `metadata`, for example:

```json
{
  "reading_time": "8 min",
  "featured": true,
  "general_categories": ["Spiritual Growth", "Kingdom Living"]
}
```

## Notes

- Public visitors can read only published articles.
- Authenticated users can manage all articles and storage objects.
- For very large PDFs, Supabase recommends resumable uploads rather than only standard uploads. See the official Storage upload guidance. citeturn718551search0
- Supabase Storage is separate from database backups, so keep your local source files too. citeturn718551search13turn718551search4
