
'use server';

import {
  generatePersonalizedStudyPlan,
  type GeneratePersonalizedStudyPlanInput,
} from '@/ai/flows/generate-personalized-study-plan';
import {
  generateAdaptiveQuiz,
  type GenerateAdaptiveQuizInput,
} from '@/ai/flows/generate-adaptive-quiz';
import {
  getPersonalizedTutoring,
  type GetPersonalizedTutoringInput,
} from '@/ai/flows/get-personalized-tutoring';
import {
    generateTimetable,
    type GenerateTimetableInput,
} from '@/ai/flows/generate-timetable';
import {
    generateProfileSummary,
    type GenerateProfileSummaryInput,
} from '@/ai/flows/generate-profile-summary';

export async function createStudyPlanAction(
  input: GeneratePersonalizedStudyPlanInput
) {
  try {
    const result = await generatePersonalizedStudyPlan(input);
    return { success: true, data: result };
  } catch (error) {
    console.error(error);
    return { success: false, error: 'Failed to generate study plan.' };
  }
}

export async function createQuizAction(input: GenerateAdaptiveQuizInput) {
  try {
    const result = await generateAdaptiveQuiz(input);
    return { success: true, data: result };
  } catch (error) {
    console.error(error);
    return { success: false, error: 'Failed to generate quiz.' };
  }
}

export async function getTutorResponseAction(
  input: GetPersonalizedTutoringInput
) {
  try {
    const result = await getPersonalizedTutoring(input);
    return { success: true, data: result };
  } catch (error) {
    console.error(error);
    return { success: false, error: 'Failed to get response from tutor.' };
  }
}

export async function createTimetableAction(input: GenerateTimetableInput) {
    try {
      const result = await generateTimetable(input);
      return { success: true, data: result };
    } catch (error) {
      console.error(error);
      return { success: false, error: 'Failed to generate timetable.' };
    }
}

export async function createProfileSummaryAction(input: GenerateProfileSummaryInput) {
    try {
        const result = await generateProfileSummary(input);
        return { success: true, data: result };
    } catch (error) {
        console.error(error);
        return { success: false, error: 'Failed to generate summary.' };
    }
}
