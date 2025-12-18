'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  BrainCircuit,
  CalendarCheck,
  FileQuestion,
  GraduationCap,
  LayoutDashboard,
  Library,
  User,
  Clock,
  LogOut,
} from 'lucide-react';
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarInset,
  SidebarTrigger,
  SidebarFooter,
  SidebarSeparator,
} from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { NotificationScheduler } from '../notifications/notification-scheduler';
import { useUser } from '@/firebase';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Skeleton } from '../ui/skeleton';

const menuItems = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/tutor', label: 'AI Tutor', icon: BrainCircuit },
  { href: '/quiz', label: 'Quiz Generator', icon: FileQuestion },
  { href: '/planner', label: 'Study Planner', icon: CalendarCheck },
  { href: '/timetable', label: 'Timetable', icon: Clock },
  { href: '/library', label: 'Resource Library', icon: Library },
  { href: '/profile', label: 'Profile', icon: User },
];

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { toast } = useToast();
  const { user, auth, loading } = useUser();

  React.useEffect(() => {
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission().then(permission => {
        if (permission === 'granted') {
          toast({
            title: 'Notifications Enabled',
            description: 'You will now receive reminders for your study sessions.',
          });
        }
      });
    }
  }, [toast]);

  const handleSignOut = async () => {
    if (auth) {
      await auth.signOut();
      toast({
        title: 'Signed Out',
        description: 'You have been successfully signed out.',
      });
    }
  };

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader className="p-4">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="text-primary hover:bg-primary/10" asChild>
              <Link href="/dashboard">
                <GraduationCap className="h-7 w-7" />
              </Link>
            </Button>
            <h1 className="text-xl font-headline font-bold">StudyMate AI</h1>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            {menuItems.map((item) => (
              <SidebarMenuItem key={item.href}>
                <SidebarMenuButton
                  asChild
                  isActive={pathname === item.href}
                  className={cn(
                    'justify-start',
                    pathname === item.href && 'bg-sidebar-accent'
                  )}
                  tooltip={{
                    children: item.label,
                    className: 'bg-background text-foreground',
                  }}
                >
                  <Link href={item.href}>
                    <item.icon />
                    <span>{item.label}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter>
          <SidebarSeparator />
           <div className="flex items-center gap-3 p-4">
            {loading ? (
              <>
                <Skeleton className="h-10 w-10 rounded-full" />
                <Skeleton className="h-4 w-24" />
              </>
            ) : user ? (
              <>
                <Avatar className='h-10 w-10'>
                  <AvatarImage src={user.photoURL || ''} alt={user.displayName || 'User'} />
                  <AvatarFallback>
                    {user.displayName ? user.displayName[0] : <User />}
                  </AvatarFallback>
                </Avatar>
                <div className='flex-1 overflow-hidden'>
                    <p className='truncate text-sm font-medium'>{user.displayName || 'Anonymous User'}</p>
                    <p className='truncate text-xs text-muted-foreground'>{user.email}</p>
                </div>
              </>
            ) : (
                <p>Not signed in</p>
            )}
          </div>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <header className="flex h-14 items-center justify-between border-b bg-card/50 px-4 backdrop-blur-sm md:px-6">
          <div className="md:hidden">
            <SidebarTrigger />
          </div>
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-lg font-semibold">
              {menuItems.find((item) => item.href === pathname)?.label || 'StudyMate AI'}
            </h2>
          </div>
          <div>
            <Button variant="ghost" size="icon" onClick={handleSignOut}>
              <LogOut className="h-5 w-5" />
              <span className="sr-only">Sign Out</span>
            </Button>
          </div>
        </header>
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <NotificationScheduler />
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
