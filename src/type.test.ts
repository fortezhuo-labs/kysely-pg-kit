/** biome-ignore-all lint/suspicious/noExplicitAny: <allow any for unit testing> */
/** biome-ignore-all lint/style/useNamingConvention: <ignore due to types> */
import type {
  Database,
  MockModel,
  MockModelIncludes,
} from '@test/mock/schema.type'

import type { Kysely } from 'kysely'
import { describe, expectTypeOf, it } from 'vitest'
import type {
  AnyInclude,
  Include,
  Prop,
  SchemaContext,
  SchemaSelect,
  Select,
  SubSelect,
  TableName,
} from './type'

/* =========================================================
   Types Unit Testing
========================================================= */

/** Prop */
describe('Prop', () => {
  it('extracts property type correctly', () => {
    type Test = Prop<Database['user'], 'name'>
    type Expected = string
    expectTypeOf<Test>().toEqualTypeOf<Expected>()
  })

  it('should fail if key does not exist', () => {
    // @ts-expect-error: invalid
    type Test = Prop<Database['user'], 'invalid'>
    type Expected = unknown

    expectTypeOf<Test>().toEqualTypeOf<Expected>()
  })
})

/** TableName */
describe('TableName', () => {
  it('returns union of table keys', () => {
    type Test = TableName<Database>
    type Expected = 'user' | 'post' | 'comment'
    expectTypeOf<Test>().toEqualTypeOf<Expected>()
  })

  it('should not include non-existent tables', () => {
    type Test = TableName<Database>
    type Expected = 'user' | 'post' | 'comment' | 'invalid'
    // @ts-expect-error: 'invalid' is not in our Database mock
    expectTypeOf<Test>().toEqualTypeOf<Expected>()
  })

  it('should result type string for any Database', () => {
    type Test = TableName<any>
    type Expected = string
    expectTypeOf<Test>().toEqualTypeOf<Expected>()
  })
})

/** AnyInclude */
describe('AnyInclude', () => {
  type Expected =
    | Include<Database, 'user', 'user'>
    | Include<Database, 'post', 'user'>
    | Include<Database, 'comment', 'user'>
  it('return union of includes of table "user"', () => {
    type Test = AnyInclude<Database, 'user'>

    expectTypeOf<Test>().toEqualTypeOf<Expected>()
  })

  it('should invalidate the include structure if database schema is lost "any"', () => {
    type Test = AnyInclude<any, 'user'>
    expectTypeOf<Test>().not.toEqualTypeOf<Expected>()
  })
})

/** Include */
describe('Include', () => {
  type Expected = {
    child: 'post'
    on: readonly [keyof Database['post'], keyof Database['user']]
    include?: Array<AnyInclude<Database, 'post'>>
  }
  it('return include of table parent "user" and child "post"', () => {
    type Test = Include<Database, 'post', 'user'>
    expectTypeOf<Test>().toMatchObjectType<Expected>()
  })

  it('should invalidate the include structure if database schema is lost "any"', () => {
    type Test = Include<any, 'post', 'user'>
    expectTypeOf<Test>().not.toMatchObjectType<Expected>()
  })
})

/** SubSelect */
describe('SubSelect', () => {
  it('extracts child names from include definitions as keys', () => {
    type MultipleIncludes = [
      Include<Database, 'post', 'user'>,
      Include<Database, 'comment', 'user'>,
    ]
    type Test = SubSelect<Database, 'user', MultipleIncludes>
    type Expected = 'post' | 'comment'

    expectTypeOf<keyof Test>().toEqualTypeOf<Expected>()
  })

  it('breaks type safety and results in "any" if the include parameter is "any"', () => {
    type Test = SubSelect<Database, 'user', any>
    type Expected = any
    expectTypeOf<keyof Test>().toEqualTypeOf<Expected>()
  })
})

/** Select */
describe('Select', () => {
  it('only single table without include', () => {
    type Test = Select<Database, 'user', undefined>
    type Expected = keyof Database['user']

    expectTypeOf<keyof Test>().toEqualTypeOf<Expected>()
  })

  it('merges parent fields and included child keys', () => {
    type MultipleIncludes = [
      Include<Database, 'post', 'user'>,
      Include<Database, 'comment', 'user'>,
    ]

    type Test = Select<Database, 'user', MultipleIncludes>
    type Expected = keyof Database['user'] | 'post' | 'comment'

    expectTypeOf<keyof Test>().toEqualTypeOf<Expected>()
  })

  it('breaks type safety and results in "any" if the include parameter is "any"', () => {
    type Test = Select<Database, 'user', any>
    type Expected = any
    expectTypeOf<keyof Test>().toEqualTypeOf<Expected>()
  })
})

/** Schema */
describe('Schema', () => {
  /* SchemaSelect */
  describe('SchemaSelect', () => {
    it('resolves single table select keys', () => {
      type Test = SchemaSelect<MockModel>
      type Expected = 'id' | 'name'

      expectTypeOf<keyof Test>().toEqualTypeOf<Expected>()
    })

    it('resolves both flat column keys and nested relational select keys', () => {
      type Test = SchemaSelect<MockModelIncludes>
      type TestChild = Extract<Test['post'], { select: any }>
      type Expected = 'id' | 'name' | 'post' | 'comment'
      type ExpectedChild = 'id' | 'title' | 'userId'

      expectTypeOf<keyof Test>().toEqualTypeOf<Expected>()
      expectTypeOf<keyof TestChild['select']>().toEqualTypeOf<ExpectedChild>()
    })
  })

  /* SchemaContext */
  describe('SchemaContext', () => {
    it('provides a type-safe context with database instance and model', () => {
      type Test = SchemaContext<MockModelIncludes>
      type Expected = {
        db: Kysely<Database>
        config: {
          name: 'user'
          include?: [
            Include<Database, 'post', 'user'>,
            Include<Database, 'comment', 'user'>,
          ]
        }
      }
      expectTypeOf<Test>().toMatchObjectType<Expected>()
    })
  })
})
