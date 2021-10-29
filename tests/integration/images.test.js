const request = require('supertest')
const app = require('../../app');
const mongoose = require('../../db/mongodb')
const numberUtils = require('../../lib/number');

let testImage1, testImage2, testImage3;
const totalImageCount = 4;

beforeAll(async () => {
  testImage1 = await createNewImage_postRequest("New image " + numberUtils.getRandomNumberBetweenLimits(1000, 9999));
  testImage2 = await createNewImage_postRequest("New image " + numberUtils.getRandomNumberBetweenLimits(1000, 9999));
  testImage3 = await createNewImage_postRequest("New image " + numberUtils.getRandomNumberBetweenLimits(1000, 9999));
});

beforeEach(async () => {

});

afterEach(async () => {

});


afterAll(async () => {

  await deleteAllImages();
  await mongoose.disconnect();
  await new Promise(resolve => setTimeout(() => resolve(), 100)); // avoid jest open handle error
});


async function deleteAllImages() {
  const allImagesResponse = await request(app).get("/images");
  for (const nextImage of allImagesResponse.body) {
    await request(app)
      .delete(`/images/${nextImage._id}`);
  }
  const response = await request(app).get("/images");
  if (Array.isArray(response.body) && response.body.length)
    throw new Error("Not all images were deleted in the test teardown 'afterAll' function");
}


async function createNewImage_postRequest(imageName) {
  const newImage = await request(app)
    .post("/images")
    .send({
      name: imageName
    });
  if (newImage.statusCode !== 201 && !newImage.get("_id"))
    throw new Error("Image not created successfully");

  return newImage;
}


async function getAllImages_getRequest(expectedNoOfImages) {
  const response = await request(app).get("/images");
  expect(response.statusCode).toBe(200);
  expect(response.body.length).toBe(expectedNoOfImages);
  return response;
}


describe("POST /images", () => {
  test("Add new image", async () => {
    const newImageName = "Test Create Image POST Request " + numberUtils.getRandomNumberBetweenLimits(1000, 9999);
    const newImageResponse = await createNewImage_postRequest(newImageName);

    expect(newImageResponse.body).toHaveProperty("_id");
    expect(newImageResponse.body.name).toBe(newImageName);
    expect(newImageResponse.statusCode).toBe(201);

    const allImagesResponse = await request(app).get("/images");
    expect(allImagesResponse.body.length).toBe(totalImageCount);
  });
});

describe("GET /images", () => {
  test("Retrieve all images", async () => {
    const response = await getAllImages_getRequest(totalImageCount);
    response.body.forEach(nextImage => {
      expect(nextImage).toHaveProperty("_id");
      expect(nextImage).toHaveProperty("name");
      expect(nextImage).toHaveProperty("status");
      expect(nextImage).toHaveProperty("Created_date");
    });
  });

  test("Retrieve image by ID", async () => {
    const returnedImageResponse = await request(app).get(`/images/${testImage1.body._id}`);
    expect(returnedImageResponse.statusCode).toBe(200);
    expect(returnedImageResponse.body.name).toBe(testImage1.body.name);
    expect(returnedImageResponse.body.status[0]).toBe(testImage1.body.status[0]);
    expect(returnedImageResponse.body.Created_date).toBe(testImage1.body.Created_date);
  })

  test("Retrieve image by name", async () => {
    const imageNameEncoded = encodeURIComponent(testImage2.body.name);
    const returnedImageResponse = await request(app).get(`/images/${imageNameEncoded}`);
    expect(returnedImageResponse.statusCode).toBe(200);
    expect(returnedImageResponse.body.name).toBe(testImage2.body.name);
    expect(returnedImageResponse.body.status[0]).toBe(testImage2.body.status[0]);
    expect(returnedImageResponse.body.Created_date).toBe(testImage2.body.Created_date);
  })
});

describe("PUT /images", () => {
  test("update existing image", async () => {
    const updatedImageName = `updated ${testImage3.body.name}`;
    const updatedImageResponse = await request(app)
      .put(`/images/${testImage3.body._id}`)
      .send({
        name: updatedImageName
      });
    expect(updatedImageResponse.statusCode).toBe(200);
    expect(updatedImageResponse.body.name).toBe(updatedImageName);
    expect(updatedImageResponse.body.status[0]).toBe(testImage3.body.status[0]);
    expect(updatedImageResponse.body.Created_date).toBe(testImage3.body.Created_date);
  });
})
