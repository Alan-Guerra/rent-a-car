import { HttpStatus, INestApplication } from "@nestjs/common";
import { Test } from "@nestjs/testing";
import { AppModule } from "../../../../app.module";
import * as request from "supertest";

describe('User - [/user]', () => {
    let app: INestApplication;

    const userTest = {
        id: null,
        username: "testUsername",
        password: "testPass",
        firstName: "testFirstName",
        lastName: "testLastName",
        document: -9999999,
    }

    beforeAll(async () => {
        const moduleRef = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleRef.createNestApplication();
        await app.init();
    })

    describe('Get all users - [GET /user]', () => {
        it('Should return an array of users', async () => {
            return request(app.getHttpServer())
                .get('/user')
                .expect(HttpStatus.OK)
        });
    });

    describe('Create user - [POST /user]', () => {
        it('Should return a new user', async () => {
            return request(app.getHttpServer())
                .post('/user')
                .send(userTest)
                .set('Accept', 'application/json')
                .expect(HttpStatus.CREATED)
                .then(({ body }) => {
                    expect(body.username).toBe(userTest.username);
                    expect(body.password).toBe(userTest.password);
                    expect(body.firstName).toBe(userTest.firstName);
                    expect(body.lastName).toBe(userTest.lastName);
                    expect(body.document).toBe(userTest.document);
                    userTest.id = body.id;
                })
        })
    })

    describe('Get user - [GET /user]', () => {
        it('Should return a user', async () => {
            return request(app.getHttpServer())
            .get(`/user/${userTest.id}`)
            .expect(HttpStatus.OK)
        })
    })

    describe('Update user - [PUT /user]', () => {
        it('Should return a user with changed data', async () => {
            const updatedUser = {
                username: "updatedUsername",
                password: "updatedPass",
                firstName: "updatedFirstName",
                lastName: "updatedLastName",
                document: -8888888,
            }
            return request(app.getHttpServer())
                .put(`/user/${userTest.id}`)
                .send(updatedUser)
                .set('Accept', 'application/json')
                .expect(HttpStatus.OK)
                .then(({ body }) => {
                    expect(body.username).toBe(updatedUser.username);
                    expect(body.password).toBe(updatedUser.password);
                    expect(body.firstName).toBe(updatedUser.firstName);
                    expect(body.lastName).toBe(updatedUser.lastName);
                    expect(body.document).toBe(updatedUser.document);
                })
        })
    })

    describe('Delete user - [DELETE /user]', () => {
        it('Should return the deleted user', async () => {
            return request(app.getHttpServer())
                .delete(`/user/${userTest.id}`)
                .send(userTest)
                .set('Accept', 'application/json')
                .expect(HttpStatus.OK)
        })
    })

    afterAll(async () => {
        await app.close();
    });
});
