import type { MockModelIncludes } from '@test/mock/schema.type'
import { describe, expectTypeOf, it } from 'vitest'
import type { Prop } from '@/type'
import type { SelectArg } from './type'

describe('Select', () => {
  it('return display all fields and relation', () => {
    type Test = SelectArg<MockModelIncludes, Prop<MockModelIncludes, 'Name'>>
    type Expected = 'post' | 'profile' | 'id' | 'name'
    expectTypeOf<keyof Test['select']>().toEqualTypeOf<Expected>()
  })
})
