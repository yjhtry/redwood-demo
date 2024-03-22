import type { Prisma, Post } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.PostCreateArgs>({
  post: {
    one: {
      data: {
        title: 'String',
        body: 'String',
        user: { create: { email: 'String5385235' } },
      },
    },
    two: {
      data: {
        title: 'String',
        body: 'String',
        user: { create: { email: 'String3835156' } },
      },
    },
  },
})

export type StandardScenario = ScenarioData<Post, 'post'>
