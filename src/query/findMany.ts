/** biome-ignore-all lint/suspicious/noExplicitAny: <generic> */
import type { SchemaContext, SchemaModel, SchemaSelect } from '../type'

export type FindManyArgs<Model extends SchemaModel> = {
  select: SchemaSelect<Model>
}

export function findManyFactory<Model extends SchemaModel>(
  _ctx: SchemaContext<Model>,
) {
  return (args: FindManyArgs<Model>) => {
    return args
  }
}
