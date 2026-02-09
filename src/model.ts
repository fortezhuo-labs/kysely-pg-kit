/** biome-ignore-all lint/suspicious/noExplicitAny: <generic> */
/** biome-ignore-all lint/style/useNamingConvention: <generic> */

import type { Kysely } from 'kysely'
import { findManyFactory } from './query/findMany'
import type { AnyInclude, TableName } from './type'

export function createModelFactory<D>(db: Kysely<D>) {
  return <
    const N extends TableName<D>,
    const I extends Array<AnyInclude<D, N>> = [],
  >(config: {
    name: N
    include?: I
  }) => {
    const ctx = {
      db,
      config,
    }

    type Model = {
      Database: D
      Name: N
      Include: I
    }

    return {
      _ctx: ctx,
      findMany: findManyFactory<Model>(ctx),
    }
  }
}
