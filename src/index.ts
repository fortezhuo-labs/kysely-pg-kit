import type { Kysely } from 'kysely'
import { createModelFactory } from './model'

export class KyselyPgKit<Database> {
  constructor(protected db: Kysely<Database>) {}
  get createModel() {
    return createModelFactory(this.db)
  }
}
