import type { FormInput } from './types';

export interface ValidationResult {
    valid: boolean;
    message?: string;
}

const MIN_TITLE_LENGTH = 3;
const MIN_DESCRIPTION_LENGTH = 10;

/**
 * Validates the form input data and returns a ValidationResult object.
 * @param formData The form input data
 * @returns ValidationResult object containing the validation status and a message if invalid
 */
export default function validateForm(formData: FormInput): ValidationResult {
    if (!formData.title || formData.title.length < MIN_TITLE_LENGTH) {
        return {
            valid: false,
            message: `Title must be at least ${MIN_TITLE_LENGTH} characters long.`,
        };
    }

    if (
        !formData.description ||
        formData.description.length < MIN_DESCRIPTION_LENGTH
    ) {
        return {
            valid: false,
            message: `Description must be at least ${MIN_DESCRIPTION_LENGTH} characters long.`,
        };
    }

    return {
        valid: true,
    };
}
