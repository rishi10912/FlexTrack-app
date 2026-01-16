
import React from 'react';
import { Workout } from '../types';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';

interface DashboardProps {
  history: Workout[];
  onStartWorkout: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ history, onStartWorkout }) => {
  const chartData = history.slice(0, 7).reverse().map(w => ({
    name: new Date(w.date).toLocaleDateString(undefined, { weekday: 'short' }),
    volume: w.exercises.reduce((acc, ex) => 
      acc + ex.sets.reduce((sAcc, s) => sAcc + (s.weight * s.reps), 0), 0)
  }));

  return (
    <div className="p-6">
      <header className="mb-8">
        <h1 className="text-3xl font-bold mb-1">Welcome back</h1>
        <p className="text-zinc-400">Ready for today's session?</p>
      </header>

      {/* Stats Summary */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="bg-zinc-900 p-4 rounded-2xl border border-zinc-800">
          <p className="text-xs text-zinc-500 uppercase font-bold mb-1">Workouts</p>
          <p className="text-2xl font-bold">{history.length}</p>
        </div>
        <div className="bg-zinc-900 p-4 rounded-2xl border border-zinc-800">
          <p className="text-xs text-zinc-500 uppercase font-bold mb-1">Avg Volume</p>
          <p className="text-2xl font-bold">
            {history.length > 0 
              ? Math.round(history.reduce((acc, w) => acc + w.exercises.reduce((eAcc, ex) => eAcc + ex.sets.reduce((sAcc, s) => sAcc + (s.weight * s.reps), 0), 0), 0) / history.length)
              : 0} kg
          </p>
        </div>
      </div>

      {/* Progress Chart */}
      {chartData.length > 0 && (
        <div className="bg-zinc-900 p-6 rounded-2xl border border-zinc-800 mb-8">
          <h2 className="text-lg font-bold mb-4">Volume Progress</h2>
          <div className="h-48 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                <XAxis dataKey="name" stroke="#666" fontSize={12} />
                <YAxis hide />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#18181b', border: '1px solid #3f3f46' }}
                  itemStyle={{ color: '#3b82f6' }}
                />
                <Line type="monotone" dataKey="volume" stroke="#3b82f6" strokeWidth={3} dot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {/* Start Button */}
      <div className="bg-gradient-to-br from-blue-600 to-indigo-700 p-8 rounded-3xl text-center shadow-xl mb-8">
        <h3 className="text-xl font-bold mb-4">Boost Your Gains</h3>
        <button 
          onClick={onStartWorkout}
          className="bg-white text-blue-700 px-8 py-3 rounded-full font-bold hover:bg-zinc-100 transition-colors"
        >
          Quick Start Workout
        </button>
      </div>

      {/* Recent Workouts */}
      <div>
        <h2 className="text-lg font-bold mb-4">Recent History</h2>
        {history.length === 0 ? (
          <div className="text-center py-12 bg-zinc-900 rounded-2xl border border-zinc-800 border-dashed">
            <p className="text-zinc-500">No workouts logged yet.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {history.slice(0, 3).map(workout => (
              <div key={workout.id} className="bg-zinc-900 p-4 rounded-xl border border-zinc-800">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-bold">{workout.name}</h4>
                  <span className="text-xs text-zinc-500">{new Date(workout.date).toLocaleDateString()}</span>
                </div>
                <div className="text-sm text-zinc-400">
                  {workout.exercises.slice(0, 2).map(e => e.name).join(', ')}
                  {workout.exercises.length > 2 && ` +${workout.exercises.length - 2} more`}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
