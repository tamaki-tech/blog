import type { FC } from 'hono/jsx'
import { Badge } from '../components/atoms/Badge'
import { Heading } from '../components/atoms/Heading'

const skills = [
  'TypeScript',
  'Java',
  'React',
  'Vue',
  'Svelte',
  'hono',
  'SpringBoot',
  'MySQL',
  'Postgresql',
]

export const TopPage: FC = () => {
  return (
    <section class="my-4 flex flex-col md:flex-row">
      <div class="md:w-1/3 text-center mb-8 md:mb-0">
        <img src="https://i.pravatar.cc/300" alt="Profile Picture" class="rounded-full w-40 h-40 mx-auto mb-4"></img>
        <Heading level={3} size='xl' className='font-bold'>Naoki Matsumoto</Heading>
        <p>Software Developer</p>
      </div>
      <div class="md:w-2/3 md:pl-8">
        <Heading level={3} size='xl' className='font-bold'>About Me</Heading>
        <div class="p-2">
          <p>私はフロントエンドとバックエンド開発を専門とするWebエンジニアです。</p>
          <p>
            最新技術と実績のある技術の両方を用いてWebアプリケーションを構築した経験があり、実用的で保守性の高い世界の課題を解決するシステムを開発することにやりがいを感じています。
          </p>
        </div>
        <Heading level={3} size='xl' className='font-bold'>Skills</Heading>
        <div class="flex flex-wrap gap-2 mb-6 p-2">
          {skills.map((skill) => (
            <Badge>{skill}</Badge>
          ))}
        </div>
      </div>
    </section>
  )
}
