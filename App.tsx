
import React, { useState, useEffect } from 'react';
import { Screen, DatePlan, DateMood } from './types';
import Home from './components/Home';
import SpinScreen from './components/SpinScreen';
import ResultScreen from './components/ResultScreen';
import Journal from './components/Journal';
import { generateDateNarrative } from './services/geminiService';

const App: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<Screen>(Screen.HOME);
  const [finalPlan, setFinalPlan] = useState<DatePlan | null>(null);
  const [history, setHistory] = useState<DatePlan[]>([]);
  const [loadingAI, setLoadingAI] = useState(false);
  const [selectedMood, setSelectedMood] = useState<DateMood>('Romantic');
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem('date_history');
    if (saved) setHistory(JSON.parse(saved));
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
      console.error("Failed to generate AI content:", e);
    } finally {
      setLoadingAI(false);
    }
  };

  const saveToJournal = () => {
    if (!finalPlan) return;
    const exists = history.find(h => h.id === finalPlan.id);
    if (exists) {
      showToast("Энэ дурсамж аль хэдийн хадгалагдсан байна~ 💖");
      return;
    }
    const newHistory = [finalPlan, ...history];
    setHistory(newHistory);
    localStorage.setItem('date_history', JSON.stringify(newHistory));
    showToast("Тэмдэглэлд амжилттай хадгалагдлаа! ✨");
  };

  const deleteFromJournal = (id: string) => {
    const newHistory = history.filter(h => h.id !== id);
    setHistory(newHistory);
    localStorage.setItem('date_history', JSON.stringify(newHistory));
    showToast("Төлөвлөгөөг устгалаа 🕊️");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#fdfbf7] selection:bg-[#f4dada]">
      {toast && (
        <div className="fixed top-12 left-1/2 -translate-x-1/2 z-[100] bg-[#4a4a4a] text-white px-8 py-4 rounded-full text-xs font-bold shadow-2xl animate-bounce">
          {toast}
        </div>
      )}

      <div className="w-full max-w-[430px] bg-white h-screen sm:h-[844px] sm:rounded-[3rem] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.15)] overflow-hidden flex flex-col relative border border-gray-100/50">
        <div className="flex-1 overflow-y-auto scrollbar-hide relative z-10">
          {currentScreen === Screen.HOME && (
            <Home onStart={() => setCurrentScreen(Screen.SPIN)} onOpenJournal={() => setCurrentScreen(Screen.JOURNAL)} historyCount={history.length} />
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
              onCopy={() => showToast("Хуулагдлаа, илгээгээрэй! 💌")}
            />
          )}

          {currentScreen === Screen.JOURNAL && (
            <Journal 
              history={history} 
              onBack={() => setCurrentScreen(Screen.HOME)} 
              onDelete={deleteFromJournal}
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

        {/* Floating Elements */}
        <div className="absolute top-20 right-10 text-xl opacity-10 animate-pulse pointer-events-none">✨</div>
        <div className="absolute bottom-40 left-10 text-xl opacity-10 animate-bounce pointer-events-none" style={{animationDuration: '4s'}}>🌸</div>
      </div>
    </div>
  );
};

export default App;
