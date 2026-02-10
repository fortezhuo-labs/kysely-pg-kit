/** biome-ignore-all lint/suspicious/noExplicitAny: <ignore> */

import type { SchemaContext, SchemaModel } from '../type'
import { getParentTable } from '.'

type RelationInclude = {
  readonly child: string
  readonly include?: readonly RelationInclude[]
}

type Relation<
  T extends string,
  I extends readonly RelationInclude[] | undefined,
> = {
  [K in T]: I extends readonly RelationInclude[] ? I[number]['child'][] : never
} & (I extends readonly RelationInclude[]
  ? {
      [K in I[number]['child']]: Extract<
        I[number],
        { child: K }
      >['include'] extends readonly RelationInclude[]
        ? Relation<K, Extract<I[number], { child: K }>['include']>[K]
        : never
    }
  : unknown)

export function getRelation<
  TName extends string,
  TInclude extends readonly {
    child: string
    include?: readonly RelationInclude[]
  }[],
>(name: TName, include?: TInclude): Relation<TName, TInclude> {
  return (include || []).reduce(
    (acc: any, o: { child: string; include?: readonly RelationInclude[] }) => {
      if (!acc[name]) {
        acc[name] = []
      }

      acc[name].push(o.child)
      const child = getRelation(o.child, o?.include || [])

      return Object.assign(acc, child)
    },
    {} as any,
  )
}

export function getRelationTable<Model extends SchemaModel>(
  ctx: SchemaContext<Model>,
) {
  const parent = getParentTable(ctx)
  const include = ctx.config.include

  return getRelation(parent, include)
}
