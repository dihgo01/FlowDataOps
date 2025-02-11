import { validate } from "class-validator";
import { CreateFlowDto } from "./create-flow.dto";

describe('CreateFlowDto', () => {
    it('should validate a valid CreateFlowDto object', async () => {
        const dto = new CreateFlowDto();
        dto.flowName = 'Test Flow';
        dto.description = 'This is a test flow description';

        const errors = await validate(dto);
        expect(errors.length).toBe(0);
    });

    it('should not validate when flowName is missing', async () => {
        const dto = new CreateFlowDto();
        dto.description = 'This is a test flow description';

        const errors = await validate(dto);
        expect(errors.length).toBeGreaterThan(0);
        expect(errors[0].property).toBe('flowName');
    });

    it('should not validate when flowName is empty', async () => {
        const dto = new CreateFlowDto();
        dto.flowName = '';
        dto.description = 'This is a test flow description';

        const errors = await validate(dto);
        expect(errors.length).toBeGreaterThan(0);
        expect(errors[0].property).toBe('flowName');
    });

    it('should validate when description is missing', async () => {
        const dto = new CreateFlowDto();
        dto.flowName = 'Test Flow';

        const errors = await validate(dto);
        expect(errors.length).toBe(0);
    });

    it('should validate when description is empty', async () => {
        const dto = new CreateFlowDto();
        dto.flowName = 'Test Flow';
        dto.description = '';

        const errors = await validate(dto);
        expect(errors.length).toBe(0);
    });
});