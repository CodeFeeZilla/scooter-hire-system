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

  rentScooter(user) {
    this.throwError(
      !this.isUserAtStation(user),
      "user must be at a charging station to rent a scooter"
    );
    user.scooter = this.scooters.pop();
  }

  returnScooter(user, app) {
    const scooter = user.scooter;
    app.takePayment(user);
    user.scooter = null;
    if (scooter.isBroken) this.markedForRepair.push(scooter);
    else this.unchargedScooters.push(scooter);
  }

  recordVisitor(user) {
    this.visitors.push(user.name);
  }

  recordVisitorDepart(user) {
    this.visitors.splice(this.visitors.indexOf(user.name), 1);
  }

  isUserAtStation(user) {
    console.log(this.visitors.includes(user.name));
    return this.visitors.includes(user.name);
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
    this.scooters = this.unchargedScooters.filter((scooter) => {
      if (scooter.isCharged) return scooter;
    });

    // removes charged scooters from uncharged array
    this.unchargedScooters = this.unchargedScooters.filter((scooter) => {
      if (!scooter.isCharged) return scooter;
    });
  }

  callMaintenance() {
    this.scooters = this.scooters.concat(
      Maintenance.repairScooters(this.markedForRepair)
    );
  }

  static connectStationsToApp() {
    return this.stations;
  }
}

module.exports = Station;
