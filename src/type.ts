/** biome-ignore-all lint/suspicious/noExplicitAny: generic */
/** biome-ignore-all lint/complexity/noBannedTypes: <generic> */
/** biome-ignore-all lint/style/useNamingConvention: <generic> */

import type { Kysely, SelectQueryBuilder } from 'kysely'

// helper
export type Prop<Record, Key extends keyof Record> = Record[Key]

export type TableName<TDatabase> = keyof TDatabase & string

export type AnyInclude<TDatabase, TParent extends TableName<TDatabase>> = {
  [A in TableName<TDatabase>]: Include<TDatabase, A, TParent>
}[TableName<TDatabase>]

export type Include<
  TDatabase,
  TChild extends TableName<TDatabase>,
  TParent extends TableName<TDatabase>,
> = {
  child: TChild
  readonly on: readonly [keyof TDatabase[TChild], keyof TDatabase[TParent]]
  readonly include?: readonly AnyInclude<TDatabase, TChild>[]
}

export type SubSelect<
  TDatabase,
  TName extends TableName<TDatabase>,
  TInclude,
> = TInclude extends readonly AnyInclude<TDatabase, TName>[]
  ? {
      [TChild in TInclude[number] as TChild['child']]?:
        | true
        | {
            select: Select<
              TDatabase,
              TChild['child'],
              TChild['include'] extends readonly any[] ? TChild['include'] : {}
            >
          }
    }
  : never

export type Select<TDatabase, TName extends TableName<TDatabase>, TInclude> = {
  [K in keyof TDatabase[TName]]?: true
} & (TInclude extends readonly any[]
  ? SubSelect<TDatabase, TName, TInclude>
  : {})

// Schema
export interface SchemaModel {
  Database: any
  Name: string
  readonly Include: readonly any[]
}

export type SchemaContext<TModel extends SchemaModel> = {
  db: Kysely<Prop<TModel, 'Database'>>
  config: {
    name: Prop<TModel, 'Name'>
    include?: Prop<TModel, 'Include'>
  }
}

export type SchemaSelect<TModel extends SchemaModel> = Select<
  Prop<TModel, 'Database'>,
  Prop<TModel, 'Name'>,
  Prop<TModel, 'Include'>
>

export type SchemaSelectQueryBuilder<TModel extends SchemaModel> =
  SelectQueryBuilder<Prop<TModel, 'Database'>, Prop<TModel, 'Name'>, any>
