class Maintenance {
  static repairScooters(scooters) {
    return new Promise((resolve) =>
      setTimeout(() => {
        const fixedScooters = scooters.map((scooter) =>
          Object.assign(scooter, { isBroken: false })
        );
        resolve(fixedScooters);
      }, 1000)
    );
  }
}

module.exports = Maintenance;
