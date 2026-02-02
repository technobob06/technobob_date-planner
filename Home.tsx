
import React, { useState } from 'react';

interface HomeProps {
  onStart: () => void;
  onOpenJournal: () => void;
  historyCount: number;
}

const Home: React.FC<HomeProps> = ({ onStart, onOpenJournal, historyCount }) => {
  const [imageError, setImageError] = useState(false);

  /** 
   * ТАЙЛБАР: Хэрэв та өөрийн компьютерт байгаа зургийг ашиглахыг хүсвэл 
   * heroImageUrl-ийг "./assets/таны_зураг.png" гэж өөрчлөөрэй.
   * Одоогоор хамгийн найдвартай ажиллах Unsplash-ийн романтик зургийг тавилаа.
   */
  const heroImageUrl = "https://images.unsplash.com/photo-1518199266791-5375a83190b7?q=80&w=800&auto=format&fit=crop";

  return (
    <div className="flex-1 flex flex-col items-center justify-between p-8 pt-12 text-center animate-fadeIn">
      <div className="w-full">
        <div className="relative mb-12 mx-auto w-fit">
          {/* Polaroid Style Frame */}
          <div className="w-64 h-80 bg-white p-3 pb-12 rounded-sm rotate-2 hover:rotate-0 transition-all duration-700 shadow-[0_15px_35px_rgba(0,0,0,0.1)] border border-gray-100 flex items-center justify-center relative group">
            <div className="w-full h-full bg-[#fdfbf7] overflow-hidden flex items-center justify-center">
              {!imageError ? (
                <img 
                  src={heroImageUrl} 
                  alt="Bobby and Enni" 
                  className="w-full h-full object-cover grayscale-[10%] group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                  onError={() => setImageError(true)}
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-[#f4dada] to-[#e5989b] flex flex-col items-center justify-center p-6 text-white">
                  <span className="text-6xl mb-4 animate-pulse">👩‍❤️‍👨</span>
                  <p className="text-[10px] font-bold uppercase tracking-widest opacity-80">Бидний түүх</p>
                </div>
              )}
            </div>
            
            {/* Polaroid Handwriting Text */}
            <div className="absolute bottom-3 left-0 right-0 text-center">
              <span className="serif italic text-[#e5989b] text-xl opacity-80">Forever & Always</span>
            </div>

            {/* Subtle Texture Overlay */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/paper-fibers.png')]"></div>
          </div>
          
          {/* Stickers & Badges */}
          <div className="absolute -bottom-8 -left-6 w-20 h-20 bg-white rounded-full shadow-lg flex items-center justify-center transform -rotate-12 border-4 border-[#fdfbf7] z-20 overflow-hidden group">
            <span className="text-4xl group-hover:scale-125 transition-transform duration-500">🦊</span>
          </div>
          <div className="absolute top-0 -right-8 w-16 h-16 bg-white rounded-2xl shadow-xl flex items-center justify-center transform rotate-12 border-2 border-[#fdfbf7] z-20 group">
            <span className="text-3xl group-hover:bounce transition-all">🐰</span>
          </div>
          
          {/* AI/Premium Badge */}
          <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-[#8e9775] text-white px-4 py-1 rounded-full shadow-lg z-30 flex items-center gap-2 border-2 border-white">
            <span className="text-[10px] font-bold uppercase tracking-widest">Premium Date</span>
            <span className="text-xs">✨</span>
          </div>
        </div>

        <div className="space-y-1">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tighter text-[#4a4a4a]">
            Bobby & Enni
          </h1>
          <div className="flex items-center justify-center gap-3 mb-8">
            <div className="h-px w-6 bg-[#e5989b]/30"></div>
            <h2 className="serif italic text-2xl text-[#e5989b]">Love Planner</h2>
            <div className="h-px w-6 bg-[#e5989b]/30"></div>
          </div>
        </div>
        
        <p className="text-[#4a4a4a] text-lg mb-12 font-light max-w-[280px] mx-auto leading-relaxed opacity-80">
          Хайртай хүнтэйгээ өнгөрүүлэх <span className="font-bold text-[#8e9775] underline decoration-wavy underline-offset-4">онцгой өдрийг</span> хамтдаа төлөвлөе.
        </p>
      </div>
      
      <div className="w-full space-y-4">
        <button 
          onClick={onStart}
          className="group w-full bg-[#4a4a4a] text-white py-5 px-8 rounded-full text-lg font-bold shadow-[0_10px_30px_rgba(0,0,0,0.15)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.25)] hover:bg-black transform active:scale-[0.97] transition-all flex items-center justify-center gap-3"
        >
          <span>Эхлэх</span>
          <span className="group-hover:translate-x-1 transition-transform">→</span>
        </button>
        
        <button 
          onClick={onOpenJournal}
          className="w-full flex items-center justify-center gap-2 text-[#4a4a4a] py-3 text-xs font-bold uppercase tracking-[0.2em] opacity-50 hover:opacity-100 transition-opacity"
        >
          <span>📖</span> Тэмдэглэл ({historyCount})
        </button>
      </div>
    </div>
  );
};

export default Home;
