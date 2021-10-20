const Base = require("./Base");

class App extends Base {
  constructor() {
    super();

    this.costForRental = 1;

    this.stations = [];
    this.users = [];
    this.payments = [];
  }

  verify(age) {
    this.throwError(age < 18, "Users must be 18 and over to register");
  }

  register(user) {
    this.verify(user.age);
    this.users.push(user);
  }

  addStations(stations) {
    this.stations = stations;
  }

  takePayment(user) {
    console.log(`${user.name}'s' balance before rental ${user.balance}`);
    user.balance -= this.costForRental;
    console.log(`${user.name}'s' balance after rental ${user.balance}`);
    this.payments.push({
      name: user.name,
      id: user.id,
      paid: this.costForRental,
    });
  }

  getStations() {
    return this.stations;
  }
}

module.exports = App;
