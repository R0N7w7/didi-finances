export class CreateCheckDto {
    project: string;
    checkNumber: number;
    amount: number;
    month: string;
    requestNumber: string;
    part: string;
    area: string;
    observations?: string;
    receiver: string;
    deliveredBy: string;
    associatedId: number;

    constructor(
        project: string,
        checkNumber: number,
        amount: number,
        month: string,
        requestNumber: string,
        part: string,
        area: string,
        receiver: string,
        deliveredBy: string,
        associatedId: number,
        observations?: string,
    ) {
        this.project = project;
        this.checkNumber = checkNumber;
        this.amount = amount;
        this.month = month;
        this.requestNumber = requestNumber;
        this.part = part;
        this.area = area;
        this.receiver = receiver;
        this.deliveredBy = deliveredBy;
        this.associatedId = associatedId
        this.observations = observations;
    }
}

export class UpdateCheckDto implements Partial<CreateCheckDto> {
    project?: string;
    checkNumber?: number;
    amount?: number;
    month?: string;
    requestNumber?: string;
    part?: string;
    area?: string;
    observations?: string;
    receiver?: string;
    deliveredBy?: string;
    associatedId?: number;
}
