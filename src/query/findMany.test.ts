/** biome-ignore-all lint/style/useNamingConvention: <testing> */
import type { MockModel, MockModelIncludes } from '@test/mock/schema.type'
import { describe, expectTypeOf, it } from 'vitest'
import type { SchemaContext } from '@/type'
import { findManyFactory } from './findMany'

describe('findManyFactory', () => {
  it('basic table without include', () => {
    const mockCtx = {} as SchemaContext<MockModel>
    const findMany = findManyFactory(mockCtx)

    type Test = Parameters<typeof findMany>[0]['select']
    type Expected = 'id' | 'name'

    expectTypeOf<keyof Test>().toEqualTypeOf<Expected>()
  })

  it('basic table with multiple includes', () => {
    const mockCtx = {} as SchemaContext<MockModelIncludes>
    const findMany = findManyFactory(mockCtx)

    type Test = Parameters<typeof findMany>[0]['select']
    type Expected = 'id' | 'name' | 'post' | 'profile'

    expectTypeOf<keyof Test>().toEqualTypeOf<Expected>()

    /*
    findMany({
      select: {
        id: true,
        name: true,
        post: {
          select: {
            title: true,
            comment: {
              select: {
                body: true,
              },
            },
          },
        },
      },
    })
      */
  })
})
