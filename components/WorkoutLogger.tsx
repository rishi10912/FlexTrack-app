
import React, { useState } from 'react';
// Fix: Corrected import to use 'Set as ExerciseSet' because types.ts exports 'Set'
import { Workout, Set as ExerciseSet, ExerciseEntry } from '../types';
import { EXERCISES } from '../constants';
import { Check, X, Plus, Trash2, Search, ChevronDown } from 'lucide-react';

interface WorkoutLoggerProps {
  workout: Workout;
  onUpdateSet: (exId: string, setId: string, updates: Partial<ExerciseSet>) => void;
  onAddSet: (exId: string) => void;
  onAddExercise: (id: string, name: string) => void;
  onFinish: () => void;
  onCancel: () => void;
}

const WorkoutLogger: React.FC<WorkoutLoggerProps> = ({ 
  workout, 
  onUpdateSet, 
  onAddSet, 
  onAddExercise, 
  onFinish,
  onCancel
}) => {
  const [showExercisePicker, setShowExercisePicker] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredExercises = EXERCISES.filter(e => 
    e.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-4 pt-8">
      <header className="flex justify-between items-center mb-6">
        <button onClick={onCancel} className="text-zinc-500 hover:text-white">
          <X size={24} />
        </button>
        <input 
          type="text" 
          value={workout.name} 
          onChange={() => {}} // Could add edit logic
          className="bg-transparent text-xl font-bold text-center focus:outline-none"
        />
        <button 
          onClick={onFinish}
          className="bg-blue-600 text-white px-4 py-1.5 rounded-full font-bold text-sm hover:bg-blue-500"
        >
          Finish
        </button>
      </header>

      {/* Exercise List */}
      <div className="space-y-6">
        {workout.exercises.map((entry) => (
          <div key={entry.id} className="bg-zinc-900/50 rounded-2xl overflow-hidden border border-zinc-800">
            <div className="bg-zinc-900 p-4 border-b border-zinc-800 flex justify-between items-center">
              <h3 className="font-bold text-blue-400">{entry.name}</h3>
              <div className="flex gap-4 text-xs text-zinc-500 font-bold">
                <span>REPS</span>
                <span>WEIGHT</span>
              </div>
            </div>
            
            <div className="p-4 space-y-3">
              {entry.sets.map((set, idx) => (
                <div key={set.id} className="flex items-center gap-3">
                  <div className="w-6 h-6 flex items-center justify-center bg-zinc-800 text-[10px] font-bold rounded">
                    {idx + 1}
                  </div>
                  <input 
                    type="number"
                    value={set.reps || ''}
                    placeholder="0"
                    onChange={(e) => onUpdateSet(entry.id, set.id, { reps: parseInt(e.target.value) || 0 })}
                    className="flex-1 bg-zinc-800 border border-zinc-700 rounded-lg py-2 px-3 text-center focus:ring-1 focus:ring-blue-500 outline-none"
                  />
                  <input 
                    type="number"
                    value={set.weight || ''}
                    placeholder="0"
                    onChange={(e) => onUpdateSet(entry.id, set.id, { weight: parseFloat(e.target.value) || 0 })}
                    className="flex-1 bg-zinc-800 border border-zinc-700 rounded-lg py-2 px-3 text-center focus:ring-1 focus:ring-blue-500 outline-none"
                  />
                  <button 
                    onClick={() => onUpdateSet(entry.id, set.id, { completed: !set.completed })}
                    className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${
                      set.completed ? 'bg-green-600 text-white' : 'bg-zinc-800 text-zinc-600'
                    }`}
                  >
                    <Check size={20} />
                  </button>
                </div>
              ))}
              <button 
                onClick={() => onAddSet(entry.id)}
                className="w-full py-2 text-sm text-zinc-400 hover:text-zinc-200 border border-dashed border-zinc-700 rounded-lg flex items-center justify-center gap-2"
              >
                <Plus size={16} /> Add Set
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add Exercise Button */}
      <button 
        onClick={() => setShowExercisePicker(true)}
        className="w-full mt-8 bg-zinc-900 py-4 rounded-2xl border border-zinc-800 font-bold text-blue-500 hover:bg-zinc-800 transition-colors"
      >
        Add Exercise
      </button>

      {/* Exercise Picker Modal */}
      {showExercisePicker && (
        <div className="fixed inset-0 z-50 flex flex-col bg-black max-w-2xl mx-auto border-x border-zinc-800">
          <header className="p-4 border-b border-zinc-800 flex items-center gap-4">
            <button onClick={() => setShowExercisePicker(false)} className="text-zinc-500">
              <X size={24} />
            </button>
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={18} />
              <input 
                type="text" 
                autoFocus
                placeholder="Search exercises..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-zinc-900 rounded-xl py-2 pl-10 pr-4 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
          </header>
          <div className="flex-1 overflow-y-auto p-4 space-y-2">
            {filteredExercises.map(ex => (
              <button 
                key={ex.id}
                onClick={() => {
                  onAddExercise(ex.id, ex.name);
                  setShowExercisePicker(false);
                  setSearchTerm('');
                }}
                className="w-full text-left p-4 hover:bg-zinc-900 rounded-xl transition-colors border border-transparent hover:border-zinc-800"
              >
                <p className="font-bold">{ex.name}</p>
                <p className="text-xs text-zinc-500 uppercase">{ex.category} • {ex.equipment}</p>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default WorkoutLogger;
