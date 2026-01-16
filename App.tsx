
import React, { useState } from 'react';
import { useWorkoutData } from './hooks/useWorkoutData';
import { ViewType } from './types';
import Dashboard from './components/Dashboard';
import WorkoutLogger from './components/WorkoutLogger';
import History from './components/History';
import ExerciseLibrary from './components/ExerciseLibrary';
import AICoach from './components/AICoach';
import { 
  Home, 
  History as HistoryIcon, 
  Dumbbell, 
  Sparkles, 
  PlusCircle 
} from 'lucide-react';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewType>('dashboard');
  const { 
    history, 
    activeWorkout, 
    startWorkout, 
    addExerciseToActive, 
    updateSet, 
    addSet, 
    finishWorkout,
    deleteWorkout 
  } = useWorkoutData();

  const renderView = () => {
    if (activeWorkout) {
      return (
        <WorkoutLogger 
          workout={activeWorkout} 
          onUpdateSet={updateSet} 
          onAddSet={addSet} 
          onAddExercise={addExerciseToActive}
          onFinish={finishWorkout}
          onCancel={() => {
              if (confirm('Discard workout?')) {
                  // No specific logic for cancel in hook yet, just clearing for now
                  window.location.reload(); 
              }
          }}
        />
      );
    }

    switch (currentView) {
      case 'dashboard':
        return <Dashboard history={history} onStartWorkout={() => startWorkout()} />;
      case 'history':
        return <History history={history} onDelete={deleteWorkout} />;
      case 'exercises':
        return <ExerciseLibrary />;
      case 'coach':
        return <AICoach history={history} />;
      default:
        return <Dashboard history={history} onStartWorkout={() => startWorkout()} />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-black text-white max-w-2xl mx-auto shadow-2xl">
      {/* Content Area */}
      <main className="flex-grow pb-24 overflow-y-auto">
        {renderView()}
      </main>

      {/* Navigation Bar (Sticky Bottom) */}
      {!activeWorkout && (
        <nav className="fixed bottom-0 left-0 right-0 bg-zinc-900/90 backdrop-blur-md border-t border-zinc-800 max-w-2xl mx-auto px-6 py-3 flex justify-between items-center z-50">
          <NavButton 
            active={currentView === 'dashboard'} 
            onClick={() => setCurrentView('dashboard')} 
            icon={<Home size={24} />} 
            label="Home" 
          />
          <NavButton 
            active={currentView === 'history'} 
            onClick={() => setCurrentView('history')} 
            icon={<HistoryIcon size={24} />} 
            label="History" 
          />
          <button 
            onClick={() => startWorkout()}
            className="flex flex-col items-center justify-center -mt-12 bg-blue-600 hover:bg-blue-500 rounded-full w-14 h-14 shadow-lg transition-transform active:scale-95"
          >
            <PlusCircle size={32} />
          </button>
          <NavButton 
            active={currentView === 'exercises'} 
            onClick={() => setCurrentView('exercises')} 
            icon={<Dumbbell size={24} />} 
            label="Exercises" 
          />
          <NavButton 
            active={currentView === 'coach'} 
            onClick={() => setCurrentView('coach')} 
            icon={<Sparkles size={24} />} 
            label="AI Coach" 
          />
        </nav>
      )}
    </div>
  );
};

interface NavButtonProps {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
}

const NavButton: React.FC<NavButtonProps> = ({ active, onClick, icon, label }) => (
  <button 
    onClick={onClick} 
    className={`flex flex-col items-center gap-1 transition-colors ${active ? 'text-blue-500' : 'text-zinc-500 hover:text-zinc-300'}`}
  >
    {icon}
    <span className="text-[10px] uppercase font-bold tracking-wider">{label}</span>
  </button>
);

export default App;
