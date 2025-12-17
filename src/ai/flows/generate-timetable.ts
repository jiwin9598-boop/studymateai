'use server';

/**
 * @fileOverview A flow for generating a personalized daily timetable.
 *
 * - generateTimetable - A function that generates a timetable based on subjects, study preferences, and breaks.
 * - GenerateTimetableInput - The input type for the generateTimetable function.
 * - GenerateTimetableOutput - The return type for the generateTimetable function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateTimetableInputSchema = z.object({
    subjects: z.array(z.string()).describe('A list of subjects to include in the timetable.'),
    studyTime: z.object({
        start: z.string().describe('The start time for studying (e.g., "09:00 AM").'),
        end: z.string().describe('The end time for studying (e.g., "05:00 PM").'),
    }),
    breakPreferences: z.object({
        duration: z.number().describe('The duration of each break in minutes.'),
        frequency: z.number().describe('The number of study sessions before a break is taken.'),
    }),
});
export type GenerateTimetableInput = z.infer<typeof GenerateTimetableInputSchema>;

const GenerateTimetableOutputSchema = z.object({
  timetable: z.string().describe('A detailed daily timetable in Markdown format.'),
});
export type GenerateTimetableOutput = z.infer<typeof GenerateTimetableOutputSchema>;

export async function generateTimetable(
  input: GenerateTimetableInput
): Promise<GenerateTimetableOutput> {
  return generateTimetableFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateTimetablePrompt',
  input: {schema: GenerateTimetableInputSchema},
  output: {schema: GenerateTimetableOutputSchema},
  prompt: `You are an expert timetable creator. Create a personalized daily study timetable based on the following preferences.

Subjects: {{#each subjects}}{{{this}}}{{#unless @last}}, {{/unless}}{{/each}}
Study Window: From {{{studyTime.start}}} to {{{studyTime.end}}}.
Break Preferences: A {{{breakPreferences.duration}}} minute break after every {{{breakPreferences.frequency}}} study session(s).

Create a schedule that intelligently allocates time for each subject within the specified study window.
Each study session for a subject should be a reasonable length (e.g., 45-60 minutes).
Incorporate breaks as requested.
The final output should be a clean, easy-to-read timetable in Markdown format.
Structure the output with time slots and the corresponding activity (e.g., a subject name or "Break").
`,
});

const generateTimetableFlow = ai.defineFlow(
  {
    name: 'generateTimetableFlow',
    inputSchema: GenerateTimetableInputSchema,
    outputSchema: GenerateTimetableOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
