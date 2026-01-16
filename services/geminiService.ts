
import { GoogleGenAI } from "@google/genai";
import { Workout } from "../types";

// Always use process.env.API_KEY directly as per SDK guidelines
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getWorkoutInsights = async (history: Workout[]) => {
  if (history.length === 0) return "Start logging your workouts to get personalized AI insights!";

  const recentWorkouts = history.slice(-5).map(w => ({
    name: w.name,
    exercises: w.exercises.map(e => ({
      name: e.name,
      totalVolume: e.sets.reduce((acc, s) => acc + (s.weight * s.reps), 0)
    }))
  }));

  const prompt = `
    Based on the following recent workout history, provide a concise analysis of progress, 
    recommend which muscle group to hit next, and suggest one specific tip for improvement.
    Keep it encouraging and brief (under 150 words).

    History: ${JSON.stringify(recentWorkouts)}
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });
    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return "The AI Coach is taking a breather. Please check back later!";
  }
};

export const suggestNewWorkout = async (goal: string, frequency: string) => {
  const prompt = `
    The user wants to achieve this goal: "${goal}" with a frequency of ${frequency} workouts per week.
    Generate a simple workout routine (name of exercises, target sets/reps).
    Format the response as a clean bulleted list.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });
    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Error generating suggestion.";
  }
};
