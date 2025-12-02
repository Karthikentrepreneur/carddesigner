
import React, { forwardRef } from 'react';
import { CardState, CardMotif } from '../types';
import { Phone, Mail, MapPin } from 'lucide-react';

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

// --- NEW PROFESSIONAL LAYOUTS ---

// 6. AGENCY BOLD (Yellow/Black/Navy) - Inspired by "We're Hiring"
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
             {content.tamilTitle.split(' ').map((word, i) => (
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
      <div className="bg-white/95 text-black p-6 rounded-r-2xl border-l-8 border-[#FFD600] shadow-2xl max-w-lg mb-4">
         <p className="font-tamil text-xl font-bold leading-relaxed">
            {content.tamilWish}
         </p>
         <p className="text-sm text-gray-600 mt-2 font-medium">{content.englishWish}</p>
      </div>

      {/* Footer Contact Bar */}
      {content.footerText && (
        <div className="bg-black text-white p-4 -mx-10 -mb-10 flex items-center justify-between px-10">
           <div className="flex items-center gap-6">
              <span className="flex items-center gap-2 text-[#FFD600] font-bold text-lg">
                 <Phone size={20} /> Call Us
              </span>
              <span className="font-mono tracking-wide">{content.footerText.split('|')[0]}</span>
           </div>
           <div className="flex items-center gap-2 text-gray-400 text-sm">
              <Mail size={16} />
              <span>{content.footerText.split('|')[1] || 'contact@example.com'}</span>
           </div>
        </div>
      )}
    </div>
  </div>
);

// 7. CREATIVE TEAR (Orange/White) - Inspired by "Join Our Team" torn paper
const CreativeTearLayout = ({ content, logoUrl }: { content: CardState['content'], logoUrl: string | null }) => (
    <div className="w-full h-full relative bg-white flex flex-col font-sans">
       {/* Top Colored Section */}
       <div className="absolute top-0 left-0 w-full h-[75%] bg-[#E64A19] overflow-hidden">
          <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.05)_50%,transparent_75%,transparent_100%)] bg-[length:20px_20px]" />
          <div className="absolute right-[-100px] top-[-50px] w-[400px] h-[400px] bg-[#FF7043] rounded-full mix-blend-screen opacity-50 blur-3xl" />
          
          {/* Content Top */}
          <div className="p-10 relative z-10 h-full flex flex-col">
             {logoUrl && <img src={logoUrl} alt="logo" className="h-12 w-auto self-end mb-10 bg-white p-2 rounded-lg" />}
             
             <div className="inline-block bg-white text-[#E64A19] px-3 py-1 font-bold text-xs uppercase tracking-widest w-max mb-4 rounded">
                 {content.englishTitle}
             </div>
             
             <h1 className="text-6xl font-black text-white leading-tight font-tamil drop-shadow-md max-w-lg">
                {content.tamilTitle}
             </h1>

             <div className="w-20 h-2 bg-white mt-6 mb-6" />

             <p className="text-orange-50 font-tamil text-2xl font-medium leading-9 max-w-md">
                {content.tamilWish}
             </p>
          </div>
       </div>

       {/* Torn Paper Divider */}
       <div className="absolute top-[68%] w-full h-12 z-20">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-full text-white fill-current drop-shadow-md">
             <path d="M0,0V46.29c47,0,47,20,94,20s47-20,94-20,47,20,94,20,47-20,94-20,47,20,94,20,47-20,94-20,47,20,94,20,47-20,94-20,47,20,94,20,47-20,94-20,47,20,94,20,47-20,94-20,47,20,94,20l0,0V120H0Z" transform="scale(1 -1) translate(0 -120)" />
          </svg>
          
          {/* Floating Action Button / Icon */}
          <div className="absolute right-12 -top-6 w-20 h-20 bg-[#FFD600] rounded-full shadow-lg flex items-center justify-center border-4 border-white">
               <div className="w-10 h-10 text-[#E64A19]">
                   <MotifIcon type={content.motif} color="currentColor" />
               </div>
          </div>
       </div>

       {/* Bottom White Section */}
       <div className="mt-auto h-[25%] p-8 flex items-end justify-between relative z-10 bg-white">
          <div className="flex flex-col gap-1">
             <h3 className="text-2xl font-bold text-gray-800 uppercase">Contact Us</h3>
             <p className="text-gray-500 text-sm">For more details & wishes</p>
          </div>

          <div className="text-right">
             <div className="bg-gray-900 text-white px-6 py-3 rounded-xl flex items-center gap-3 shadow-xl">
                 <Phone size={24} className="text-[#FFD600]" />
                 <div className="flex flex-col text-left">
                     <span className="text-xs text-gray-400">Call / WhatsApp</span>
                     <span className="font-bold text-lg leading-none">{content.footerText?.split('|')[0] || '+91 99999 88888'}</span>
                 </div>
             </div>
          </div>
       </div>
    </div>
);

// 8. TECH NETWORK (Blue/Gradient) - Inspired by INDSYS
const TechNetworkLayout = ({ content, logoUrl }: { content: CardState['content'], logoUrl: string | null }) => (
    <div className="w-full h-full relative bg-[#0f172a] flex flex-col items-center justify-center p-8 overflow-hidden font-sans text-center">
         {/* Background Gradients */}
         <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_#1e293b_0%,_#020617_100%)]" />
         <div className="absolute top-[-200px] left-[-200px] w-[600px] h-[600px] bg-blue-600/20 rounded-full blur-[100px]" />
         <div className="absolute bottom-[-200px] right-[-200px] w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[100px]" />

         {/* Network Mesh SVG Overlay */}
         <svg className="absolute inset-0 w-full h-full opacity-30 pointer-events-none">
             <defs>
                 <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                     <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="1"/>
                 </pattern>
             </defs>
             <rect width="100%" height="100%" fill="url(#grid)" />
             {[...Array(5)].map((_, i) => (
                 <circle key={i} cx={Math.random()*100 + "%"} cy={Math.random()*100 + "%"} r={Math.random()*2 + 1} fill="#38bdf8" className="animate-pulse" />
             ))}
             <path d="M100 100 Q 300 300 500 100 T 900 300" stroke="#38bdf8" strokeWidth="0.5" fill="none" opacity="0.5" />
         </svg>

         {/* Logo */}
         {logoUrl && (
             <div className="absolute top-8 right-8">
                 <img src={logoUrl} alt="logo" className="h-8 w-auto invert opacity-80" />
             </div>
         )}

         {/* Glass Card Content */}
         <div className="relative z-10 w-full max-w-md bg-white/5 backdrop-blur-xl border border-white/10 p-10 rounded-3xl shadow-2xl flex flex-col items-center">
              <div className="mb-6 p-4 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-400 shadow-lg shadow-blue-500/30">
                 <div className="w-12 h-12 text-white">
                     <MotifIcon type={content.motif} color="#fff" />
                 </div>
              </div>

              <h2 className="text-blue-400 font-bold tracking-widest uppercase text-sm mb-2">{content.englishTitle}</h2>
              <h1 className="text-5xl font-black text-white font-tamil mb-6 leading-tight drop-shadow-lg">
                  {content.tamilTitle}
              </h1>
              
              <div className="w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent mb-6" />

              <p className="text-slate-300 font-tamil text-lg leading-7 mb-8">
                  {content.tamilWish}
              </p>

              <div className="w-full bg-[#1e293b] rounded-xl p-4 border border-white/5 flex justify-between items-center">
                  <span className="text-xs text-slate-400 uppercase font-bold">Connect</span>
                  <span className="text-cyan-400 font-mono text-sm">{content.footerText?.split('|')[0]}</span>
              </div>
         </div>
    </div>
);

// --- MAIN CARD PREVIEW WRAPPER ---

const CardPreview = forwardRef<HTMLDivElement, CardPreviewProps>(({ cardState, scale = 1 }, ref) => {
  const { content, layout, date } = cardState;
  
  const containerStyle: React.CSSProperties = {
    transform: `scale(${scale})`,
    transformOrigin: 'top left',
    width: '600px',
    height: '600px',
  };

  const renderLayout = () => {
    switch(layout) {
      // Classic
      case 'frame': return <RoyalLayout content={content} logoUrl={cardState.logoUrl} />;
      case 'poster': return <ModernLayout content={content} logoUrl={cardState.logoUrl} />;
      case 'minimal': return <HeritageLayout content={content} logoUrl={cardState.logoUrl} />;
      case 'divine': return <DivineLayout content={content} logoUrl={cardState.logoUrl} />;
      case 'floral': return <FloralLayout content={content} logoUrl={cardState.logoUrl} />;
      // New Pro Layouts
      case 'agency': return <AgencyBoldLayout content={content} logoUrl={cardState.logoUrl} date={date} />;
      case 'tear': return <CreativeTearLayout content={content} logoUrl={cardState.logoUrl} />;
      case 'tech': return <TechNetworkLayout content={content} logoUrl={cardState.logoUrl} />;
      
      default: return <RoyalLayout content={content} logoUrl={cardState.logoUrl} />;
    }
  };

  return (
    <div 
      ref={ref}
      className="relative overflow-hidden shadow-2xl select-none bg-white"
      style={containerStyle}
    >
      <GlobalFilters />
      {renderLayout()}
    </div>
  );
});

// ... Previous Layouts (RoyalLayout, ModernLayout, etc.) need to be kept or re-declared if this file overwrites completely. 
// Re-declaring the previous layouts here for completeness since the XML replacement is full file content.

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
    </div>
    {logoUrl && <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"><img src={logoUrl} alt="logo" className="h-8 w-auto mix-blend-screen opacity-80" /></div>}
  </div>
);

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
         </div>
         {logoUrl && <div className="absolute bottom-8 left-1/2 -translate-x-1/2 opacity-60"><img src={logoUrl} alt="logo" className="h-6 w-auto grayscale" /></div>}
    </div>
);

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
             {logoUrl && <div className="mb-2"><img src={logoUrl} alt="logo" className="h-8 w-auto opacity-80 mix-blend-multiply" /></div>}
        </div>
    </div>
);

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
    </div>
);

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
        {logoUrl && <div className="absolute bottom-8 z-20"><img src={logoUrl} alt="logo" className="h-7 w-auto opacity-80" /></div>}
    </div>
);

CardPreview.displayName = 'CardPreview';

export default CardPreview;
