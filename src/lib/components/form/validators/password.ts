import { Validator } from './validator';

export class PasswordValidator extends Validator {
	private readonly passwordRegex = /^[A-Za-z\d]{8,}$/;

	passesValidationRule(fieldValue: string): boolean {
		if (!fieldValue || !this.passwordRegex.test(fieldValue)) {
			return false;
		}

		return true;
	}

	getMessage(): string {
		return 'Password must be at least 8 characters long.';
	}
}
