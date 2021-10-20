const Base = require("./Base");

class Scooter extends Base {
  static scooters = [];

  constructor(isCharged) {
    super();

    this.isCharged = isCharged;

    this.isBroken = false;

    this.range = isCharged ? 32 : 0;

    this.throwError(
      this.isCharged === undefined,
      "scooter must either be charged or uncharged"
    );
    this.throwError(
      typeof this.isCharged !== "boolean",
      "isCharged must be a boolean value"
    );
  }

  async charge() {
    console.log("Starting charge");

    return new Promise(
      (resolve) =>
        setTimeout(() => {
          this.range = 32;
          this.isCharged = true;

          console.log("Charge complete");
          resolve();
        }),
      2000
    ); // wait 2 seconds
  }

  ride(distance) {
    if (this.range - distance <= 0) {
      this.range = 0;
      this.isCharged = false;
      console.log(
        "scooter out of battery. Please return scooter to charging station."
      );
      return;
    }
    this.range -= distance;
  }

  markAsBroken() {
    this.isBroken = true;
  }
}

module.exports = Scooter;
