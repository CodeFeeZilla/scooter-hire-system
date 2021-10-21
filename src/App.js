const Base = require("./Base");

class App extends Base {
  constructor() {
    super();

    this.baseFee = 2;

    this.stations = [];
    this.users = [];
    this.payments = [];
    this.userTimers = [];
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

  recordRentalTime(user) {
    this.userTimers.push({ id: user.id, startTime: new Date().getTime() });
  }

  recordReturnTime(user) {
    const index = this.findUserIndex(
      this.userTimers,
      (userTimer) => userTimer.id === user.id
    );
    this.userTimers[index].returnTime = new Date().getTime();
  }

  findUserIndex(array, testingFunction) {
    return array.findIndex(testingFunction);
  }

  takePayment(user) {
    const index = this.findUserIndex(
      this.userTimers,
      (userTimer) => userTimer.id === user.id
    );
    const totalTime =
      this.userTimers[index].returnTime - this.userTimers[index].startTime;
    const fee = this.calculateFee(totalTime);
    console.log(`${user.name}'s' balance before rental ${user.balance}`);
    user.balance -= fee;
    console.log(`${user.name}'s' balance after rental ${user.balance}`);
    this.payments.push({
      name: user.name,
      id: user.id,
      paid: this.costForRental,
    });
  }

  calculateFee(time) {
    return (time * this.baseFee) / 36.78;
  }

  getStations() {
    return this.stations;
  }
}

module.exports = App;
