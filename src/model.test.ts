import { type Database, include } from '@test/mock/schema.type'
import type { Kysely } from 'kysely'
import { describe, expectTypeOf, it } from 'vitest'
import { createModelFactory } from './model'

describe('createModelFactory', () => {
  const db = {} as Kysely<Database>
  const createModel = createModelFactory(db)

  it('correctly infers the model structure and binds it to findMany', () => {
    const userModel = createModel({
      name: 'user',
      include,
    })
    type UserModel = typeof userModel

    /* Name */
    type TestName = UserModel['ctx']['config']['name']
    type ExpectedName = 'user'
    expectTypeOf<TestName>().toEqualTypeOf<ExpectedName>()

    /* FindMany */
    type FindManyArgs = Parameters<UserModel['findMany']>[0]
    type TestFindMany = keyof FindManyArgs['select']
    type ExpectedFindMany = 'profile' | 'post' | keyof Database['user']

    expectTypeOf<TestFindMany>().toEqualTypeOf<ExpectedFindMany>()
  })

  it('works correctly without optional include', () => {
    const postModel = createModel({ name: 'post' })
    type PostModel = typeof postModel

    /* FindMany */
    type FindManyArgs = Parameters<PostModel['findMany']>[0]
    type TestFindMany = keyof FindManyArgs['select']
    type ExpectedFindMany = keyof Database['post']

    expectTypeOf<TestFindMany>().toEqualTypeOf<ExpectedFindMany>()
  })
})
