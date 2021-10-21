const { User, App, Station, Scooter } = require("./System");

const user1 = new User("Bob", 29, 25);
const user2 = new User("jane", 29, 600);

const app = new App();

const station1 = new Station("main stattion");
const station2 = new Station("Other stattion");

const scooter1 = new Scooter(true);
const scooter2 = new Scooter(false);

const actors = [user1, user2, app, station1, station2, scooter1, scooter2];

describe("Intergration Test for Hire App System", () => {
  beforeAll(async () => {
    actors.forEach((actor) => console.log(JSON.stringify(actor)));
  });

  // step1: app needs reference to all stations in initial existance
  test("app instance should have reference to all stations instances", () => {
    app.addStations(Station.connectStationsToApp());
    expect(app.stations).toMatchObject([station1, station2]);
  });

  // step2: stations need to be stocked with scooters
  test("station1 should have scooters1 in scooters array and scooter2 in unchargedScooters array", () => {
    station1.stockScooter(scooter1);
    station1.stockScooter(scooter2);
    expect(station1.scooters).toMatchObject([scooter1]);
    expect(station1.unchargedScooters).toMatchObject([scooter2]);
  });

  // step3: user must register on app
  test("app should have user in users array after registration", () => {
    user1.register(app);
    expect(app.users).toMatchObject([user1]);
  });

  // step4: user must go to charging station
  test("user should be added to visitors array at station instance they visit", () => {
    user1.visit(app.getStations()[0]);
    expect(station1.visitors).toMatchObject([user1.id]);
  });

  // step5: user can then rent a scooter
  test("scooter instance should be attached to user and station should have one less scooter", () => {
    const initialNumberOfScooter = [...station1.scooters].length;
    station1.rentScooter(user1, app);
    expect(station1.stock).toBeLessThan(initialNumberOfScooter);
    expect(user1.scooter).toBeTruthy();
    expect(user1.scooter).toMatchObject(scooter1);
  });

  // optional: user can leave station
  test("user should no longer be in visitors array at station 1", () => {
    user1.leave(station1);
    expect(station1.visitors).toEqual(expect.not.arrayContaining([user1.id]));
  });

  // step6: user can now ride rented scooter
  test("user riding scooter should reduce it's range by the distance they've travelled", () => {
    user1.scooter.ride(10);
    expect(user1.scooter.range).toBe(32 - 10);
  });

  //optional user can mark scooter as broken
  test("scooter's isBroken policy should become true if markAsBroken is called", () => {
    //initally false
    expect(user1.scooter.isBroken).toBe(false);
    user1.scooter.markAsBroken();
    expect(user1.scooter.isBroken).toBe(true);
  });

  // step7 user can return scooter, user charged depending on how long they've rented for
  test("payment for scooter should be deducted from users balance on return", () => {
    const user1InitialBalance = user1.balance;
    user1.visit(station2);
    station2.returnScooter(user1, app);
    expect(user1.balance).toBeLessThan(user1InitialBalance);
  });

  // Nice to haves

  test("station2 should have 1 scooter in markedForRepair array", () => {
    expect(station2.markedForRepair).toMatchObject([scooter1]);
  });

  test("after calling maintenance station2 should 1 scooter in unchargedScooters array", async () => {
    await station2.callMaintenance();
    expect(station2.unchargedScooters).toMatchObject([scooter1]);
    expect(station2.markedForRepair).toEqual(
      expect.not.arrayContaining([scooter1])
    );
  });

  test("after calling chargeAndReStockScooters station2 should have 1 scooter in scooters array", async () => {
    await station2.chargeAndReStockScooters();
    expect(station2.scooters).toMatchObject([scooter1]);
    expect(station2.unchargedScooters).toEqual(
      expect.not.arrayContaining([scooter1])
    );
  });

  afterAll(() => {
    actors.forEach((actor) => console.log(JSON.stringify(actor)));
  });
});
