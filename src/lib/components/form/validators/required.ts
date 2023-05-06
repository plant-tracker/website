import { Validator } from './validator';

export class RequiredValidator extends Validator {
    passesValidationRule(fieldValue: string): boolean {
        if (!fieldValue) {
            return false;
        }

        return true;
    }
    getMessage(): string {
        return "This field is required."
    };
}
