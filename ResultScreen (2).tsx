
import React from 'react';
import { DatePlan } from './types';

interface ResultScreenProps {
  plan: DatePlan;
  onRetry: () => void;
  onSave: () => void;
  isSaved: boolean;
  isLoadingAI: boolean;
  onCopy: () => void;
}

const ResultScreen: React.FC<ResultScreenProps> = ({ plan, onRetry, onSave, isSaved, isLoadingAI, onCopy }) => {
  const handleShare = () => {
    const text = `Бид хоёрт зориулж болзоо төлөвлөлөө: 📍${plan.where.label}, 🍽️${plan.eat.label}, ✨${plan.do.label}. ✨`;
    navigator.clipboard.writeText(text);
    onCopy();
  };

  return (
    <div className="flex-1 flex flex-col bg-white overflow-y-auto scrollbar-hide animate-fadeIn h-full">
      <div className="p-8 pt-12 flex flex-col min-h-full">
        <div className="text-center mb-10">
          <p className="cursive text-[#FF748D] text-4xl mb-2">Bobby & Enni</p>
          <h2 className="text-5xl font-black serif tracking-tighter uppercase leading-[0.9] text-[#2D2D2D]">
            The Love<br/><span className="italic text-[#FF748D] lowercase">itinerary</span>
          </h2>
        </div>

        <div className="mb-10 p-8 bg-[#FFF9F9] rounded-[2.5rem] border border-pink-50 text-center shadow-inner">
          {isLoadingAI ? (
            <div className="space-y-3 animate-pulse">
              <div className="h-4 bg-pink-100/50 rounded-full w-full"></div>
              <div className="h-4 bg-pink-100/50 rounded-full w-2/3 mx-auto"></div>
            </div>
          ) : (
            <p className="serif italic text-2xl leading-relaxed text-[#2D2D2D]">"{plan.aiVibe}"</p>
          )}
        </div>

        <div className="grid grid-cols-1 gap-4 mb-10">
          {[
            { label: 'Where', val: plan.where, color: 'bg-pink-100/50', icon: '📍' },
            { label: 'Eat', val: plan.eat, color: 'bg-orange-50', icon: '🍽️' },
            { label: 'Do', val: plan.do, color: 'bg-green-50', icon: '✨' }
          ].map((item, i) => (
            <div key={i} className="bg-white p-5 shadow-sm rounded-3xl flex items-center gap-5 border border-gray-50">
              <div className={`w-16 h-16 ${item.color} flex items-center justify-center rounded-2xl text-3xl shadow-sm`}>{item.val.emoji}</div>
              <div className="flex-1">
                <p className="text-[10px] font-black text-[#FF748D] tracking-widest uppercase">{item.label}</p>
                <h3 className="text-xl font-bold serif text-[#2D2D2D]">{item.val.label}</h3>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-[#2D2D2D] text-white rounded-[3rem] p-10 shadow-2xl mb-10">
          <h4 className="text-[11px] font-black uppercase tracking-[0.4em] text-[#FF748D] mb-8 border-b border-white/10 pb-4">Timeline</h4>
          {isLoadingAI ? (
            <div className="space-y-4 animate-pulse"><div className="h-4 bg-white/5 rounded-full w-full"></div></div>
          ) : (
            <div className="space-y-8">
              {plan.aiSchedule?.map((step, idx) => (
                <div key={idx} className="flex gap-6 items-start">
                  <span className="text-xs font-black text-[#FF748D] mt-0.5">{step.time}</span>
                  <p className="text-base font-bold leading-tight">{step.activity}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="mt-auto pb-6 space-y-4">
          <div className="flex gap-4">
            <button onClick={onRetry} className="flex-1 bg-white border border-gray-100 text-[#666] py-5 rounded-full font-black text-xs uppercase tracking-widest shadow-sm">Retry</button>
            <button 
              onClick={onSave} 
              disabled={isSaved} 
              className={`btn-active flex-[1.5] py-5 rounded-full font-black text-xs uppercase tracking-widest shadow-lg ${isSaved ? 'bg-[#7B8A5B] text-white' : 'bg-[#D63351] text-white'}`}
            >
              {isSaved ? 'Saved' : 'Save Memory'}
            </button>
          </div>
          <button onClick={handleShare} className="btn-active w-full bg-[#2D2D2D] text-white py-5 rounded-full font-black text-xs uppercase tracking-widest shadow-xl">Invite Partner</button>
        </div>
      </div>
    </div>
  );
};

export default ResultScreen;
