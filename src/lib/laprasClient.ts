import ky from 'ky'
import {
  LaprasProfile as LaprasProfileModel,
  type LaprasActivityJson,
  type LaprasArticleJson,
  type LaprasEventJson,
  type LaprasProfileJson,
  type LaprasRepositoryJson,
  type LaprasRepositoryLanguageJson,
} from '../domain/laprasProfile'

export type LaprasArticle = LaprasArticleJson
export type LaprasRepositoryLanguage = LaprasRepositoryLanguageJson
export type LaprasRepository = LaprasRepositoryJson
export type LaprasEvent = LaprasEventJson
export type LaprasActivity = LaprasActivityJson
export type LaprasProfile = LaprasProfileModel

const client = ky.create({
  prefix: 'https://lapras.com/public',
  retry: {
    limit: 2,
  },
  timeout: 10000,
})

export const laprasClient = {
  fetchProfileModel: async (): Promise<LaprasProfileModel> => {
    const json = await client.get('IPU4HTA.json').json<LaprasProfileJson>()
    return LaprasProfileModel.fromJson(json)
  },
}
