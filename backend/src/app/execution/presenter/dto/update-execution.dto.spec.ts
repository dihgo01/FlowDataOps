import { validate } from 'class-validator';
import { UpdateExecutionDto } from './update-execution.dto';

describe('UpdateExecutionDto', () => {
    it('should validate with all optional fields', async () => {
        const dto = new UpdateExecutionDto();
        dto.status = 'completed';
        dto.dateExecution = '2025-02-24 15:06:48';
        dto.outputResponse = '{"result": "success"}';

        const errors = await validate(dto);
        expect(errors.length).toBe(0);
    });

    it('should validate with no fields', async () => {
        const dto = new UpdateExecutionDto();

        const errors = await validate(dto);
        expect(errors.length).toBe(0);
    });

    it('should fail validation with incorrect status type', async () => {
        const dto = new UpdateExecutionDto();
        dto.status = 123 as any;

        const errors = await validate(dto);
        expect(errors.length).toBeGreaterThan(0);
        expect(errors[0].constraints?.isString).toBeDefined();
    });

    it('should fail validation with incorrect dateExecution type', async () => {
        const dto = new UpdateExecutionDto();
        dto.dateExecution = new Date() as any;

        const errors = await validate(dto);
        expect(errors.length).toBeGreaterThan(0);
        expect(errors[0].constraints?.isString).toBeDefined();
    });
});