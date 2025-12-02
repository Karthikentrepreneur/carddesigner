
import React, { forwardRef } from 'react';
import { CardState, CardMotif } from '../types';
import { Phone, MapPin, Globe, Share2 } from 'lucide-react';

interface CardPreviewProps {
  cardState: CardState;
  scale?: number;
}

// --- GLOBAL ASSETS & FILTERS ---

const GlobalFilters = () => (
  <svg width="0" height="0" className="absolute">
    <defs>
      {/* Luxurious Gold Gradient */}
      <linearGradient id="goldFoil" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#C6A664" />
        <stop offset="25%" stopColor="#FFFACD" />
        <stop offset="45%" stopColor="#D4AF37" />
        <stop offset="65%" stopColor="#C6A664" />
        <stop offset="85%" stopColor="#E5C100" />
        <stop offset="100%" stopColor="#B8860B" />
      </linearGradient>

      {/* Paper Texture Filter */}
      <filter id="texturePaper">
        <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch" />
        <feColorMatrix type="matrix" values="0 0 0 0 0.95  0 0 0 0 0.95  0 0 0 0 0.9  0 0 0 1 0" />
        <feComposite operator="in" in2="SourceGraphic" />
      </filter>
      
      {/* Noise for Modern Cards */}
      <filter id="noiseGrain">
         <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch"/>
         <feColorMatrix type="saturate" values="0"/>
         <feComponentTransfer>
            <feFuncA type="linear" slope="0.1"/>
         </feComponentTransfer>
      </filter>

      {/* Torn Paper Edge Filter */}
      <filter id="tornEdge">
        <feTurbulence type="fractalNoise" baseFrequency="0.05" numOctaves="5" result="noise" />
        <feDisplacementMap in="SourceGraphic" in2="noise" scale="10" />
      </filter>
    </defs>
  </svg>
);

// --- UTILITY COMPONENTS ---

const GoldText = ({ children, className = "", size = "text-5xl" }: { children?: React.ReactNode, className?: string, size?: string }) => (
  <h1 
    className={`${size} font-bold font-tamil ${className}`} 
    style={{ 
        backgroundImage: 'linear-gradient(45deg, #C6A664, #FFFACD, #D4AF37, #C6A664)', 
        backgroundSize: '200% auto', 
        WebkitBackgroundClip: 'text', 
        WebkitTextFillColor: 'transparent',
        filter: 'drop-shadow(0px 2px 2px rgba(0,0,0,0.3))'
    }}
  >
    {children}
  </h1>
);

// --- VECTOR MOTIFS ---

const MotifIcon = ({ type, color = "url(#goldFoil)" }: { type: CardMotif, color?: string }) => {
    const isUrl = color && color.startsWith('url');
    switch (type) {
        case 'lamp':
            return (
                <svg viewBox="0 0 100 100" className="w-full h-full">
                    <path d="M50 20 Q65 5 50 0 Q35 5 50 20" fill={color} className="animate-pulse" opacity="0.8"/>
                    <path d="M20 50 Q50 90 80 50 L90 40 Q85 30 75 30 Q50 30 25 30 Q15 30 10 40 L20 50" fill={color} />
                </svg>
            );
        case 'pot':
            return (
                <svg viewBox="0 0 100 100" className="w-full h-full">
                   <path d="M30 40 Q25 70 35 85 Q50 95 65 85 Q75 70 70 40 Q65 30 50 30 Q35 30 30 40" fill={color} />
                   <path d="M32 30 Q30 20 40 15 M68 30 Q70 20 60 15" stroke={isUrl ? '#D4AF37' : color} strokeWidth="2" fill="none" />
                </svg>
            );
        case 'sun':
            return (
                <svg viewBox="0 0 100 100" className="w-full h-full">
                    <circle cx="50" cy="50" r="18" fill={color} />
                    {[...Array(16)].map((_, i) => (
                        <path key={i} d="M50 15 L53 25 L47 25 Z" fill={color} transform={`rotate(${i * 22.5} 50 50)`} />
                    ))}
                </svg>
            );
        case 'flower':
            return (
                 <svg viewBox="0 0 100 100" className="w-full h-full">
                    {[...Array(8)].map((_, i) => (
                        <path key={i} d="M50 50 Q70 25 50 10 Q30 25 50 50" fill={color} transform={`rotate(${i * 45} 50 50)`} opacity="0.9" />
                    ))}
                    <circle cx="50" cy="50" r="6" fill="#fff" opacity="0.5" />
                 </svg>
            );
        case 'temple':
             return (
                 <svg viewBox="0 0 100 100" className="w-full h-full">
                    <path d="M20 80 L80 80 L80 55 L50 10 L20 55 Z" fill={color} />
                 </svg>
             );
        default: return null;
    }
};

// --- LAYOUT COMPONENTS ---

// 1. Royal (Frame) Layout
const RoyalLayout = ({ content, logoUrl }: { content: CardState['content'], logoUrl: string | null }) => (
  <div className="w-full h-full relative bg-[#1a0505] flex flex-col p-8 overflow-hidden">
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_#3E0000_0%,_#120202_80%)]" />
    <div className="absolute inset-0 opacity-10" style={{ filter: 'url(#noiseGrain)' }} />
    <div className="absolute inset-4 border border-[#B8860B] opacity-40" />
    <div className="absolute inset-6 border-[3px] border-[#D4AF37]" style={{ boxShadow: 'inset 0 0 20px rgba(0,0,0,0.5)' }} />
    {[0, 90, 180, 270].map((rot, i) => (
       <svg key={i} className="absolute w-20 h-20 text-[#D4AF37]" style={{ 
           top: i < 2 ? '1.5rem' : 'auto', bottom: i >= 2 ? '1.5rem' : 'auto',
           left: i === 0 || i === 3 ? '1.5rem' : 'auto', right: i === 1 || i === 2 ? '1.5rem' : 'auto',
           transform: `rotate(${rot}deg)`
       }} viewBox="0 0 100 100">
           <path d="M0 0 L40 0 C40 20 20 40 0 40 Z" fill="currentColor" />
           <path d="M5 5 L35 5 C35 20 20 35 5 35 Z" fill="#1a0505" />
       </svg>
    ))}
    <div className="relative z-10 flex flex-col items-center justify-center h-full text-center space-y-6">
        <div className="w-24 h-24 mb-2 drop-shadow-[0_4px_10px_rgba(212,175,55,0.3)]">
            <MotifIcon type={content.motif} />
        </div>
        <div className="space-y-3">
             <p className="text-[#E5C100] font-serif tracking-[0.3em] text-xs uppercase opacity-80">{content.englishTitle}</p>
             <GoldText size="text-6xl" className="leading-tight py-2">{content.tamilTitle}</GoldText>
        </div>
        <div className="flex items-center gap-4 w-full justify-center opacity-60">
            <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-[#D4AF37]" />
            <div className="w-2 h-2 rotate-45 border border-[#D4AF37]" />
            <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-[#D4AF37]" />
        </div>
        <p className="text-[#eaddcf] font-tamil text-lg font-light leading-7 max-w-md">{content.tamilWish}</p>
        
        {content.footerText && (
            <div className="mt-4 pt-4 border-t border-[#D4AF37]/30 text-[#D4AF37]/80 text-sm font-serif italic">
               {content.footerText}
            </div>
        )}
    </div>
    {logoUrl && <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"><img src={logoUrl} alt="logo" className="h-8 w-auto mix-blend-screen opacity-80" /></div>}
  </div>
);

// 2. Modern (Poster) Layout
const ModernLayout = ({ content, logoUrl }: { content: CardState['content'], logoUrl: string | null }) => (
    <div className="w-full h-full relative bg-slate-950 flex flex-col p-10 overflow-hidden text-center justify-center">
         <div className="absolute inset-0 bg-slate-950" />
         <div className="absolute -top-[20%] -right-[20%] w-[80%] h-[80%] bg-purple-900/40 rounded-full blur-[100px]" />
         <div className="absolute -bottom-[20%] -left-[20%] w-[80%] h-[80%] bg-blue-900/40 rounded-full blur-[100px]" />
         <div className="absolute inset-0" style={{ filter: 'url(#noiseGrain)', opacity: 0.05 }} />
         <div className="relative z-10 flex flex-col items-center">
             <div className="mb-10 p-6 rounded-full bg-white/5 border border-white/10 backdrop-blur-md shadow-2xl">
                 <div className="w-20 h-20"><MotifIcon type={content.motif} color="#fff" /></div>
             </div>
             <h1 className="text-7xl font-black font-tamil text-white mb-6 drop-shadow-xl leading-snug tracking-wide">{content.tamilTitle}</h1>
             <div className="inline-block bg-white text-black px-4 py-1 text-xs font-bold tracking-[0.2em] uppercase mb-8">{content.englishTitle}</div>
             <p className="text-slate-300 font-tamil text-xl leading-8 max-w-lg font-medium">{content.tamilWish}</p>
             
             {content.footerText && <p className="mt-8 text-slate-500 text-sm font-mono tracking-wider">{content.footerText}</p>}
         </div>
         {logoUrl && <div className="absolute bottom-8 left-1/2 -translate-x-1/2 opacity-60"><img src={logoUrl} alt="logo" className="h-6 w-auto grayscale" /></div>}
    </div>
);

// 3. Heritage (Minimal) Layout
const HeritageLayout = ({ content, logoUrl }: { content: CardState['content'], logoUrl: string | null }) => (
    <div className="w-full h-full relative bg-[#FFF8E7] flex flex-col items-center overflow-hidden">
        <div className="absolute inset-0 opacity-40 mix-blend-multiply pointer-events-none" style={{ filter: 'url(#texturePaper)' }} />
        <svg viewBox="0 0 100 100" className="absolute top-0 w-full text-[#8B4513] opacity-10" preserveAspectRatio="none">
             <path d="M0 0 L0 30 Q50 80 100 30 L100 0 Z" fill="currentColor" />
        </svg>
        <div className="relative z-10 mt-20 p-8 w-3/4 h-[80%] border-2 border-[#8B4513] border-double bg-[#fffdf5] shadow-xl flex flex-col items-center justify-between text-center">
             <div className="w-20 h-20 text-[#D2691E] mt-4"><MotifIcon type={content.motif} color="currentColor" /></div>
             <div>
                <h3 className="font-serif italic text-[#8B4513] text-lg mb-2">{content.englishTitle}</h3>
                <h1 className="text-5xl font-bold font-tamil text-[#800000] leading-tight">{content.tamilTitle}</h1>
             </div>
             <div className="w-16 h-1 bg-[#D2691E] opacity-50 my-2" />
             <p className="text-[#5D4037] font-tamil text-lg leading-relaxed mb-4">{content.tamilWish}</p>
             {content.footerText && <div className="text-[#8B4513] text-sm opacity-70 border-t border-[#8B4513]/20 pt-2 w-full">{content.footerText}</div>}
             {logoUrl && <div className="mb-2"><img src={logoUrl} alt="logo" className="h-8 w-auto opacity-80 mix-blend-multiply" /></div>}
        </div>
    </div>
);

// 4. Divine Layout
const DivineLayout = ({ content, logoUrl }: { content: CardState['content'], logoUrl: string | null }) => (
    <div className="w-full h-full relative bg-[#FF9800] flex flex-col items-center justify-center p-8 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle,_#FFC107_0%,_#FF5722_100%)]" />
        <div className="absolute inset-0 flex items-center justify-center opacity-20 pointer-events-none">
             <svg viewBox="0 0 200 200" className="w-[180%] h-[180%] animate-[spin_120s_linear_infinite]">
                 {[...Array(24)].map((_, i) => (
                     <g key={i} transform={`rotate(${i * 15} 100 100)`}>
                         <circle cx="100" cy="20" r="5" fill="#5D1009" />
                         <path d="M100 30 L105 50 L100 60 L95 50 Z" fill="#5D1009" />
                     </g>
                 ))}
                 <circle cx="100" cy="100" r="60" fill="none" stroke="#5D1009" strokeWidth="1" />
             </svg>
        </div>
        <div className="relative z-10 bg-white/10 backdrop-blur-sm border border-white/20 p-10 rounded-2xl text-center shadow-lg max-w-md w-full">
            <div className="w-24 h-24 mx-auto mb-6 drop-shadow-lg"><MotifIcon type={content.motif} color="#FFF8E1" /></div>
            <h1 className="text-5xl font-black font-tamil text-[#3E0000] mb-4 drop-shadow-sm leading-tight">{content.tamilTitle}</h1>
            <div className="h-px w-20 bg-[#3E0000]/40 mx-auto mb-4" />
            <p className="text-[#3E0000] font-tamil font-medium text-lg leading-7">{content.tamilWish}</p>
        </div>
        {logoUrl && <div className="absolute bottom-6 z-20 opacity-80 mix-blend-multiply"><img src={logoUrl} alt="logo" className="h-8 w-auto" /></div>}
        
        {content.footerText && (
             <div className="absolute bottom-16 z-20 text-[#3E0000] font-bold text-sm bg-white/20 px-4 py-1 rounded-full">{content.footerText}</div>
        )}
    </div>
);

// 5. Floral Layout
const FloralLayout = ({ content, logoUrl }: { content: CardState['content'], logoUrl: string | null }) => (
    <div className="w-full h-full relative bg-[#004D40] flex flex-col items-center justify-center p-12 overflow-hidden text-[#E0F2F1]">
        <div className="absolute inset-0 opacity-20" style={{ filter: 'url(#texturePaper)' }} />
        <div className="absolute inset-6 border border-[#80CBC4] rounded-tr-3xl rounded-bl-3xl opacity-50" />
        {[0, 180].map((deg, i) => (
             <svg key={i} viewBox="0 0 100 100" className="absolute w-32 h-32 text-[#80CBC4] pointer-events-none" style={{
                 top: i===0 ? '2rem' : 'auto', bottom: i===1 ? '2rem' : 'auto',
                 right: i===0 ? '2rem' : 'auto', left: i===1 ? '2rem' : 'auto',
                 transform: `rotate(${deg}deg)`
             }}>
                 <path d="M100 0 Q50 0 50 50 Q0 50 0 100" fill="none" stroke="currentColor" strokeWidth="1" />
                 <circle cx="50" cy="50" r="3" fill="currentColor" />
                 <path d="M50 50 Q70 70 90 60" fill="none" stroke="currentColor" strokeWidth="0.5" />
             </svg>
        ))}
        <div className="relative z-10 flex flex-col items-center text-center">
            <div className="w-20 h-20 mb-8 text-[#B2DFDB]"><MotifIcon type={content.motif} color="currentColor" /></div>
            <h1 className="text-5xl font-bold font-tamil text-white mb-4 drop-shadow-md tracking-wide">{content.tamilTitle}</h1>
            <p className="font-serif italic text-[#80CBC4] opacity-80 mb-8">{content.englishTitle}</p>
            <p className="text-white/90 font-tamil text-lg leading-relaxed max-w-xs font-light">{content.tamilWish}</p>
        </div>
        {content.footerText && <div className="absolute bottom-16 text-[#B2DFDB] text-xs tracking-widest uppercase">{content.footerText}</div>}
        {logoUrl && <div className="absolute bottom-8 z-20"><img src={logoUrl} alt="logo" className="h-7 w-auto opacity-80" /></div>}
    </div>
);

// 6. AGENCY BOLD (Yellow/Black/Navy)
const AgencyBoldLayout = ({ content, logoUrl, date }: { content: CardState['content'], logoUrl: string | null, date: string }) => (
  <div className="w-full h-full relative bg-[#0B1221] flex flex-col overflow-hidden font-sans">
    {/* Background Pattern: Dots */}
    <div className="absolute top-0 left-0 p-4 opacity-20">
       {[...Array(6)].map((_, r) => (
         <div key={r} className="flex gap-2 mb-2">
            {[...Array(6)].map((_, c) => <div key={c} className="w-1.5 h-1.5 rounded-full bg-white" />)}
         </div>
       ))}
    </div>

    {/* Big Diagonal Slice */}
    <div className="absolute top-[-20%] right-[-10%] w-[70%] h-[120%] bg-[#FFD600] transform -rotate-12 z-0" style={{ clipPath: 'polygon(20% 0%, 100% 0%, 100% 100%, 0% 100%)' }} />

    {/* Content */}
    <div className="relative z-10 p-10 flex flex-col h-full justify-between">
      
      {/* Top Header */}
      <div className="flex justify-between items-start">
         <div className="bg-[#FFD600] text-black px-4 py-1 font-black uppercase tracking-tighter text-3xl transform -skew-x-12">
            {content.englishTitle}
         </div>
         {logoUrl && (
            <div className="bg-white p-2 rounded shadow-lg">
                <img src={logoUrl} alt="logo" className="h-10 w-auto" />
            </div>
         )}
      </div>

      {/* Main Typography */}
      <div className="mt-8 space-y-2">
         <h1 className="text-7xl font-black text-white leading-[0.9] uppercase tracking-tight drop-shadow-xl" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
             {content.tamilTitle.split(' ').slice(0, 3).map((word, i) => (
                <span key={i} className={i % 2 !== 0 ? "text-[#FFD600]" : "text-white"}>
                  {word}<br/>
                </span>
             ))}
         </h1>
      </div>

      {/* Badge Element */}
      <div className="flex items-center gap-4 mt-6">
          <div className="bg-[#D32F2F] text-white px-6 py-2 rounded-full flex items-center gap-2 shadow-lg">
             <MapPin size={20} />
             <span className="font-bold text-lg">{date}</span>
          </div>
          <div className="bg-white/10 backdrop-blur px-4 py-2 rounded-lg border border-white/20">
             <span className="text-[#FFD600] font-bold">#SpecialDay</span>
          </div>
      </div>

      <div className="flex-grow" />

      {/* Body Text */}
      <div className="bg-white/95 text-black p-6 rounded-r-2xl border-l-8 border-[#FFD600] shadow-lg mt-4 max-w-md relative">
         <p className="text-lg font-medium leading-relaxed font-tamil">{content.tamilWish}</p>
      </div>
      
      {/* Footer Contact */}
      {content.footerText && (
         <div className="mt-8 pt-4 border-t border-white/20 flex items-center gap-3 text-white/80">
            <Phone size={16} className="text-[#FFD600]" />
            <span className="font-mono text-sm tracking-wide">{content.footerText}</span>
         </div>
      )}
    </div>
  </div>
);

// 7. CREATIVE TEAR (Orange/White)
const CreativeTearLayout = ({ content, logoUrl, date }: { content: CardState['content'], logoUrl: string | null, date: string }) => (
    <div className="w-full h-full relative bg-[#E65100] flex flex-col overflow-hidden">
        {/* Top Section (Dark/Image area simulation) */}
        <div className="absolute top-0 w-full h-[65%] bg-[#1a1a1a] flex items-center justify-center overflow-hidden">
             <div className="absolute inset-0 bg-[#E65100] opacity-10 mix-blend-overlay" />
             {/* Abstract Shapes */}
             <div className="absolute top-10 right-10 w-64 h-64 border-2 border-white/10 rounded-full" />
             <div className="absolute bottom-10 left-10 w-40 h-40 bg-[#E65100] rounded-full blur-[80px] opacity-40" />
             
             <div className="relative z-10 text-center px-8">
                 <div className="inline-block bg-[#E65100] text-white px-3 py-1 mb-4 text-xs font-bold tracking-widest uppercase rounded">
                    {content.englishTitle}
                 </div>
                 <h1 className="text-6xl font-black text-white font-tamil leading-tight drop-shadow-2xl">
                    {content.tamilTitle}
                 </h1>
             </div>
        </div>

        {/* Torn Paper Divider */}
        <div className="absolute top-[60%] w-full h-16 z-20" style={{ transform: 'translateY(-50%)' }}>
           <svg viewBox="0 0 100 10" preserveAspectRatio="none" className="w-full h-full text-[#FAFAFA]">
              <path d="M0 10 L0 5 Q10 2 20 6 T40 4 T60 7 T80 3 T100 6 L100 10 Z" fill="currentColor" />
              <path d="M0 0 L0 5 Q10 2 20 6 T40 4 T60 7 T80 3 T100 6 L100 0 Z" fill="#1a1a1a" />
           </svg>
        </div>

        {/* Bottom Section (White) */}
        <div className="absolute bottom-0 w-full h-[40%] bg-[#FAFAFA] flex flex-col p-8 pt-16">
            <div className="flex gap-6 items-start">
               <div className="bg-[#E65100] p-4 rounded-full text-white shadow-xl shrink-0">
                  <MotifIcon type={content.motif} color="white" />
               </div>
               <div>
                  <h3 className="text-[#E65100] font-bold text-xl uppercase mb-2">Join the Celebration</h3>
                  <p className="text-gray-600 font-tamil text-lg leading-relaxed">{content.tamilWish}</p>
               </div>
            </div>

            <div className="mt-auto flex items-center justify-between border-t border-gray-200 pt-4">
                <div className="flex flex-col">
                   <span className="text-xs text-gray-400 uppercase font-bold">Contact</span>
                   <span className="text-[#1a1a1a] font-bold">{content.footerText || "+91 00000 00000"}</span>
                </div>
                {logoUrl ? (
                    <img src={logoUrl} alt="logo" className="h-10 w-auto" />
                ) : (
                    <div className="bg-[#1a1a1a] text-white p-2 rounded"><Globe size={20}/></div>
                )}
            </div>
        </div>
    </div>
);

// 8. TECH NETWORK (Blue/Cyan)
const TechNetworkLayout = ({ content, logoUrl, date }: { content: CardState['content'], logoUrl: string | null, date: string }) => (
    <div className="w-full h-full relative bg-[#0F172A] flex flex-col p-8 overflow-hidden font-sans">
        {/* Grid Background */}
        <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(#22D3EE 1px, transparent 1px)', backgroundSize: '40px 40px', opacity: 0.1 }}></div>
        
        {/* Glowing Orbs */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-cyan-600/10 rounded-full blur-[100px]"></div>

        {/* Content Container */}
        <div className="relative z-10 flex flex-col h-full border border-white/10 rounded-3xl bg-white/5 backdrop-blur-sm p-8 shadow-2xl">
            {/* Header */}
            <div className="flex justify-between items-start mb-10">
               <div>
                  <div className="text-cyan-400 font-mono text-sm mb-2">{date} // SYSTEM.MSG</div>
                  <h2 className="text-white text-3xl font-bold uppercase tracking-widest">{content.englishTitle}</h2>
               </div>
               {logoUrl ? <img src={logoUrl} alt="logo" className="h-12 w-auto" /> : <div className="text-white font-bold text-2xl tracking-tighter">INDSYS</div>}
            </div>

            {/* Central Visual */}
            <div className="flex-grow flex items-center justify-center relative">
               <div className="absolute w-64 h-64 border border-cyan-500/30 rounded-full animate-pulse"></div>
               <div className="absolute w-80 h-80 border border-blue-500/20 rounded-full"></div>
               <div className="relative z-10 text-center">
                  <h1 className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 font-tamil leading-tight drop-shadow-[0_0_15px_rgba(6,182,212,0.5)]">
                     {content.tamilTitle}
                  </h1>
               </div>
            </div>

            {/* Footer Stats/Info */}
            <div className="grid grid-cols-2 gap-4 mt-8">
               <div className="bg-[#0F172A]/80 p-4 rounded-xl border border-white/5 hover:border-cyan-500/50 transition-colors">
                  <div className="text-cyan-500 mb-2"><Share2 size={24}/></div>
                  <p className="text-gray-300 text-sm font-tamil">{content.tamilWish}</p>
               </div>
               <div className="bg-gradient-to-br from-blue-600 to-blue-800 p-4 rounded-xl flex flex-col justify-center items-center text-center shadow-lg">
                  <span className="text-blue-200 text-xs uppercase font-bold mb-1">Get in Touch</span>
                  <span className="text-white font-bold text-sm break-all">{content.footerText || "www.example.com"}</span>
               </div>
            </div>
        </div>
    </div>
);


// --- MAIN COMPONENT ---

const CardPreview = forwardRef<HTMLDivElement, CardPreviewProps>(({ cardState }, ref) => {
  const { layout, content, logoUrl, date } = cardState;

  const renderLayout = () => {
    switch (layout) {
      case 'frame': return <RoyalLayout content={content} logoUrl={logoUrl} />;
      case 'poster': return <ModernLayout content={content} logoUrl={logoUrl} />;
      case 'minimal': return <HeritageLayout content={content} logoUrl={logoUrl} />;
      case 'divine': return <DivineLayout content={content} logoUrl={logoUrl} />;
      case 'floral': return <FloralLayout content={content} logoUrl={logoUrl} />;
      case 'agency': return <AgencyBoldLayout content={content} logoUrl={logoUrl} date={date} />;
      case 'tear': return <CreativeTearLayout content={content} logoUrl={logoUrl} date={date} />;
      case 'tech': return <TechNetworkLayout content={content} logoUrl={logoUrl} date={date} />;
      default: return <ModernLayout content={content} logoUrl={logoUrl} />;
    }
  };

  return (
    <div 
        ref={ref} 
        className="relative w-[500px] h-[500px] bg-white overflow-hidden flex-shrink-0"
        style={{ width: '500px', height: '500px' }} // Explicit size for html-to-image
    >
      <GlobalFilters />
      {renderLayout()}
    </div>
  );
});

CardPreview.displayName = 'CardPreview';

export default CardPreview;
