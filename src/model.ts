/** biome-ignore-all lint/suspicious/noExplicitAny: <generic> */
/** biome-ignore-all lint/style/useNamingConvention: <generic> */

import type { Kysely } from 'kysely'
import { findManyFactory } from './query/find-many'
import type { AnyInclude, Prop, TableName } from './type'

export function createModelFactory<D>(db: Kysely<D>) {
  return <
    const N extends TableName<D>,
    const I extends readonly AnyInclude<D, N>[] = [],
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
      ctx,
      findMany: findManyFactory<Model, Prop<Model, 'Name'>>(ctx),
    }
  }
}
