const Station = require("./../src/Station");

const station = new Station("Main");

//dummy objects for testing functionality
const dummyApp = {
  takePayment: (user) => 2,
  recordRentalTime: (user) => 1,
  recordReturnTime: (user) => 1,
};
const dummyScooter1 = {
  name: "fast and electric",
  isCharged: true,
  isBroken: false,
  async charge() {
    return new Promise(
      (resolve) =>
        setTimeout(() => {
          this.isCharged = true;

          resolve();
        }),
      2000
    ); // wait 2 seconds
  },
};
const dummyScooter2 = {
  name: "slow and electric",
  isCharged: true,
  isBroken: true,
  async charge() {
    return new Promise(
      (resolve) =>
        setTimeout(() => {
          this.isCharged = true;

          resolve();
        }),
      2000
    );
  },
};
const dummyScooter3 = {
  name: "just electric",
  isCharged: false,
  isBroken: false,
  async charge() {
    return new Promise(
      (resolve) =>
        setTimeout(() => {
          this.isCharged = true;

          resolve();
        }),
      2000
    );
  },
};
const dummyUser1 = { id: 0, name: "bob" };
const dummyUser2 = { id: 1, name: "kora" };
const nonPresentUser = { name: "remote", id: 2 };
//--

describe("Unit Test: Station Class", () => {
  it("should throw an error if the charging station has no name", () => {
    expect(() => new Station()).toThrowError(
      "charging station must have a name"
    );
  });

  test("recordVisitor should add specified user to visitor list", () => {
    station.recordVisitor(dummyUser1);
    station.recordVisitor(dummyUser2);
    expect(station.visitors).toMatchObject([dummyUser1.id, dummyUser2.id]);
  });

  test("recordVisitor should throw an error if user is at station and visits the station", () => {
    expect(() => station.recordVisitor(dummyUser1)).toThrowError(
      "user cannot visit station if already present"
    );
  });

  test("stockScooter method should push argument to instance's scooter array property", () => {
    station.stockScooter(dummyScooter1);
    expect(station.scooters.length).toBe(1);
  });

  test("rentScooter should pop contents of instance's scooter array property, add scooter property to argument, and assign popped value to it", () => {
    station.rentScooter(dummyUser1, dummyApp);
    expect(dummyUser1).toMatchObject({
      name: "bob",
      scooter: {
        name: "fast and electric",
        isCharged: true,
      },
    });
  });

  test("returnScooter should remove users reference to scooter instance, charge it, and add it to unchargedScooters array if not marked for repair; otherwise, add it to marked for markedForRepair array", () => {
    // dummyScooter2 marked for repair
    station.stockScooter(dummyScooter2);
    station.rentScooter(dummyUser2, dummyApp);
    station.returnScooter(dummyUser2, dummyApp);
    expect(dummyUser2.scooter).toBeNull();
    expect(station.markedForRepair.length).toBe(1);
  });

  test("returnScooter should remove users reference to scooter instance, charge it, and add it to markedForRepair array if marked for repair", () => {
    // dummyScooter1 not marked for repair
    station.returnScooter(dummyUser1, dummyApp);
    expect(dummyUser1.scooter).toBeNull();
    expect(station.unchargedScooters.length).toBe(1);
  });

  test("rentScooter should throw an error if user is not on visitor list", () => {
    station.rentScooter(dummyUser1, dummyApp);
    expect(() => station.rentScooter(nonPresentUser, dummyApp)).toThrowError(
      "user must be at a charging station to rent a scooter"
    );
  });

  test("bulkChargeScooters should return an array of promises that charge scooters when consumed", async () => {
    station.stockScooter(dummyScooter3);

    await Promise.all(station.bulkChargeScooters());

    expect(station.unchargedScooters).toMatchObject([
      { ...dummyScooter1, ["isCharged"]: true },
      { ...dummyScooter3, ["isCharged"]: true },
    ]);
  });

  test("chargeAndRestockScooters should call bulChargeScooter and add charged scooters to scooters array, remove them from unchargedScooters array", async () => {
    await station.chargeAndReStockScooters();
    expect(station.scooters).toMatchObject([dummyScooter1, dummyScooter3]);
  });

  test("recordVisitorDepart should remove specified user from visitor list", () => {
    station.recordVisitorDepart(dummyUser1);
    station.recordVisitorDepart(dummyUser2);

    expect(station.visitors.length).toBe(0);
  });
});
