
import React from 'react';

interface HomeProps {
  onStart: () => void;
  onOpenJournal: () => void;
  historyCount: number;
}

const Home: React.FC<HomeProps> = ({ onStart, onOpenJournal, historyCount }) => {
  const heroImageUrl = "https://images.unsplash.com/photo-1518199266791-5375a83190b7?q=80&w=800&auto=format&fit=crop";

  return (
    <div className="flex-1 flex flex-col items-center justify-between p-10 pt-16 text-center animate-fadeIn h-full bg-white">
      <div className="w-full">
        <div className="relative mb-14 mx-auto w-fit">
          <div className="w-64 h-80 bg-white p-4 pb-14 rounded-xl rotate-1 hover:rotate-0 transition-all duration-500 shadow-2xl border border-pink-50 flex items-center justify-center relative">
            <div className="w-full h-full bg-gray-50 overflow-hidden rounded-lg shadow-inner">
                <img src={heroImageUrl} alt="Bobby & Enni" className="w-full h-full object-cover" />
            </div>
            <div className="absolute bottom-4 left-0 right-0 text-center">
              <span className="cursive text-[#FF4D6D] text-3xl drop-shadow-sm">Forever Love</span>
            </div>
          </div>
          <div className="absolute -top-6 -right-6 w-14 h-14 bg-[#FF4D6D] text-white rounded-full flex items-center justify-center shadow-lg border-4 border-white transform rotate-12">
            <span className="text-2xl">💍</span>
          </div>
        </div>

        <h1 className="text-5xl font-black tracking-tighter text-[#2D2D2D] mb-2 serif italic">Bobby & Enni</h1>
        <div className="flex items-center justify-center gap-4 mb-10">
           <span className="h-px w-10 bg-pink-100"></span>
           <h2 className="text-sm font-black uppercase tracking-[0.4em] text-[#FF4D6D]">Date Planner</h2>
           <span className="h-px w-10 bg-pink-100"></span>
        </div>
        
        <p className="text-gray-500 text-base mb-12 font-medium max-w-[280px] mx-auto leading-relaxed">
          Хайртай хүнтэйгээ өнгөрүүлэх <span className="text-[#FF4D6D] font-black underline decoration-pink-200 underline-offset-4">онцгой өдрийг</span> хамтдаа төлөвлөе.
        </p>
      </div>
      
      <div className="w-full space-y-5 pb-4">
        <button 
          onClick={onStart} 
          className="btn-active w-full bg-[#FF4D6D] text-white py-5 rounded-full text-lg font-black shadow-[0_15px_30px_rgba(255,77,109,0.3)] hover:bg-[#C9184A] transition-all tracking-widest"
        >
          ЭХЛЭХ
        </button>
        <button 
          onClick={onOpenJournal} 
          className="w-full flex items-center justify-center gap-2 text-[#FF4D6D] py-3 text-xs font-black uppercase tracking-[0.2em] hover:scale-105 transition-transform"
        >
          📖 ТЭМДЭГЛЭЛ ({historyCount})
        </button>
      </div>
    </div>
  );
};

export default Home;
