import type { SchemaModel, SchemaSelect } from '@/type'

export type SelectArg<Model extends SchemaModel> = {
  select: SchemaSelect<Model>
}

export type FindManyArgs<Model extends SchemaModel> = SelectArg<Model>
