/** biome-ignore-all lint/style/useNamingConvention: <testing> */
import type { Include, SchemaModel } from '@/type'

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

export interface MockModelIncludes extends SchemaModel {
  Database: Database
  Name: 'user'
  Include: [
    Include<Database, 'post', 'user'>,
    Include<Database, 'comment', 'user'>,
  ]
}
