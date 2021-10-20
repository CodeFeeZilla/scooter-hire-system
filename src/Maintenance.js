class Maintenance {
  static repairScooters(scooters) {
    return scooters.map((scooter) =>
      Object.assign(scooter, { isBroken: false })
    );
  }
}

module.exports = Maintenance;
