import { Validator } from './validator';

export class TaskIntervalValidator extends Validator {
    passesValidationRule(fieldValue: string): boolean {
        if (parseInt(fieldValue) >= 1 && parseInt(fieldValue) <= 30) {
            return true;
        }

        return false;
    }
    getMessage(): string {
        return 'Only between 1 and 30 days.';
    }
}
