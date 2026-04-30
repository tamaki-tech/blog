import ky from 'ky'
import {
  CareerProfile as CareerProfileModel,
  type CareerProfileJson,
} from '../domain/careerProfile'

export type CareerProfile = CareerProfileModel

const client = ky.create({
  retry: {
    limit: 2,
  },
  timeout: 10000,
})

export const careerProfileClient = {
  fetchProfileModel: async (): Promise<CareerProfileModel> => {
    const json = await client
      .get('https://pub-6e93faeb34034af59d0fd3f1bdaf3ff3.r2.dev/profile.json')
      .json<CareerProfileJson>()

    return CareerProfileModel.fromJson(json)
  },
}
