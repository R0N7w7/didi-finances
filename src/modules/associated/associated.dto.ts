export class CreateAssociatedDto {
    name: string;

    constructor(name: string) {
        this.name = name;
    }
}

export class UpdateAssociatedDto implements Partial<CreateAssociatedDto> {
    name?: string;
}
