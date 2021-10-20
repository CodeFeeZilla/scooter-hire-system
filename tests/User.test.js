const User = require("./../src/User");

describe("Unit Test: User Class", () => {
  it("should throw an error if the user has no name", () => {
    expect(() => new User()).toThrowError("user must have a name");
  });

  it("should throw an error if the user has no age", () => {
    expect(() => new User("bob")).toThrowError("user must have an age");
  });

  it("should throw an error if the user has no balance", () => {
    expect(() => new User("bob", "27")).toThrowError(
      "user must have a balance"
    );
  });

  it("should throw an error if the user name is not a string", () => {
    expect(() => new User(12, 27, 27)).toThrowError(
      "user name must be a string"
    );
  });

  it("should throw an error if the user age is not a number", () => {
    expect(() => new User("bob", "27", 27)).toThrowError(
      "user age must be a number"
    );
  });

  it("should throw an error if the user balance is not a number", () => {
    expect(() => new User("bob", 27, "12")).toThrowError(
      "user balance must be a number"
    );
  });
});
