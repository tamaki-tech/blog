// LAPRAS public API のレスポンスは snake_case のため、JSON 型では外部のフィールド名をそのまま保持する。
// ドメインモデルへの変換時に camelCase のプロパティ名へ写像する。
export type LaprasArticleJson = {
  title: string
  url: string
  tags: string[]
  headlines: string[]
  stockers_count: number
  updated_at: string
}

export type LaprasRepositoryLanguageJson = {
  name: string
  bytes: number
}

export type LaprasRepositoryJson = {
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
  languages: LaprasRepositoryLanguageJson[]
}

export type LaprasEventJson = {
  title: string
  url: string
  status: number
  date: string
  is_presenter: boolean
  is_organizer: boolean
}

export type LaprasActivityJson = {
  title: string
  url: string
  date: string
  type: string
}

export type LaprasProfileJson = {
  name: string
  description: string
  e_score: number
  b_score: number
  i_score: number
  iconimage_url: string
  enable_it_engineer: boolean
  qiita_articles: LaprasArticleJson[]
  zenn_articles: LaprasArticleJson[]
  blog_articles: LaprasArticleJson[]
  note_articles: LaprasArticleJson[]
  hatena_articles: LaprasArticleJson[]
  // UI で扱う必要が出るまでは、未対応セクションを生データのまま保持する。
  speaker_deck_slides: unknown[]
  github_repositories: LaprasRepositoryJson[]
  // UI で扱う必要が出るまでは、未対応セクションを生データのまま保持する。
  teratail_replies: unknown[]
  events: LaprasEventJson[]
  activities: LaprasActivityJson[]
}

type LaprasArticleProps = {
  title: string
  url: string
  tags: string[]
  headlines: string[]
  stockersCount: number
  updatedAt: string
}

export type LaprasProfileArticle = {
  source: string
  article: LaprasArticle
}

const compareDateDesc = (dateA: string, dateB: string) => {
  return Date.parse(dateB) - Date.parse(dateA)
}

export class LaprasArticle {
  private readonly title: string
  private readonly url: string
  private readonly tags: string[]
  private readonly headlines: string[]
  private readonly stockersCount: number
  private readonly updatedAt: string

  constructor(props: LaprasArticleProps) {
    this.title = props.title
    this.url = props.url
    this.tags = props.tags
    this.headlines = props.headlines
    this.stockersCount = props.stockersCount
    this.updatedAt = props.updatedAt
  }

  static fromJson(json: LaprasArticleJson) {
    return new LaprasArticle({
      title: json.title,
      url: json.url,
      tags: json.tags,
      headlines: json.headlines,
      stockersCount: json.stockers_count,
      updatedAt: json.updated_at,
    })
  }

  /**
   * 記事タイトルを取得する。
   */
  getTitle() {
    return this.title
  }

  /**
   * 記事 URL を取得する。
   */
  getUrl() {
    return this.url
  }

  /**
   * 記事のタグを取得する。
   */
  getTags() {
    return this.tags
  }

  /**
   * 記事の要約として利用する見出しを取得する。
   */
  getSummary() {
    return this.headlines[0] ?? ''
  }

  /**
   * ストック数を取得する。
   */
  getStockersCount() {
    return this.stockersCount
  }

  /**
   * 更新日時を取得する。
   */
  getUpdatedAt() {
    return this.updatedAt
  }

  /**
   * 更新日時を年月日までの表示用文字列として取得する。
   */
  getDisplayUpdatedAt() {
    return this.updatedAt.split('T')[0].split(' ')[0]
  }
}

type LaprasRepositoryLanguageProps = {
  name: string
  bytes: number
}

export class LaprasRepositoryLanguage {
  private readonly name: string
  private readonly bytes: number

  constructor(props: LaprasRepositoryLanguageProps) {
    this.name = props.name
    this.bytes = props.bytes
  }

  static fromJson(json: LaprasRepositoryLanguageJson) {
    return new LaprasRepositoryLanguage({
      name: json.name,
      bytes: json.bytes,
    })
  }

  getName() {
    return this.name
  }
}

type LaprasRepositoryProps = {
  id: number
  title: string
  url: string
  isOss: boolean
  isFork: boolean
  isOwner: boolean
  description: string
  stargazersCount: number
  stargazersUrl: string
  forks: number
  contributorsCount: number
  contributorsUrl: string
  contributions: number
  contributionsUrl: string
  language: string
  languages: LaprasRepositoryLanguage[]
}

export class LaprasRepository {
  private readonly id: number
  private readonly title: string
  private readonly url: string
  private readonly isOss: boolean
  private readonly isFork: boolean
  private readonly isOwner: boolean
  private readonly description: string
  private readonly stargazersCount: number
  private readonly stargazersUrl: string
  private readonly forks: number
  private readonly contributorsCount: number
  private readonly contributorsUrl: string
  private readonly contributions: number
  private readonly contributionsUrl: string
  private readonly language: string
  private readonly languages: LaprasRepositoryLanguage[]

  constructor(props: LaprasRepositoryProps) {
    this.id = props.id
    this.title = props.title
    this.url = props.url
    this.isOss = props.isOss
    this.isFork = props.isFork
    this.isOwner = props.isOwner
    this.description = props.description
    this.stargazersCount = props.stargazersCount
    this.stargazersUrl = props.stargazersUrl
    this.forks = props.forks
    this.contributorsCount = props.contributorsCount
    this.contributorsUrl = props.contributorsUrl
    this.contributions = props.contributions
    this.contributionsUrl = props.contributionsUrl
    this.language = props.language
    this.languages = props.languages
  }

  static fromJson(json: LaprasRepositoryJson) {
    return new LaprasRepository({
      id: json.id,
      title: json.title,
      url: json.url,
      isOss: json.is_oss,
      isFork: json.is_fork,
      isOwner: json.is_owner,
      description: json.description,
      stargazersCount: json.stargazers_count,
      stargazersUrl: json.stargazers_url,
      forks: json.forks,
      contributorsCount: json.contributors_count,
      contributorsUrl: json.contributors_url,
      contributions: json.contributions,
      contributionsUrl: json.contributions_url,
      language: json.language,
      languages: json.languages.map(LaprasRepositoryLanguage.fromJson),
    })
  }

  getTitle() {
    return this.title
  }

  getUrl() {
    return this.url
  }

  getDescription() {
    return this.description
  }

  getStargazersCount() {
    return this.stargazersCount
  }

  getForks() {
    return this.forks
  }

  getContributions() {
    return this.contributions
  }

  getPrimaryLanguage() {
    return this.language
  }

  getLanguageNames() {
    return this.languages.map((language) => language.getName())
  }
}

type LaprasEventProps = {
  title: string
  url: string
  status: number
  date: string
  isPresenter: boolean
  isOrganizer: boolean
}

export class LaprasEvent {
  private readonly title: string
  private readonly url: string
  private readonly status: number
  private readonly date: string
  private readonly isPresenter: boolean
  private readonly isOrganizer: boolean

  constructor(props: LaprasEventProps) {
    this.title = props.title
    this.url = props.url
    this.status = props.status
    this.date = props.date
    this.isPresenter = props.isPresenter
    this.isOrganizer = props.isOrganizer
  }

  static fromJson(json: LaprasEventJson) {
    return new LaprasEvent({
      title: json.title,
      url: json.url,
      status: json.status,
      date: json.date,
      isPresenter: json.is_presenter,
      isOrganizer: json.is_organizer,
    })
  }

  /**
   * イベント名を取得する。
   */
  getTitle() {
    return this.title
  }

  /**
   * イベント URL を取得する。
   */
  getUrl() {
    return this.url
  }

  /**
   * イベント開催日を取得する。
   */
  getDate() {
    return this.date
  }

  /**
   * イベント開催日を年月日までの表示用文字列として取得する。
   */
  getDisplayDate() {
    return this.date.split('T')[0].split(' ')[0]
  }

  /**
   * イベントでの参加種別を説明文として取得する。
   */
  getRoleDescription() {
    if (this.isPresenter && this.isOrganizer) {
      return '登壇者・主催者として参加'
    }

    if (this.isPresenter) {
      return '登壇者として参加'
    }

    if (this.isOrganizer) {
      return '主催者として参加'
    }

    return '参加イベント'
  }
}

type LaprasActivityProps = {
  title: string
  url: string
  date: string
  type: string
}

export class LaprasActivity {
  private readonly title: string
  private readonly url: string
  private readonly date: string
  private readonly type: string

  constructor(props: LaprasActivityProps) {
    this.title = props.title
    this.url = props.url
    this.date = props.date
    this.type = props.type
  }

  static fromJson(json: LaprasActivityJson) {
    return new LaprasActivity({
      title: json.title,
      url: json.url,
      date: json.date,
      type: json.type,
    })
  }
}

type LaprasProfileProps = {
  name: string
  description: string
  engineeringScore: number
  businessScore: number
  influenceScore: number
  iconImageUrl: string
  enableItEngineer: boolean
  qiitaArticles: LaprasArticle[]
  zennArticles: LaprasArticle[]
  blogArticles: LaprasArticle[]
  noteArticles: LaprasArticle[]
  hatenaArticles: LaprasArticle[]
  speakerDeckSlides: unknown[]
  githubRepositories: LaprasRepository[]
  teratailReplies: unknown[]
  events: LaprasEvent[]
  activities: LaprasActivity[]
}

export class LaprasProfile {
  private readonly name: string
  private readonly description: string
  private readonly engineeringScore: number
  private readonly businessScore: number
  private readonly influenceScore: number
  private readonly iconImageUrl: string
  private readonly enableItEngineer: boolean
  private readonly qiitaArticles: LaprasArticle[]
  private readonly zennArticles: LaprasArticle[]
  private readonly blogArticles: LaprasArticle[]
  private readonly noteArticles: LaprasArticle[]
  private readonly hatenaArticles: LaprasArticle[]
  private readonly speakerDeckSlides: unknown[]
  private readonly githubRepositories: LaprasRepository[]
  private readonly teratailReplies: unknown[]
  private readonly events: LaprasEvent[]
  private readonly activities: LaprasActivity[]

  constructor(props: LaprasProfileProps) {
    this.name = props.name
    this.description = props.description
    this.engineeringScore = props.engineeringScore
    this.businessScore = props.businessScore
    this.influenceScore = props.influenceScore
    this.iconImageUrl = props.iconImageUrl
    this.enableItEngineer = props.enableItEngineer
    this.qiitaArticles = props.qiitaArticles
    this.zennArticles = props.zennArticles
    this.blogArticles = props.blogArticles
    this.noteArticles = props.noteArticles
    this.hatenaArticles = props.hatenaArticles
    this.speakerDeckSlides = props.speakerDeckSlides
    this.githubRepositories = props.githubRepositories
    this.teratailReplies = props.teratailReplies
    this.events = props.events
    this.activities = props.activities
  }

  /**
   * LAPRAS API の JSON をドメインモデルへ変換する。
   * ルートやコンポーネントがレスポンスのフィールド名へ直接依存しないようにする。
   */
  static fromJson(json: LaprasProfileJson) {
    return new LaprasProfile({
      name: json.name,
      description: json.description,
      engineeringScore: json.e_score,
      businessScore: json.b_score,
      influenceScore: json.i_score,
      iconImageUrl: json.iconimage_url,
      enableItEngineer: json.enable_it_engineer,
      qiitaArticles: json.qiita_articles.map(LaprasArticle.fromJson),
      zennArticles: json.zenn_articles.map(LaprasArticle.fromJson),
      blogArticles: json.blog_articles.map(LaprasArticle.fromJson),
      noteArticles: json.note_articles.map(LaprasArticle.fromJson),
      hatenaArticles: json.hatena_articles.map(LaprasArticle.fromJson),
      speakerDeckSlides: json.speaker_deck_slides,
      githubRepositories: json.github_repositories.map(LaprasRepository.fromJson),
      teratailReplies: json.teratail_replies,
      events: json.events.map(LaprasEvent.fromJson),
      activities: json.activities.map(LaprasActivity.fromJson),
    })
  }

  getName() {
    return this.name
  }

  getDescription() {
    return this.description
  }

  getDescriptionLines() {
    return this.description.split('\n').filter(Boolean)
  }

  getEngineeringScore() {
    return this.engineeringScore
  }

  getBusinessScore() {
    return this.businessScore
  }

  getInfluenceScore() {
    return this.influenceScore
  }

  getIconImageUrl() {
    return this.iconImageUrl
  }

  /**
   * GitHub リポジトリの言語情報から、プロフィールに表示するスキル名を取得する。
   */
  getSkillNames() {
    const skills = this.githubRepositories.flatMap((repository) =>
      repository.getLanguageNames(),
    )
    return [...new Set(skills)].slice(0, 12)
  }

  /**
   * プロダクト表示などで利用する GitHub リポジトリ情報を取得する。
   */
  getGitHubRepositories() {
    return this.githubRepositories
  }

  /**
   * プロフィールに表示する記事情報を新しい順に取得する。
   */
  getRecentArticles(limit?: number): LaprasProfileArticle[] {
    const articles = [
      ...this.qiitaArticles.map((article) => ({ source: 'Qiita', article })),
      ...this.zennArticles.map((article) => ({ source: 'Zenn', article })),
      ...this.blogArticles.map((article) => ({ source: 'Blog', article })),
      ...this.noteArticles.map((article) => ({ source: 'note', article })),
      ...this.hatenaArticles.map((article) => ({ source: 'Hatena Blog', article })),
    ].sort((articleA, articleB) =>
      compareDateDesc(articleA.article.getUpdatedAt(), articleB.article.getUpdatedAt()),
    )

    return limit === undefined ? articles : articles.slice(0, limit)
  }

  /**
   * プロフィールに表示するイベント情報を新しい順に取得する。
   */
  getRecentEvents(limit?: number) {
    const events = [...this.events]
      .sort((eventA, eventB) => eventB.getDate().localeCompare(eventA.getDate()))

    return limit === undefined ? events : events.slice(0, limit)
  }
}
