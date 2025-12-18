
'use server';

/**
 * @fileOverview Generates a personalized summary based on a student's subjects and marks.
 *
 * - generateProfileSummary - A function that generates the summary.
 * - GenerateProfileSummaryInput - The input type for the generateProfileSummary function.
 * - GenerateProfileSummaryOutput - The return type for the generateProfileSummary function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateProfileSummaryInputSchema = z.object({
  subjects: z.array(
    z.object({
      name: z.string(),
      mark: z.number(),
    })
  ).describe("A list of subjects and the student's corresponding marks (out of 100)."),
});
export type GenerateProfileSummaryInput = z.infer<typeof GenerateProfileSummaryInputSchema>;

const GenerateProfileSummaryOutputSchema = z.object({
  summary: z.string().describe('A friendly and encouraging summary of the student\'s performance, highlighting areas for improvement.'),
});
export type GenerateProfileSummaryOutput = z.infer<typeof GenerateProfileSummaryOutputSchema>;


export async function generateProfileSummary(
    input: GenerateProfileSummaryInput
): Promise<GenerateProfileSummaryOutput> {
    return generateProfileSummaryFlow(input);
}

const prompt = ai.definePrompt({
    name: 'generateProfileSummaryPrompt',
    input: {schema: GenerateProfileSummaryInputSchema},
    output: {schema: GenerateProfileSummaryOutputSchema},
    prompt: `You are an encouraging academic advisor. Analyze the student's subjects and marks (out of 100).

    Subjects and Marks:
    {{#each subjects}}
    - {{{name}}}: {{{mark}}}
    {{/each}}

    Provide a brief, positive, and encouraging summary of their performance.
    Gently highlight the subjects where they could improve the most (generally, the ones with lower marks).
    Keep the tone friendly and motivational. Frame the suggestions for improvement in a positive light (e.g., "This could be a great area to focus on next!").
    Output the summary as a single paragraph.
    `,
});

const generateProfileSummaryFlow = ai.defineFlow(
    {
        name: 'generateProfileSummaryFlow',
        inputSchema: GenerateProfileSummaryInputSchema,
        outputSchema: GenerateProfileSummaryOutputSchema,
    },
    async (input) => {
        const {output} = await prompt(input);
        return output!;
    }
);
