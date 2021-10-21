const Base = require("./Base");

class User extends Base {
  static users = [];

  constructor(name, age, balance) {
    super();
    this.name = name;
    this.age = age;
    this.balance = balance;

    this.id = this.constructor.users.length;
    this.constructor.users.push(this);

    //absence errors
    this.throwError(!this.name, "user must have a name");
    this.throwError(!this.age, "user must have an age");
    this.throwError(!this.balance, "user must have a balance");
    //type errors
    this.throwError(
      typeof this.name !== "string",
      "user name must be a string"
    );
    this.throwError(typeof this.age !== "number", "user age must be a number");
    this.throwError(
      typeof this.balance !== "number",
      "user balance must be a number"
    );
  }

  register(app) {
    app.register(this);
  }

  visit(station) {
    station.recordVisitor(this);
  }

  leave(station) {
    station.recordVisitorDepart(this);
  }
}

module.exports = User;
