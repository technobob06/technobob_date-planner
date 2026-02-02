
import React, { useState, useEffect } from 'react';
import { Screen, DatePlan, DateMood } from './types';
import Home from './Home';
import SpinScreen from './SpinScreen';
import ResultScreen from './ResultScreen';
import Journal from './Journal';
import { generateDateNarrative } from './geminiService';

const App: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<Screen>(Screen.HOME);
  const [finalPlan, setFinalPlan] = useState<DatePlan | null>(null);
  const [history, setHistory] = useState<DatePlan[]>([]);
  const [loadingAI, setLoadingAI] = useState(false);
  const [selectedMood, setSelectedMood] = useState<DateMood>('Romantic');
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem('date_history');
    if (saved) {
      try {
        setHistory(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse history", e);
      }
    }
  }, []);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const handleSpinComplete = async (plan: DatePlan) => {
    setFinalPlan(plan);
    setLoadingAI(true);
    setCurrentScreen(Screen.RESULT);
    
    try {
      const data = await generateDateNarrative(plan);
      setFinalPlan(prev => prev ? { 
        ...prev, 
        aiVibe: data.vibe, 
        aiSchedule: data.schedule,
        aiOutfit: data.outfit
      } : null);
    } catch (e) {
      console.error("AI Generation Error:", e);
    } finally {
      setLoadingAI(false);
    }
  };

  const handleViewPlan = (plan: DatePlan) => {
    setFinalPlan(plan);
    setLoadingAI(false); // 已经是历史记录，不再触发加载动画
    setCurrentScreen(Screen.RESULT);
  };

  const saveToJournal = () => {
    if (!finalPlan) return;
    const exists = history.find(h => h.id === finalPlan.id);
    if (exists) {
      showToast("Аль хэдийн хадгалагдсан байна~ 💖");
      return;
    }
    const newHistory = [finalPlan, ...history];
    setHistory(newHistory);
    localStorage.setItem('date_history', JSON.stringify(newHistory));
    showToast("Тэмдэглэлд хадгалагдлаа! ✨");
  };

  const deleteFromJournal = (id: string) => {
    const newHistory = history.filter(h => h.id !== id);
    setHistory(newHistory);
    localStorage.setItem('date_history', JSON.stringify(newHistory));
    showToast("Устгалаа 🕊️");
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 sm:p-6">
      {toast && (
        <div className="fixed top-10 left-1/2 -translate-x-1/2 z-[100] bg-[#FF4D6D] text-white px-8 py-3 rounded-full text-sm font-bold shadow-lg animate-bounce">
          {toast}
        </div>
      )}

      <div className="w-full max-w-[400px] bg-white h-[820px] sm:rounded-[3rem] shadow-[0_40px_100px_-20px_rgba(255,77,109,0.2)] overflow-hidden flex flex-col relative border border-pink-50">
        <div className="flex-1 overflow-y-auto scrollbar-hide">
          {currentScreen === Screen.HOME && (
            <Home 
              onStart={() => setCurrentScreen(Screen.SPIN)} 
              onOpenJournal={() => setCurrentScreen(Screen.JOURNAL)} 
              historyCount={history.length} 
            />
          )}
          
          {currentScreen === Screen.SPIN && (
            <SpinScreen 
              mood={selectedMood} 
              setMood={setSelectedMood} 
              onComplete={handleSpinComplete} 
              onBack={() => setCurrentScreen(Screen.HOME)}
            />
          )}
          
          {currentScreen === Screen.RESULT && finalPlan && (
            <ResultScreen 
              plan={finalPlan} 
              onRetry={() => setCurrentScreen(Screen.SPIN)} 
              onSave={saveToJournal}
              isSaved={history.some(h => h.id === finalPlan.id)}
              isLoadingAI={loadingAI} 
              onCopy={() => showToast("Хуулагдлаа 💌")}
            />
          )}

          {currentScreen === Screen.JOURNAL && (
            <Journal 
              history={history} 
              onBack={() => setCurrentScreen(Screen.HOME)} 
              onDelete={deleteFromJournal}
              onView={handleViewPlan}
              onClear={() => {
                if(window.confirm("Бүх дурсамжаа устгах уу?")) {
                  setHistory([]);
                  localStorage.removeItem('date_history');
                  showToast("Тэмдэглэл цэвэрлэгдлээ 🍃");
                }
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
