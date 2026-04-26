import ky from 'ky'

export type LaprasArticle = {
  title: string
  url: string
  tags: string[]
  headlines: string[]
  stockers_count: number
  updated_at: string
}

export type LaprasRepositoryLanguage = {
  name: string
  bytes: number
}

export type LaprasRepository = {
  id: number
  title: string
  url: string
  is_oss: boolean
  is_fork: boolean
  is_owner: boolean
  description: string
  stargazers_count: number
  stargazers_url: string
  forks: number
  contributors_count: number
  contributors_url: string
  contributions: number
  contributions_url: string
  language: string
  languages: LaprasRepositoryLanguage[]
}

export type LaprasEvent = {
  title: string
  url: string
  status: number
  date: string
  is_presenter: boolean
  is_organizer: boolean
}

export type LaprasActivity = {
  title: string
  url: string
  date: string
  type: string
}

export type LaprasProfile = {
  name: string
  description: string
  e_score: number
  b_score: number
  i_score: number
  iconimage_url: string
  enable_it_engineer: boolean
  qiita_articles: LaprasArticle[]
  zenn_articles: LaprasArticle[]
  blog_articles: LaprasArticle[]
  note_articles: LaprasArticle[]
  hatena_articles: LaprasArticle[]
  speaker_deck_slides: unknown[]
  github_repositories: LaprasRepository[]
  teratail_replies: unknown[]
  events: LaprasEvent[]
  activities: LaprasActivity[]
}

const client = ky.create({
  prefix: 'https://lapras.com/public',
  retry: {
    limit: 2,
  },
  timeout: 10000,
})

export const laprasClient = {
  fetchProfile: () => client.get('IPU4HTA.json').json<LaprasProfile>(),
}
