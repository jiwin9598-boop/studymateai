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
  Bell,
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

  React.useEffect(() => {
    if (typeof window !== 'undefined' && 'Notification' in window && Notification.permission === 'default') {
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
            <h1 className="text-xl font-headline font-bold">AILAC</h1>
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
            <p className='text-sm text-muted-foreground'>Enjoy your studies!</p>
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
              {menuItems.find((item) => item.href === pathname)?.label || 'AILAC'}
            </h2>
          </div>
          <div>
            <Button variant="ghost" size="icon">
              <Bell className="h-5 w-5" />
              <span className="sr-only">Notifications</span>
            </Button>
          </div>
        </header>
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <NotificationScheduler />
          {children}
        </main>
        <footer className="py-4 px-6 border-t text-center text-xs text-muted-foreground">
            <p>Designed by Jiwin</p>
        </footer>
      </SidebarInset>
    </SidebarProvider>
  );
}
