import { supabase } from '../lib/supabase';

const PDF_BUCKET = 'article-pdfs';
const COVER_BUCKET = 'article-covers';

function slugify(text) {
  return String(text)
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

function buildPublicUrl(bucket, path) {
  const { data } = supabase.storage.from(bucket).getPublicUrl(path);
  return data.publicUrl;
}

export async function fetchPublishedArticles() {
  const { data, error } = await supabase
    .from('published_articles')
    .select('*')
    .order('published_at', { ascending: false })
    .order('sort_order', { ascending: true });

  if (error) throw error;
  return data;
}

export async function fetchAllArticles() {
  const { data, error } = await supabase
    .from('articles')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
}

export async function createArticleWithFiles({
  title,
  description,
  excerpt,
  categories = [],
  tags = [],
  pdfFile,
  coverFile,
  isPublished = true,
  authorName = 'CrownMind Institute',
  publishedAt = new Date().toISOString(),
  sortOrder = 0,
  metadata = {},
}) {
  if (!title || !pdfFile) {
    throw new Error('Title and PDF file are required.');
  }

  const slug = slugify(title);
  const safeTime = Date.now();
  const pdfPath = `${slug}/${safeTime}-${pdfFile.name}`;
  let coverPath = null;

  const pdfUpload = await supabase.storage
    .from(PDF_BUCKET)
    .upload(pdfPath, pdfFile, { upsert: true, contentType: 'application/pdf' });

  if (pdfUpload.error) throw pdfUpload.error;

  if (coverFile) {
    coverPath = `${slug}/${safeTime}-${coverFile.name}`;
    const coverUpload = await supabase.storage
      .from(COVER_BUCKET)
      .upload(coverPath, coverFile, { upsert: true, contentType: coverFile.type || 'image/png' });

    if (coverUpload.error) throw coverUpload.error;
  }

  const pdfUrl = buildPublicUrl(PDF_BUCKET, pdfPath);
  const coverUrl = coverPath ? buildPublicUrl(COVER_BUCKET, coverPath) : null;

  const payload = {
    slug,
    title,
    description: description || null,
    excerpt: excerpt || null,
    author_name: authorName,
    pdf_path: pdfPath,
    cover_path: coverPath,
    pdf_url: pdfUrl,
    cover_url: coverUrl,
    categories,
    tags,
    is_published: isPublished,
    published_at: isPublished ? publishedAt : null,
    sort_order: sortOrder,
    metadata,
  };

  const { data, error } = await supabase
    .from('articles')
    .insert(payload)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function updateArticle(id, updates) {
  const { data, error } = await supabase
    .from('articles')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function deleteArticle(id, { pdfPath, coverPath } = {}) {
  const { error } = await supabase.from('articles').delete().eq('id', id);
  if (error) throw error;

  if (pdfPath) {
    await supabase.storage.from(PDF_BUCKET).remove([pdfPath]);
  }
  if (coverPath) {
    await supabase.storage.from(COVER_BUCKET).remove([coverPath]);
  }

  return true;
}
