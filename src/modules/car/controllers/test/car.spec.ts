import { HttpStatus, INestApplication } from "@nestjs/common";
import { Test } from "@nestjs/testing";
import { AppModule } from "../../../../app.module";
import * as request from "supertest"

describe('Car - [/car]', () => {
  let app: INestApplication;

  const test = {
    id: null,
    license: `licTest${Math.random()}`,
    brand: "braTest123",
    image: "imgTest123",
  }

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();
  })


  describe('Get all - [GET /car]', () => {
    it('Should return an array of cars', async () => {
      return request(app.getHttpServer())
        .get('/car')
        .expect(HttpStatus.OK)
    });
  });

  describe('Create car - [POST /car]', () => {
    it('Should return a car', async () => {
      return request(app.getHttpServer())
        .post('/car')
        .send(test)
        .set('Accept', 'application/json')
        .expect(HttpStatus.CREATED)
        .then(({ body }) => {
          expect(body.license).toBe(test.license);
          expect(body.brand).toBe(test.brand);
          expect(body.image).toBe(test.image);
        })
    })
  })

  describe('Update car - [PUT /car]', () => {
    it('Should return a car', async () => {
      const updateCar = {
        license: "updatedCar123" + Math.random(),
        brand: "brandCar123",
        image: "imgCar123"
      }
      const updatedCar = {
        image: "tested123"
      }
      let id
      await request(app.getHttpServer())
        .post('/car')
        .send(updateCar)
        .set('Accept', 'application/json')
        .expect(HttpStatus.CREATED)
        .then(({ body }) => {
          id = body.id
        })

      await request(app.getHttpServer())
        .put("/car/" + id)
        .send(updatedCar)
        .set('Accept', 'application/json')
        .expect(HttpStatus.OK)
        .then((response) => {
          expect(response.body.image).toBe(updatedCar.image)
        })
    })
  })

  describe('Delete car - [DELETE /car]', () => {
    it('Should return a car', async() => {
      const updateCar = {
        license: "updatedCar123" + Math.random(),
        brand: "brandCar123",
        image: "imgCar123"
      }

      let id
      await request(app.getHttpServer())
        .post('/car')
        .send(updateCar)
        .set('Accept', 'application/json')
        .expect(HttpStatus.CREATED)
        .then(({ body }) => {
          id = body.id
        })

      await request(app.getHttpServer())
        .delete("/car/" + id)
        .send(updateCar)
        .set('Accept', 'application/json')
        .expect(HttpStatus.OK)
        .then((response) => {
          expect(response.body.license).toBe(updateCar.license);
          expect(response.body.brand).toBe(updateCar.brand);
          expect(response.body.image).toBe(updateCar.image)
        })
    })
  })

  afterAll(async () => {
    await app.close();
  });
});