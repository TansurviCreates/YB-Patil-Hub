import React from 'react';
import { Link, useLocation } from 'wouter';
import { Home, FileText, Zap, Calendar, User, Coffee, X, BookOpen, Settings, LayoutDashboard } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext';

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

const navigation = [
  { name: 'Home', href: '/', icon: Home },
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard, requireAuth: true },
  { name: 'Previous Papers', href: '/papers', icon: FileText },
  { name: 'DTE Projects', href: '/projects', icon: Zap },
  { name: 'Assignments', href: '/assignments', icon: BookOpen },
  { name: 'Events', href: '/events', icon: Calendar },
  { name: 'Profile', href: '/profile', icon: User, requireAuth: true },
  { name: 'Donate', href: '/donate', icon: Coffee },
];

const adminNavigation = [
  { name: 'Admin Panel', href: '/admin', icon: Settings },
];

const Sidebar: React.FC<SidebarProps> = ({ open, onClose }) => {
  const [location] = useLocation();
  const { user, userProfile } = useAuth();

  // Filter navigation based on auth requirements
  const filteredNavigation = navigation.filter(item => {
    if (item.requireAuth && !user) return false;
    return true;
  });

  return (
    <nav
      className={cn(
        "fixed left-0 top-0 h-full w-64 bg-card border-r border-border z-50 transition-transform duration-300",
        "lg:translate-x-0",
        open ? "translate-x-0" : "-translate-x-full"
      )}
      data-testid="sidebar"
    >
      <div className="p-6">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold text-primary" data-testid="app-title">
            YB Patil Hub
          </h1>
          <button
            onClick={onClose}
            className="lg:hidden text-muted-foreground hover:text-foreground"
            data-testid="button-sidebar-close"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <ul className="space-y-2">
          {filteredNavigation.map((item) => {
            const isActive = location === item.href;
            const Icon = item.icon;
            
            return (
              <li key={item.name}>
                <Link href={item.href}>
                  <a
                    className={cn(
                      "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors",
                      isActive
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                    )}
                    onClick={() => window.innerWidth < 1024 && onClose()}
                    data-testid={`link-${item.name.toLowerCase().replace(' ', '-')}`}
                  >
                    <Icon className="w-5 h-5" />
                    {item.name}
                  </a>
                </Link>
              </li>
            );
          })}
          
          {/* Admin Panel - only show for admins */}
          {userProfile?.isAdmin && (
            <>
              <li className="pt-4">
                <div className="h-px bg-border mb-4" />
                <p className="text-xs font-medium text-muted-foreground mb-2 px-4">
                  ADMINISTRATION
                </p>
              </li>
              {adminNavigation.map((item) => {
                const isActive = location === item.href;
                const Icon = item.icon;
                
                return (
                  <li key={item.name}>
                    <Link href={item.href}>
                      <a
                        className={cn(
                          "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors",
                          isActive
                            ? "bg-primary text-primary-foreground"
                            : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                        )}
                        onClick={() => window.innerWidth < 1024 && onClose()}
                        data-testid={`link-${item.name.toLowerCase().replace(' ', '-')}`}
                      >
                        <Icon className="w-5 h-5" />
                        {item.name}
                      </a>
                    </Link>
                  </li>
                );
              })}
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Sidebar;
