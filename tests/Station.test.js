const Station = require("./../src/Station");

const station = new Station("Main");
const dummyApp = { takePayment: (user) => 2 };
const dummyScooter1 = {
  name: "fast and electric",
  isCharged: true,
  charge: () => 1,
};
const dummyScooter2 = {
  name: "slow and electric",
  isCharged: true,
  markedForRepair: true,
  charge: () => 1,
};
const dummyUser1 = { name: "bob" };
const dummyUser2 = { name: "kora" };
const nonPresentUser = { name: "remote" };

station.recordVisitor(dummyUser1);
station.recordVisitor(dummyUser2);

describe("Unit Test: Station Class", () => {
  it("should throw an error if the charging station has no name", () => {
    expect(() => new Station()).toThrowError(
      "charging station must have a name"
    );
  });

  test("stockScooter method should push argument to instance's scooter array property", () => {
    station.stockScooter(dummyScooter1);
    expect(station.scooters.length).toBe(1);
  });

  test("rentScooter should pop contents of instance's scooter array property, add scooter property to argument, and assign popped value to it", () => {
    station.rentScooter(dummyUser1);
    expect(dummyUser1).toMatchObject({
      name: "bob",
      scooter: {
        name: "fast and electric",
        isCharged: true,
      },
    });
  });

  test("returnScooter should remove users reference to scooter instance, charge it, and return it to stock if not marked for repair; otherwise, add it to marked for repair array", () => {
    // dummyScooter2 marked for repair
    station.stockScooter(dummyScooter2);
    station.rentScooter(dummyUser2);
    console.log(dummyUser2);
    station.returnScooter(dummyUser2, dummyApp);
    expect(dummyUser2.scooter).toBeNull();
    expect(station.markedForRepair.length).toBe(1);
    // dummyScooter1 not marked for repair
    station.returnScooter(dummyUser1, dummyApp);
    expect(dummyUser1.scooter).toBeNull();
    expect(station.scooters.length).toBe(1);
  });

  test("rentScooter should throw an error if user is not on visitor list", () => {
    station.rentScooter(dummyUser1);
    expect(() => station.rentScooter(nonPresentUser)).toThrowError(
      "user must be at a charging station to rent a scooter"
    );
  });

  test("recordVisitorDepart should remove specified user from visitor list", () => {
    station.recordVisitorDepart(dummyUser1);
    console.log(station.visitors);
    expect();
  });
});
