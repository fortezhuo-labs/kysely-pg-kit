/** biome-ignore-all lint/suspicious/noExplicitAny: <generic> */
import type {
  SchemaContext,
  SchemaModel,
  SchemaSelectQueryBuilder,
  SchemaTable,
} from '@/type'

export function selectFrom<
  TModel extends SchemaModel,
  TName extends SchemaTable<TModel>,
>(
  ctx: SchemaContext<TModel>,
  name: TName,
): SchemaSelectQueryBuilder<TModel, TName> {
  return ctx.db.selectFrom(name) as any
}
