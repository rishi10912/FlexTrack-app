
import React, { useState } from 'react';
import { EXERCISES, CATEGORIES } from '../constants';
import { Search, Filter } from 'lucide-react';

const ExerciseLibrary: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const filtered = EXERCISES.filter(ex => {
    const matchesSearch = ex.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory ? ex.category === activeCategory : true;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Exercises</h1>

      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={18} />
        <input 
          type="text" 
          placeholder="Search 1,000+ exercises..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full bg-zinc-900 rounded-xl py-3 pl-10 pr-4 focus:outline-none border border-zinc-800 focus:border-blue-500"
        />
      </div>

      <div className="flex gap-2 overflow-x-auto pb-4 mb-4 scrollbar-hide no-scrollbar">
        <button 
          onClick={() => setActiveCategory(null)}
          className={`px-4 py-1.5 rounded-full text-xs font-bold whitespace-nowrap border transition-colors ${
            activeCategory === null ? 'bg-blue-600 border-blue-600' : 'bg-zinc-900 border-zinc-800 text-zinc-400'
          }`}
        >
          All
        </button>
        {CATEGORIES.map(cat => (
          <button 
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-1.5 rounded-full text-xs font-bold whitespace-nowrap border transition-colors ${
              activeCategory === cat ? 'bg-blue-600 border-blue-600 text-white' : 'bg-zinc-900 border-zinc-800 text-zinc-400'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {filtered.map(ex => (
          <div key={ex.id} className="bg-zinc-900 border border-zinc-800 p-4 rounded-2xl flex items-center justify-between hover:border-zinc-700 transition-colors">
            <div>
              <h3 className="font-bold text-white">{ex.name}</h3>
              <p className="text-xs text-zinc-500 uppercase font-bold mt-1">
                {ex.category} • {ex.equipment}
              </p>
            </div>
            <div className="w-10 h-10 bg-zinc-800 rounded-full flex items-center justify-center text-blue-500 font-bold text-lg">
              {ex.name.charAt(0)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExerciseLibrary;
