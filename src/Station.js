const Base = require("./Base");
const Maintenance = require("./Maintenance");

class Station extends Base {
  static stations = [];

  constructor(name) {
    super();

    this.name = name;
    this.throwError(!this.name, "charging station must have a name");

    this.id = this.constructor.stations.length;

    this.constructor.stations.push(this);
    this.scooters = [];
    this.unchargedScooters = [];
    this.markedForRepair = [];
    this.visitors = [];
    this.stock = this.scooters.length;
  }

  stockScooter(scooter) {
    // scooter.charge();
    if (scooter.isCharged) this.scooters.push(scooter);
    else this.unchargedScooters.push(scooter);
  }

  rentScooter(user, app) {
    this.throwError(
      !this.isUserAtStation(user),
      "user must be at a charging station to rent a scooter"
    );
    this.throwError(!app, "user must present app to rent a scooter");
    user.scooter = this.scooters.pop();
    app.recordRentalTime(user);
  }

  returnScooter(user, app) {
    this.throwError(
      !this.isUserAtStation(user),
      "user must be at a charging station to return a scooter"
    );
    this.throwError(!app, "user must present app to return scooter");
    const scooter = user.scooter;

    if (scooter.isBroken) this.markedForRepair.push(scooter);
    else this.unchargedScooters.push(scooter);

    app.recordReturnTime(user);
    app.takePayment(user);
    user.scooter = null;
  }

  recordVisitor(user) {
    this.throwError(
      this.visitors.includes(user.id),
      "user cannot visit station if already present"
    );
    this.visitors.push(user.id);
  }

  recordVisitorDepart(user) {
    this.visitors.splice(this.visitors.indexOf(user.id), 1);
  }

  isUserAtStation(user) {
    return this.visitors.includes(user.id);
  }

  bulkChargeScooters() {
    // makes and returns an array of promises for charging scooters
    return this.unchargedScooters.map(
      async (scooter) => await scooter.charge()
    );
  }

  async chargeAndReStockScooters() {
    // awaits and resolves array of promises
    await Promise.all(this.bulkChargeScooters());

    // assigns charged scooters from uncharged array back into charged scooters array
    this.scooters = this.unchargedScooters.filter(
      (scooter) => scooter.isCharged
    );

    // removes charged scooters from uncharged array
    this.unchargedScooters = this.unchargedScooters.filter(
      (scooter) => !scooter.isCharged
    );
  }

  async callMaintenance() {
    const repairedScooters = await Maintenance.repairScooters(
      this.markedForRepair
    );
    this.markedForRepair = [];
    this.unchargedScooters = this.unchargedScooters.concat(repairedScooters);
  }

  static connectStationsToApp() {
    return this.stations;
  }
}

module.exports = Station;
