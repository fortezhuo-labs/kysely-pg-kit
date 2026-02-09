import type { Database } from '@test/mock/schema.type'
import type { Kysely } from 'kysely'
import { describe, expect, it } from 'vitest'
import { KyselyPgKit } from './'

describe('KyselyPgKit', () => {
  const mockDb = {} as unknown as Kysely<Database>

  it('should initialize with a db instance', () => {
    const kit = new KyselyPgKit(mockDb)
    expect(kit).toBeDefined()
    expect(kit.createModel).toBeTypeOf('function')
  })

  it('should create a model with correct configuration', () => {
    const kit = new KyselyPgKit(mockDb)

    const userModel = kit.createModel({
      name: 'user',
      include: [],
    })

    expect(userModel._ctx.config.name).toBe('user')
    expect(userModel.findMany).toBeDefined()
  })
})
