import { UpdateFlowDto } from './update-flow.dto';
import { CreateFlowDto } from './create-flow.dto';

describe('UpdateFlowDto', () => {
    it('should be defined', () => {
        expect(new UpdateFlowDto()).toBeDefined();
    });

    it('should extend CreateFlowDto', () => {
        const updateFlowDto = new UpdateFlowDto();
        expect(updateFlowDto).toBeInstanceOf(UpdateFlowDto);
    });

    it('should allow partial CreateFlowDto properties', () => {
        const partialDto: Partial<CreateFlowDto> = { flowName: 'Test Flow' };
        const updateFlowDto = new UpdateFlowDto(partialDto);
        updateFlowDto.flowName = partialDto.flowName;

        expect(updateFlowDto.flowName).toEqual(partialDto.flowName);
    });
});