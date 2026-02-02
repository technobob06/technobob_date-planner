
import React, { useState, useEffect } from 'react';
import { DatePlan, DateOption, DateMood } from './types';
import { LOCATIONS, CUISINES, ACTIVITIES } from './constants';

const Reel: React.FC<{ 
  items: DateOption[]; 
  spinning: boolean; 
  targetIndex: number; 
  locked: boolean;
  onToggleLock: () => void;
  label: string;
}> = ({ items, spinning, targetIndex, locked, onToggleLock, label }) => {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    if (!spinning) setOffset(targetIndex * 64);
  }, [spinning, targetIndex]);

  return (
    <div className={`h-16 w-full flex items-center bg-white relative transition-colors ${locked ? 'bg-pink-50/30' : ''}`}>
      <span className="absolute left-3 text-[9px] font-black text-pink-200 uppercase rotate-90 origin-left z-10 tracking-widest">{label}</span>
      <div className="flex-1 overflow-hidden h-full relative ml-8">
        <div 
          className="flex flex-col transition-transform duration-[2.5s]"
          style={{ 
            transform: spinning && !locked ? `translateY(-${items.length * 64 * 4}px)` : `translateY(-${offset}px)`,
            transitionTimingFunction: 'cubic-bezier(.45,.05,.55,.95)'
          }}
        >
          {[...items, ...items, ...items, ...items, ...items].map((item, idx) => (
            <div key={`${item.id}-${idx}`} className="h-16 flex items-center justify-center gap-3 px-6 shrink-0">
              <span className="text-2xl drop-shadow-sm">{item.emoji}</span>
              <span className="text-sm font-black tracking-widest uppercase text-[#2D2D2D] truncate">{item.label}</span>
            </div>
          ))}
        </div>
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-white via-transparent to-white"></div>
      </div>
      <button 
        onClick={onToggleLock} 
        className={`px-5 h-full flex items-center justify-center transition-all ${locked ? 'text-[#FF748D] bg-white' : 'text-gray-200 hover:text-gray-400'}`}
      >
        <span className="text-xl">{locked ? '🔒' : '🔓'}</span>
      </button>
    </div>
  );
};

const SpinScreen: React.FC<{ mood: DateMood; setMood: (m: DateMood) => void; onComplete: (plan: DatePlan) => void; onBack: () => void; }> = ({ mood, setMood, onComplete, onBack }) => {
  const [spinning, setSpinning] = useState(false);
  const [locks, setLocks] = useState({ where: false, eat: false, do: false });
  const [targets, setTargets] = useState({ 
    where: Math.floor(Math.random() * LOCATIONS.length), 
    eat: Math.floor(Math.random() * CUISINES.length), 
    do: Math.floor(Math.random() * ACTIVITIES.length) 
  });

  const moods: {key: DateMood, label: string}[] = [
    {key: 'Romantic', label: 'Романтик'}, 
    {key: 'Adventurous', label: 'Адал явдал'}, 
    {key: 'Chill', label: 'Амгалан'}
  ];

  const handleSpin = () => {
    if (spinning) return;
    const newTargets = {
      where: locks.where ? targets.where : Math.floor(Math.random() * LOCATIONS.length),
      eat: locks.eat ? targets.eat : Math.floor(Math.random() * CUISINES.length),
      do: locks.do ? targets.do : Math.floor(Math.random() * ACTIVITIES.length)
    };
    setTargets(newTargets);
    setSpinning(true);
    setTimeout(() => {
      setSpinning(false);
      setTimeout(() => {
        onComplete({ id: Date.now().toString(), where: LOCATIONS[newTargets.where], eat: CUISINES[newTargets.eat], do: ACTIVITIES[newTargets.do], mood, timestamp: Date.now() });
      }, 500);
    }, 2500);
  };

  return (
    <div className="flex-1 flex flex-col p-8 bg-white h-full animate-fadeIn">
      <div className="flex items-center justify-between mb-10">
        <button onClick={onBack} className="text-[#D63351] font-black text-sm uppercase tracking-widest">← Back</button>
        <h2 className="text-xl font-black tracking-tight serif uppercase text-[#2D2D2D]">Fate's Wheel</h2>
        <div className="w-12"></div>
      </div>
      
      <div className="mb-10">
        <div className="flex gap-2 p-1 bg-gray-50 rounded-2xl border border-gray-100">
          {moods.map(m => (
            <button 
              key={m.key} 
              onClick={() => setMood(m.key)} 
              className={`flex-1 py-3 rounded-xl text-[10px] font-black transition-all uppercase tracking-widest ${mood === m.key ? 'bg-white shadow-md text-[#D63351]' : 'text-gray-400'}`}
            >
              {m.label}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 flex flex-col justify-center">
        <div className="rounded-[2rem] overflow-hidden shadow-[0_20px_50px_rgba(214,51,81,0.1)] border-4 border-white bg-white divide-y divide-gray-50">
          <Reel label="Where" items={LOCATIONS} spinning={spinning} targetIndex={targets.where} locked={locks.where} onToggleLock={() => setLocks(p => ({...p, where: !p.where}))} />
          <Reel label="Food" items={CUISINES} spinning={spinning} targetIndex={targets.eat} locked={locks.eat} onToggleLock={() => setLocks(p => ({...p, eat: !p.eat}))} />
          <Reel label="Do" items={ACTIVITIES} spinning={spinning} targetIndex={targets.do} locked={locks.do} onToggleLock={() => setLocks(p => ({...p, do: !p.do}))} />
        </div>
      </div>

      <button 
        onClick={handleSpin} 
        disabled={spinning} 
        className={`btn-active w-full py-5 rounded-full text-lg font-black shadow-2xl transition-all mt-10 ${spinning ? 'bg-gray-100 text-gray-300' : 'bg-[#D63351] text-white'}`}
      >
        {spinning ? 'Choosing...' : '✨ Spin for Love'}
      </button>
    </div>
  );
};

export default SpinScreen;
