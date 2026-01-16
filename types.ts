
export interface Set {
  id: string;
  weight: number;
  reps: number;
  completed: boolean;
  type: 'warmup' | 'normal' | 'failure' | 'dropset';
}

export interface ExerciseEntry {
  id: string;
  exerciseId: string;
  name: string;
  sets: Set[];
}

export interface Workout {
  id: string;
  name: string;
  date: string;
  startTime: number;
  endTime?: number;
  exercises: ExerciseEntry[];
  isTemplate: boolean;
  notes?: string;
}

export interface Exercise {
  id: string;
  name: string;
  category: string;
  equipment: string;
}

export type ViewType = 'dashboard' | 'workout' | 'history' | 'exercises' | 'coach';
