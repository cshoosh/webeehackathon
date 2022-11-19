import { mapAttrToMachine } from "./machineFilter";

describe("Machine filter hook functions should work as expected", () => {
  it("mapAttrToMachine should return expected values having same values", () => {
    expect(
      mapAttrToMachine({ foo: "foo", bar: "bar" }, { foo: "string" })
    ).toStrictEqual({ foo: { value: "foo", type: "string" } });
  });

  it("mapAttrToMachine should return expected values having more values in actual param", () => {
    expect(
      mapAttrToMachine(
        { foo: "foo", bar: "bar" },
        { foo: "string", baz: "number" }
      )
    ).toStrictEqual({
      foo: { value: "foo", type: "string" },
      baz: { value: undefined, type: "number" },
    });
  });

  it("mapAttrToMachine should return expected values having less values in first param", () => {
    expect(
      mapAttrToMachine({}, { foo: "string", bar: "string" })
    ).toStrictEqual({
      foo: { value: undefined, type: "string" },
      bar: { value: undefined, type: "string" },
    });
  });
  it("mapAttrToMachine should work as expected for null values", () => {
    expect(mapAttrToMachine(undefined, undefined)).toStrictEqual({});
  });
});
