const Maintenance = require("../src/Maintenance");

const dummyStation = {
  markedForRepair: [
    { name: "scooter1", isBroken: true },
    { name: "scooter2", isBroken: true },
  ],
  scooters: [],
};

describe("Unit Test For Maintenance Class", () => {
  it("should an array of objects with false isBroken properties", async () => {
    const arrayOfFixed = await Maintenance.repairScooters(
      dummyStation.markedForRepair
    );
    expect(arrayOfFixed[0].isBroken).toBe(false);
    expect(arrayOfFixed[1].isBroken).toBe(false);
  });
});
