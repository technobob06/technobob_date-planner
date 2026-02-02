
import React from 'react';
import { DatePlan } from './types';

interface JournalProps {
  history: DatePlan[];
  onBack: () => void;
  onClear: () => void;
  onDelete: (id: string) => void;
  onView: (plan: DatePlan) => void;
}

const Journal: React.FC<JournalProps> = ({ history, onBack, onClear, onDelete, onView }) => {
  return (
    <div className="flex-1 flex flex-col p-8 bg-white h-full overflow-y-auto scrollbar-hide animate-fadeIn">
      <div className="flex items-center justify-between mb-12 sticky top-0 bg-white/95 backdrop-blur-md py-4 z-10 border-b border-pink-50">
        <button onClick={onBack} className="text-[#FF4D6D] font-black text-sm uppercase tracking-widest">← Back</button>
        <h2 className="text-xl font-black tracking-tighter serif uppercase text-[#2D2D2D]">Journal</h2>
        <button onClick={onClear} className="text-[10px] font-black text-gray-300 hover:text-red-500 uppercase tracking-widest">Clear</button>
      </div>

      {history.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center text-center py-24 opacity-60">
          <div className="w-24 h-24 bg-pink-50 rounded-full flex items-center justify-center mb-6 shadow-inner">
            <span className="text-5xl">📓</span>
          </div>
          <p className="text-xs font-black text-gray-400 uppercase tracking-[0.3em]">No memories yet</p>
        </div>
      ) : (
        <div className="space-y-8 pb-12">
          {history.map(item => (
            <div 
              key={item.id} 
              onClick={() => onView(item)}
              className="group relative bg-white p-7 rounded-[2.5rem] border border-pink-50 shadow-sm transition-all hover:shadow-[0_20px_40px_rgba(255,77,109,0.1)] hover:-translate-y-1 cursor-pointer active:scale-[0.98]"
            >
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(item.id);
                }} 
                className="absolute -top-2 -right-2 w-10 h-10 bg-white text-gray-200 hover:text-red-500 rounded-full shadow-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity border border-pink-50 z-20"
              >
                <span className="text-xl">✕</span>
              </button>
              
              <div className="flex items-center justify-between mb-5">
                <span className="text-[10px] font-black uppercase tracking-widest text-[#FF4D6D] bg-pink-50 px-4 py-1.5 rounded-full">
                  {new Date(item.timestamp).toLocaleDateString()}
                </span>
                <span className="text-2xl drop-shadow-sm">{item.mood === 'Romantic' ? '❤️' : item.mood === 'Adventurous' ? '🎒' : '☁️'}</span>
              </div>
              
              <div className="flex -space-x-4 mb-6">
                {[item.where, item.eat, item.do].map((opt, i) => (
                  <div key={i} className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-lg border-4 border-white text-3xl relative hover:z-10 transition-transform hover:scale-110">
                    {opt.emoji}
                  </div>
                ))}
              </div>
              
              <h3 className="text-xl font-bold text-[#2D2D2D] mb-2 serif">{item.where.label} & {item.do.label}</h3>
              <p className="text-sm italic serif text-gray-400 line-clamp-2 leading-relaxed mb-6">
                "{item.aiVibe || "A beautiful memory shared between us."}"
              </p>
              
              <div className="pt-4 border-t border-pink-50 text-[10px] font-black text-[#FF4D6D] uppercase tracking-[0.2em] flex items-center justify-between group-hover:text-[#C9184A]">
                View Full Itinerary
                <span className="group-hover:translate-x-2 transition-transform">→</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Journal;
