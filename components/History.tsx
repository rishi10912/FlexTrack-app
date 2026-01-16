
import React from 'react';
import { Workout } from '../types';
import { Calendar, Clock, ChevronRight, Trash2 } from 'lucide-react';

interface HistoryProps {
  history: Workout[];
  onDelete: (id: string) => void;
}

const History: React.FC<HistoryProps> = ({ history, onDelete }) => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Workout History</h1>
      
      {history.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 text-zinc-500 opacity-50">
          <Calendar size={64} strokeWidth={1} className="mb-4" />
          <p>No workouts logged yet.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {history.map((workout) => (
            <div key={workout.id} className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4 group">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors">
                    {workout.name}
                  </h3>
                  <div className="flex items-center gap-3 text-xs text-zinc-500 mt-1">
                    <span className="flex items-center gap-1">
                      <Calendar size={12} />
                      {new Date(workout.date).toLocaleDateString()}
                    </span>
                    {workout.endTime && (
                      <span className="flex items-center gap-1">
                        <Clock size={12} />
                        {Math.round((workout.endTime - workout.startTime) / 60000)} min
                      </span>
                    )}
                  </div>
                </div>
                <button 
                    onClick={() => { if(confirm('Delete this workout?')) onDelete(workout.id); }}
                    className="p-2 text-zinc-600 hover:text-red-500 transition-colors"
                >
                  <Trash2 size={18} />
                </button>
              </div>

              <div className="space-y-2">
                {workout.exercises.map((ex) => (
                  <div key={ex.id} className="flex justify-between text-sm">
                    <span className="text-zinc-300">{ex.sets.length} × {ex.name}</span>
                    <span className="text-zinc-500 font-mono">
                      {Math.max(...ex.sets.map(s => s.weight))}kg
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default History;
