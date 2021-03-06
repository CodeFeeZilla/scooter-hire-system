const Scooter = require("./../src/Scooter");

describe("Unit Test: Scooter Class", () => {
  it("should throw an error if scooter isCharged status is not specified", () => {
    expect(() => new Scooter()).toThrowError(
      "scooter must either be charged or uncharged"
    );
  });

  it("should throw an error if the type of isCharged property is not a boolean", () => {
    expect(() => new Scooter(1)).toThrowError(
      "isCharged must be a boolean value"
    );
  });

  test("charge - isCharged should be true after charge", async () => {
    const scooter = new Scooter(false);
    await scooter.charge(); // we need to wait for the charge!
    expect(scooter.isCharged).toBe(true);
  });

  test("charge - range should be 32 after charge", async () => {
    const scooter = new Scooter(false);
    await scooter.charge(); // we need to wait for the charge!
    expect(scooter.range).toBe(32);
  });

  test("ride method should reduce scooters range by distance specified", () => {
    //initial range is 32
    const scooter = new Scooter(true);
    scooter.ride(31);
    expect(scooter.range).toBe(1);
  });

  test("ride method shouldn't allow the scooters range to be lower than 0", () => {
    //initial range is 32
    const scooter = new Scooter(true);
    scooter.ride(100);
    expect(scooter.range).toBe(0);
  });
});
