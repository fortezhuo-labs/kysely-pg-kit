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
  on: readonly [keyof Database[Child], keyof Database[Parent]]
  include?: Array<AnyInclude<Database, Child>>
}

export type SubSelect<Database, Name extends TableName<Database>, Include> =
  Include extends Array<AnyInclude<Database, Name>>
    ? {
        [Child in Include[number] as Child['child']]?:
          | true
          | { select: Select<Database, Child['child'], Child['include']> }
      }
    : never

export type Select<Database, Name extends TableName<Database>, Include> = {
  [K in keyof Database[Name]]?: true
} & (Include extends Array<any> ? SubSelect<Database, Name, Include> : {})

// Schema
export interface SchemaModel {
  Database: any
  Name: string
  Include: Array<any>
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
