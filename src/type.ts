/** biome-ignore-all lint/suspicious/noExplicitAny: generic */
/** biome-ignore-all lint/style/useNamingConvention: <generic> */

import type { Kysely } from 'kysely'

// definition & context
export interface DefModel {
  Database: any
  Name: string
  Include: Array<any>
}

export type DefContext<Model extends DefModel> = {
  db: Kysely<Prop<Model, 'Database'>>
  config: {
    name: Prop<Model, 'Name'>
    include?: Prop<Model, 'Include'>
  }
}

export type TableName<Database> = keyof Database & string

export type AnyInclude<Database, Parent extends TableName<Database>> = {
  [A in TableName<Database>]: Include<Database, A, Parent>
}[TableName<Database>]

export type Include<
  Database,
  Child extends TableName<Database>,
  Parent extends TableName<Database>,
> = {
  child: Child
  on: readonly [keyof Database[Child], keyof Database[Parent]]
  include?: Array<AnyInclude<Database, Child>>
}

type SubSelect<Database, Name extends TableName<Database>, Include> =
  Include extends Array<AnyInclude<Database, Name>>
    ? {
        [Child in Include[number] as Child['child']]?:
          | true
          | { select: Select<Database, Child['child'], Child['include']> }
      }
    : never

export type Select<Database, Name extends TableName<Database>, Include> =
  | {
      [K in keyof Database[Name]]?: true
    }
  | SubSelect<Database, Name, Include>

// helper
export type Prop<M, K extends keyof M> = M[K]
