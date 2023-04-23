import { PrismaClient } from '@prisma/client';
import type { APIRoute } from 'astro';
import { sendEmail } from '../../utils/sendEmail';
import { proposalInputSchema } from '../../utils/validationSchemas';

const prisma = new PrismaClient();

export const post: APIRoute = async ({ request }) => {
    try {
        const formData = Object.fromEntries(await request.formData());

        const validationResult = proposalInputSchema.safeParse(formData);

        if (!validationResult.success) {
            const fieldErrors = {};
            for (const error of validationResult.error.errors) {
                fieldErrors[error.path.join('.')] = error.message;
            }

            return {
                status: 400,
                body: JSON.stringify({
                    ok: false,
                    message: 'Validation error',
                    errors: fieldErrors,
                }),
                headers: { 'Content-Type': 'application/json' },
            };
        }

        const createdProposal = await prisma.proposal.create({
            data: validationResult.data,
        });

        await sendEmail({
            from: `Sender <${formData.email}>`,
            to: process.env.GMAIL_USER,
            replyTo: formData.email,
            subject: `Project proposal: ${formData.title}`,
            html: `
                <h1>${formData.title}</h1>
                <p>${formData.description}</p>
            `,
        });

        return {
            status: 201,
            body: JSON.stringify({
                ok: true,
                message: 'Proposal sent successfully!',
                data: { proposal: createdProposal },
            }),
            headers: { 'Content-Type': 'application/json' },
        };
    } catch (error) {
        console.error('Error:', error);
        let errorMessage = 'An error occurred while processing your request.';

        if (error instanceof Error) {
            if (error.message.includes('Database error')) {
                errorMessage = 'An error occurred while creating the proposal.';
            } else if (error.message.includes('Email error')) {
                errorMessage = 'An error occurred while sending the email.';
            }
        }

        return {
            status: 500,
            body: JSON.stringify({ ok: false, message: errorMessage }),
            headers: { 'Content-Type': 'application/json' },
        };
    }
};
