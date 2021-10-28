const request = require('supertest')
const app = require('../app')

beforeAll(async () => {

  // TODO: Fix! This is not working
  // request(app).post("/images")
  //   .send({
  //     name: "New Image " + getRandomNumberBetweenLimits(1000, 9999)
  //   });
});

beforeEach(async () => {

});

afterEach(async () => {

});

afterAll(async () => {

});

describe("GET /images", () => {
  test("It responds with an array of images", async () => {
    const response = await request(app).get("/images");
    expect(response.body.length).toBe(1);
    expect(response.body[0]).toHaveProperty("_id");
    expect(response.body[0]).toHaveProperty("name");
    expect(response.body[0]).toHaveProperty("status");
    expect(response.body[0]).toHaveProperty("Created_date");
    expect(response.statusCode).toBe(200);
  });
});



function getRandomNumberBetweenLimits(minLimit, maxLimit) {
  let min = Math.ceil(minLimit), max = Math.floor(maxLimit);
  return (Math.floor(Math.random() * (max - min) + min));
}
