/** biome-ignore-all lint/suspicious/noExplicitAny: <generic> */
import type {
  SchemaContext,
  SchemaModel,
  SchemaSelectQueryBuilder,
} from '@/type'
import { getParentTable } from './get-parent-table'
import { getRelationTable } from './get-relation'
import type { SelectArg } from './type'

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
