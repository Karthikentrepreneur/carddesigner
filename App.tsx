
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { toPng } from 'html-to-image';
import { Download, Sparkles, Upload, Type, Loader2, RefreshCcw, Layout, Image as ImageIcon, Palette, Contact } from 'lucide-react';
import { generateCardContent } from './services/geminiService';
import CardPreview from './components/CardPreview';
import { CardState, DEFAULT_CONTENT, CardMotif } from './types';

const getTodayDate = () => new Date().toISOString().split('T')[0];

export default function App() {
  const [cardState, setCardState] = useState<CardState>({
    date: getTodayDate(),
    logoUrl: null,
    content: DEFAULT_CONTENT,
    isLoading: false,
    layout: 'agency', // Default to new Agency look
  });

  const cardRef = useRef<HTMLDivElement>(null);

  // Initial generation
  useEffect(() => {
    handleGenerateContent(cardState.date);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCardState(prev => ({ ...prev, date: e.target.value }));
  };

  const handleGenerateContent = async (date: string) => {
    setCardState(prev => ({ ...prev, isLoading: true }));
    const newContent = await generateCardContent(date);
    setCardState(prev => ({
      ...prev,
      content: newContent,
      isLoading: false
    }));
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCardState(prev => ({ ...prev, logoUrl: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDownload = useCallback(async () => {
    if (cardRef.current === null) return;
    try {
      // Delay for rendering
      await new Promise(resolve => setTimeout(resolve, 100));
      const dataUrl = await toPng(cardRef.current, { cacheBust: true, pixelRatio: 2 });
      const link = document.createElement('a');
      link.download = `card-${cardState.date}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error("Failed to download image", err);
      alert("Could not download image. Please try again.");
    }
  }, [cardState.date]);

  const layoutOptions = [
    { id: 'agency', label: 'Agency Bold', color: 'bg-yellow-400 border-black' },
    { id: 'tear', label: 'Creative Tear', color: 'bg-orange-600 border-white' },
    { id: 'tech', label: 'Tech Network', color: 'bg-blue-900 border-cyan-400' },
    { id: 'frame', label: 'Magnum Opus', color: 'bg-[#1a0505] border-[#D4AF37]' },
    { id: 'poster', label: 'Vogue Modern', color: 'bg-slate-900 border-indigo-500' },
    { id: 'minimal', label: 'Heritage', color: 'bg-[#FFF8E7] border-[#8B4513]' },
    { id: 'divine', label: 'Divine Aura', color: 'bg-orange-500 border-yellow-200' },
    { id: 'floral', label: 'Elegance', color: 'bg-[#004D40] border-[#80CBC4]' },
  ] as const;

  const motifOptions: { id: CardMotif; label: string }[] = [
      { id: 'lamp', label: 'Lamp' },
      { id: 'pot', label: 'Pot' },
      { id: 'flower', label: 'Flower' },
      { id: 'sun', label: 'Sun' },
      { id: 'temple', label: 'Temple' },
  ];

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-200 font-sans selection:bg-amber-500 selection:text-white">
      {/* Navbar */}
      <header className="bg-black/40 backdrop-blur-md border-b border-white/5 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-tr from-amber-400 to-amber-700 p-2 rounded-lg shadow-lg">
               <Sparkles className="w-5 h-5 text-black fill-black" />
            </div>
            <span className="text-xl font-bold text-white tracking-tight">
              Tamil<span className="text-amber-500">Pro</span>
            </span>
          </div>
          <div className="flex items-center gap-2">
             <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
             <span className="text-xs font-mono text-zinc-500">SYSTEM ACTIVE</span>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* LEFT: Controls */}
          <div className="lg:col-span-4 space-y-8">
            
            {/* 1. Date & AI Gen */}
            <div className="bg-zinc-900/50 border border-white/5 rounded-2xl p-6">
              <label className="block text-xs font-bold text-zinc-500 mb-3 uppercase tracking-widest">Select Date</label>
              <div className="flex gap-2">
                <input 
                  type="date" 
                  value={cardState.date}
                  onChange={handleDateChange}
                  className="block w-full rounded-lg border border-zinc-700 bg-zinc-800 text-white p-3 focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all outline-none"
                />
                <button
                  onClick={() => handleGenerateContent(cardState.date)}
                  disabled={cardState.isLoading}
                  className="bg-zinc-800 hover:bg-zinc-700 text-white border border-zinc-700 rounded-lg px-4 flex items-center justify-center transition-all disabled:opacity-50"
                  title="Regenerate"
                >
                  {cardState.isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <RefreshCcw className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* 2. Layouts */}
            <div className="space-y-4">
               <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    <Layout className="w-4 h-4 text-amber-500" /> Layout Style
                  </h3>
               </div>
               <div className="grid grid-cols-1 gap-2">
                  {layoutOptions.map((opt) => (
                    <button
                      key={opt.id}
                      onClick={() => setCardState(prev => ({ ...prev, layout: opt.id as any }))}
                      className={`relative w-full p-3 rounded-lg flex items-center gap-4 transition-all border ${
                        cardState.layout === opt.id 
                          ? 'bg-zinc-800 border-amber-500/50 shadow-[0_0_15px_rgba(245,158,11,0.1)]' 
                          : 'bg-zinc-900/50 border-transparent hover:bg-zinc-800'
                      }`}
                    >
                      <div className={`w-10 h-10 rounded-md ${opt.color} shadow-sm shrink-0 border border-white/10`}></div>
                      <div className="text-left">
                         <span className={`block text-sm font-medium ${cardState.layout === opt.id ? 'text-white' : 'text-zinc-400'}`}>{opt.label}</span>
                      </div>
                      {cardState.layout === opt.id && <div className="ml-auto w-2 h-2 rounded-full bg-amber-500" />}
                    </button>
                  ))}
               </div>
            </div>

            {/* 3. Design Elements */}
            <div className="space-y-4 pt-4 border-t border-white/5">
               <h3 className="text-sm font-bold text-white flex items-center gap-2">
                 <Palette className="w-4 h-4 text-pink-500" /> Core Motif
               </h3>
               <div className="grid grid-cols-5 gap-2">
                 {motifOptions.map((m) => (
                   <button
                     key={m.id}
                     onClick={() => setCardState(prev => ({ ...prev, content: { ...prev.content, motif: m.id } }))}
                     className={`aspect-square rounded-lg flex items-center justify-center transition-all border ${
                       cardState.content.motif === m.id
                        ? 'bg-zinc-800 border-amber-500 text-amber-500'
                        : 'bg-zinc-900/50 border-zinc-800 text-zinc-600 hover:text-zinc-400'
                     }`}
                   >
                     {/* Simplified Icons for Buttons */}
                     {m.id === 'lamp' && <div className="w-3 h-3 rounded-b-full border-2 border-current"></div>}
                     {m.id === 'pot' && <div className="w-3 h-3 rounded-full border-2 border-current"></div>}
                     {m.id === 'sun' && <div className="w-3 h-3 rounded-full border-2 border-dashed border-current"></div>}
                     {m.id === 'flower' && <div className="w-3 h-3 rotate-45 border-2 border-current"></div>}
                     {m.id === 'temple' && <div className="w-3 h-3 border-t-2 border-x-2 border-current"></div>}
                   </button>
                 ))}
               </div>
            </div>

            {/* 4. Content Editing */}
            <div className="space-y-4 pt-4 border-t border-white/5">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Type className="w-4 h-4 text-emerald-500" /> Text Content
              </h3>
              <div className="space-y-3">
                 <input
                    type="text"
                    value={cardState.content.tamilTitle}
                    onChange={(e) => setCardState(prev => ({ ...prev, content: { ...prev.content, tamilTitle: e.target.value } }))}
                    className="w-full p-3 bg-zinc-900 border border-zinc-800 rounded-lg text-sm text-white focus:border-amber-500 outline-none font-tamil"
                    placeholder="Headline"
                  />
                  <textarea
                    rows={3}
                    value={cardState.content.tamilWish}
                    onChange={(e) => setCardState(prev => ({ ...prev, content: { ...prev.content, tamilWish: e.target.value } }))}
                    className="w-full p-3 bg-zinc-900 border border-zinc-800 rounded-lg text-sm text-white focus:border-amber-500 outline-none font-tamil resize-none"
                    placeholder="Your Wish..."
                  />
                  
                  {/* New Footer/Contact Input */}
                  <div className="flex items-center gap-2 bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-1 focus-within:border-amber-500">
                      <Contact className="w-4 h-4 text-zinc-500" />
                      <input
                        type="text"
                        value={cardState.content.footerText || ''}
                        onChange={(e) => setCardState(prev => ({ ...prev, content: { ...prev.content, footerText: e.target.value } }))}
                        className="w-full py-2 bg-transparent text-sm text-white outline-none"
                        placeholder="Phone | Email (Footer Info)"
                      />
                  </div>
              </div>
            </div>

            {/* 5. Logo */}
            <div className="pt-4 border-t border-white/5">
               <div className="flex items-center justify-between mb-3">
                 <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    <ImageIcon className="w-4 h-4 text-blue-500" /> Logo Branding
                 </h3>
                 {cardState.logoUrl && (
                    <button onClick={() => setCardState(prev => ({...prev, logoUrl: null}))} className="text-xs text-red-500 hover:text-red-400">Clear</button>
                 )}
               </div>
               
               {!cardState.logoUrl ? (
                 <label className="flex items-center justify-center w-full h-16 border border-dashed border-zinc-700 rounded-lg cursor-pointer hover:bg-zinc-800 transition-colors">
                   <span className="text-xs text-zinc-500">Click to upload logo</span>
                   <input type="file" className="hidden" accept="image/*" onChange={handleLogoUpload} />
                 </label>
               ) : (
                 <div className="p-3 bg-zinc-900 border border-zinc-800 rounded-lg flex items-center gap-3">
                    <img src={cardState.logoUrl} alt="Logo" className="w-8 h-8 object-contain" />
                    <span className="text-xs text-zinc-400">Logo attached</span>
                 </div>
               )}
            </div>

          </div>

          {/* RIGHT: Preview */}
          <div className="lg:col-span-8 flex flex-col items-center bg-zinc-900/30 rounded-3xl border border-white/5 p-8 relative">
              <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_rgba(251,191,36,0.05)_0%,_transparent_70%)] pointer-events-none" />
              
              <div className="sticky top-24 flex flex-col items-center gap-8 z-10">
                <div className="relative shadow-2xl shadow-black rounded-sm overflow-hidden ring-1 ring-white/10">
                   <CardPreview ref={cardRef} cardState={cardState} />
                </div>

                <button
                  onClick={handleDownload}
                  className="group relative inline-flex items-center justify-center px-8 py-3 font-bold text-white transition-all duration-200 bg-amber-600 font-pj rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-600"
                >
                  <div className="absolute -inset-3 transition-all duration-1000 opacity-30 group-hover:opacity-100 group-hover:duration-200 animate-tilt">
                    <div className="w-full h-full bg-gradient-to-r from-amber-400 to-orange-500 blur-lg"></div>
                  </div>
                  <div className="relative flex items-center gap-2">
                     <Download className="w-5 h-5" />
                     <span>Download High-Res Card</span>
                  </div>
                </button>
              </div>
          </div>

        </div>
      </main>
    </div>
  );
}
