/** biome-ignore-all lint/suspicious/noExplicitAny: <generic> */
import type {
  SchemaContext,
  SchemaModel,
  SchemaSelectQueryBuilder,
} from '@/type'
import { getParentTable, getRelationTable } from '@/util'
import type { SelectArg } from './type'

export function selectFrom<Model extends SchemaModel>(
  ctx: SchemaContext<Model>,
): SchemaSelectQueryBuilder<Model> {
  return ctx.db.selectFrom(ctx.config.name) as any
}

export function applySelect<
  Model extends SchemaModel,
  Query extends SchemaSelectQueryBuilder<Model>,
  Select extends SelectArg<Model>,
>(
  ctx: SchemaContext<Model>,
  q: Query,
  { select }: Select,
): SchemaSelectQueryBuilder<Model> {
  const parent = getParentTable(ctx)
  const relation = getRelationTable(ctx)
  const keySelect = Object.keys(select)

  return q.select([]) as any
}
