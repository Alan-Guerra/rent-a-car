import { HttpStatus, INestApplication } from "@nestjs/common";
import { Test } from "@nestjs/testing";
import { AppModule } from "../../../../app.module";
import * as request from "supertest"
import { stringify } from "querystring";

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
    });

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

  
    afterAll(async () => {
      await app.close();
    });
  });