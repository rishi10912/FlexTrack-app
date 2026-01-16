
import { useState, useEffect } from 'react';
import { Workout, ExerciseEntry, Set as ExerciseSet } from '../types';

export const useWorkoutData = () => {
  const [history, setHistory] = useState<Workout[]>([]);
  const [activeWorkout, setActiveWorkout] = useState<Workout | null>(null);

  // Load from localStorage on mount
  useEffect(() => {
    const savedHistory = localStorage.getItem('flexTrack_history');
    if (savedHistory) setHistory(JSON.parse(savedHistory));
  }, []);

  // Save to localStorage whenever history changes
  useEffect(() => {
    localStorage.setItem('flexTrack_history', JSON.stringify(history));
  }, [history]);

  const startWorkout = (template?: Workout) => {
    const newWorkout: Workout = template ? {
      ...template,
      id: Date.now().toString(),
      date: new Date().toISOString(),
      startTime: Date.now(),
      isTemplate: false
    } : {
      id: Date.now().toString(),
      name: 'New Workout',
      date: new Date().toISOString(),
      startTime: Date.now(),
      exercises: [],
      isTemplate: false
    };
    setActiveWorkout(newWorkout);
  };

  const addExerciseToActive = (exerciseId: string, name: string) => {
    if (!activeWorkout) return;
    const newEntry: ExerciseEntry = {
      id: Date.now().toString(),
      exerciseId,
      name,
      // Fix: Use 'as const' to prevent literal 'normal' from widening to 'string'
      sets: [{ id: Math.random().toString(), weight: 0, reps: 0, completed: false, type: 'normal' as const }]
    };
    setActiveWorkout({
      ...activeWorkout,
      exercises: [...activeWorkout.exercises, newEntry]
    });
  };

  const updateSet = (exerciseEntryId: string, setId: string, updates: Partial<ExerciseSet>) => {
    if (!activeWorkout) return;
    const updatedExercises = activeWorkout.exercises.map(ex => {
      if (ex.id === exerciseEntryId) {
        return {
          ...ex,
          sets: ex.sets.map(s => s.id === setId ? { ...s, ...updates } : s)
        };
      }
      return ex;
    });
    setActiveWorkout({ ...activeWorkout, exercises: updatedExercises });
  };

  const addSet = (exerciseEntryId: string) => {
    if (!activeWorkout) return;
    // Fix: Explicitly type updatedExercises to ExerciseEntry[] to avoid inference issues with nested union types
    const updatedExercises: ExerciseEntry[] = activeWorkout.exercises.map(ex => {
      if (ex.id === exerciseEntryId) {
        const lastSet = ex.sets[ex.sets.length - 1];
        return {
          ...ex,
          sets: [...ex.sets, { 
            id: Math.random().toString(), 
            weight: lastSet?.weight || 0, 
            reps: lastSet?.reps || 0, 
            completed: false, 
            // Fix: Use 'as const' to prevent literal 'normal' from widening to 'string'
            type: 'normal' as const 
          }]
        };
      }
      return ex;
    });
    setActiveWorkout({ ...activeWorkout, exercises: updatedExercises });
  };

  const finishWorkout = () => {
    if (!activeWorkout) return;
    const completedWorkout = { ...activeWorkout, endTime: Date.now() };
    setHistory(prev => [completedWorkout, ...prev]);
    setActiveWorkout(null);
  };

  const deleteWorkout = (id: string) => {
    setHistory(prev => prev.filter(w => w.id !== id));
  };

  return {
    history,
    activeWorkout,
    startWorkout,
    addExerciseToActive,
    updateSet,
    addSet,
    finishWorkout,
    setActiveWorkout,
    deleteWorkout
  };
};
