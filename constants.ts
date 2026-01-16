
import { Exercise } from './types';

export const EXERCISES: Exercise[] = [
  { id: '1', name: 'Bench Press (Barbell)', category: 'Chest', equipment: 'Barbell' },
  { id: '2', name: 'Squat (Barbell)', category: 'Legs', equipment: 'Barbell' },
  { id: '3', name: 'Deadlift (Barbell)', category: 'Back', equipment: 'Barbell' },
  { id: '4', name: 'Overhead Press (Barbell)', category: 'Shoulders', equipment: 'Barbell' },
  { id: '5', name: 'Bicep Curl (Dumbbell)', category: 'Arms', equipment: 'Dumbbells' },
  { id: '6', name: 'Tricep Pushdown', category: 'Arms', equipment: 'Cable' },
  { id: '7', name: 'Lat Pulldown', category: 'Back', equipment: 'Machine' },
  { id: '8', name: 'Leg Press', category: 'Legs', equipment: 'Machine' },
  { id: '9', name: 'Push Up', category: 'Chest', equipment: 'Bodyweight' },
  { id: '10', name: 'Pull Up', category: 'Back', equipment: 'Bodyweight' },
  { id: '11', name: 'Incline Bench Press (Dumbbell)', category: 'Chest', equipment: 'Dumbbells' },
  { id: '12', name: 'Lateral Raise (Dumbbell)', category: 'Shoulders', equipment: 'Dumbbells' },
  { id: '13', name: 'Bulgarian Split Squat', category: 'Legs', equipment: 'Dumbbells' },
  { id: '14', name: 'Romanian Deadlift (Barbell)', category: 'Legs', equipment: 'Barbell' },
  { id: '15', name: 'Seated Row (Cable)', category: 'Back', equipment: 'Cable' },
];

export const CATEGORIES = Array.from(new Set(EXERCISES.map(e => e.category)));
