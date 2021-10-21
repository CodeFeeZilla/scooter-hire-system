const { User, App, Station, Scooter } = require("./System");

const user1 = new User("Bob", 29, 25);
const user2 = new User("jane", 29, 600);

const app = new App();

const station1 = new Station("main stattion");
// const station2 = new Station();

const scooter1 = new Scooter(true);
const scooter2 = new Scooter(false);

describe("Intergration Test for Hire App System", () => {
  beforeAll(async () => {
    // step1: app needs reference to all stations
    app.addStations(Station.connectStationsToApp());
    // step2: stations need to be stocked with scooters
    station1.stockScooter(scooter1);
    station1.stockScooter(scooter2);
    // step3: user must register on app
    user1.register(app);
    // step4: user must go to charging station
    user1.visit(app.getStations()[0]);
    // step5: user can then rent a scooter
    station1.rentScooter(user1, app);
    // optional: user can leave station -> note to self: make sure user can only return scooter if they visit a station
    user1.leave(station1);
    console.log(station1);
    // step6: user can now ride rented scooter
    user1.scooter.ride(50);
    user1.scooter.markAsBroken();
    user1.visit(station1);
    // step7 user can return scooter, fixed rate deducted on return
    station1.returnScooter(user1, app);
    console.log(station1);
  });

  test("station1 should have 2 charged scooter in scooters array ", async () => {
    // await station1.chargeAndReStockScooters();
    await station1.callMaintenance();
    await station1.chargeAndReStockScooters();
    console.log(station1);
  });
});
