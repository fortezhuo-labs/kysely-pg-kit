/** biome-ignore-all lint/suspicious/noExplicitAny: <generic> */
import type {
  SchemaContext,
  SchemaModel,
  SchemaSelectQueryBuilder,
  SchemaTable,
} from '@/type'
import { getParentTable } from './get-parent-table'
import { getRelationTable } from './get-relation'
import type { SelectArg } from './type'

export function applySelect<
  TModel extends SchemaModel,
  TName extends SchemaTable<TModel>,
  TQuery extends SchemaSelectQueryBuilder<TModel, TName>,
  TSelect extends SelectArg<TModel, TName>,
>(
  ctx: SchemaContext<TModel>,
  q: TQuery,
  { select }: TSelect,
): SchemaSelectQueryBuilder<TModel, TName> {
  const parent = getParentTable(ctx)
  const relation = getRelationTable(ctx)
  const keySelect = Object.keys(select)

  return q.select([]) as any
}
