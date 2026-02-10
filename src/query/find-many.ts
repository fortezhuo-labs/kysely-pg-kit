/** biome-ignore-all lint/suspicious/noExplicitAny: <generic> */

import { applySelect, selectFrom } from '@/util'
import type { FindManyArgs } from '@/util/type'
import type { SchemaContext, SchemaModel } from '../type'

export function findManyFactory<Model extends SchemaModel>(
  ctx: SchemaContext<Model>,
) {
  return (args: FindManyArgs<Model>) => {
    let q = selectFrom(ctx)
    q = applySelect(ctx, q, args)
    return q
  }
}
