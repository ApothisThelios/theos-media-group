import React, { useState, useEffect } from 'react';
import { GoldButton, OutlineButton, LOGO_URL } from './Layout';
import { NewsScript, EventItem, CourseItem, MerchItem, CartItem } from '../types';
import { generateNewsScript } from '../services/geminiService';
import { sendPressBlastToMediaList, subscribeToMailchimp, fetchStripeFunnelData, fetchBountyData } from '../services/backendService';
import { mintNFT, switchToPolygon, connectWallet } from '../services/web3Service';
import {
  Play, Calendar, MapPin, Users, Loader2, Lock, Tag, Mic, Video, CheckCircle, Shield, Key, X,
  ShoppingBag, Scissors, Calculator, Hammer, FileText, Trophy, Activity, MonitorPlay, Globe,
  Medal, UploadCloud, Edit3, Settings, Plus, Image as ImageIcon, Gamepad2, Leaf, TrendingUp,
  ShieldCheck, Landmark, Trash2, Zap, Network, Share2, Radar, Target, Mail, Mic2, Music, Palette,
  Camera, UserCheck, Database, FileSpreadsheet, Music4, Disc, Radio, PartyPopper, Cast, MessageSquare,
  Signal, Youtube, Hexagon, Send, Layers, Box, Terminal, Hexagon as HexagonIcon
} from 'lucide-react';

// Helper to parse price string to number
const parsePrice = (priceStr: string): number => {
  const matches = priceStr.match(/\$(\d+(\.\d+)?)/);
  if (matches) return parseFloat(matches[1]);
  // Fallback for simple numbers
  const simple = parseFloat(priceStr.replace(/[^0-9.]/g, ''));
  return isNaN(simple) ? 0 : simple;
};

// --- Home View ---
export const HomeView = ({ onNavigate, addToCart }: { onNavigate: (view: any) => void, addToCart: (item: CartItem) => void }) => {
  const [email, setEmail] = useState('');
  const [emailStatus, setEmailStatus] = useState<'idle' | 'loading' | 'success'>('idle');

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setEmailStatus('loading');
      await subscribeToMailchimp(email);
      setEmailStatus('success');
      setTimeout(() => {
        setEmail('');
        setEmailStatus('idle');
      }, 5000);
    }
  };

  return (
    <div className="relative">
      {/* Hero */}
      <section className="relative h-[85vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://image.pollinations.ai/prompt/massive%20concert%20crowd%20silhouette%20hands%20raised%20stadium%20lights%20fog%20black%20and%20white%20grainy%20texture%20cinematic" 
            alt="Concert Crowd" 
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-theos-black via-theos-black/80 to-transparent" />
        </div>
        
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <div className="inline-block border border-theos-gold/30 px-4 py-1 rounded-full mb-6 bg-black/50 backdrop-blur-sm">
            <span className="text-theos-gold text-xs font-bold tracking-[0.2em] uppercase">Recycling Dollars. Building Legacy.</span>
          </div>
          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 leading-tight gold-text-glow">
            CULTURE. <br/>
            <span className="text-theos-gold">CAPITAL.</span> <br/>
            COMMUNITY.
          </h1>
          <p className="text-gray-300 text-lg md:text-xl mb-10 max-w-2xl mx-auto font-light">
            We produce minority-owned concerts, films & news that recycle community dollars.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <GoldButton onClick={() => onNavigate('EVENTS')}>Join The Movement</GoldButton>
            <OutlineButton onClick={() => onNavigate('WATCH')}>Watch Originals</OutlineButton>
          </div>
        </div>
      </section>

      {/* Manifesto Strip */}
      <div className="bg-theos-gold py-4 overflow-hidden">
        <div className="flex items-center gap-12 animate-marquee whitespace-nowrap text-theos-black font-bold uppercase tracking-widest text-sm">
          <span>Own The Stage</span> • <span>Own The Bar</span> • <span>Own The Merch</span> • <span>Own The Livestream</span> • <span>Recycle Dollars</span> • <span>Build Capital</span> • <span>Own The Stage</span>
        </div>
      </div>

      {/* Social Proof */}
      <div className="bg-black py-12 border-b border-gray-900">
         <div className="max-w-7xl mx-auto px-6 text-center">
            <p className="text-gray-600 text-[10px] font-bold uppercase tracking-[0.3em] mb-8">As Seen In</p>
            <div className="flex justify-center items-center gap-12 md:gap-24 opacity-50 grayscale flex-wrap">
               <img src="https://image.pollinations.ai/prompt/dallas%20morning%20news%20logo%20black%20text%20transparent%20background%20vector" alt="Dallas Morning News" className="h-8 md:h-10 object-contain hover:grayscale-0 transition-all duration-300" />
               <img src="https://image.pollinations.ai/prompt/revolt%20tv%20logo%20black%20text%20transparent%20background%20vector" alt="REVOLT" className="h-8 md:h-12 object-contain hover:grayscale-0 transition-all duration-300" />
               <img src="https://image.pollinations.ai/prompt/blavity%20logo%20black%20text%20transparent%20background%20vector" alt="BLAVITY" className="h-8 md:h-10 object-contain hover:grayscale-0 transition-all duration-300" />
            </div>
         </div>
      </div>

      {/* Featured Event: Black Wall Street Jazz & Tech */}
      <section className="py-16 px-6 bg-gradient-to-b from-gray-900 to-black">
         <div className="max-w-5xl mx-auto bg-gray-900 border border-theos-gold/30 rounded-2xl overflow-hidden shadow-2xl flex flex-col md:flex-row">
            <div className="md:w-1/2 relative min-h-[300px]">
               <img src="https://image.pollinations.ai/prompt/jazz%20festival%20concert%20stage%20Deep%20Ellum%20Dallas%20neon%20signs%20brick%20buildings%20night%20crowd%20holograms" className="w-full h-full object-cover" alt="Festival" />
               <div className="absolute top-4 left-4 bg-theos-red text-white text-xs font-bold px-3 py-1 uppercase tracking-widest animate-pulse">
                  Selling Fast
               </div>
            </div>
            <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
               <h3 className="text-theos-gold font-bold uppercase tracking-widest text-xs mb-2">Upcoming Experience</h3>
               <h2 className="font-serif text-3xl text-white mb-4 leading-tight">Black Wall Street <br/> Jazz & Tech Festival</h2>
               <div className="flex flex-col gap-2 text-gray-400 text-sm mb-8">
                  <div className="flex items-center gap-2"><Calendar size={16} className="text-theos-gold"/> UPCOMING</div>
                  <div className="flex items-center gap-2"><MapPin size={16} className="text-theos-gold"/> Deep Ellum, Dallas, TX</div>
                  <div className="flex items-center gap-2"><Tag size={16} className="text-theos-gold"/> 200 NFT Tickets Remaining</div>
               </div>
               <GoldButton onClick={() => addToCart({
                  id: 'event-bws-jazz',
                  title: 'Black Wall Street Jazz & Tech Festival',
                  price: '$65.00',
                  priceValue: 65,
                  type: 'EVENT',
                  image: 'https://image.pollinations.ai/prompt/jazz%20festival%20concert%20stage%20Deep%20Ellum%20Dallas%20neon%20signs%20brick%20buildings%20night%20crowd%20holograms'
               })}>
                  Mint NFT Ticket • $65
               </GoldButton>
            </div>
         </div>
      </section>

      {/* Email Capture: Tour Money Map */}
      <section className="py-16 px-6 bg-theos-gold">
         <div className="max-w-4xl mx-auto text-center text-black">
            <h2 className="font-serif text-4xl font-bold mb-4">Get the Free 'Tour Money Map'</h2>
            <p className="text-lg mb-8 font-medium opacity-80">7 Days to 20% Minority Spend. The blueprint for securing contracts.</p>
            
            {emailStatus === 'success' ? (
               <div className="bg-white/90 p-8 rounded-lg max-w-md mx-auto animate-in zoom-in">
                  <CheckCircle size={48} className="text-green-600 mx-auto mb-4" />
                  <h3 className="text-xl font-bold mb-2">Check Your Inbox!</h3>
                  <p className="text-sm opacity-80">The Money Map is on its way. Check your spam folder if you don't see it.</p>
               </div>
            ) : (
              <form className="max-w-md mx-auto flex flex-col md:flex-row gap-4" onSubmit={handleEmailSubmit}>
                 <input 
                   type="email" 
                   required
                   value={email}
                   onChange={(e) => setEmail(e.target.value)}
                   placeholder="Enter your email address" 
                   className="flex-grow p-4 bg-white/90 border border-black/10 rounded focus:outline-none focus:ring-2 focus:ring-black placeholder-gray-500 text-black"
                   disabled={emailStatus === 'loading'}
                 />
                 <button type="submit" disabled={emailStatus === 'loading'} className="bg-black text-theos-gold px-8 py-4 font-bold uppercase tracking-widest hover:bg-gray-900 transition-colors rounded whitespace-nowrap flex items-center justify-center min-w-[150px]">
                   {emailStatus === 'loading' ? <Loader2 className="animate-spin text-theos-gold" /> : "Send Me The Map"}
                 </button>
              </form>
            )}
            <p className="text-xs mt-4 opacity-60">Powered by Mailchimp. 100% Free. Unsubscribe anytime.</p>
         </div>
      </section>
    </div>
  );
};

// --- News Generator (Now Integrated into Studio) ---
export const NewsGeneratorView = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="text-center">
       <Lock size={48} className="text-theos-gold mx-auto mb-4" />
       <h2 className="text-2xl text-white font-serif">Restricted Access</h2>
       <p className="text-gray-400 mt-2">This tool has been moved to the secure Creator Studio.</p>
    </div>
  </div>
);

// --- Events View ---
export const EventsView = ({ addToCart }: { addToCart: (item: CartItem) => void }) => {
  const [minting, setMinting] = useState<string | null>(null);

  const handleMint = async (event: EventItem) => {
    setMinting(event.id);
    try {
       const address = await connectWallet();
       if(address) {
         await switchToPolygon();
         await mintNFT(address, event.price);
         // Add to local cart as fallback, but effectively "minted" on chain
         addToCart({
            id: event.id,
            title: event.title,
            price: event.price,
            priceValue: parsePrice(event.price),
            type: 'EVENT',
            image: event.imageUrl
         });
         alert(`Successfully Minted Ticket for ${address}`);
       }
    } catch (e) {
      console.error(e);
      // Fallback to regular cart if web3 fails
      addToCart({
          id: event.id,
          title: event.title,
          price: event.price,
          priceValue: parsePrice(event.price),
          type: 'EVENT',
          image: event.imageUrl
      });
    } finally {
      setMinting(null);
    }
  };

  const events: EventItem[] = [
    {
      id: '1',
      title: 'Black Wall Street Jazz & Tech Festival',
      date: 'UPCOMING',
      location: 'Deep Ellum, Dallas, TX',
      price: '0.04 ETH ($65)',
      imageUrl: 'https://image.pollinations.ai/prompt/jazz%20festival%20concert%20stage%20Deep%20Ellum%20Dallas%20neon%20signs%20brick%20buildings%20night%20crowd%20holograms',
      nftPerks: ['Lifetime Royalty', 'VIP Lounge', 'Airdrop']
    },
    {
      id: '2',
      title: 'Founders & Funders Mixer',
      date: 'UPCOMING',
      location: 'Durham, NC',
      price: '0.02 ETH ($35)',
      imageUrl: 'https://image.pollinations.ai/prompt/luxury%20rooftop%20party%20Durham%20North%20Carolina%20city%20skyline%20night%20black%20entrepreneurs%20champagne%20gold%20aesthetic',
      nftPerks: ['Networking Access', 'Pitch Deck Review']
    }
  ];

  return (
    <div className="py-12 px-6 max-w-7xl mx-auto">
      <h2 className="font-serif text-4xl text-theos-gold mb-12 text-center">Upcoming Experiences</h2>
      <div className="grid md:grid-cols-2 gap-8">
        {events.map(ev => (
          <div key={ev.id} className="group relative bg-gray-900 border border-gray-800 hover:border-theos-gold transition-all duration-500 overflow-hidden">
            <div className="h-64 overflow-hidden">
              <img src={ev.imageUrl} alt={ev.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-80 group-hover:opacity-100" />
            </div>
            <div className="p-8 relative">
              <div className="absolute top-0 right-0 -mt-6 mr-6 bg-theos-red text-white text-xs font-bold px-4 py-2 uppercase tracking-widest shadow-lg">
                NFT Ticket
              </div>
              <div className="flex items-center gap-2 text-theos-gold mb-2 text-sm font-bold tracking-widest">
                <Calendar size={14} /> {ev.date}
              </div>
              <h3 className="text-2xl font-serif text-white mb-2">{ev.title}</h3>
              <div className="flex items-center gap-2 text-gray-400 mb-6 text-sm">
                <MapPin size={14} /> {ev.location}
              </div>
              
              <div className="space-y-2 mb-8">
                {ev.nftPerks.map((perk, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs text-gray-500">
                    <Lock size={10} className="text-theos-gold" />
                    <span>Includes: {perk}</span>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between mt-auto">
                <span className="text-xl text-white font-mono">{ev.price}</span>
                <GoldButton onClick={() => handleMint(ev)}>
                  {minting === ev.id ? (
                     <span className="flex items-center gap-2"><Loader2 className="animate-spin" size={16}/> Minting...</span>
                  ) : "Mint NFT Ticket"}
                </GoldButton>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// --- Sports View ---
export const SportsView = ({ addToCart }: { addToCart: (item: CartItem) => void }) => {
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

  const socialClips = [
    { 
      id: 1, 
      title: "Rappers vs Hoopers Highlights", 
      views: "1.2M", 
      thumbnail: "https://image.pollinations.ai/prompt/basketball%20player%20dunking%20on%20outdoor%20urban%20court%20energetic%20dynamic%20action%20shot" 
    },
    { 
      id: 2, 
      title: "The Billion Dollar Athlete", 
      views: "850K", 
      thumbnail: "https://image.pollinations.ai/prompt/african%20american%20athlete%20wearing%20luxury%20suit%20in%20boardroom%20holding%20basketball%20business%20meeting" 
    },
    { 
      id: 3, 
      title: "Courtside: Cultural Impact", 
      views: "2.1M", 
      thumbnail: "https://image.pollinations.ai/prompt/celebrities%20sitting%20courtside%20at%20basketball%20game%20fashion%20jewelry%20paparazzi%20flash%20photography" 
    },
    { 
      id: 4, 
      title: "Ownership: Buying the Team", 
      views: "500K", 
      thumbnail: "https://image.pollinations.ai/prompt/view%20from%20luxury%20stadium%20box%20suite%20overlooking%20sports%20arena%20at%20night%20glass%20reflection" 
    },
  ];

  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://image.pollinations.ai/prompt/dramatic%20sports%20arena%20stadium%20floodlights%20at%20night%20foggy%20atmosphere%20anticipation%20cinematic%20wide%20shot" 
            className="w-full h-full object-cover opacity-50" 
            alt="Sports Arena" 
          />
          <div className="absolute inset-0 bg-gradient-to-r from-theos-black via-theos-black/70 to-transparent"></div>
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
           <div className="flex items-center gap-2 text-theos-red font-bold uppercase tracking-widest text-sm mb-4">
              <Trophy size={16} />
              <span>Sports & Entertainment Division</span>
           </div>
           <h1 className="font-serif text-5xl md:text-7xl font-bold text-white mb-6 leading-none">
             THE ARENA <br/> <span className="text-theos-gold">IS OURS.</span>
           </h1>
           <p className="text-gray-300 max-w-xl mb-8 text-lg">
             Blending the energy of the stadium with the production of the concert. From celebrity exhibitions to athlete-owned leagues.
           </p>
        </div>
      </section>

      {/* Social Media Viral Hub */}
      <section className="py-12 px-6 bg-gray-900 border-y border-theos-gold/10">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-serif text-2xl text-white">Viral Highlights</h2>
            <div className="flex gap-2 text-xs text-theos-gold uppercase tracking-widest items-center cursor-pointer">
               <MonitorPlay size={16} />
               <span>View All Media</span>
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
             {socialClips.map(clip => (
               <div 
                 key={clip.id} 
                 onClick={() => setActiveVideo(clip.title)}
                 className="aspect-[9/16] relative group cursor-pointer overflow-hidden rounded-lg border border-gray-800 hover:border-theos-gold transition-all"
               >
                  <img src={clip.thumbnail} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent opacity-80"></div>
                  <div className="absolute bottom-0 left-0 p-4 w-full">
                     <div className="bg-white/10 backdrop-blur self-start inline-flex items-center gap-1 px-2 py-1 rounded text-[10px] text-white mb-2">
                       <Play size={8} fill="currentColor" /> {clip.views}
                     </div>
                     <h3 className="text-white font-bold text-sm leading-tight">{clip.title}</h3>
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                     <div className="w-10 h-10 bg-theos-gold rounded-full flex items-center justify-center">
                       <Play size={16} className="text-black ml-1" fill="currentColor" />
                     </div>
                  </div>
               </div>
             ))}
          </div>
        </div>
      </section>

      {/* Promoter Events Section */}
      <section className="py-16 px-6 max-w-7xl mx-auto">
         <div className="text-center mb-12">
            <h2 className="font-serif text-4xl text-theos-gold mb-2">Upcoming Promoter Events</h2>
            <p className="text-gray-400">Booked, packaged, and ready for market. Secure your access now.</p>
         </div>
         
         <div className="grid md:grid-cols-3 gap-8">
            {/* Event 1 - Boxing */}
            <div className="bg-gradient-to-b from-gray-900 to-black border border-gray-800 relative overflow-hidden group hover:border-theos-gold/50 transition-all flex flex-col">
               <div className="h-48 overflow-hidden relative">
                  <img 
                    src="https://image.pollinations.ai/prompt/boxing%20match%20Atlanta%20arena%20state%20farm%20interior%20spotlights%20crowd%20cinematic" 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute top-2 right-2 bg-theos-red text-white text-[10px] font-bold px-2 py-1 uppercase tracking-widest">
                     Live PPV
                  </div>
               </div>
               <div className="p-6 flex-grow flex flex-col">
                 <span className="text-theos-gold text-xs font-bold uppercase tracking-widest mb-1 block">UPCOMING • Atlanta, GA</span>
                 <h3 className="text-xl font-serif text-white mb-2">Culture Clash Boxing</h3>
                 <p className="text-gray-400 mb-4 text-xs leading-relaxed flex-grow">
                   Hip-Hop heavyweights vs Top Streamers. Sanctioned exhibition match followed by a headline performance by Future.
                 </p>
                 <GoldButton fullWidth onClick={() => addToCart({
                   id: 'sports-1',
                   title: 'Culture Clash Boxing (VIP)',
                   price: '$250.00',
                   priceValue: 250,
                   type: 'SPORTS',
                   image: 'https://image.pollinations.ai/prompt/boxing%20match%20Atlanta%20arena%20state%20farm%20interior%20spotlights%20crowd%20cinematic'
                 })}>Book VIP ($250)</GoldButton>
               </div>
            </div>

            {/* Event 2 - Basketball */}
            <div className="bg-gradient-to-b from-gray-900 to-black border border-gray-800 relative overflow-hidden group hover:border-theos-gold/50 transition-all flex flex-col">
               <div className="h-48 overflow-hidden relative">
                  <img 
                    src="https://image.pollinations.ai/prompt/basketball%20game%20Los%20Angeles%20crypto%20arena%20courtside%20celebrity%20luxury%20bright%20lights" 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute top-2 right-2 bg-theos-gold text-black text-[10px] font-bold px-2 py-1 uppercase tracking-widest">
                     Charity Gala
                  </div>
               </div>
               <div className="p-6 flex-grow flex flex-col">
                 <span className="text-theos-gold text-xs font-bold uppercase tracking-widest mb-1 block">UPCOMING • Los Angeles, CA</span>
                 <h3 className="text-xl font-serif text-white mb-2">Theos Celebrity 5v5</h3>
                 <p className="text-gray-400 mb-4 text-xs leading-relaxed flex-grow">
                   Musicians vs Tech Founders. Charity basketball game raising funds for Greenwood Coding Academy.
                 </p>
                 <GoldButton fullWidth onClick={() => addToCart({
                   id: 'sports-2',
                   title: 'Celebrity 5v5 Courtside',
                   price: '$500.00',
                   priceValue: 500,
                   type: 'SPORTS',
                   image: 'https://image.pollinations.ai/prompt/basketball%20game%20Los%20Angeles%20crypto%20arena%20courtside%20celebrity%20luxury%20bright%20lights'
                 })}>Book Courtside ($500)</GoldButton>
               </div>
            </div>

            {/* Event 3 - E-Sports */}
            <div className="bg-gradient-to-b from-gray-900 to-black border border-gray-800 relative overflow-hidden group hover:border-theos-gold/50 transition-all flex flex-col">
               <div className="h-48 overflow-hidden relative">
                  <img 
                    src="https://image.pollinations.ai/prompt/esports%20tournament%20Houston%20Texas%20convention%20center%20neon%20lights%20gamers%20stage" 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute top-2 right-2 bg-purple-600 text-white text-[10px] font-bold px-2 py-1 uppercase tracking-widest">
                     Gaming
                  </div>
               </div>
               <div className="p-6 flex-grow flex flex-col">
                 <span className="text-theos-gold text-xs font-bold uppercase tracking-widest mb-1 block">UPCOMING • Houston, TX</span>
                 <h3 className="text-xl font-serif text-white mb-2">Midnight Gaming League</h3>
                 <p className="text-gray-400 mb-4 text-xs leading-relaxed flex-grow">
                   Madden & 2K Championship. $50k Prize Pool. Hosted by top streamers. The future of digital sports.
                 </p>
                 <GoldButton fullWidth onClick={() => addToCart({
                   id: 'sports-3',
                   title: 'Gaming League Pass',
                   price: '$75.00',
                   priceValue: 75,
                   type: 'SPORTS',
                   image: 'https://image.pollinations.ai/prompt/esports%20tournament%20Houston%20Texas%20convention%20center%20neon%20lights%20gamers%20stage'
                 })}>Buy Pass ($75)</GoldButton>
               </div>
            </div>
         </div>
      </section>

      {/* Video Modal (Simple Reuse) */}
      {activeVideo && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-4 animate-in fade-in duration-300">
           <div className="relative max-w-[400px] w-full aspect-[9/16] bg-gray-900 border border-gray-800 rounded-lg overflow-hidden flex items-center justify-center">
              <button 
                 onClick={() => setActiveVideo(null)}
                 className="absolute top-4 right-4 text-white hover:text-theos-gold z-20 bg-black/50 rounded-full p-2"
              >
                 <X size={24} />
              </button>
              <div className="text-center p-6">
                 <Loader2 className="w-12 h-12 text-theos-gold animate-spin mx-auto mb-4" />
                 <h3 className="text-white font-bold text-xl mb-2">{activeVideo}</h3>
                 <p className="text-gray-400 text-xs uppercase tracking-widest">Loading Social Stream...</p>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};

export const WatchView = () => {
  const [activeVideo, setActiveVideo] = useState<{title: string, desc: string} | null>(null);

  const episodes = [
    {
      id: 1,
      title: "The Security Contract",
      duration: "18 min",
      desc: "Why the venue security team makes more consistent revenue than the opening act.",
      imageUrl: "https://image.pollinations.ai/prompt/security%20guard%20silhouette%20crowd%20control%20concert%20barricade%20dark%20moody%20atmosphere%20professional%20photography"
    },
    {
      id: 2,
      title: "The Art of the Contract",
      duration: "32 min",
      desc: "Deconstructing the 360 deal. What you sign away vs. what you keep. Featuring top entertainment lawyers.",
      imageUrl: "https://image.pollinations.ai/prompt/close%20up%20fountain%20pen%20signing%20legal%20contract%20entertainment%20law%20office%20luxury%20desk%20dark%20aesthetic"
    },
    {
      id: 3,
      title: "Merch Logistics: The 30% Cut",
      duration: "24 min",
      desc: "Understanding the supply chain of a $50 tour t-shirt.",
      imageUrl: "https://image.pollinations.ai/prompt/stacks%20of%20concert%20t-shirts%20merchandise%20boxes%20warehouse%20backstage%20supply%20chain%20industrial%20cinematic%20lighting"
    },
    {
      id: 4,
      title: "Lighting & Rigging Empires",
      duration: "21 min",
      desc: "The multi-million dollar rental companies owned by legacy families, not us.",
      imageUrl: "https://image.pollinations.ai/prompt/massive%20concert%20stage%20truss%20rigging%20system%20spotlights%20tech%20crew%20working%20high%20up%20industrial%20structure"
    },
    {
      id: 5,
      title: "Gold Medal Business",
      duration: "45 min",
      desc: "How a local shuttle bus company secured a $2M contract for the last Games.",
      imageUrl: "https://image.pollinations.ai/prompt/fleet%20of%20black%20sprinter%20vans%20and%20shuttle%20buses%20outside%20modern%20stadium%20corporate%20logistics%20olympic%20business"
    }
  ];

  return (
    <div className="py-12 px-6 max-w-7xl mx-auto relative">
      <div className="flex justify-between items-end mb-12">
        <div>
          <h2 className="font-serif text-4xl text-theos-gold mb-2">Originals</h2>
          <p className="text-gray-400">Deconstructing the billion-dollar industry for the future owners.</p>
        </div>
      </div>
      
      {/* Featured */}
      <div 
        onClick={() => setActiveVideo({ 
          title: "The Invisible Empire: Behind Chris Brown's Tour", 
          desc: "Everyone sees the superstar on stage. No one sees the 200 businesses behind him. From security to sound engineering, logistics to catering—this is where the real generational wealth is built. We break down exactly how many minority-owned businesses are missing from this billion-dollar supply chain and how we take over." 
        })}
        className="relative aspect-video w-full bg-gray-900 mb-12 border border-gray-800 group cursor-pointer overflow-hidden"
      >
        <img src="https://image.pollinations.ai/prompt/backstage%20concert%20tour%20production%20crew%20moving%20road%20cases%20large%20stage%20setup%20silhouette%20of%20technicians%20arena%20atmosphere%20dark%20and%20cinematic" className="w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/50 to-transparent"></div>
        <div className="absolute bottom-0 left-0 p-8 md:p-12 w-full md:w-2/3">
          <span className="text-theos-red font-bold tracking-widest text-xs uppercase mb-3 block">Featured Documentary</span>
          <h3 className="font-serif text-4xl md:text-6xl text-white mb-4 leading-tight">
            The Invisible Empire: <br/>
            <span className="text-theos-gold">Behind the Chris Brown Tour</span>
          </h3>
          <p className="text-gray-300 mb-8 text-lg font-light">
            We scream for the artist, but who owns the stage they stand on? Breaking down the security, logistics, and tech contracts we are missing out on.
          </p>
          <GoldButton className="flex items-center gap-2">
             <Play size={18} fill="currentColor" /> Watch Full Breakdown
          </GoldButton>
        </div>
      </div>

      {/* Grid */}
      <h4 className="text-theos-gold font-bold uppercase tracking-widest text-sm mb-6 border-b border-gray-800 pb-2">Industry Verticals</h4>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {episodes.map(ep => (
          <div 
            key={ep.id} 
            onClick={() => setActiveVideo({ title: ep.title, desc: ep.desc })}
            className="bg-gray-900/50 border border-gray-800 p-4 hover:border-theos-gold/50 transition-colors cursor-pointer group"
          >
            <div className="aspect-video bg-black mb-4 relative overflow-hidden">
               {/* Simulating a video thumbnail */}
               <div className="absolute inset-0 bg-gray-800 flex items-center justify-center">
                 <img src={ep.imageUrl} className="w-full h-full object-cover opacity-60 group-hover:scale-110 transition-transform duration-700" />
               </div>
               <div className="absolute top-2 right-2 bg-black/80 text-white text-[10px] px-2 py-1 rounded font-mono">{ep.duration}</div>
               <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                 <div className="w-12 h-12 bg-theos-gold/90 rounded-full flex items-center justify-center scale-75 group-hover:scale-100 transition-transform">
                   <Play size={20} className="text-black ml-1" fill="currentColor" />
                 </div>
               </div>
            </div>
            <h4 className="font-bold text-white mb-1 text-lg leading-tight">{ep.title}</h4>
            <p className="text-sm text-gray-500 line-clamp-2">{ep.desc}</p>
          </div>
        ))}
      </div>

      {/* Video Modal */}
      {activeVideo && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-4 animate-in fade-in duration-300">
          <div className="w-full max-w-5xl bg-gray-900 border border-gray-800 rounded-lg overflow-hidden relative shadow-2xl">
            <button 
              onClick={() => setActiveVideo(null)}
              className="absolute top-4 right-4 text-white hover:text-theos-gold z-10"
            >
              <X size={32} />
            </button>
            
            <div className="aspect-video bg-black relative flex items-center justify-center group">
              {/* Fake Video Player UI */}
              <div className="text-center">
                 <Loader2 className="w-16 h-16 text-theos-gold animate-spin mx-auto mb-4" />
                 <p className="text-gray-400 text-sm tracking-widest uppercase">Streaming from Theos Secure Server...</p>
              </div>
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-800">
                 <div className="w-1/3 h-full bg-theos-red relative">
                    <div className="absolute right-0 top-1/2 -mt-1.5 w-3 h-3 bg-white rounded-full shadow"></div>
                 </div>
              </div>
            </div>

            <div className="p-8">
              <h2 className="text-2xl font-serif text-theos-gold mb-2">{activeVideo.title}</h2>
              <p className="text-gray-300">{activeVideo.desc}</p>
              
              <div className="mt-6 flex gap-4">
                <OutlineButton className="text-xs py-2">Share</OutlineButton>
                <OutlineButton className="text-xs py-2">Save to Library</OutlineButton>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export const TalentView = ({ addToCart }: { addToCart: (item: CartItem) => void }) => {
  return (
    <div className="relative">
      {/* Hero */}
      <section className="relative h-[60vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://image.pollinations.ai/prompt/music%20recording%20studio%20session%20artist%20in%20booth%20moody%20lighting%20purple%20and%20gold%20aesthetic" 
            alt="Studio Session" 
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-theos-black via-theos-black/80 to-transparent" />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-2 text-theos-gold font-bold uppercase tracking-widest text-sm mb-4">
              <Mic2 size={16} />
              <span>Artist Development Division</span>
           </div>
          <h1 className="font-serif text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            OWN THE SOUND. <br/>
            <span className="text-theos-gold">OWN THE IMAGE.</span>
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl font-light">
            We don't just book talent; we build it. From A&R to the Glam Squad, we provide the infrastructure for the next generation of stars.
          </p>
        </div>
      </section>

      <div className="py-12 px-6 max-w-7xl mx-auto space-y-24">
        
        {/* 1. A&R / Management (Singers & Rappers) */}
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="w-12 h-12 bg-theos-gold/10 text-theos-gold flex items-center justify-center rounded mb-6">
               <Music size={24} />
            </div>
            <h2 className="font-serif text-3xl text-white mb-4">The Roster: A&R Management</h2>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Looking for management? Our development deal includes vocal coaching, brand strategy, and direct placement on Theos Media Group festival stages. We are looking for the next voices of the culture.
            </p>
            <ul className="space-y-2 mb-8 text-sm text-gray-300">
              <li className="flex items-center gap-2"><CheckCircle size={14} className="text-theos-gold"/> Distribution & Publishing Admin</li>
              <li className="flex items-center gap-2"><CheckCircle size={14} className="text-theos-gold"/> Festival Placement Priority</li>
              <li className="flex items-center gap-2"><CheckCircle size={14} className="text-theos-gold"/> Image Consulting</li>
            </ul>
            <GoldButton>Submit Demo</GoldButton>
          </div>
          <div className="bg-gray-900 border border-gray-800 p-2 rotate-2 hover:rotate-0 transition-transform duration-500">
             <img src="https://image.pollinations.ai/prompt/rap%20artist%20performing%20on%20stage%20with%20microphone%20dramatic%20lighting%20smoke%20concert" className="w-full grayscale hover:grayscale-0 transition-all duration-500" />
          </div>
        </div>

        {/* 2. THE INFLUENCER PODCAST SUITE */}
        <div className="bg-black/40 border border-gray-800 rounded-2xl overflow-hidden p-8 md:p-12 relative">
           <div className="absolute top-0 right-0 p-4 opacity-10">
              <Radio size={150} />
           </div>
           <div className="grid md:grid-cols-2 gap-12 items-center relative z-10">
              <div className="order-2 md:order-1">
                  <div className="aspect-video bg-gray-900 rounded-lg overflow-hidden border border-gray-800 shadow-2xl">
                     <img src="https://image.pollinations.ai/prompt/luxury%20podcast%20studio%20neon%20sign%20shure%20sm7b%20microphones%204k%20cameras%20dark%20aesthetic%20soundproofing%20led%20lights" className="w-full h-full object-cover" />
                  </div>
              </div>
              <div className="order-1 md:order-2">
                  <div className="flex items-center gap-2 text-theos-red font-bold uppercase tracking-widest text-xs mb-2">
                     <div className="w-2 h-2 bg-theos-red rounded-full animate-pulse"></div>
                     <span>Now Booking</span>
                  </div>
                  <h2 className="font-serif text-3xl text-white mb-4">The Influencer Suite: <br/><span className="text-theos-gold">Video Podcast Studio</span></h2>
                  <p className="text-gray-400 mb-6">
                     Broadcast quality for the next generation of voices. 4-camera 4K setup, live switching, Shure SM7B mics, and custom lighting. Walk in with an idea, walk out with a show.
                  </p>
                  
                  <div className="space-y-4 mb-8">
                     <div className="flex justify-between items-center border-b border-gray-800 pb-2">
                        <span className="text-sm text-white">Audio Only (2 Mics)</span>
                        <div className="flex items-center gap-4">
                           <span className="text-theos-gold font-mono">$100/hr</span>
                           <button onClick={() => addToCart({ id: 'pod-audio', title: 'Podcast Audio Only (1hr)', price: '$100.00', priceValue: 100, type: 'SERVICE' })} className="text-xs uppercase hover:text-white text-gray-500 underline">Book</button>
                        </div>
                     </div>
                     <div className="flex justify-between items-center border-b border-gray-800 pb-2">
                        <span className="text-sm text-white">4K Video + Audio (4 Mics)</span>
                        <div className="flex items-center gap-4">
                           <span className="text-theos-gold font-mono">$150/hr</span>
                           <button onClick={() => addToCart({ id: 'pod-video', title: 'Podcast Video Suite (1hr)', price: '$150.00', priceValue: 150, type: 'SERVICE' })} className="text-xs uppercase hover:text-white text-gray-500 underline">Book</button>
                        </div>
                     </div>
                     <div className="flex justify-between items-center border-b border-gray-800 pb-2">
                        <span className="text-sm text-white">Full Production (Editor Included)</span>
                        <div className="flex items-center gap-4">
                           <span className="text-theos-gold font-mono">$350/hr</span>
                           <button onClick={() => addToCart({ id: 'pod-prod', title: 'Podcast Full Prod (1hr)', price: '$350.00', priceValue: 350, type: 'SERVICE' })} className="text-xs uppercase hover:text-white text-gray-500 underline">Book</button>
                        </div>
                     </div>
                  </div>
                  <div className="flex items-center gap-2 text-[10px] text-gray-500 uppercase tracking-widest">
                     <Cast size={12} /> Syncs to YouTube Live • Twitch • Spotify Video
                  </div>
              </div>
           </div>
        </div>

        {/* 3. LIVE ENTERTAINMENT & HOSTS */}
        <div>
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl text-theos-gold mb-2">Live Entertainment & Hosts</h2>
            <p className="text-gray-400">Book the city's top bands, DJs, and energy creators for your event.</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
             {/* Jazz */}
             <div className="group bg-gradient-to-b from-gray-900 to-black border border-gray-800 hover:border-theos-gold transition-colors relative overflow-hidden p-6 flex flex-col items-center text-center">
                <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-theos-gold/30 mb-4">
                   <img src="https://image.pollinations.ai/prompt/jazz%20band%20performing%20on%20stage%20saxophone%20player%20moody%20club%20lighting%20classy" className="w-full h-full object-cover" />
                </div>
                <h3 className="text-xl font-serif text-white mb-1">Live Jazz Ensembles</h3>
                <p className="text-xs text-gray-400 mb-4">Smooth Jazz, Bebop, and Fusion for upscale events.</p>
                <button onClick={() => addToCart({ id: 'book-jazz', title: 'Live Jazz Band Booking', price: '$800.00', priceValue: 800, type: 'SERVICE'})} className="text-theos-gold text-xs font-bold uppercase tracking-wider border border-theos-gold px-4 py-2 hover:bg-theos-gold hover:text-black transition-colors">Book Inquiry ($800+)</button>
             </div>

             {/* R&B */}
             <div className="group bg-gradient-to-b from-gray-900 to-black border border-gray-800 hover:border-theos-gold transition-colors relative overflow-hidden p-6 flex flex-col items-center text-center">
                <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-theos-gold/30 mb-4">
                   <img src="https://image.pollinations.ai/prompt/rnb%20singer%20soul%20group%20performing%20microphones%20stage%20lights%20purple%20haze" className="w-full h-full object-cover" />
                </div>
                <h3 className="text-xl font-serif text-white mb-1">R&B Soul Groups</h3>
                <p className="text-xs text-gray-400 mb-4">90s covers, Neo-Soul, and contemporary R&B vibes.</p>
                <button onClick={() => addToCart({ id: 'book-rnb', title: 'R&B Group Booking', price: '$900.00', priceValue: 900, type: 'SERVICE'})} className="text-theos-gold text-xs font-bold uppercase tracking-wider border border-theos-gold px-4 py-2 hover:bg-theos-gold hover:text-black transition-colors">Book Inquiry ($900+)</button>
             </div>

             {/* Gospel */}
             <div className="group bg-gradient-to-b from-gray-900 to-black border border-gray-800 hover:border-theos-gold transition-colors relative overflow-hidden p-6 flex flex-col items-center text-center">
                <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-theos-gold/30 mb-4">
                   <img src="https://image.pollinations.ai/prompt/gospel%20choir%20singing%20in%20robes%20uplifting%20church%20stage%20bright%20lights" className="w-full h-full object-cover" />
                </div>
                <h3 className="text-xl font-serif text-white mb-1">Gospel Choirs</h3>
                <p className="text-xs text-gray-400 mb-4">Powerful vocals for weddings, ceremonies, and festivals.</p>
                <button onClick={() => addToCart({ id: 'book-gospel', title: 'Gospel Choir Booking', price: '$1200.00', priceValue: 1200, type: 'SERVICE'})} className="text-theos-gold text-xs font-bold uppercase tracking-wider border border-theos-gold px-4 py-2 hover:bg-theos-gold hover:text-black transition-colors">Book Inquiry ($1200+)</button>
             </div>

             {/* Caribbean */}
             <div className="group bg-gradient-to-b from-gray-900 to-black border border-gray-800 hover:border-theos-gold transition-colors relative overflow-hidden p-6 flex flex-col items-center text-center">
                <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-theos-gold/30 mb-4">
                   <img src="https://image.pollinations.ai/prompt/reggae%20band%20performing%20caribbean%20carnival%20vibes%20steel%20drums%20colorful%20stage" className="w-full h-full object-cover" />
                </div>
                <h3 className="text-xl font-serif text-white mb-1">Caribbean & Reggae</h3>
                <p className="text-xs text-gray-400 mb-4">Island vibes, Steel Drums, Soca, and Roots Reggae.</p>
                <button onClick={() => addToCart({ id: 'book-carib', title: 'Caribbean Band Booking', price: '$850.00', priceValue: 850, type: 'SERVICE'})} className="text-theos-gold text-xs font-bold uppercase tracking-wider border border-theos-gold px-4 py-2 hover:bg-theos-gold hover:text-black transition-colors">Book Inquiry ($850+)</button>
             </div>

             {/* DJs */}
             <div className="group bg-gradient-to-b from-gray-900 to-black border border-gray-800 hover:border-theos-gold transition-colors relative overflow-hidden p-6 flex flex-col items-center text-center">
                <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-theos-gold/30 mb-4">
                   <img src="https://image.pollinations.ai/prompt/dj%20performing%20at%20club%20turntables%20headphones%20crowd%20party%20laser%20lights" className="w-full h-full object-cover" />
                </div>
                <h3 className="text-xl font-serif text-white mb-1">Pro DJs & Mixers</h3>
                <p className="text-xs text-gray-400 mb-4">Club sets, Private Parties, and Tour Support DJs.</p>
                <button onClick={() => addToCart({ id: 'book-dj', title: 'DJ Booking', price: '$400.00', priceValue: 400, type: 'SERVICE'})} className="text-theos-gold text-xs font-bold uppercase tracking-wider border border-theos-gold px-4 py-2 hover:bg-theos-gold hover:text-black transition-colors">Book Inquiry ($400+)</button>
             </div>

             {/* Hosts */}
             <div className="group bg-gradient-to-b from-gray-900 to-black border border-gray-800 hover:border-theos-gold transition-colors relative overflow-hidden p-6 flex flex-col items-center text-center">
                <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-theos-gold/30 mb-4">
                   <img src="https://image.pollinations.ai/prompt/master%20of%20ceremonies%20host%20on%20stage%20microphone%20charismatic%20event%20suit" className="w-full h-full object-cover" />
                </div>
                <h3 className="text-xl font-serif text-white mb-1">Hosts & MCs</h3>
                <p className="text-xs text-gray-400 mb-4">Energy creators to keep your event moving and engaging.</p>
                <button onClick={() => addToCart({ id: 'book-host', title: 'Event Host Booking', price: '$350.00', priceValue: 350, type: 'SERVICE'})} className="text-theos-gold text-xs font-bold uppercase tracking-wider border border-theos-gold px-4 py-2 hover:bg-theos-gold hover:text-black transition-colors">Book Inquiry ($350+)</button>
             </div>
          </div>
        </div>

        {/* 4. Performance (Dancers) */}
        <div className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden flex flex-col md:flex-row-reverse">
           <div className="md:w-1/2 min-h-[300px]">
             <img src="https://image.pollinations.ai/prompt/hip%20hop%20dance%20crew%20silhouette%20urban%20setting%20street%20lights%20dynamic%20movement" className="w-full h-full object-cover" />
           </div>
           <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
              <h2 className="font-serif text-3xl text-white mb-4">The Movement: Casting & Booking</h2>
              <p className="text-gray-400 mb-6">
                 Concerts need movement. We represent the city's top choreographers and dancers. Join our casting database for music videos, tour support, and live events.
              </p>
              <div className="grid grid-cols-2 gap-4 mb-8">
                 <div className="bg-black/50 p-4 rounded text-center">
                    <div className="text-2xl font-mono text-theos-gold">50+</div>
                    <div className="text-[10px] uppercase tracking-widest text-gray-500">Active Dancers</div>
                 </div>
                 <div className="bg-black/50 p-4 rounded text-center">
                    <div className="text-2xl font-mono text-theos-gold">12</div>
                    <div className="text-[10px] uppercase tracking-widest text-gray-500">Upcoming Castings</div>
                 </div>
              </div>
              <OutlineButton>Join Casting Database</OutlineButton>
           </div>
        </div>

        {/* 5. The Glam Squad (Service Booking) */}
        <div>
           <div className="text-center mb-12">
             <h2 className="font-serif text-3xl text-theos-gold mb-2">The Glam Squad Network</h2>
             <p className="text-gray-400">Visual Architects. Hair. Makeup. Styling. Esthetics.</p>
           </div>
           
           <div className="grid md:grid-cols-4 gap-6">
              {[
                { title: "MUA Division", icon: <Palette size={20}/>, desc: "Editorial & Stage Makeup", img: "https://image.pollinations.ai/prompt/makeup%20artist%20applying%20gold%20eyeshadow%20dark%20skin%20editorial%20beauty%20shot" },
                { title: "Hair Styling", icon: <Scissors size={20}/>, desc: "Tour-Ready Braids & Units", img: "https://image.pollinations.ai/prompt/hair%20stylist%20working%20on%20braids%20salon%20luxury%20aesthetic" },
                { title: "Esthetics", icon: <UserCheck size={20}/>, desc: "Skin Prep & Maintenance", img: "https://image.pollinations.ai/prompt/facial%20skincare%20treatment%20spa%20luxury%20calm%20dark%20aesthetic" },
                { title: "Wardrobe", icon: <Camera size={20}/>, desc: "Styling & Custom Fits", img: "https://image.pollinations.ai/prompt/fashion%20stylist%20rack%20of%20clothes%20backstage%20runway" }
              ].map((service, i) => (
                <div key={i} className="bg-gray-900 border border-gray-800 group hover:border-theos-gold transition-colors overflow-hidden">
                   <div className="h-40 overflow-hidden relative">
                      <img src={service.img} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 opacity-70 group-hover:opacity-100" />
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors"></div>
                   </div>
                   <div className="p-6">
                      <div className="flex items-center gap-2 text-theos-gold mb-2 font-bold uppercase tracking-wider text-xs">
                        {service.icon} {service.title}
                      </div>
                      <p className="text-gray-400 text-xs mb-4">{service.desc}</p>
                      <button className="text-white text-xs font-bold underline hover:text-theos-gold">View Directory</button>
                   </div>
                </div>
              ))}
           </div>
        </div>

        {/* 6. Sonic Labs (Studio Booking) */}
        <div className="bg-gradient-to-r from-gray-900 to-black border border-theos-gold/30 p-8 md:p-12 rounded-xl">
           <div className="flex flex-col md:flex-row justify-between items-center gap-8">
              <div>
                 <h2 className="font-serif text-3xl text-white mb-2">Book The Sonic Lab</h2>
                 <p className="text-gray-400 mb-6 max-w-lg">
                    Industry standard recording, mixing, and mastering. Lock in your session with our in-house engineers.
                 </p>
                 <div className="flex gap-4 flex-wrap">
                    <GoldButton onClick={() => addToCart({
                       id: 'studio-4hr',
                       title: 'Studio Block (4 Hours)',
                       price: '$200.00',
                       priceValue: 200,
                       type: 'SERVICE'
                    })}>
                       4-Hour Block ($200)
                    </GoldButton>
                    <OutlineButton onClick={() => addToCart({
                       id: 'studio-mix',
                       title: 'Mixing & Mastering Service',
                       price: '$150.00',
                       priceValue: 150,
                       type: 'SERVICE'
                    })}>
                       Mixing Service ($150)
                    </OutlineButton>
                 </div>
              </div>
              <div className="text-right hidden md:block">
                 <div className="text-6xl font-mono text-gray-800 font-bold">REC</div>
                 <div className="flex items-center gap-2 justify-end text-theos-red animate-pulse mt-2">
                    <div className="w-3 h-3 bg-theos-red rounded-full"></div>
                    <span className="text-xs uppercase tracking-widest font-bold">Studio A Live</span>
                 </div>
              </div>
           </div>
        </div>

      </div>
    </div>
  );
};

export const StudioView = () => {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState<'upload' | 'generator' | 'keys' | 'clients' | 'podcast' | 'nft'>('upload');
  
  // AI Generator State
  const [topic, setTopic] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<NewsScript | null>(null);

  // Podcast Stream State
  const [isStreaming, setIsStreaming] = useState(false);
  const [viewers, setViewers] = useState(0);
  const [isYoutubeSync, setIsYoutubeSync] = useState(false);

  // Mock Client Data
  const [clients] = useState([
     { id: 'C001', name: 'James St. Patrick', email: 'ghost@truth.com', type: 'Investor', spend: '$12,500', recent: 'Purchased Olympic Masterclass' },
     { id: 'C002', name: 'Tasha Green', email: 'tasha.g@agency.com', type: 'Booker', spend: '$2,400', recent: 'Booked Studio A (12 Hours)' },
     { id: 'C003', name: 'Marcus Brooks', email: 'marcus.b@tech.io', type: 'Student', spend: '$350', recent: 'Enrolled in Raise First 10k' },
     { id: 'C004', name: 'Keisha White', email: 'k.white@salon.com', type: 'Ticket Holder', spend: '$65', recent: 'Minted Jazz Fest Ticket' },
  ]);

  useEffect(() => {
    let interval: any;
    if (isStreaming) {
       interval = setInterval(() => {
          setViewers(v => v + Math.floor(Math.random() * 50));
       }, 2000);
    } else {
       setViewers(0);
    }
    return () => clearInterval(interval);
  }, [isStreaming]);

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'APOLLO') {
      setIsUnlocked(true);
    } else {
      alert("Unauthorized Access");
    }
  };

  const handleGenerateScript = async () => {
    if (!topic) return;
    setLoading(true);
    try {
      const data = await generateNewsScript(topic);
      setResult(data);
    } catch (e) {
      alert("Error generating script. Please check API key.");
    } finally {
      setLoading(false);
    }
  };

  if (!isUnlocked) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center p-6">
        <div className="w-full max-w-md bg-gray-900 border border-theos-gold/50 p-8 rounded-xl shadow-[0_0_50px_rgba(212,175,55,0.1)]">
          <div className="text-center mb-8">
             <Lock size={48} className="text-theos-gold mx-auto mb-4" />
             <h2 className="font-serif text-2xl text-white mb-2">Security Clearance</h2>
             <p className="text-gray-400 text-xs uppercase tracking-widest">Restricted Area: Theos Media Group Owners</p>
          </div>
          <form onSubmit={handleUnlock} className="space-y-6">
             <input 
               type="password" 
               className="w-full bg-black border border-gray-700 p-4 text-center text-white tracking-[0.5em] text-xl rounded focus:border-theos-gold outline-none" 
               placeholder="ACCESS CODE"
               value={password}
               onChange={(e) => setPassword(e.target.value)}
             />
             <GoldButton fullWidth className="flex justify-center items-center gap-2">
               <Key size={18} /> Authenticate
             </GoldButton>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="py-12 px-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-12">
        <div>
          <h2 className="font-serif text-4xl text-theos-gold mb-2">Creator Studio</h2>
          <p className="text-gray-400">Welcome back, Apollo. All systems nominal.</p>
        </div>
        <div className="flex gap-4 items-center">
          <div className="flex items-center gap-2 px-3 py-1 bg-green-900/20 text-green-500 border border-green-500/30 rounded text-xs font-bold uppercase tracking-widest">
             <Globe size={12} /> Domain: Active (SSL Secured)
          </div>
          <OutlineButton className="flex items-center gap-2 text-xs" onClick={() => setIsUnlocked(false)}> <Lock size={14}/> Lock Terminal</OutlineButton>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-800 mb-8 overflow-x-auto">
        <button 
          onClick={() => setActiveTab('upload')}
          className={`px-6 py-3 text-sm font-bold uppercase tracking-wider transition-colors border-b-2 whitespace-nowrap ${activeTab === 'upload' ? 'border-theos-gold text-white' : 'border-transparent text-gray-500 hover:text-white'}`}
        >
          Upload Assets
        </button>
        <button 
          onClick={() => setActiveTab('generator')}
          className={`px-6 py-3 text-sm font-bold uppercase tracking-wider transition-colors border-b-2 whitespace-nowrap ${activeTab === 'generator' ? 'border-theos-gold text-white' : 'border-transparent text-gray-500 hover:text-white'}`}
        >
          AI News Writer
        </button>
        <button 
          onClick={() => setActiveTab('podcast')}
          className={`px-6 py-3 text-sm font-bold uppercase tracking-wider transition-colors border-b-2 whitespace-nowrap ${activeTab === 'podcast' ? 'border-theos-gold text-white' : 'border-transparent text-gray-500 hover:text-white'}`}
        >
          Podcast Stream
        </button>
        <button 
          onClick={() => setActiveTab('nft')}
          className={`px-6 py-3 text-sm font-bold uppercase tracking-wider transition-colors border-b-2 whitespace-nowrap ${activeTab === 'nft' ? 'border-theos-gold text-white' : 'border-transparent text-gray-500 hover:text-white'}`}
        >
          NFT Drops
        </button>
        <button 
          onClick={() => setActiveTab('keys')}
          className={`px-6 py-3 text-sm font-bold uppercase tracking-wider transition-colors border-b-2 whitespace-nowrap ${activeTab === 'keys' ? 'border-theos-gold text-white' : 'border-transparent text-gray-500 hover:text-white'}`}
        >
          Financial Keys
        </button>
        <button 
          onClick={() => setActiveTab('clients')}
          className={`px-6 py-3 text-sm font-bold uppercase tracking-wider transition-colors border-b-2 whitespace-nowrap ${activeTab === 'clients' ? 'border-theos-gold text-white' : 'border-transparent text-gray-500 hover:text-white'}`}
        >
          Client Database
        </button>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Content Area */}
        <div className="lg:col-span-2">
          
          {activeTab === 'upload' && (
            <div className="space-y-8 animate-in fade-in">
              {/* Upload Card */}
              <div className="glass-panel p-8 rounded-xl border border-gray-800">
                <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                  <UploadCloud size={20} className="text-theos-gold"/> Upload Content
                </h3>
                
                <div className="space-y-6">
                  {/* File Dropzone */}
                  <div className="border-2 border-dashed border-gray-700 hover:border-theos-gold rounded-xl p-12 text-center transition-colors cursor-pointer group bg-black/30">
                      <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-theos-gold group-hover:text-black transition-colors">
                        <Video size={24} />
                      </div>
                      <p className="text-white font-bold mb-1">Drag & Drop Video or Image</p>
                      <p className="text-xs text-gray-500 uppercase tracking-widest">MP4, MOV, JPG, PNG (Max 2GB)</p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                        <label className="text-xs uppercase text-gray-500 tracking-widest mb-2 block">Title</label>
                        <input className="w-full bg-black/50 border border-gray-700 p-3 text-white rounded focus:border-theos-gold outline-none" placeholder="Content Title..." />
                    </div>
                    <div>
                        <label className="text-xs uppercase text-gray-500 tracking-widest mb-2 block">Category</label>
                        <select className="w-full bg-black/50 border border-gray-700 p-3 text-white rounded focus:border-theos-gold outline-none">
                          <option>Originals (Watch)</option>
                          <option>Academy (Learn)</option>
                          <option>Sports Highlight</option>
                        </select>
                    </div>
                  </div>
                  
                  <div>
                      <label className="text-xs uppercase text-gray-500 tracking-widest mb-2 block">Description</label>
                      <textarea className="w-full bg-black/50 border border-gray-700 p-3 text-white rounded focus:border-theos-gold outline-none h-24" placeholder="Describe the content..." />
                  </div>

                  <div className="flex justify-end">
                      <GoldButton className="px-8">Upload to Server</GoldButton>
                  </div>
                </div>
              </div>

              {/* Existing Content Manager */}
              <div className="glass-panel p-8 rounded-xl border border-gray-800">
                <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                  <Edit3 size={20} className="text-theos-gold"/> Recent Uploads
                </h3>
                <div className="space-y-4">
                    {[1,2,3].map(i => (
                      <div key={i} className="flex items-center gap-4 p-4 bg-gray-900/50 rounded border border-gray-800">
                        <div className="w-16 h-16 bg-gray-800 rounded overflow-hidden flex-shrink-0">
                            <img src={`https://picsum.photos/100/100?random=${i+50}`} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-grow">
                            <h4 className="text-white font-bold text-sm">The Invisible Empire: Episode {i}</h4>
                            <p className="text-xs text-gray-500">Last edited: 2 hours ago</p>
                        </div>
                        <button className="text-gray-400 hover:text-white"><Edit3 size={16} /></button>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'generator' && (
             <div className="space-y-8 animate-in fade-in">
               <div className="glass-panel p-8 rounded-xl border-l-4 border-l-theos-gold">
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <h3 className="text-2xl font-serif text-white mb-2">Theos Daily Generator</h3>
                      <p className="text-gray-400 text-sm">AI-powered scriptwriting for vertical news segments.</p>
                    </div>
                  </div>
                  <div className="mb-6">
                    <label className="block text-xs uppercase tracking-widest text-theos-gold mb-2">Topic</label>
                    <div className="flex gap-4">
                      <input 
                        type="text" 
                        value={topic}
                        onChange={(e) => setTopic(e.target.value)}
                        placeholder="e.g. Crypto adoption in Tulsa Greenwood District..."
                        className="flex-grow bg-black/50 border border-gray-800 rounded p-4 text-white focus:border-theos-gold outline-none transition-colors placeholder-gray-600"
                      />
                      <GoldButton onClick={handleGenerateScript} className="flex items-center justify-center gap-2">
                        {loading ? <Loader2 className="animate-spin" /> : <Mic size={18} />}
                        Generate
                      </GoldButton>
                    </div>
                  </div>
                  {result && (
                    <div className="bg-black/40 p-6 rounded border border-gray-700 animate-in slide-in-from-bottom-2">
                      <div className="mb-4 border-b border-gray-700 pb-4">
                        <h4 className="text-xl font-bold text-white mb-1">{result.title}</h4>
                        <div className="flex gap-2 flex-wrap">
                          {result.hashtags.map((tag, i) => (
                            <span key={i} className="text-xs text-blue-400">#{tag}</span>
                          ))}
                        </div>
                      </div>
                      <div className="prose prose-invert max-w-none">
                        <p className="whitespace-pre-line text-gray-300 leading-relaxed font-mono text-sm">{result.script}</p>
                      </div>
                    </div>
                  )}
               </div>
             </div>
          )}

          {activeTab === 'podcast' && (
             <div className="space-y-8 animate-in fade-in">
               <div className="glass-panel rounded-xl overflow-hidden border border-gray-800">
                  <div className="relative aspect-video bg-black">
                     <div className="absolute inset-0 flex items-center justify-center">
                        {isStreaming ? (
                           <img src="https://image.pollinations.ai/prompt/podcast%20studio%20host%20talking%20live%20stream%20camera%20view" className="w-full h-full object-cover" />
                        ) : (
                           <div className="text-center text-gray-500">
                              <Signal size={48} className="mx-auto mb-4" />
                              <p className="uppercase tracking-widest">Signal Offline</p>
                           </div>
                        )}
                     </div>
                     <div className="absolute top-4 left-4 flex gap-2">
                        <div className={`px-3 py-1 rounded text-[10px] font-bold uppercase tracking-widest flex items-center gap-1 ${isStreaming ? 'bg-red-600 text-white' : 'bg-gray-800 text-gray-400'}`}>
                           <div className={`w-2 h-2 rounded-full ${isStreaming ? 'bg-white animate-pulse' : 'bg-gray-500'}`}></div>
                           {isStreaming ? 'LIVE' : 'OFFLINE'}
                        </div>
                        {isStreaming && (
                           <div className="px-3 py-1 bg-black/50 backdrop-blur rounded text-[10px] font-bold text-white flex items-center gap-1">
                              <Users size={10} /> {viewers} Watching
                           </div>
                        )}
                     </div>
                  </div>
                  <div className="p-6 bg-gray-900 border-t border-gray-800 flex justify-between items-center">
                     <div className="flex items-center gap-6">
                        <button 
                          onClick={() => setIsStreaming(!isStreaming)}
                          className={`w-16 h-16 rounded-full flex items-center justify-center border-4 transition-all ${isStreaming ? 'border-red-600 bg-red-600 text-white' : 'border-gray-700 hover:border-white text-gray-500 hover:text-white'}`}
                        >
                           <Radio size={24} />
                        </button>
                        <div>
                           <h4 className="text-white font-bold">Main Stream Output</h4>
                           <p className="text-gray-500 text-xs">RTMP: rtmp://live.theosmedia.com/app</p>
                        </div>
                     </div>
                     <div className="flex items-center gap-4">
                        <div className={`flex items-center gap-2 px-4 py-2 rounded border ${isYoutubeSync ? 'border-red-500 bg-red-900/20 text-red-400' : 'border-gray-700 bg-gray-800 text-gray-500'}`}>
                           <Youtube size={16} />
                           <span className="text-xs uppercase font-bold">Sync: {isYoutubeSync ? 'Active' : 'Disabled'}</span>
                        </div>
                        <label className="flex items-center cursor-pointer">
                           <div className="relative">
                              <input type="checkbox" className="sr-only" checked={isYoutubeSync} onChange={() => setIsYoutubeSync(!isYoutubeSync)} />
                              <div className={`block w-10 h-6 rounded-full transition-colors ${isYoutubeSync ? 'bg-theos-gold' : 'bg-gray-700'}`}></div>
                              <div className={`dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform ${isYoutubeSync ? 'translate-x-4' : ''}`}></div>
                           </div>
                        </label>
                     </div>
                  </div>
               </div>

               {/* Mock Chat */}
               <div className="glass-panel p-6 rounded-xl border border-gray-800 h-64 overflow-y-auto">
                  <h4 className="text-gray-500 text-xs uppercase tracking-widest mb-4 flex items-center gap-2"><MessageSquare size={14} /> Live Chat Feed</h4>
                  {isStreaming ? (
                     <div className="space-y-3">
                        <p className="text-sm"><span className="text-blue-400 font-bold">@SarahJ:</span> This is fire! 🔥</p>
                        <p className="text-sm"><span className="text-green-400 font-bold">@TechBro99:</span> What mic are you using?</p>
                        <p className="text-sm"><span className="text-purple-400 font-bold">@CryptoKing:</span> Just bought the hoodie!</p>
                     </div>
                  ) : (
                     <p className="text-gray-600 italic text-sm">Chat is offline.</p>
                  )}
               </div>
             </div>
          )}

          {activeTab === 'nft' && (
             <div className="space-y-8 animate-in fade-in">
                <div className="glass-panel p-8 rounded-xl border border-gray-800">
                   <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                     <Hexagon size={20} className="text-purple-500"/> NFT Airdrop Command
                   </h3>
                   <div className="grid md:grid-cols-2 gap-8">
                      <div>
                         <label className="text-xs uppercase text-gray-500 tracking-widest mb-2 block">Select Asset</label>
                         <div className="bg-black/40 border border-gray-700 rounded p-4 flex items-center gap-4 cursor-pointer hover:border-theos-gold transition-colors mb-4">
                            <div className="w-12 h-12 bg-gray-800 rounded flex items-center justify-center">
                               <img src="https://image.pollinations.ai/prompt/gold%203d%20coin%20rotating" className="w-full h-full object-cover rounded" />
                            </div>
                            <div>
                               <h4 className="text-white text-sm font-bold">Jazz Fest VIP Token</h4>
                               <p className="text-gray-500 text-xs">ERC-1155 • 200 Supply</p>
                            </div>
                         </div>
                         
                         <label className="text-xs uppercase text-gray-500 tracking-widest mb-2 block">Target Audience</label>
                         <select className="w-full bg-black/50 border border-gray-700 p-3 text-white rounded focus:border-theos-gold outline-none mb-4">
                            <option>All Ticket Holders (Jazz Fest)</option>
                            <option>Academy Students (Gold Tier)</option>
                            <option>Waitlist Subscribers</option>
                         </select>
                      </div>
                      <div className="bg-gray-900 p-6 rounded border border-gray-800 flex flex-col justify-between">
                         <div>
                            <h4 className="text-gray-400 text-xs uppercase tracking-widest mb-4">Transaction Simulation</h4>
                            <div className="flex justify-between text-sm text-gray-300 mb-2">
                               <span>Est. Gas Fee</span>
                               <span className="font-mono text-theos-gold">0.004 MATIC</span>
                            </div>
                            <div className="flex justify-between text-sm text-gray-300 mb-2">
                               <span>Network</span>
                               <span className="text-purple-400">Polygon POS</span>
                            </div>
                            <div className="flex justify-between text-sm text-gray-300">
                               <span>Recipient Count</span>
                               <span>142 Wallets</span>
                            </div>
                         </div>
                         <GoldButton fullWidth className="mt-6 flex justify-center gap-2">
                            <Send size={16} /> Deploy Airdrop
                         </GoldButton>
                      </div>
                   </div>
                </div>
             </div>
          )}
          
          {activeTab === 'clients' && (
            <div className="glass-panel p-8 rounded-xl border border-gray-800 animate-in fade-in">
              <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <Database size={20} className="text-theos-gold"/> Client Database
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="bg-black/50 text-gray-500 text-[10px] uppercase">
                    <tr>
                      <th className="p-4 rounded-tl-lg">Client Name</th>
                      <th className="p-4">Email</th>
                      <th className="p-4">Type</th>
                      <th className="p-4">Lifetime Spend</th>
                      <th className="p-4 rounded-tr-lg">Last Activity</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-800">
                    {clients.map(client => (
                      <tr key={client.id} className="hover:bg-white/5 transition-colors">
                        <td className="p-4 font-bold text-white">{client.name}</td>
                        <td className="p-4 text-gray-400 font-mono text-xs">{client.email}</td>
                        <td className="p-4">
                          <span className={`px-2 py-1 rounded text-[10px] uppercase font-bold ${
                            client.type === 'Investor' ? 'bg-theos-gold text-black' : 
                            client.type === 'Booker' ? 'bg-blue-900 text-blue-200' : 'bg-gray-800 text-gray-400'
                          }`}>
                            {client.type}
                          </span>
                        </td>
                        <td className="p-4 font-mono text-theos-gold">{client.spend}</td>
                        <td className="p-4 text-gray-500 text-xs">{client.recent}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="mt-4 flex justify-end">
                <OutlineButton className="text-xs flex items-center gap-2">
                  <FileSpreadsheet size={14} /> Export CSV
                </OutlineButton>
              </div>
            </div>
          )}

          {activeTab === 'keys' && (
            <div className="glass-panel p-8 rounded-xl border border-gray-800 animate-in fade-in">
               <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                  <Key size={20} className="text-theos-gold"/> Financial Keys Manager
               </h3>
               <p className="text-gray-400 mb-6">Update the scrolling ticker on the main site.</p>
               <div className="space-y-2">
                  {["OWN YOUR MASTERS", "GROUP ECONOMICS IS POWER", "RECYCLE THE DOLLAR", "LICENSING OVER SELLING", "TRUSTS > TAXES"].map((key, i) => (
                     <div key={i} className="flex gap-4 items-center">
                        <div className="bg-black/50 border border-gray-700 p-3 rounded flex-grow text-white font-mono text-sm">
                           {key}
                        </div>
                        <button className="text-red-500 hover:text-red-400"><Trash2 size={18} /></button>
                     </div>
                  ))}
                  <div className="flex gap-4 mt-4">
                     <input className="flex-grow bg-black/50 border border-gray-700 p-3 text-white rounded focus:border-theos-gold outline-none" placeholder="Add new key..." />
                     <GoldButton className="w-12 flex items-center justify-center"><Plus size={20} /></GoldButton>
                  </div>
               </div>
            </div>
          )}

        </div>

        {/* Sidebar */}
        <div>
           <div className="glass-panel p-6 rounded-xl border border-gray-800 mb-8">
              <h4 className="text-gray-500 text-xs uppercase tracking-widest mb-4">System Status</h4>
              <div className="space-y-4">
                 <div className="flex justify-between items-center text-sm">
                    <span className="text-white">Server Load</span>
                    <span className="text-green-400 font-mono">12%</span>
                 </div>
                 <div className="flex justify-between items-center text-sm">
                    <span className="text-white">Storage</span>
                    <span className="text-theos-gold font-mono">2.4TB / 10TB</span>
                 </div>
                 <div className="flex justify-between items-center text-sm">
                    <span className="text-white">API Quota (Gemini)</span>
                    <span className="text-blue-400 font-mono">850/1000</span>
                 </div>
              </div>
           </div>
           
           <div className="glass-panel p-6 rounded-xl border border-gray-800">
              <h4 className="text-gray-500 text-xs uppercase tracking-widest mb-4">Quick Actions</h4>
              <div className="space-y-2">
                 <button onClick={() => setActiveTab('upload')} className="w-full text-left px-4 py-3 bg-gray-900 hover:bg-gray-800 rounded text-sm text-white transition-colors flex items-center gap-3">
                    <Plus size={16} className="text-theos-gold"/> New Project
                 </button>
                 <button onClick={() => setActiveTab('clients')} className="w-full text-left px-4 py-3 bg-gray-900 hover:bg-gray-800 rounded text-sm text-white transition-colors flex items-center gap-3">
                    <UserCheck size={16} className="text-theos-gold"/> Verify Client
                 </button>
                 <button className="w-full text-left px-4 py-3 bg-gray-900 hover:bg-gray-800 rounded text-sm text-white transition-colors flex items-center gap-3">
                    <Settings size={16} className="text-theos-gold"/> Global Settings
                 </button>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

// --- Growth View (Updated with Real Press Blast & Bounty) ---
export const GrowthView = () => {
   const [pressStatus, setPressStatus] = useState<'idle' | 'connecting' | 'auth' | 'injecting' | 'success'>('idle');
   const [funnelData, setFunnelData] = useState<any>(null);
   const [bountyData, setBountyData] = useState<any[]>([]);

   useEffect(() => {
     // Load initial data
     fetchStripeFunnelData().then(setFunnelData);
     fetchBountyData().then(setBountyData);

     // Live update simulation
     const interval = setInterval(() => {
        setFunnelData((prev: any) => prev ? ({...prev, totalRevenue: prev.totalRevenue + Math.random() * 100}) : null);
     }, 3000);
     return () => clearInterval(interval);
   }, []);

   const handlePressBlast = async () => {
      setPressStatus('connecting');
      await new Promise(r => setTimeout(r, 800));
      setPressStatus('auth');
      await new Promise(r => setTimeout(r, 600));
      setPressStatus('injecting');
      await sendPressBlastToMediaList("Black Wall Street Festival", "Press Release Content");
      setPressStatus('success');
      setTimeout(() => setPressStatus('idle'), 5000);
   };

   return (
     <div className="relative overflow-hidden">
        {/* Abstract Background */}
        <div className="absolute inset-0 z-0 pointer-events-none">
           <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-theos-gold/10 rounded-full blur-[100px]"></div>
           <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-900/10 rounded-full blur-[100px]"></div>
        </div>

        <div className="relative z-10 py-12 px-6 max-w-6xl mx-auto">
           <div className="text-center mb-12">
             <div className="inline-flex items-center gap-2 border border-theos-gold/30 px-4 py-1 rounded-full bg-black/50 mb-8 backdrop-blur">
                <Zap size={14} className="text-theos-gold" />
                <span className="text-gray-300 text-xs font-bold uppercase tracking-widest">The Wealth Algorithm</span>
             </div>
             <h1 className="font-serif text-4xl md:text-6xl text-white font-bold mb-6 leading-tight">
                QUANTUM <br/> <span className="text-theos-gold">GROWTH ENGINE</span>
             </h1>
           </div>

           <div className="grid lg:grid-cols-2 gap-8 mb-12">
              {/* Press Injection Terminal */}
              <div className="bg-black border border-gray-800 rounded-xl overflow-hidden shadow-2xl flex flex-col h-[400px]">
                 <div className="bg-gray-900 p-3 border-b border-gray-800 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                       <Terminal size={14} className="text-gray-400"/>
                       <span className="text-xs font-mono text-gray-400">media_injector.exe</span>
                    </div>
                    <div className="flex gap-1.5">
                       <div className="w-2.5 h-2.5 rounded-full bg-red-500"></div>
                       <div className="w-2.5 h-2.5 rounded-full bg-yellow-500"></div>
                       <div className="w-2.5 h-2.5 rounded-full bg-green-500"></div>
                    </div>
                 </div>
                 <div className="p-6 font-mono text-xs flex-grow overflow-y-auto bg-black text-green-500">
                    <p className="mb-2">System initialized...</p>
                    <p className="mb-2">Target nodes: TMZ, Revolt, Blavity, Complex</p>
                    {pressStatus !== 'idle' && (
                       <>
                         <p className="mb-2 text-yellow-500">{'>'} Establishing secure handshake...</p>
                         {pressStatus !== 'connecting' && (
                            <>
                              <p className="mb-2 text-yellow-500">{'>'} Authenticating SendGrid API Key...</p>
                              {pressStatus !== 'auth' && (
                                 <>
                                    <p className="mb-2 text-blue-400">{'>'} Sending from: press@theosmediagroup.com</p>
                                    <p className="mb-2 text-blue-400">{'>'} Injecting into ingest servers...</p>
                                    {pressStatus === 'success' && (
                                       <p className="mt-4 text-theos-gold font-bold text-sm bg-theos-gold/10 p-2 border border-theos-gold inline-block">
                                          ✓ SUCCESS: PRESS RELEASE INJECTED
                                       </p>
                                    )}
                                 </>
                              )}
                            </>
                         )}
                       </>
                    )}
                 </div>
                 <div className="p-4 border-t border-gray-800 bg-gray-900/50">
                    <GoldButton 
                       onClick={handlePressBlast}
                       disabled={pressStatus !== 'idle'}
                       fullWidth 
                       className="flex items-center justify-center gap-2"
                    >
                       {pressStatus === 'idle' ? <><Zap size={16}/> BLAST PRESS WIRE</> : <Loader2 className="animate-spin"/>}
                    </GoldButton>
                 </div>
              </div>

              {/* Bounty Dashboard */}
              <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6 backdrop-blur">
                 <h3 className="font-serif text-xl text-white mb-4 flex items-center justify-between">
                    <span>Bounty Backend</span>
                    <span className="text-xs font-sans text-theos-gold border border-theos-gold px-2 py-1 rounded">USDC AUTO-PAY</span>
                 </h3>
                 
                 {funnelData && (
                    <div className="grid grid-cols-2 gap-4 mb-6">
                       <div className="bg-black/40 p-4 rounded border border-gray-800">
                          <p className="text-gray-500 text-[10px] uppercase tracking-widest">Live Revenue</p>
                          <p className="text-2xl font-mono text-white">${funnelData.totalRevenue.toFixed(2)}</p>
                       </div>
                       <div className="bg-black/40 p-4 rounded border border-gray-800">
                          <p className="text-gray-500 text-[10px] uppercase tracking-widest">Conversion Rate</p>
                          <p className="text-2xl font-mono text-green-400">{funnelData.conversionRate}%</p>
                       </div>
                    </div>
                 )}

                 <div className="overflow-hidden rounded border border-gray-800">
                    <table className="w-full text-left text-sm">
                       <thead className="bg-black text-gray-500 text-[10px] uppercase">
                          <tr>
                             <th className="p-3">Affiliate Code</th>
                             <th className="p-3">Sales</th>
                             <th className="p-3 text-right">Pending Payout</th>
                          </tr>
                       </thead>
                       <tbody className="divide-y divide-gray-800">
                          {bountyData.map((b, i) => (
                             <tr key={i} className="bg-black/20">
                                <td className="p-3 font-mono text-gray-300">{b.code}</td>
                                <td className="p-3 text-white">{b.sales}</td>
                                <td className="p-3 text-right text-theos-gold font-mono">{b.payout} USDC</td>
                             </tr>
                          ))}
                       </tbody>
                    </table>
                 </div>
              </div>
           </div>
        </div>
     </div>
   );
};

// --- Credential View ---
export const CredentialView = () => {
  const [credentialId, setCredentialId] = useState('');
  const [status, setStatus] = useState<'idle' | 'verifying' | 'valid' | 'invalid'>('idle');

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('verifying');
    // Simulate API check
    setTimeout(() => {
      if (credentialId.startsWith('THEOS-')) {
        setStatus('valid');
      } else {
        setStatus('invalid');
      }
    }, 1500);
  };

  return (
    <div className="min-h-[60vh] flex items-center justify-center p-6">
       <div className="max-w-md w-full bg-gray-900 border border-theos-gold/30 p-8 rounded-xl text-center">
          <ShieldCheck size={48} className="text-theos-gold mx-auto mb-6" />
          <h2 className="font-serif text-2xl text-white mb-2">Credential Verification</h2>
          <p className="text-gray-400 text-sm mb-8">Verify authenticity of Theos Media Group press passes, tickets, and certificates.</p>

          <form onSubmit={handleVerify} className="space-y-4">
             <input 
               value={credentialId}
               onChange={(e) => {
                 setCredentialId(e.target.value);
                 setStatus('idle');
               }}
               placeholder="ENTER ID (e.g. THEOS-2024-X)" 
               className="w-full bg-black border border-gray-700 p-4 text-center text-white tracking-widest font-mono rounded focus:border-theos-gold outline-none"
             />
             <GoldButton fullWidth disabled={status === 'verifying'}>
               {status === 'verifying' ? <Loader2 className="animate-spin mx-auto"/> : 'VERIFY ON BLOCKCHAIN'}
             </GoldButton>
          </form>

          {status === 'valid' && (
            <div className="mt-6 p-4 bg-green-900/20 border border-green-500/50 rounded animate-in zoom-in">
               <div className="flex items-center justify-center gap-2 text-green-500 font-bold uppercase tracking-widest mb-1">
                 <CheckCircle size={16} /> Verified Valid
               </div>
               <p className="text-xs text-gray-400">Timestamp: {new Date().toLocaleTimeString()}</p>
            </div>
          )}

          {status === 'invalid' && (
            <div className="mt-6 p-4 bg-red-900/20 border border-red-500/50 rounded animate-in zoom-in">
               <div className="flex items-center justify-center gap-2 text-red-500 font-bold uppercase tracking-widest mb-1">
                 <X size={16} /> Invalid Credential
               </div>
               <p className="text-xs text-gray-400">Record not found in ledger.</p>
            </div>
          )}
       </div>
    </div>
  );
};

// --- Learn View (Academy) ---
export const LearnView = ({ addToCart }: { addToCart: (item: CartItem) => void }) => {
  const courses: CourseItem[] = [
    {
      id: 'c1',
      title: 'The Tour Money Map',
      price: '$497',
      students: 1240,
      description: 'The complete blueprint to securing government and corporate contracts for your touring business.',
      tags: ['Contracts', 'Logistics']
    },
    {
      id: 'c2',
      title: 'Mastering the Mix',
      price: '$297',
      students: 850,
      description: 'Advanced audio engineering techniques used in Theos Studios. From tracking to final master.',
      tags: ['Audio', 'Engineering']
    },
    {
      id: 'c3',
      title: 'Event Production 101',
      price: '$197',
      students: 2100,
      description: 'How to plan, budget, and execute a profitable live event from scratch.',
      tags: ['Events', 'Management']
    },
    {
        id: 'c4',
        title: 'Trust & Shield Wealth Architecture',
        price: '$499',
        students: 540,
        description: 'Master the financial keys: Trusts, IULs, and S&P 500 leverage for generational wealth.',
        tags: ['Finance', 'Trusts']
    },
    {
        id: 'c5',
        title: 'The Hemp Industrial Revolution',
        price: '$149',
        students: 320,
        description: 'Create self-sufficiency and build products using the 1,000+ industrial applications of hemp.',
        tags: ['Agriculture', 'Business']
    },
    {
        id: 'c6',
        title: 'Olympic Contracts: The $5B Opportunity',
        price: '$299',
        students: 150,
        description: 'How minority-owned businesses can secure logistics, catering, and security contracts for the Games.',
        tags: ['Procurement', 'B2B']
    }
  ];

  return (
    <div className="py-12 px-6 max-w-7xl mx-auto">
       <div className="text-center mb-16">
          <h2 className="font-serif text-4xl text-theos-gold mb-4">Theos Academy</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Practical knowledge for the entertainment industry. Learn the business behind the show.
          </p>
       </div>
       
       {/* Featured Card: Trust & Shield */}
       <div className="mb-12 bg-gradient-to-r from-gray-900 to-black border border-theos-gold/50 rounded-2xl p-8 md:p-12 flex flex-col md:flex-row items-center gap-8 relative overflow-hidden">
           <div className="absolute top-0 right-0 p-4 opacity-10">
              <ShieldCheck size={200} />
           </div>
           <div className="relative z-10 md:w-2/3">
              <div className="inline-flex items-center gap-2 bg-theos-gold/20 text-theos-gold px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-4">
                 <Key size={12} /> Master Class Series
              </div>
              <h3 className="font-serif text-3xl md:text-4xl text-white mb-4">Trust & Shield Wealth Architecture</h3>
              <p className="text-gray-300 mb-6 text-lg">
                 Stop working for money and start building a legacy. Learn how to use Trusts, IULs, and the S&P 500 to leverage your assets and create your own family bank.
              </p>
              <div className="flex gap-4">
                 <GoldButton onClick={() => window.open('https://trustandshield.com', '_blank')}>Visit TrustAndShield.com</GoldButton>
              </div>
           </div>
           <div className="relative z-10 md:w-1/3">
              <div className="bg-black/50 backdrop-blur border border-gray-700 p-6 rounded-xl">
                 <h4 className="text-theos-gold font-bold uppercase tracking-widest text-sm mb-4">Curriculum Includes:</h4>
                 <ul className="space-y-3 text-sm text-gray-400">
                    <li className="flex items-center gap-2"><CheckCircle size={14} className="text-green-500"/> Private Family Trusts</li>
                    <li className="flex items-center gap-2"><CheckCircle size={14} className="text-green-500"/> IUL Banking Strategy</li>
                    <li className="flex items-center gap-2"><CheckCircle size={14} className="text-green-500"/> S&P 500 Leverage</li>
                    <li className="flex items-center gap-2"><CheckCircle size={14} className="text-green-500"/> Asset Protection</li>
                 </ul>
              </div>
           </div>
       </div>

       <div className="grid md:grid-cols-3 gap-8">
          {courses.map(course => (
             <div key={course.id} className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden hover:border-theos-gold transition-colors flex flex-col">
                <div className="aspect-video bg-black relative">
                   <img src={`https://image.pollinations.ai/prompt/online%20course%20thumbnail%20${course.title.replace(/ /g, '%20')}%20educational%20business%20dark%20luxury`} className="w-full h-full object-cover opacity-80" />
                   <div className="absolute top-2 right-2 bg-theos-gold text-black text-[10px] font-bold px-2 py-1 rounded">
                      ONLINE COURSE
                   </div>
                </div>
                <div className="p-6 flex-grow flex flex-col">
                   <div className="flex gap-2 mb-3">
                      {course.tags.map(tag => (
                        <span key={tag} className="text-[10px] text-gray-400 border border-gray-700 px-2 py-0.5 rounded uppercase">{tag}</span>
                      ))}
                   </div>
                   <h3 className="text-xl font-bold text-white mb-2">{course.title}</h3>
                   <p className="text-sm text-gray-400 mb-6 flex-grow">{course.description}</p>
                   
                   <div className="flex items-center justify-between mt-auto pt-6 border-t border-gray-800">
                      <div className="flex items-center gap-2 text-gray-500 text-xs">
                         <Users size={14} /> {course.students} Enrolled
                      </div>
                      <div className="flex items-center gap-4">
                         <span className="font-mono text-xl text-white">{course.price}</span>
                         <GoldButton onClick={() => addToCart({
                            id: course.id,
                            title: course.title,
                            price: course.price,
                            priceValue: parsePrice(course.price),
                            type: 'COURSE'
                         })} className="px-4 py-2 text-xs">Enroll</GoldButton>
                      </div>
                   </div>
                </div>
             </div>
          ))}
       </div>
    </div>
  );
};

// --- Shop View (Merch/NFT) ---
export const ShopView = ({ addToCart }: { addToCart: (item: CartItem) => void }) => {
  const products: MerchItem[] = [
    {
      id: 'm1',
      name: 'Theos "Owner" Hoodie',
      price: '$85.00',
      isNftLinked: true,
      imageUrl: 'https://image.pollinations.ai/prompt/luxury%20black%20hoodie%20with%20gold%20embroidery%20text%20OWNER%20streetwear%20fashion%20photography%20studio'
    },
    {
      id: 'm2',
      name: 'Gold Seal Dad Hat',
      price: '$45.00',
      isNftLinked: false,
      imageUrl: 'https://image.pollinations.ai/prompt/black%20baseball%20cap%20with%20gold%20metal%20logo%20seal%20fashion%20accessory%20studio%20lighting'
    },
    {
      id: 'm3',
      name: 'Tour Production Jacket',
      price: '$150.00',
      isNftLinked: true,
      imageUrl: 'https://image.pollinations.ai/prompt/black%20bomber%20jacket%20techwear%20style%20backstage%20crew%20uniform%20fashion'
    },
    {
       id: 'm4',
       name: 'Stage Crew Vest',
       price: '$120.00',
       isNftLinked: false,
       imageUrl: 'https://image.pollinations.ai/prompt/black%20tactical%20utility%20vest%20streetwear%20fashion%20photography%20zippers%20pockets'
    },
    {
       id: 'm5',
       name: 'Fashion Tech Pack Template',
       price: '$35.00',
       isNftLinked: false,
       imageUrl: 'https://image.pollinations.ai/prompt/digital%20fashion%20technical%20drawings%20blueprints%20grid%20dark%20mode%20computer%20screen'
    }
  ];

  return (
    <div className="py-12 px-6 max-w-7xl mx-auto">
       <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="font-serif text-4xl text-theos-gold mb-2">Merch & Digital Assets</h2>
            <p className="text-gray-400">Wear the brand. Own the asset. Some items include digital twins.</p>
          </div>
       </div>

       <div className="grid md:grid-cols-3 gap-8">
          {products.map(product => (
             <div key={product.id} className="group">
                <div className="bg-gray-900 aspect-square overflow-hidden mb-4 relative">
                   <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                   {product.isNftLinked && (
                      <div className="absolute top-4 left-4 bg-purple-600 text-white text-[10px] font-bold px-2 py-1 uppercase tracking-widest shadow-lg flex items-center gap-1">
                         <Hexagon size={10} /> NFT Linked
                      </div>
                   )}
                   <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                      <GoldButton fullWidth onClick={() => addToCart({
                         id: product.id,
                         title: product.name,
                         price: product.price,
                         priceValue: parsePrice(product.price),
                         type: 'MERCH',
                         image: product.imageUrl
                      })}>
                         Add to Cart
                      </GoldButton>
                   </div>
                </div>
                <h3 className="text-white font-bold text-lg mb-1">{product.name}</h3>
                <p className="text-theos-gold font-mono">{product.price}</p>
             </div>
          ))}
       </div>
    </div>
  );
};