import type { MockModelIncludes } from '@test/mock/schema.type'
import { describe, expectTypeOf, it } from 'vitest'
import type { SchemaContext } from '@/type'
import { getRelationTable } from './get-relation'

describe('getRelationTable', () => {
  it('should display all mapped relation child', () => {
    const ctx = {} as SchemaContext<MockModelIncludes>
    const relation = getRelationTable(ctx)
    type Test = typeof relation
    type Expected = {
      user: ('post' | 'profile')[]
      post: 'comment'[]
    }
    expectTypeOf<Test>().toMatchObjectType<Expected>()
  })
})
