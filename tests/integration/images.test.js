const request = require('supertest')
const app = require('../../app');
const mongoose = require('../../db/mongodb')
const numberUtils = require('../../lib/Number');

beforeAll(async () => {
  //TOOD: integrate this in full
  process.env.DB_IMPL = "mongodb-memory-server"
});

beforeEach(async () => {

});

afterEach(async () => {

});

afterAll(async () => {

  //TODO: delete all entries

  await mongoose.disconnect();
  await new Promise(resolve => setTimeout(() => resolve(), 100)); // avoid jest open handle error
});


describe("POST /images", () => {
  test("Add new image", async () => {
    const newImageName = "New image " + numberUtils.getRandomNumberBetweenLimits(1000, 9999);
    const newImage = await request(app)
      .post("/images")
      .send({
        name: newImageName
      });

    // make sure we add it correctly
    expect(newImage.body).toHaveProperty("_id");
    expect(newImage.body.name).toBe(newImageName);
    expect(newImage.statusCode).toBe(201);

    // make sure we have 2 images now
    const response = await request(app).get("/images");
    // expect(response.body.length).toBe(2);
  });
});


describe("GET /images", () => {
  test("Retrieve all images", async () => {
    const response = await request(app).get("/images");
    // expect(response.body.length).toBe(2);
    expect(response.body[0]).toHaveProperty("_id");
    expect(response.body[0]).toHaveProperty("name");
    expect(response.body[0]).toHaveProperty("status");
    expect(response.body[0]).toHaveProperty("Created_date");
    expect(response.statusCode).toBe(200);
  });
});
