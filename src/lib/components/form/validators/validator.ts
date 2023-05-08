export abstract class Validator {
	validate(fieldValue: any): void {
		const isNotValid = !this.passesValidationRule(fieldValue);

		if (isNotValid) {
			throw new Error(this.getMessage());
		}
	}

	abstract passesValidationRule(fieldValue: string): boolean;
	abstract getMessage(): string;
}
