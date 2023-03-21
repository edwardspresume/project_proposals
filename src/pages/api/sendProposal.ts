import { PrismaClient } from '@prisma/client';
import type { APIRoute } from 'astro';
import type { FormInput } from '../../util/types';
import validateForm, { ValidationResult } from '../../util/validateForm';

const prisma = new PrismaClient();

/**
 * Trims whitespace from the form input values and returns a new object.
 * @param data The form input data
 * @returns The trimmed form input data
 */
const trimFormInputValues = (data: FormInput): FormInput => {
    return {
        title: data.title?.trim() ?? null,
        description: data.description?.trim() ?? null,
    };
};

/**
 * Handles the POST request to create a new proposal.
 */
export const post: APIRoute = async ({ request }) => {
    try {
        const rawData = await request.formData();
        const formData: FormInput = {
            title: rawData.get('title') as string | null,
            description: rawData.get('description') as string | null,
        };

        const trimmedData = trimFormInputValues(formData);
        const validationResult: ValidationResult = validateForm(trimmedData);

        if (!validationResult.valid) {
            return new Response(
                JSON.stringify({
                    message: validationResult.message,
                }),
                { status: 400 }
            );
        }

        const createdProposal = await prisma.proposal.create({
            data: {
                title: trimmedData.title!,
                description: trimmedData.description!,
            },
        });

        // Return a success response after creating the proposal
        return new Response(
            JSON.stringify({
                message: 'Proposal sent successfully!',
                proposal: createdProposal,
            }),
            { status: 201 }
        );
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error(error);
        } else {
            console.error(new Error(`Unknown error: ${JSON.stringify(error)}`));
        }

        // Return a server error response in case of an unexpected error
        return new Response(
            JSON.stringify({
                message: 'An error occurred while processing your request.',
                error: error instanceof Error ? error.message : 'Unknown error',
            }),
            { status: 500 }
        );
    }
};
