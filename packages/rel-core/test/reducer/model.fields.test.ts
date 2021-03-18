import { Fields } from "../../src"
import { reduceFields } from "../../src/reducer/fields"
const { string } = Fields

describe("reduceFields", () => {
  const subject = (fields) => {
    return reduceFields("Fake", fields)
  }

  it("should reduce a Field", () => {
    const res = subject({ name: string() })
    const expectation = { name: { returns: string() } }
    expect(JSON.stringify(res)).toEqual(JSON.stringify(expectation))
  })
})
