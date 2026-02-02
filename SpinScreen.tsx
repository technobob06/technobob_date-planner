
import React, { useState, useEffect } from 'react';
import { DatePlan, DateOption, DateMood } from '../types';
import { LOCATIONS, CUISINES, ACTIVITIES } from '../constants';

interface SpinScreenProps {
  mood: DateMood;
  setMood: (m: DateMood) => void;
  onComplete: (plan: DatePlan) => void;
  onBack: () => void;
}

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
    if (!spinning) {
      setOffset(targetIndex * 64);
    }
  }, [spinning, targetIndex]);

  return (
    <div className={`h-16 w-full flex items-center bg-white relative group ${locked ? 'bg-gray-50' : ''}`}>
      <span className="absolute left-2 text-[8px] font-bold text-gray-300 uppercase rotate-90 origin-left z-10">{label}</span>
      <div className="flex-1 overflow-hidden h-full relative ml-6">
        <div 
          className="flex flex-col transition-transform duration-[2.5s] ease-out"
          style={{ 
            transform: spinning && !locked ? `translateY(-${items.length * 64 * 4}px)` : `translateY(-${offset}px)`,
            transitionTimingFunction: spinning ? 'cubic-bezier(.45,.05,.55,.95)' : 'cubic-bezier(.17,.67,.83,.67)'
          }}
        >
          {[...items, ...items, ...items, ...items, ...items, ...items].map((item, idx) => (
            <div key={idx} className="h-16 flex items-center justify-center gap-3 px-6 shrink-0">
              <span className="text-2xl">{item.emoji}</span>
              <span className="text-xs font-bold tracking-widest uppercase truncate">{item.label}</span>
            </div>
          ))}
        </div>
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-white/60 via-transparent to-white/60"></div>
      </div>
      
      <button 
        onClick={onToggleLock}
        className={`px-4 h-full transition-colors flex items-center justify-center ${locked ? 'text-[#e5989b] bg-[#f4dada]/20' : 'text-gray-200 group-hover:text-gray-400'}`}
      >
        <span className="text-xl">{locked ? '🔒' : '🔓'}</span>
      </button>
    </div>
  );
};

const SpinScreen: React.FC<SpinScreenProps> = ({ mood, setMood, onComplete, onBack }) => {
  const [spinning, setSpinning] = useState(false);
  const [locks, setLocks] = useState({ where: false, eat: false, do: false });
  const [targets, setTargets] = useState({ 
    where: Math.floor(Math.random() * LOCATIONS.length), 
    eat: Math.floor(Math.random() * CUISINES.length), 
    do: Math.floor(Math.random() * ACTIVITIES.length) 
  });

  const moods: {key: DateMood, label: string}[] = [
    {key: 'Romantic', label: 'Романтик'}, 
    {key: 'Adventurous', label: 'Адал явдалт'}, 
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
        onComplete({
          id: Date.now().toString(),
          where: LOCATIONS[newTargets.where],
          eat: CUISINES[newTargets.eat],
          do: ACTIVITIES[newTargets.do],
          mood,
          timestamp: Date.now()
        });
      }, 500);
    }, 2500);
  };

  return (
    <div className="flex-1 flex flex-col p-8 bg-[#fdfbf7] animate-fadeIn">
      <div className="flex items-center justify-between mb-8">
        <button onClick={onBack} className="text-gray-400 hover:text-black font-bold text-sm">← Буцах</button>
        <h2 className="text-xl font-bold tracking-tight">Хувь тавилан</h2>
        <div className="w-10"></div>
      </div>

      <div className="mb-8">
        <p className="text-[10px] font-bold uppercase text-gray-400 tracking-[0.2em] mb-3 text-center">Уур амьсгалаа сонгоно уу</p>
        <div className="flex gap-2 p-1 bg-gray-100 rounded-2xl">
          {moods.map(m => (
            <button
              key={m.key}
              onClick={() => setMood(m.key)}
              className={`flex-1 py-2 px-1 rounded-xl text-[10px] font-bold transition-all ${mood === m.key ? 'bg-white shadow-sm text-[#e5989b]' : 'text-gray-400'}`}
            >
              {m.label}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 flex flex-col justify-center space-y-6">
        <div className="rounded-[2rem] overflow-hidden shadow-xl border-4 border-white bg-white divide-y divide-gray-50">
          <Reel 
            label="Хаана"
            items={LOCATIONS} 
            spinning={spinning} 
            targetIndex={targets.where} 
            locked={locks.where} 
            onToggleLock={() => setLocks(prev => ({ ...prev, where: !prev.where }))} 
          />
          {/* Fix: changed prev.prev to prev.eat to fix property access error */}
          <Reel 
            label="Хоол"
            items={CUISINES} 
            spinning={spinning} 
            targetIndex={targets.eat} 
            locked={locks.eat} 
            onToggleLock={() => setLocks(prev => ({ ...prev, eat: !prev.eat }))} 
          />
          <Reel 
            label="Юу"
            items={ACTIVITIES} 
            spinning={spinning} 
            targetIndex={targets.do} 
            locked={locks.do} 
            onToggleLock={() => setLocks(prev => ({ ...prev, do: !prev.do }))} 
          />
        </div>
        <p className="text-[9px] text-center text-gray-400 font-medium">Дараагийн эргүүлэлтэд үлдээхийн тулд 🔒 дээр дарна уу</p>
      </div>

      <button 
        onClick={handleSpin}
        disabled={spinning}
        className={`w-full py-5 rounded-full text-lg font-bold shadow-2xl transition-all transform active:scale-95 flex items-center justify-center gap-3 ${
          spinning ? 'bg-gray-100 text-gray-300' : 'bg-[#e5989b] text-white hover:bg-[#d4878a]'
        }`}
      >
        {spinning ? (
          <>
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            Төлөвлөж байна...
          </>
        ) : (
          <><span>✨</span> Эргүүлэх</>
        )}
      </button>
    </div>
  );
};

export default SpinScreen;
