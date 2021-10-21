const App = require("./../src/App");

const app = new App();
const dummyUser = { name: "bob", id: 2345, age: 27, balance: 25 };

describe("Unit Test: App Class", () => {
  test("should throw an error if age passed to validate method is under 18", () => {
    const testApp = new App();
    const user = { name: "bob", age: 0 };
    expect(() => testApp.register(user)).toThrowError(
      "Users must be 18 and over to register"
    );
  });
});
