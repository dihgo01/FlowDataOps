import { validate } from "class-validator";
import { CreateStepDto } from "./create-step.dto";

describe('CreateStepDto', () => {
    it('should validate a valid CreateStepDto object', async () => {
        const dto = new CreateStepDto();
        dto.stepName = 'Test Step';
        dto.description = 'This is a test step description';
        dto.icon = 'path/icon';
        dto.type = 'HTTP';
        dto.config = '{}';

        const errors = await validate(dto);
        expect(errors.length).toBe(0);
    });

    it('should not validate when stepName is missing', async () => {
        const dto = new CreateStepDto();
        dto.description = 'This is a test step description';

        const errors = await validate(dto);
        expect(errors.length).toBeGreaterThan(0);
        expect(errors[0].property).toBe('stepName');
    });

    it('should not validate when stepName is empty', async () => {
        const dto = new CreateStepDto();
        dto.stepName = '';
        dto.description = 'This is a test step description';

        const errors = await validate(dto);
        expect(errors.length).toBeGreaterThan(0);
        expect(errors[0].property).toBe('stepName');
    });

    it('should validate when description is missing', async () => {
        const dto = new CreateStepDto();
        dto.stepName = 'Test Step';
        dto.icon = 'path/icon';
        dto.type = 'HTTP';
        dto.config = '{}';

        const errors = await validate(dto);
        expect(errors.length).toBe(0);
    });

    it('should validate when description is empty', async () => {
        const dto = new CreateStepDto();
        dto.stepName = 'Test Step';
        dto.icon = 'path/icon';
        dto.type = 'HTTP';
        dto.config = '{}';
        dto.description = '';

        const errors = await validate(dto);
        expect(errors.length).toBe(0);
    });

    it('should not validate when icon is missing', async () => {
        const dto = new CreateStepDto();
        dto.stepName = 'Test Step';
        dto.type = 'HTTP';

        const errors = await validate(dto);
        expect(errors.length).toBeGreaterThan(0);
        expect(errors[0].property).toBe('icon');
    });

    it('should not validate when type is missing', async () => {
        const dto = new CreateStepDto();
        dto.stepName = 'Test Step';
        dto.icon = 'path/icon';

        const errors = await validate(dto);
        expect(errors.length).toBeGreaterThan(0);
        expect(errors[0].property).toBe('type');
    });

    it('should validate when config is missing', async () => {
        const dto = new CreateStepDto();
        dto.stepName = 'Test Step';
        dto.icon = 'path/icon';
        dto.type = 'HTTP';

        const errors = await validate(dto);
        expect(errors.length).toBe(0);
    });

    it('should validate when config is empty', async () => {
        const dto = new CreateStepDto();
        dto.stepName = 'Test Step';
        dto.icon = 'path/icon';
        dto.type = 'HTTP';
        dto.config = '';

        const errors = await validate(dto);
        expect(errors.length).toBe(0);
    });
});
