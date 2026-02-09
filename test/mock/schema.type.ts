/** biome-ignore-all lint/style/useNamingConvention: <testing> */
import type { SchemaModel } from '@/type'

export type Database = {
  user: {
    id: number
    name: string
  }

  post: {
    id: number
    userId: number
    title: string
  }

  comment: {
    id: number
    postId: number
    body: string
  }
}

export interface MockModel extends SchemaModel {
  Database: Database
  Name: 'user'
  Include: []
}

const include = [
  {
    child: 'post',
    on: ['userId', 'id'],
    include: [{ child: 'comment', on: ['postId', 'id'] }],
  },
] as const

export interface MockModelIncludes extends SchemaModel {
  Database: Database
  Name: 'user'
  Include: typeof include
}
