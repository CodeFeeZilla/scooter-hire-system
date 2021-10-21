const Base = require("./Base");

class App extends Base {
  constructor() {
    super();

    this.costForRental = 1;

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

  addAndStartUserTimer(user) {
    const userTimer = { id: user.id, time: 0, timerId: null };
    userTimer.startTimer = function () {
      this.timerId = setInterval(() => {
        this.time++;
      }, 1000);
    };
    this.userTimer.startTimer();
    this.userTimers.push(userTimer);
  }

  stopAndRemoveUserTimer(user) {
    const userTimer = this.userTimers.find(
      (userTimer) => userTimer.id === user.id
    );
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
