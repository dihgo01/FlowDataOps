import { UpdateStepDto } from './update-execution.dto';
import { CreateStepDto } from './create-execution.dto';

describe('UpdateStepDto', () => {
    it('should be defined', () => {
        expect(new UpdateStepDto()).toBeDefined();
    });

    it('should inherit properties from CreateStepDto', () => {
        const createStepDto = new CreateStepDto();
        const updateStepDto = new UpdateStepDto();

        for (const key in createStepDto) {
            expect(updateStepDto).toHaveProperty(key);
        }
    });

    it('should allow partial updates', () => {
        const partialUpdate = { stepName: 'Updated Step' };
        const updateStepDto = new UpdateStepDto(partialUpdate);
        updateStepDto.stepName = partialUpdate.stepName;

        expect(updateStepDto.stepName).toBe(partialUpdate.stepName);
    });
});