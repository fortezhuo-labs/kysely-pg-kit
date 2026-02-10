/** biome-ignore-all lint/suspicious/noExplicitAny: <ignore> */
import type { SchemaContext, SchemaModel } from '../type'

export function getParentTable<Model extends SchemaModel>(
  ctx: SchemaContext<Model>,
) {
  return ctx.config.name
}
