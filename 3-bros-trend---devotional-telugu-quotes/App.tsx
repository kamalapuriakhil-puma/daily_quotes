
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Plus, ChevronLeft, ChevronRight, Share2, Sparkles, Trash2, Edit2, Play, Pause } from 'lucide-react';
import BackgroundSlider from './components/BackgroundSlider';
import Logo from './components/Logo';
import { DEFAULT_QUOTES } from './constants';
import { Quote } from './types';
import { generateDevotionalQuote } from './services/geminiService';

const App: React.FC = () => {
  const [quotes, setQuotes] = useState<Quote[]>(DEFAULT_QUOTES);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newQuoteText, setNewQuoteText] = useState('');
  const [newQuoteAuthor, setNewQuoteAuthor] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [autoPlay, setAutoPlay] = useState(true);
  
  const autoPlayRef = useRef<number | null>(null);
  const QUOTE_INTERVAL = 6000; // 6 seconds for each quote

  const activeQuote = quotes[currentIndex] || quotes[0];

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % quotes.length);
  }, [quotes.length]);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + quotes.length) % quotes.length);
  }, [quotes.length]);

  // Handle automatic slide transition
  useEffect(() => {
    if (autoPlay && !isModalOpen) {
      autoPlayRef.current = window.setInterval(handleNext, QUOTE_INTERVAL);
    } else {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    }
    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    };
  }, [autoPlay, isModalOpen, handleNext]);

  const handleAddQuote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newQuoteText.trim()) return;

    const newQuote: Quote = {
      id: Date.now().toString(),
      text: newQuoteText,
      author: newQuoteAuthor || 'అజ్ఞాత',
      category: 'Devotional'
    };

    setQuotes([newQuote, ...quotes]);
    setCurrentIndex(0);
    setNewQuoteText('');
    setNewQuoteAuthor('');
    setIsModalOpen(false);
  };

  const handleGenerateAI = async () => {
    setIsGenerating(true);
    const aiQuote = await generateDevotionalQuote();
    setNewQuoteText(aiQuote);
    setIsGenerating(false);
  };

  const handleDeleteQuote = (id: string) => {
    if (quotes.length <= 1) return;
    const updated = quotes.filter(q => q.id !== id);
    setQuotes(updated);
    setCurrentIndex(0);
  };

  const toggleAutoPlay = () => setAutoPlay(!autoPlay);

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center p-4 md:p-8 overflow-hidden text-white">
      <BackgroundSlider />

      {/* Header Branding */}
      <div className="absolute top-8 left-0 right-0 z-10 flex flex-col items-center">
        <Logo />
      </div>

      {/* Main Content Area */}
      <main className="relative z-10 w-full max-w-4xl flex flex-col items-center">
        {/* Quote Card */}
        <div 
          className="w-full glass rounded-3xl p-8 md:p-16 shadow-2xl relative group overflow-hidden transition-all duration-500 hover:scale-[1.01]"
          onMouseEnter={() => autoPlayRef.current && clearInterval(autoPlayRef.current)}
          onMouseLeave={() => autoPlay && (autoPlayRef.current = window.setInterval(handleNext, QUOTE_INTERVAL))}
        >
          {/* Decorative Corner Elements */}
          <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-yellow-400/50 rounded-tl-3xl m-4" />
          <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-orange-500/50 rounded-br-3xl m-4" />

          {/* Progress Bar for Auto-play */}
          {autoPlay && !isModalOpen && (
            // FIX: Moved 'key' from style object to the component props to resolve TypeScript error and correctly reset animation state on index change
            <div key={currentIndex} className="absolute bottom-0 left-0 h-1 bg-yellow-400/50 transition-all duration-[6000ms] ease-linear" style={{ width: '100%' }} />
          )}

          <div className="flex flex-col items-center text-center space-y-8 animate-in fade-in zoom-in duration-700">
            <div className="h-12 w-12 flex items-center justify-center bg-white/10 rounded-full text-yellow-400 animate-pulse">
              <Sparkles className="w-8 h-8" />
            </div>

            <h1 className="font-telugu text-3xl md:text-5xl lg:text-6xl leading-tight md:leading-snug font-bold drop-shadow-md text-white px-4 min-h-[120px] md:min-h-[180px] flex items-center">
              {activeQuote.text}
            </h1>

            <div className="flex flex-col items-center gap-4">
              <span className="font-telugu text-xl md:text-2xl text-yellow-200/90 font-medium italic">
                — {activeQuote.author}
              </span>
              <div className="px-4 py-1 rounded-full bg-white/10 text-xs font-semibold tracking-widest uppercase border border-white/20">
                {activeQuote.category}
              </div>
            </div>
          </div>

          {/* Individual Action (Delete) */}
          <button 
            onClick={() => handleDeleteQuote(activeQuote.id)}
            className="absolute top-6 right-6 p-2 rounded-full bg-red-500/10 hover:bg-red-500/40 transition-all opacity-0 group-hover:opacity-100"
            title="Delete Quote"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>

        {/* Quote Navigation Controls */}
        <div className="flex items-center justify-center gap-4 md:gap-8 mt-12 w-full max-w-sm">
          <button 
            onClick={handlePrev}
            className="p-4 rounded-full glass hover:bg-white/20 transition-all active:scale-95 text-white"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          
          <button 
            onClick={toggleAutoPlay}
            className={`p-3 rounded-full transition-all border ${autoPlay ? 'bg-yellow-500/20 border-yellow-500/50' : 'bg-white/10 border-white/10'} hover:bg-white/20`}
            title={autoPlay ? "Pause Autoplay" : "Start Autoplay"}
          >
            {autoPlay ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
          </button>

          <div className="text-sm font-medium tracking-tighter opacity-70">
            {currentIndex + 1} / {quotes.length}
          </div>

          <button 
            onClick={handleNext}
            className="p-4 rounded-full glass hover:bg-white/20 transition-all active:scale-95 text-white"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </main>

      {/* Floating Action Buttons */}
      <div className="fixed bottom-8 right-8 z-20 flex flex-col gap-4">
        <button 
          onClick={() => setIsModalOpen(true)}
          className="w-14 h-14 rounded-full bg-gradient-to-tr from-yellow-500 to-orange-600 shadow-lg flex items-center justify-center hover:scale-110 active:scale-90 transition-transform text-white"
          title="Add Quote"
        >
          <Plus className="w-8 h-8" />
        </button>
        
        <button 
          className="w-14 h-14 rounded-full glass flex items-center justify-center hover:bg-white/20 transition-all text-white shadow-xl"
          title="Share"
          onClick={() => {
            const shareText = `"${activeQuote.text}" - ${activeQuote.author} (via 3 Bros Trend)`;
            if (navigator.share) {
              navigator.share({ title: 'Daily Devotional Quote', text: shareText }).catch(() => {});
            } else {
              navigator.clipboard.writeText(shareText);
              alert('Copied to clipboard!');
            }
          }}
        >
          <Share2 className="w-6 h-6" />
        </button>
      </div>

      {/* Manual Entry Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-in fade-in duration-300">
          <div className="bg-[#121212] border border-white/10 rounded-3xl w-full max-w-lg p-8 shadow-2xl relative">
             <button 
              onClick={() => setIsModalOpen(false)} 
              className="absolute top-6 right-6 p-2 text-white/50 hover:text-white transition-colors"
            >
              <Plus className="w-6 h-6 rotate-45" />
            </button>

            <div className="mb-8">
              <h2 className="text-2xl font-bold flex items-center gap-3">
                <Plus className="w-6 h-6 text-yellow-500" />
                కొత్త కోట్ జోడించండి
              </h2>
              <p className="text-white/40 text-sm mt-1">మీకు ఇష్టమైన ఆధ్యాత్మిక వాక్యాన్ని నమోదు చేయండి.</p>
            </div>

            <form onSubmit={handleAddQuote} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-white/60 mb-2">Quote (Telugu Script)</label>
                <textarea 
                  value={newQuoteText}
                  onChange={(e) => setNewQuoteText(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white font-telugu text-lg h-32 focus:ring-2 focus:ring-yellow-500 focus:outline-none placeholder:text-white/20 transition-all"
                  placeholder="ఇక్కడ మీ కోట్ వ్రాయండి..."
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-white/60 mb-2">Author (optional)</label>
                <input 
                  type="text"
                  value={newQuoteAuthor}
                  onChange={(e) => setNewQuoteAuthor(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white font-telugu text-lg focus:ring-2 focus:ring-yellow-500 focus:outline-none placeholder:text-white/20 transition-all"
                  placeholder="రచయిత పేరు..."
                />
              </div>

              <div className="flex gap-4 pt-2">
                <button 
                  type="button"
                  onClick={handleGenerateAI}
                  disabled={isGenerating}
                  className="flex-1 py-4 rounded-xl bg-white/10 border border-white/20 font-bold flex items-center justify-center gap-2 hover:bg-white/20 transition-all disabled:opacity-50 group"
                >
                  <Sparkles className={`w-5 h-5 text-yellow-400 ${isGenerating ? 'animate-spin' : 'group-hover:scale-125 transition-transform'}`} />
                  AI Generate
                </button>
                <button 
                  type="submit"
                  className="flex-1 py-4 rounded-xl bg-gradient-to-r from-yellow-500 to-orange-600 font-bold hover:shadow-[0_0_25px_rgba(234,179,8,0.4)] transition-all active:scale-95"
                >
                  Save Quote
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Simple Footer */}
      <footer className="absolute bottom-8 left-8 z-10 hidden md:block opacity-40 text-[10px] tracking-[0.2em] uppercase">
        © 2024 3 BROS TREND • DIVINE INSPIRATION
      </footer>
    </div>
  );
};

export default App;
