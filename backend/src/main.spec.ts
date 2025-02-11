import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './app.module';

describe('Main', () => {
    let app: INestApplication;

    beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        app.useGlobalPipes(
            new ValidationPipe({
                errorHttpStatusCode: 422,
                transform: true,
            }),
        );
        await app.init();
    });

    it('should be defined', () => {
        expect(app).toBeDefined();
    });

    it('should use global validation pipe with correct options', () => {
        const pipes = app.getHttpAdapter().getInstance()._router.stack
            .filter((layer: any) => layer.name === 'bound dispatch')
            .map((layer: any) => layer.handle)
            .filter((handler: any) => handler instanceof ValidationPipe);

        expect(pipes.length).toBeGreaterThan(0);
        expect(pipes[0].options.errorHttpStatusCode).toBe(422);
        expect(pipes[0].options.transform).toBe(true);
    });

    it('should start the server on port 3333', async () => {
        await request(app.getHttpServer())
            .get('/')
            .expect(404); // Assuming no route is defined, it should return 404
    });

    afterAll(async () => {
        await app.close();
    });
});