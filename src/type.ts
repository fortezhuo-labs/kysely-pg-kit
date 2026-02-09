/** biome-ignore-all lint/suspicious/noExplicitAny: generic */
/** biome-ignore-all lint/complexity/noBannedTypes: <generic> */
/** biome-ignore-all lint/style/useNamingConvention: <generic> */

import type { Kysely } from 'kysely'

// helper
export type Prop<M, K extends keyof M> = M[K]

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
  readonly on: readonly [keyof Database[Child], keyof Database[Parent]]
  readonly include?: readonly AnyInclude<Database, Child>[]
}

export type SubSelect<
  Database,
  Name extends TableName<Database>,
  Include,
> = Include extends readonly AnyInclude<Database, Name>[]
  ? {
      [Child in Include[number] as Child['child']]?:
        | true
        | {
            select: Select<
              Database,
              Child['child'],
              Child['include'] extends readonly any[] ? Child['include'] : {}
            >
          }
    }
  : never

export type Select<Database, Name extends TableName<Database>, Include> = {
  [K in keyof Database[Name]]?: true
} & (Include extends readonly any[] ? SubSelect<Database, Name, Include> : {})

// Schema
export interface SchemaModel {
  Database: any
  Name: string
  readonly Include: readonly any[]
}

export type SchemaContext<Model extends SchemaModel> = {
  db: Kysely<Prop<Model, 'Database'>>
  config: {
    name: Prop<Model, 'Name'>
    include?: Prop<Model, 'Include'>
  }
}

export type SchemaSelect<Model extends SchemaModel> = Select<
  Prop<Model, 'Database'>,
  Prop<Model, 'Name'>,
  Prop<Model, 'Include'>
>
