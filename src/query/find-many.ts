/** biome-ignore-all lint/suspicious/noExplicitAny: <generic> */
import type { SchemaContext, SchemaModel } from '../type'
import { applySelect } from './helper'
import type { FindManyArgs } from './type'

export function findManyFactory<Model extends SchemaModel>(
  _ctx: SchemaContext<Model>,
) {
  return (args: FindManyArgs<Model>) => {
    const select = applySelect(args)
    return select
  }
}
