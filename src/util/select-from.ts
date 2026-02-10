/** biome-ignore-all lint/suspicious/noExplicitAny: <generic> */
import type {
  SchemaContext,
  SchemaModel,
  SchemaSelectQueryBuilder,
} from '@/type'

export function selectFrom<Model extends SchemaModel>(
  ctx: SchemaContext<Model>,
): SchemaSelectQueryBuilder<Model> {
  return ctx.db.selectFrom(ctx.config.name) as any
}
