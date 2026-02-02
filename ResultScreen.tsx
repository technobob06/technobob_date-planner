
import React from 'react';
import { DatePlan, DateScheduleStep } from '../types';

interface ResultScreenProps {
  plan: DatePlan;
  onRetry: () => void;
  onSave: () => void;
  isSaved: boolean;
  isLoadingAI: boolean;
  onCopy: () => void;
}

const ResultScreen: React.FC<ResultScreenProps> = ({ plan, onRetry, onSave, isSaved, isLoadingAI, onCopy }) => {
  const moodLabels: Record<string, string> = {
    'Romantic': 'Романтик',
    'Adventurous': 'Адал явдалт',
    'Chill': 'Амгалан'
  };

  const handleShare = async () => {
    const shareData = {
      title: "Bobby & Enni's Date",
      text: `Сайн уу! Бид хоёрт зориулж ${moodLabels[plan.mood]} болзоо төлөвлөлөө: 📍${plan.where.label}, 🍽️${plan.eat.label}, ✨${plan.do.label}. Уур амьсгал: "${plan.aiVibe}"`,
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        handleCopyFallback();
      }
    } else {
      handleCopyFallback();
    }
  };

  const handleCopyFallback = () => {
    const text = `Сайн уу! Бид хоёрт зориулж ${moodLabels[plan.mood]} болзоо төлөвлөлөө:
📍 Байршил: ${plan.where.label} ${plan.where.emoji}
🍽️ Хоол: ${plan.eat.label} ${plan.eat.emoji}
✨ Үйл ажиллагаа: ${plan.do.label} ${plan.do.emoji}
💌 Уур амьсгал: "${plan.aiVibe}"
💖`;
    navigator.clipboard.writeText(text);
    onCopy();
  };

  return (
    <div className="flex-1 flex flex-col bg-[#fdfbf7] overflow-y-auto scrollbar-hide animate-fadeIn relative">
      <div className="absolute inset-0 pointer-events-none opacity-[0.05] bg-[url('https://www.transparenttextures.com/patterns/paper-fibers.png')] z-0"></div>

      <div className="p-6 pt-10 flex flex-col min-h-full relative z-10">
        <div className="text-center mb-12">
          <p className="cursive text-[#e5989b] text-4xl mb-3 drop-shadow-sm">Bobby & Enni</p>
          <h2 className="text-5xl font-bold serif tracking-tighter uppercase leading-none text-[#4a4a4a] mb-4">
            The Eternal<br/><span className="italic text-[#e5989b]">Date Plan</span>
          </h2>
          <div className="flex justify-center items-center gap-4">
            <span className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-gray-200 to-transparent"></span>
            <span className="text-[10px] font-black uppercase tracking-[0.5em] text-gray-400 whitespace-nowrap">Special Edition No. 01</span>
            <span className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-gray-200 to-transparent"></span>
          </div>
        </div>

        <div className="mb-10 px-6 py-10 bg-white rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-gray-50 relative overflow-hidden group">
          <div className="absolute -top-4 -left-4 w-20 h-20 bg-[#f4dada]/20 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-1000"></div>
          
          {isLoadingAI ? (
            <div className="space-y-4 animate-pulse">
              <div className="h-4 bg-gray-50 rounded-full w-full"></div>
              <div className="h-4 bg-gray-50 rounded-full w-4/5 mx-auto"></div>
              <div className="h-4 bg-gray-50 rounded-full w-3/4 mx-auto"></div>
            </div>
          ) : (
            <div className="relative">
              <span className="absolute -top-8 -left-2 text-7xl text-[#f4dada] font-serif opacity-40">“</span>
              <p className="serif italic text-2xl text-center leading-relaxed text-[#4a4a4a] z-10 relative px-2">
                {plan.aiVibe}
              </p>
              <span className="absolute -bottom-14 -right-2 text-7xl text-[#f4dada] font-serif opacity-40 rotate-180">“</span>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 gap-6 mb-12">
          {[
            { label: 'Where', val: plan.where, color: 'bg-[#f4dada]', tag: 'DESTINATION' },
            { label: 'Eat', val: plan.eat, color: 'bg-[#8e9775]/30', tag: 'CUISINE' },
            { label: 'Do', val: plan.do, color: 'bg-[#e5989b]/40', tag: 'ACTIVITY' }
          ].map((item, i) => (
            <div key={i} className="bg-white p-3 pb-8 shadow-[0_15px_30px_rgba(0,0,0,0.04)] border border-gray-100 rounded-sm transform hover:rotate-0 transition-all duration-500 even:rotate-1 odd:-rotate-1">
              <div className={`aspect-[4/3] w-full ${item.color} flex flex-col items-center justify-center rounded-sm mb-4 relative overflow-hidden group`}>
                <span className="text-7xl group-hover:scale-110 transition-transform duration-700 drop-shadow-md">{item.val.emoji}</span>
              </div>
              <div className="px-2">
                <p className="text-[10px] font-black text-gray-300 tracking-[0.3em] mb-1">{item.tag}</p>
                <h3 className="text-xl font-bold serif text-[#4a4a4a]">{item.val.label}</h3>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-[#4a4a4a] text-white rounded-[3rem] p-10 shadow-2xl mb-12 relative overflow-hidden">
          <h4 className="text-[10px] font-black uppercase tracking-[0.5em] text-[#e5989b] mb-10 border-b border-white/10 pb-4">
            The Timeline
          </h4>
          
          {isLoadingAI ? (
            <div className="space-y-8 animate-pulse">
              {[1, 2, 3].map(i => (
                <div key={i} className="flex gap-6">
                  <div className="w-14 h-6 bg-white/10 rounded-full"></div>
                  <div className="flex-1 h-6 bg-white/10 rounded-full"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-10 relative">
              <div className="absolute left-[24px] top-2 bottom-2 w-px bg-white/10"></div>
              {plan.aiSchedule?.map((step: DateScheduleStep, idx: number) => (
                <div key={idx} className="flex gap-8 items-start relative z-10">
                  <span className="text-[11px] font-black text-[#4a4a4a] bg-[#e5989b] px-3.5 py-1.5 rounded-full shrink-0 shadow-lg">
                    {step.time}
                  </span>
                  <p className="text-base text-white/90 font-medium leading-tight pt-1">{step.activity}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="mt-auto pb-10 space-y-4">
          <div className="flex gap-4">
            <button onClick={onRetry} className="flex-1 bg-white border border-gray-100 text-gray-400 py-6 rounded-full font-bold text-xs tracking-widest uppercase shadow-sm">
              Retry
            </button>
            <button 
              onClick={onSave} 
              disabled={isSaved}
              className={`flex-[1.8] py-6 rounded-full font-bold text-xs tracking-widest uppercase shadow-xl ${isSaved ? 'bg-[#8e9775] text-white' : 'bg-[#e5989b] text-white'}`}
            >
              {isSaved ? 'Saved' : 'Save memory'}
            </button>
          </div>
          <button onClick={handleShare} className="w-full bg-[#4a4a4a] text-white py-6 rounded-full font-bold text-xs tracking-widest uppercase shadow-2xl">
            Invite Bobby / Enni
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResultScreen;
