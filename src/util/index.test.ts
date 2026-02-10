import type { MockModelIncludes } from '@test/mock/schema.type'
import { describe, expectTypeOf, it } from 'vitest'
import type { SchemaContext } from '@/type'
import { getParentTable } from '.'

describe('getParentTable', () => {
  it('should display parent table name', () => {
    const ctx = {} as SchemaContext<MockModelIncludes>
    const parent = getParentTable(ctx)
    type Test = typeof parent
    type Expected = 'user'

    expectTypeOf<Test>().toEqualTypeOf<Expected>()
  })
})
