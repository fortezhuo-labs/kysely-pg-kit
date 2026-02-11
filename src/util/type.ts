import type { SchemaModel, SchemaSelect, SchemaTable } from '@/type'

export type SelectArg<
  TModel extends SchemaModel,
  TName extends SchemaTable<TModel>,
> = {
  select: SchemaSelect<TModel, TName>
}

export type FindManyArgs<
  TModel extends SchemaModel,
  TName extends SchemaTable<TModel>,
> = SelectArg<TModel, TName>
