
import React from 'react';
import { DatePlan } from '../types';

interface ResultScreenProps {
  plan: DatePlan;
  onRetry: () => void;
  onSave: () => void;
  isSaved: boolean;
  isLoadingAI: boolean;
  onCopy: () => void;
}

const ResultScreen: React.FC<ResultScreenProps> = ({ plan, onRetry, onSave, isSaved, isLoadingAI, onCopy }) => {
  const moodLabels = {
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
    <div className="flex-1 flex flex-col bg-white overflow-y-auto scrollbar-hide animate-fadeIn relative">
      {/* Texture Overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/paper-fibers.png')] z-0"></div>

      <div className="p-6 pt-10 flex flex-col min-h-full relative z-10">
        {/* Magazine Header */}
        <div className="text-center mb-10 border-b border-gray-100 pb-8">
          <p className="cursive text-[#e5989b] text-3xl mb-2">Memory of Us</p>
          <h2 className="text-4xl font-bold serif tracking-tighter uppercase leading-none">The Perfect<br/>Date Plan</h2>
          <div className="flex justify-center items-center gap-3 mt-4">
            <span className="h-[1px] w-6 bg-gray-200"></span>
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-400">Issue No. 01 / {new Date().getFullYear()}</span>
            <span className="h-[1px] w-6 bg-gray-200"></span>
          </div>
        </div>

        {/* AI Vibe Quote */}
        <div className="mb-10 px-4">
          {isLoadingAI ? (
            <div className="space-y-3 animate-pulse">
              <div className="h-4 bg-gray-100 rounded-full w-full"></div>
              <div className="h-4 bg-gray-100 rounded-full w-4/5 mx-auto"></div>
            </div>
          ) : (
            <p className="serif italic text-2xl text-center leading-snug text-[#4a4a4a] relative">
              <span className="absolute -top-6 -left-2 text-6xl text-[#f4dada] font-serif opacity-50">“</span>
              {plan.aiVibe}
              <span className="absolute -bottom-10 -right-2 text-6xl text-[#f4dada] font-serif opacity-50 rotate-180">“</span>
            </p>
          )}
        </div>

        {/* Selection Cards */}
        <div className="space-y-4 mb-10">
          {[
            { label: 'Destination', val: plan.where, color: 'bg-[#f4dada]/30', tag: 'WHERE' },
            { label: 'Cuisine', val: plan.eat, color: 'bg-[#8e9775]/20', tag: 'EAT' },
            { label: 'Activity', val: plan.do, color: 'bg-[#e5989b]/20', tag: 'DO' }
          ].map((item, i) => (
            <div key={i} className={`${item.color} p-5 rounded-[2rem] flex items-center justify-between border border-white shadow-sm transform transition-all hover:scale-[1.02]`}>
              <div className="flex items-center gap-4">
                <span className="text-4xl drop-shadow-sm">{item.val.emoji}</span>
                <div>
                  <p className="text-[10px] font-bold text-gray-500 tracking-[0.2em] mb-1">{item.tag}</p>
                  <h3 className="text-xl font-bold serif leading-tight">{item.val.label}</h3>
                </div>
              </div>
              <div className="h-8 w-8 bg-white/50 rounded-full flex items-center justify-center">
                <span className="text-xs text-gray-400">→</span>
              </div>
            </div>
          ))}
        </div>

        {/* AI Itinerary Section */}
        <div className="bg-[#fdfbf7] rounded-[2.5rem] p-8 border border-gray-100 shadow-inner mb-10 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <span className="text-6xl">✨</span>
          </div>
          
          <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-[#e5989b] mb-6 flex items-center gap-2">
            Suggested Schedule
          </h4>
          
          {isLoadingAI ? (
            <div className="space-y-6">
              {[1, 2, 3].map(i => (
                <div key={i} className="flex gap-4">
                  <div className="w-12 h-6 bg-gray-100 rounded-full"></div>
                  <div className="flex-1 h-6 bg-gray-100 rounded-full"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-8 relative">
              {/* Vertical line connecting steps */}
              <div className="absolute left-[23px] top-2 bottom-2 w-px bg-dashed border-l border-dashed border-[#e5989b]/30"></div>
              
              {plan.aiSchedule?.map((step, idx) => (
                <div key={idx} className="flex gap-6 items-start relative z-10">
                  <span className="text-[10px] font-black text-white bg-[#e5989b] px-3 py-1.5 rounded-full shrink-0 shadow-sm">
                    {step.time}
                  </span>
                  <p className="text-sm text-gray-600 font-bold leading-tight pt-1">{step.activity}</p>
                </div>
              ))}
            </div>
          )}

          {/* Style Tip */}
          {!isLoadingAI && plan.aiOutfit && (
            <div className="mt-10 pt-8 border-t border-gray-100">
              <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-[#8e9775] mb-3">👗 Style Tip</h4>
              <p className="text-xs text-gray-500 italic leading-relaxed font-medium">
                {plan.aiOutfit}
              </p>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="mt-auto pb-8 space-y-4">
          <div className="flex gap-4">
            <button 
              onClick={onRetry}
              className="flex-1 bg-gray-50 text-gray-400 py-5 rounded-[2rem] font-bold text-sm tracking-widest uppercase hover:bg-gray-100 active:scale-95 transition-all"
            >
              Retry
            </button>
            <button 
              onClick={onSave}
              disabled={isSaved}
              className={`flex-[1.5] py-5 rounded-[2rem] font-bold text-sm tracking-widest uppercase shadow-xl flex items-center justify-center gap-2 transition-all active:scale-95 ${
                isSaved ? 'bg-[#8e9775] text-white' : 'bg-[#e5989b] text-white hover:bg-[#d4878a]'
              }`}
            >
              <span>{isSaved ? '✓' : '♥'}</span>
              {isSaved ? 'Saved to Journal' : 'Save memory'}
            </button>
          </div>
          
          <button 
            onClick={handleShare}
            className="w-full bg-[#4a4a4a] text-white py-5 rounded-[2rem] font-bold text-sm tracking-widest uppercase shadow-2xl flex items-center justify-center gap-3 hover:bg-black transition-all active:scale-95"
          >
            <span className="text-xl">💌</span>
            Invite Bobby/Enni
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResultScreen;
