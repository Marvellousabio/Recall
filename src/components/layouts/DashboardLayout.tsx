import { Link, useLocation } from 'react-router-dom';
import { Brain, Home, Upload, BookOpen, MessageSquare, FileText, BarChart3, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useAuth } from '@/contexts/AuthContext';
import { useDashboardShortcuts } from '@/hooks/use-keyboard-shortcuts';
import { KeyboardShortcutsDialog } from '@/components/common/KeyboardShortcutsDialog';
import { useState, type ReactNode } from 'react';

interface DashboardLayoutProps {
  children: ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const location = useLocation();
  const { profile, signOut } = useAuth();
  const [open, setOpen] = useState(false);
  
  useDashboardShortcuts();

  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: Home },
    { name: 'Upload', href: '/dashboard/upload', icon: Upload },
    { name: 'Flashcards', href: '/dashboard/flashcards', icon: BookOpen },
    { name: 'AI Tutor', href: '/dashboard/tutor', icon: MessageSquare },
    { name: 'Exam Mode', href: '/dashboard/exam', icon: FileText },
    { name: 'Analytics', href: '/dashboard/analytics', icon: BarChart3 },
  ];

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      <div className="p-6 border-b border-sidebar-border">
        <Link to="/" className="flex items-center gap-2">
          <Brain className="h-6 w-6 text-sidebar-primary" />
          <span className="font-heading text-lg font-bold text-sidebar-foreground">Project Recall</span>
        </Link>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        {navigation.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.href;
          return (
            <Link
              key={item.name}
              to={item.href}
              onClick={() => setOpen(false)}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                isActive
                  ? 'bg-sidebar-accent text-sidebar-accent-foreground'
                  : 'text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
              }`}
            >
              <Icon className="h-5 w-5" />
              <span className="text-sm font-medium">{item.name}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-sidebar-border">
        <div className="flex items-center gap-3 mb-4">
          <div className="h-10 w-10 rounded-full bg-sidebar-accent flex items-center justify-center">
            <span className="text-sm font-semibold text-sidebar-accent-foreground">
              {profile?.username?.[0]?.toUpperCase() || 'U'}
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-sidebar-foreground truncate">{profile?.username}</p>
            <p className="text-xs text-sidebar-foreground/60">{profile?.role}</p>
          </div>
        </div>
        <Button variant="ghost" size="sm" className="w-full text-sidebar-foreground hover:bg-sidebar-accent" onClick={() => signOut()}>
          Sign Out
        </Button>
      </div>
    </div>
  );

  return (
    <div className="flex min-h-screen w-full">
      <KeyboardShortcutsDialog />
      
      <aside className="hidden md:flex w-64 shrink-0 flex-col bg-sidebar border-r border-sidebar-border">
        <SidebarContent />
      </aside>

      <div className="flex-1 min-w-0 flex flex-col">
        <header className="md:hidden sticky top-0 z-40 border-b border-border bg-background">
          <div className="flex items-center justify-between p-4">
            <Link to="/" className="flex items-center gap-2">
              <Brain className="h-6 w-6 text-primary" />
              <span className="font-heading text-lg font-bold">Project Recall</span>
            </Link>
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-64 p-0 bg-sidebar">
                <SidebarContent />
              </SheetContent>
            </Sheet>
          </div>
        </header>

        <main className="flex-1 overflow-x-hidden">
          {children}
        </main>
      </div>
    </div>
  );
}
