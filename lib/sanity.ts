const PROJECT_ID = 'hxvuuayo'
const DATASET = 'production'
const API_VERSION = '2026-02-01'

export type SanityFilm = {
  _id: string
  title: string
  slug?: string
  year?: string
  format?: string
  runtime?: string
  director?: string
  logline?: string
  description?: string
  imageUrl?: string
  status?: string
  imdbUrl?: string
  seo?: { title?: string; description?: string; imageUrl?: string; noIndex?: boolean }
}

export type SanityFounder = {
  _id: string
  name: string
  slug?: string
  role?: string
  bio?: string
  imageUrl?: string
  imdb?: string
  seo?: { title?: string; description?: string; imageUrl?: string; noIndex?: boolean }
}

export type SanityArticle = {
  _id: string
  title: string
  slug?: string
  category?: string
  date?: string
  excerpt?: string
  imageUrl?: string
  seo?: { title?: string; description?: string; imageUrl?: string; noIndex?: boolean }
}

async function sanityFetch<T>(query: string, params: Record<string, string> = {}): Promise<T> {
  const url = new URL(`https://${PROJECT_ID}.api.sanity.io/v${API_VERSION}/data/query/${DATASET}`)
  url.searchParams.set('query', query)
  for (const [key, value] of Object.entries(params)) url.searchParams.set(`$${key}`, value)

  const response = await fetch(url, { next: { revalidate: 30 } })
  if (!response.ok) throw new Error(`Sanity request failed: ${response.status}`)
  const data = await response.json()
  return data.result as T
}

export async function getFilms() {
  return sanityFetch<SanityFilm[]>(`*[_type == "film"] | order(year desc, _createdAt desc){_id,title,"slug":slug.current,year,format,runtime,director,logline,description,"imageUrl":image.asset->url,status,imdbUrl,"seo":{title,description,"imageUrl":image.asset->url,noIndex}}`)
}

export async function getFilm(slug: string) {
  return sanityFetch<SanityFilm | null>(`*[_type == "film" && slug.current == $slug][0]{_id,title,"slug":slug.current,year,format,runtime,director,logline,description,"imageUrl":image.asset->url,status,imdbUrl,"seo":{title,description,"imageUrl":image.asset->url,noIndex}}`, { slug })
}

export async function getFounders() {
  return sanityFetch<SanityFounder[]>(`*[_type == "founder"] | order(name asc){_id,name,"slug":slug.current,role,bio,"imageUrl":image.asset->url,imdb,"seo":{title,description,"imageUrl":image.asset->url,noIndex}}`)
}

export async function getFounder(slug: string) {
  return sanityFetch<SanityFounder | null>(`*[_type == "founder" && slug.current == $slug][0]{_id,name,"slug":slug.current,role,bio,"imageUrl":image.asset->url,imdb,"seo":{title,description,"imageUrl":image.asset->url,noIndex}}`, { slug })
}

export async function getArticles() {
  return sanityFetch<SanityArticle[]>(`*[_type == "article"] | order(date desc, _createdAt desc){_id,title,"slug":slug.current,category,date,excerpt,"imageUrl":image.asset->url,"seo":{title,description,"imageUrl":image.asset->url,noIndex}}`)
}

export async function getArticle(slug: string) {
  return sanityFetch<SanityArticle | null>(`*[_type == "article" && slug.current == $slug][0]{_id,title,"slug":slug.current,category,date,excerpt,"imageUrl":image.asset->url,"seo":{title,description,"imageUrl":image.asset->url,noIndex}}`, { slug })
}

export async function getHomepage() {
  return sanityFetch<{ title?: string; intro?: string; featuredFilm?: SanityFilm | null; seo?: SanityArticle['seo'] } | null>(`*[_type == "homepage"][0]{title,intro,"featuredFilm":featuredFilm->{_id,title,"slug":slug.current,year,format,runtime,director,logline,description,"imageUrl":image.asset->url,status,imdbUrl,"seo":{title,description,"imageUrl":image.asset->url,noIndex}},"seo":{title,description,"imageUrl":image.asset->url,noIndex}}`)
}
