import React, { useState } from 'react';
import { Layout } from './components/Layout';
import { ViewState, CartItem } from './types';
import { 
  HomeView, 
  EventsView, 
  SportsView, 
  WatchView, 
  TalentView, 
  StudioView, 
  GrowthView, 
  CredentialView, 
  LearnView, 
  ShopView 
} from './components/Views';

export default function App() {
  const [activeView, setActiveView] = useState<ViewState>('HOME');
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (item: CartItem) => {
    setCart(prev => [...prev, item]);
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const renderView = () => {
    switch (activeView) {
      case 'HOME': return <HomeView onNavigate={setActiveView} addToCart={addToCart} />;
      case 'EVENTS': return <EventsView addToCart={addToCart} />;
      case 'SPORTS': return <SportsView addToCart={addToCart} />;
      case 'WATCH': return <WatchView />;
      case 'TALENT': return <TalentView addToCart={addToCart} />;
      case 'STUDIO': return <StudioView />;
      case 'GROWTH': return <GrowthView />;
      case 'CREDENTIAL': return <CredentialView />;
      case 'LEARN': return <LearnView addToCart={addToCart} />;
      case 'SHOP': return <ShopView addToCart={addToCart} />;
      default: return <HomeView onNavigate={setActiveView} addToCart={addToCart} />;
    }
  };

  return (
    <Layout 
      activeView={activeView} 
      onNavigate={setActiveView} 
      cart={cart}
      removeFromCart={removeFromCart}
    >
      {renderView()}
    </Layout>
  );
}