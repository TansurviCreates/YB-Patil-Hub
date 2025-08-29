import React, { useState } from 'react';
import { Search, ShoppingCart, Moon, Sun, ChevronDown, Menu } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useTheme } from '@/contexts/ThemeContext';
import { useCart } from '@/contexts/CartContext';
import { signOutUser } from '@/lib/auth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface HeaderProps {
  onSidebarToggle: () => void;
  onCartToggle: () => void;
  onAuthClick?: () => void;
}

const Header: React.FC<HeaderProps> = ({ onSidebarToggle, onCartToggle, onAuthClick }) => {
  const { user, userProfile } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const { cartCount } = useCart();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSignOut = async () => {
    try {
      await signOutUser();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  return (
    <header className="bg-card border-b border-border sticky top-0 z-30" data-testid="header">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={onSidebarToggle}
            className="lg:hidden"
            data-testid="button-sidebar-toggle"
          >
            <Menu className="w-5 h-5" />
          </Button>
          <h2 className="text-xl font-semibold" data-testid="page-title">
            Dashboard
          </h2>
        </div>
        
        <div className="flex items-center gap-4">
          {/* Search */}
          <div className="hidden md:flex relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-64 pl-10"
              data-testid="input-search"
            />
          </div>
          
          {/* Cart */}
          <Button
            variant="ghost"
            size="icon"
            onClick={onCartToggle}
            className="relative"
            data-testid="button-cart-toggle"
          >
            <ShoppingCart className="w-5 h-5" />
            {cartCount > 0 && (
              <span 
                className="absolute -top-1 -right-1 bg-destructive text-destructive-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center"
                data-testid="text-cart-count"
              >
                {cartCount}
              </span>
            )}
          </Button>
          
          {/* Theme Toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            data-testid="button-theme-toggle"
          >
            {theme === 'light' ? (
              <Moon className="w-5 h-5" />
            ) : (
              <Sun className="w-5 h-5" />
            )}
          </Button>
          
          {/* User Menu or Login */}
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-2 h-auto p-2" data-testid="button-user-menu">
                  <Avatar className="w-8 h-8">
                    <AvatarFallback className="bg-primary text-primary-foreground text-sm">
                      {userProfile ? getInitials(userProfile.name) : 'U'}
                    </AvatarFallback>
                  </Avatar>
                  <div className="hidden md:block text-left">
                    <div className="text-sm font-medium" data-testid="text-user-name">
                      {userProfile?.name || 'User'}
                    </div>
                  </div>
                  <ChevronDown className="w-4 h-4 text-muted-foreground" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuItem onClick={handleSignOut} data-testid="button-sign-out">
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button
              onClick={onAuthClick}
              className="bg-primary text-primary-foreground hover:bg-primary/90"
              data-testid="button-login"
            >
              Login / Register
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
