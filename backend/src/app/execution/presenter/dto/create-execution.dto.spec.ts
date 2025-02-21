import { validate } from "class-validator";
import { CreateExecutionDto } from "./create-execution.dto";

describe('CreateExecutionDto', () => {
    it('should validate with correct flowId', async () => {
        const dto = new CreateExecutionDto();
        dto.flowId = 'validFlowId';

        const errors = await validate(dto);
        expect(errors.length).toBe(0);
    });

    it('should not validate with empty flowId', async () => {
        const dto = new CreateExecutionDto();
        dto.flowId = '';

        const errors = await validate(dto);
        expect(errors.length).toBeGreaterThan(0);
    });

    it('should not validate with non-string flowId', async () => {
        const dto = new CreateExecutionDto();
        dto.flowId = 123 as any;

        const errors = await validate(dto);
        expect(errors.length).toBeGreaterThan(0);
    });
});