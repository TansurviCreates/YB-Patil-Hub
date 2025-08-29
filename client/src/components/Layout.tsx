import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import Sidebar from './Sidebar';
import Header from './Header';
import CartSidebar from './CartSidebar';
import AuthModal from './AuthModal';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { user, loading } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <div className="lg:ml-64">
        <Header 
          onSidebarToggle={() => setSidebarOpen(true)} 
          onCartToggle={() => setCartOpen(true)} 
          onAuthClick={() => setAuthModalOpen(true)}
        />
        
        <main className="p-6" data-testid="main-content">
          {children}
        </main>
      </div>
      
      <CartSidebar open={cartOpen} onClose={() => setCartOpen(false)} />
      {authModalOpen && <AuthModal open={authModalOpen} onClose={() => setAuthModalOpen(false)} />}
    </div>
  );
};

export default Layout;
