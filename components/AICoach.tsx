
import React, { useState, useEffect } from 'react';
import { Workout } from '../types';
import { getWorkoutInsights, suggestNewWorkout } from '../services/geminiService';
import { Sparkles, Brain, ArrowRight, Loader2 } from 'lucide-react';

interface AICoachProps {
  history: Workout[];
}

const AICoach: React.FC<AICoachProps> = ({ history }) => {
  const [insight, setInsight] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [goal, setGoal] = useState('');
  const [suggestion, setSuggestion] = useState('');

  const fetchInsights = async () => {
    setLoading(true);
    const result = await getWorkoutInsights(history);
    setInsight(result);
    setLoading(false);
  };

  const handleSuggest = async () => {
    if (!goal) return;
    setLoading(true);
    const result = await suggestNewWorkout(goal, "3");
    setSuggestion(result);
    setLoading(false);
  };

  useEffect(() => {
    if (history.length > 0) fetchInsights();
  }, []);

  return (
    <div className="p-6">
      <header className="flex items-center gap-3 mb-8">
        <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-500/20">
          <Sparkles className="text-white" size={28} />
        </div>
        <div>
          <h1 className="text-2xl font-bold">AI Coach</h1>
          <p className="text-zinc-500 text-sm">Powered by Gemini AI</p>
        </div>
      </header>

      {/* Insight Section */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 mb-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-10">
          <Brain size={80} />
        </div>
        <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
          Daily Briefing
        </h2>
        {loading && !insight ? (
          <div className="flex items-center gap-3 text-zinc-500 py-4">
            <Loader2 className="animate-spin" />
            <span>Analyzing your gains...</span>
          </div>
        ) : (
          <div className="text-zinc-300 leading-relaxed whitespace-pre-wrap">
            {insight || "No data to analyze yet. Log a workout to get started!"}
          </div>
        )}
        <button 
          onClick={fetchInsights}
          className="mt-6 text-sm text-indigo-400 font-bold hover:text-indigo-300 flex items-center gap-1"
        >
          Refresh Analysis <ArrowRight size={14} />
        </button>
      </div>

      {/* Goal Suggestions */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6">
        <h2 className="text-lg font-bold mb-4">Plan Your Next Phase</h2>
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-xs text-zinc-500 uppercase font-bold">Your Goal</label>
            <input 
              type="text"
              placeholder="e.g., Build upper body strength"
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
              className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 outline-none focus:ring-1 focus:ring-indigo-500"
            />
          </div>
          <button 
            disabled={loading || !goal}
            onClick={handleSuggest}
            className="w-full bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white font-bold py-3 rounded-xl transition-colors shadow-lg shadow-indigo-500/20"
          >
            {loading ? "Thinking..." : "Generate Routine"}
          </button>
        </div>

        {suggestion && (
          <div className="mt-8 p-4 bg-zinc-800/50 rounded-2xl border border-zinc-700">
            <h3 className="font-bold mb-2 text-indigo-400">Suggested Routine:</h3>
            <div className="text-zinc-300 text-sm whitespace-pre-wrap leading-relaxed">
              {suggestion}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AICoach;
