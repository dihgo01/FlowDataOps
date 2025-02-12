import { CreateFlowDto } from "../../presenter/dto/create-flow.dto";
import { Flow } from "../entities/flow.entity";

/*export class FlowDtoToEntityParser {
    public static convert(dto: CreateFlowDto): Flow {
        const flow = new Flow({
            flowName: dto.flowName,
            description: dto.description,
            steps: dto.workflowSteps?.map((step) => {
                return {
                    step: {
                        id: step.stepId,
                        flow: null, // or appropriate value
                        createdAt: new Date(),
                        updatedAt: new Date()
                    },
                    configuration: step.configuration,
                    order: step.order
                };
            })
        });
       
        return flow;
    }
}*/ 