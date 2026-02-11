/** biome-ignore-all lint/suspicious/noExplicitAny: <generic> */

import { applySelect, selectFrom } from '@/util'
import type { FindManyArgs } from '@/util/type'
import type { Prop, SchemaContext, SchemaModel } from '../type'

export function findManyFactory<
  TModel extends SchemaModel,
  TName extends Prop<TModel, 'Name'>,
>(ctx: SchemaContext<TModel>) {
  return (args: FindManyArgs<TModel, TName>) => {
    let q = selectFrom(ctx, ctx.config.name as TName)
    q = applySelect(ctx, q, args)
    return q
  }
}
