/** biome-ignore-all lint/suspicious/noExplicitAny: <generic> */
import type { DefContext, DefModel, Prop, Select } from '../type'

export type FindManyArgs<Model extends DefModel> = {
  select: Select<
    Prop<Model, 'Database'>,
    Prop<Model, 'Name'>,
    Prop<Model, 'Include'>
  >
  model?: Model
}

export function findManyFactory<Model extends DefModel>(
  ctx: DefContext<Model>,
) {
  return (args: FindManyArgs<Model>) => {
    console.log(ctx)
    console.log(args)
  }
}
