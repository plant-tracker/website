import { Validator } from './validator';

export class EmailValidator extends Validator {
	private readonly emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

	passesValidationRule(fieldValue: string): boolean {
		if (!fieldValue || !this.emailRegex.test(fieldValue)) {
			return false;
		}

		return true;
	}

	getMessage(): string {
		return 'Please enter a valid email address.';
	}
}
