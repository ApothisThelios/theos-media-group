import React, { useState, useEffect } from 'react';
import { ViewState, CartItem } from '../types';
import { Menu, X, ShoppingBag, ChevronRight, Twitter, Instagram, Youtube, Trash2 } from 'lucide-react';

export const LOGO_URL = "https://image.pollinations.ai/prompt/gold%20circular%20logo%20emblem%20with%20wings%20and%20text%20THEOS%20MEDIA%20GROUP%20on%20black%20background%20luxury%20vector%20high%20quality";

interface LayoutProps {
  children?: React.ReactNode;
  activeView: ViewState;
  onNavigate: (view: ViewState) => void;
  cart: CartItem[];
  removeFromCart: (id: string) => void;
}

export const GoldButton = ({ children, onClick, className = "", fullWidth = false, disabled = false }: any) => (
  <button 
    onClick={onClick}
    disabled={disabled}
    className={`bg-theos-gold text-black font-bold uppercase tracking-widest py-3 px-6 hover:bg-white transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed ${fullWidth ? 'w-full' : ''} ${className}`}
  >
    {children}
  </button>
);

export const OutlineButton = ({ children, onClick, className = "", fullWidth = false }: any) => (
  <button 
    onClick={onClick}
    className={`bg-transparent border border-gray-600 text-white font-bold uppercase tracking-widest py-3 px-6 hover:border-theos-gold hover:text-theos-gold transition-all duration-300 ${fullWidth ? 'w-full' : ''} ${className}`}
  >
    {children}
  </button>
);

export const Layout = ({ children, activeView, onNavigate, cart, removeFromCart }: LayoutProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems: { label: string; id: ViewState }[] = [
    { label: 'Experiences', id: 'EVENTS' },
    { label: 'Sports', id: 'SPORTS' },
    { label: 'Watch', id: 'WATCH' },
    { label: 'Talent', id: 'TALENT' },
    { label: 'Academy', id: 'LEARN' },
    { label: 'Shop', id: 'SHOP' },
    { label: 'Growth', id: 'GROWTH' },
  ];

  const cartTotal = cart.reduce((sum, item) => sum + item.priceValue, 0);

  return (
    <div className="min-h-screen bg-theos-black text-white font-sans selection:bg-theos-gold selection:text-black">
      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-black/90 backdrop-blur-md border-b border-gray-800' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-4 cursor-pointer" onClick={() => onNavigate('HOME')}>
            <img src={LOGO_URL} alt="Theos Media Group" className="w-12 h-12 object-contain rounded-full border border-theos-gold/20" />
            <span className="font-serif font-bold text-xl tracking-wider hidden md:block">THEOS <span className="text-theos-gold">MEDIA</span></span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => (
              <button 
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`text-xs font-bold uppercase tracking-widest hover:text-theos-gold transition-colors ${activeView === item.id ? 'text-theos-gold' : 'text-gray-400'}`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-6">
            <button 
              className="relative text-white hover:text-theos-gold transition-colors"
              onClick={() => setIsCartOpen(true)}
            >
              <ShoppingBag size={24} />
              {cart.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-theos-red text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full font-bold">
                  {cart.length}
                </span>
              )}
            </button>
            <button className="lg:hidden text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={`fixed inset-0 bg-black z-40 lg:hidden transition-transform duration-500 ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex flex-col h-full pt-24 px-6 space-y-6">
          {navItems.map((item) => (
            <button 
              key={item.id}
              onClick={() => {
                onNavigate(item.id);
                setIsMenuOpen(false);
              }}
              className="text-2xl font-serif font-bold text-white text-left flex justify-between items-center border-b border-gray-900 pb-4"
            >
              {item.label}
              <ChevronRight size={20} className="text-theos-gold" />
            </button>
          ))}
          <button 
              onClick={() => {
                onNavigate('STUDIO');
                setIsMenuOpen(false);
              }}
              className="text-sm font-mono text-gray-500 text-left pt-8"
            >
              [ ACCESS STUDIO TERMINAL ]
            </button>
             <button 
              onClick={() => {
                onNavigate('CREDENTIAL');
                setIsMenuOpen(false);
              }}
              className="text-sm font-mono text-gray-500 text-left"
            >
              [ VERIFY CREDENTIAL ]
            </button>
        </div>
      </div>

      {/* Cart Drawer */}
      <div className={`fixed inset-0 z-[60] pointer-events-none ${isCartOpen ? 'pointer-events-auto' : ''}`}>
        <div className={`absolute inset-0 bg-black/50 transition-opacity duration-300 ${isCartOpen ? 'opacity-100' : 'opacity-0'}`} onClick={() => setIsCartOpen(false)} />
        <div className={`absolute top-0 right-0 h-full w-full max-w-md bg-[#0a0a0a] border-l border-gray-800 shadow-2xl transition-transform duration-500 transform ${isCartOpen ? 'translate-x-0' : 'translate-x-full'} flex flex-col`}>
          <div className="p-6 border-b border-gray-800 flex items-center justify-between">
            <h2 className="font-serif text-2xl text-white">Your Cart</h2>
            <button onClick={() => setIsCartOpen(false)} className="text-gray-400 hover:text-white"><X size={24} /></button>
          </div>
          
          <div className="flex-grow overflow-y-auto p-6 space-y-6">
            {cart.length === 0 ? (
              <div className="text-center text-gray-500 mt-20">
                <ShoppingBag size={48} className="mx-auto mb-4 opacity-30" />
                <p>Your cart is empty.</p>
              </div>
            ) : (
              cart.map((item, idx) => (
                <div key={`${item.id}-${idx}`} className="flex gap-4 items-start bg-gray-900/50 p-4 rounded border border-gray-800">
                  {item.image && (
                    <div className="w-16 h-16 bg-gray-800 rounded overflow-hidden flex-shrink-0">
                      <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                    </div>
                  )}
                  <div className="flex-grow">
                    <h3 className="text-sm font-bold text-white mb-1">{item.title}</h3>
                    <p className="text-xs text-gray-400 mb-2">{item.type}</p>
                    <p className="text-theos-gold font-mono">{item.price}</p>
                  </div>
                  <button onClick={() => removeFromCart(item.id)} className="text-gray-500 hover:text-red-500">
                    <Trash2 size={16} />
                  </button>
                </div>
              ))
            )}
          </div>

          <div className="p-6 border-t border-gray-800 bg-gray-900">
            <div className="flex justify-between items-center mb-6 text-lg font-bold">
              <span>Total</span>
              <span className="font-mono text-theos-gold">${cartTotal.toFixed(2)}</span>
            </div>
            <GoldButton fullWidth onClick={() => alert('Proceeding to Checkout via Stripe/Crypto...')}>Checkout</GoldButton>
            <p className="text-center text-[10px] text-gray-500 mt-4 uppercase tracking-widest">
              Secured by Stripe & Ethereum
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="pt-20 min-h-screen">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-black border-t border-gray-900 pt-20 pb-10 px-6 mt-20">
        <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-12 mb-16">
          <div>
            <div className="font-serif font-bold text-2xl text-white mb-6 flex items-center gap-3">
               <img src={LOGO_URL} alt="Theos" className="w-8 h-8 rounded-full opacity-80" />
               THEOS
            </div>
            <p className="text-gray-500 text-sm leading-relaxed mb-6">
              Recycling the dollar. Owning the infrastructure. Building the legacy.
            </p>
            <div className="flex gap-4">
              <Twitter className="text-gray-500 hover:text-white cursor-pointer" size={20} />
              <Instagram className="text-gray-500 hover:text-white cursor-pointer" size={20} />
              <Youtube className="text-gray-500 hover:text-white cursor-pointer" size={20} />
            </div>
          </div>
          
          <div>
            <h4 className="text-white font-bold uppercase tracking-widest mb-6 text-xs">Divisions</h4>
            <ul className="space-y-3 text-gray-500 text-sm">
              <li className="hover:text-theos-gold cursor-pointer" onClick={() => onNavigate('EVENTS')}>Live Events</li>
              <li className="hover:text-theos-gold cursor-pointer" onClick={() => onNavigate('TALENT')}>Artist Management</li>
              <li className="hover:text-theos-gold cursor-pointer" onClick={() => onNavigate('SPORTS')}>Sports & Gaming</li>
              <li className="hover:text-theos-gold cursor-pointer" onClick={() => onNavigate('WATCH')}>Theos Originals</li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold uppercase tracking-widest mb-6 text-xs">Resources</h4>
            <ul className="space-y-3 text-gray-500 text-sm">
              <li className="hover:text-theos-gold cursor-pointer" onClick={() => onNavigate('LEARN')}>Academy</li>
              <li className="hover:text-theos-gold cursor-pointer" onClick={() => onNavigate('CREDENTIAL')}>Verify Credential</li>
              <li className="hover:text-theos-gold cursor-pointer" onClick={() => onNavigate('GROWTH')}>Press Portal</li>
              <li className="hover:text-theos-gold cursor-pointer" onClick={() => onNavigate('STUDIO')}>Login</li>
            </ul>
          </div>

          <div>
             <h4 className="text-white font-bold uppercase tracking-widest mb-6 text-xs">Newsletter</h4>
             <p className="text-gray-500 text-sm mb-4">Get the 'Tour Money Map' blueprint.</p>
             <div className="flex">
               <input type="email" placeholder="Email Address" className="bg-gray-900 border border-gray-800 text-white px-4 py-2 text-sm w-full focus:outline-none focus:border-theos-gold" />
               <button className="bg-theos-gold text-black px-4 font-bold">→</button>
             </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto border-t border-gray-900 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-600">
          <p>© 2024 Theos Media Group. All Rights Reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
             <span>Privacy Policy</span>
             <span>Terms of Service</span>
             <span>Smart Contract</span>
          </div>
        </div>
      </footer>
    </div>
  );
};