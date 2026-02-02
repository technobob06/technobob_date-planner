
import React from 'react';
import { DatePlan } from '../types';

interface JournalProps {
  history: DatePlan[];
  onBack: () => void;
  onClear: () => void;
  onDelete: (id: string) => void;
}

const Journal: React.FC<JournalProps> = ({ history, onBack, onClear, onDelete }) => {
  const moodLabels = {
    'Romantic': 'Романтик',
    'Adventurous': 'Адал явдалт',
    'Chill': 'Амгалан'
  };

  return (
    <div className="flex-1 flex flex-col p-8 bg-white h-full max-h-[750px] overflow-y-auto scrollbar-hide animate-fadeIn">
      <div className="flex items-center justify-between mb-10 sticky top-0 bg-white/90 backdrop-blur-sm py-2 z-10">
        <button onClick={onBack} className="text-gray-400 hover:text-black font-bold text-sm">← Буцах</button>
        <h2 className="text-xl font-bold tracking-tight">Хайрын Тэмдэглэл</h2>
        <button onClick={onClear} className="text-[10px] font-bold text-gray-300 hover:text-red-400 uppercase tracking-widest">Устгах</button>
      </div>

      {history.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center text-center opacity-40">
          <span className="text-6xl mb-4">📓</span>
          <p className="text-sm font-medium">Одоогоор хадгалсан дурсамж алга.<br/>Fate's Wheel-ийг эргүүлж шинэ дурсамж бүтээгээрэй!</p>
        </div>
      ) : (
        <div className="space-y-6 pb-8">
          {history.map(item => (
            <div key={item.id} className="group relative bg-[#fdfbf7] p-5 rounded-[2rem] border border-gray-50 shadow-sm transition-all hover:shadow-md">
              <button 
                onClick={() => onDelete(item.id)}
                className="absolute -top-2 -right-2 w-8 h-8 bg-white text-gray-300 hover:text-red-500 rounded-full shadow-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity border border-gray-100"
              >
                ✕
              </button>
              
              <div className="flex items-center justify-between mb-3">
                <span className="text-[9px] font-black uppercase tracking-[0.2em] text-[#e5989b] bg-[#f4dada]/20 px-2 py-0.5 rounded-full">
                  {new Date(item.timestamp).toLocaleDateString()}
                </span>
                <span className="text-xs">{item.mood === 'Romantic' ? '❤️' : item.mood === 'Adventurous' ? '🎒' : '☁️'}</span>
              </div>
              
              <div className="flex items-center gap-3 mb-4">
                <div className="flex -space-x-2">
                  <span className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm border border-gray-50 text-xl">{item.where.emoji}</span>
                  <span className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm border border-gray-100 text-xl">{item.eat.emoji}</span>
                  <span className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm border border-gray-100 text-xl">{item.do.emoji}</span>
                </div>
              </div>
              
              <p className="text-sm font-bold mb-1">{item.where.label} ба {item.do.label}</p>
              <p className="text-[11px] italic serif text-gray-400 line-clamp-2 leading-relaxed">
                {item.aiVibe || "Хамтдаа өнгөрүүлэх сайхан өдөр."}
              </p>
            </div>
          ))}
        </div>
      )}
      
      <p className="mt-auto text-center text-[9px] text-gray-300 uppercase tracking-[0.3em] font-bold py-4">
        Хуудас бүр шинэ адал явдал
      </p>
    </div>
  );
};

export default Journal;
