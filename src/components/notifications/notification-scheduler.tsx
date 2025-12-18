'use client';

import { useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';

export function NotificationScheduler() {
  const { toast } = useToast();

  const scheduleNotifications = () => {
    if (typeof window === 'undefined' || !('Notification' in window) || Notification.permission !== 'granted') {
      return;
    }

    const timetableMarkdown = localStorage.getItem('timetable');
    if (!timetableMarkdown) return;
    
    // Clear previously scheduled notifications if any
    const scheduled = JSON.parse(localStorage.getItem('scheduled-notifications') || '[]');
    scheduled.forEach((id: number) => clearTimeout(id));
    localStorage.removeItem('scheduled-notifications');

    const newScheduledIds: number[] = [];

    const lines = timetableMarkdown.split('<br />');
    const now = new Date();

    lines.forEach(line => {
      // Example line: | 09:00 AM - 10:00 AM | Mathematics |
      const match = line.match(/\| (.*?) - .*? \| (.*?) \|/);
      if (match) {
        const startTimeStr = match[1].trim();
        const subject = match[2].trim();

        if (subject.toLowerCase().includes('break') || subject.toLowerCase().includes('lunch')) {
            return;
        }

        try {
          const timeParts = startTimeStr.match(/(\d+):(\d+) (AM|PM)/);
          if (!timeParts) return;

          let hours = parseInt(timeParts[1], 10);
          const minutes = parseInt(timeParts[2], 10);
          const ampm = timeParts[3];

          if (ampm === 'PM' && hours < 12) {
            hours += 12;
          }
          if (ampm === 'AM' && hours === 12) { // Midnight case
            hours = 0;
          }

          const notificationTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hours, minutes, 0);

          const timeUntilNotification = notificationTime.getTime() - now.getTime();
          
          if (timeUntilNotification > 0) {
            const timeoutId = setTimeout(() => {
              if ('Notification' in window && Notification.permission === 'granted') {
                new Notification('Study Session Starting!', {
                  body: `It's time to study ${subject}.`,
                  icon: '/logo.svg', // Optional: you can add an icon
                });
              }
            }, timeUntilNotification);
            newScheduledIds.push(timeoutId as unknown as number);
          }
        } catch (e) {
            console.error("Could not schedule notification", e);
        }
      }
    });

    localStorage.setItem('scheduled-notifications', JSON.stringify(newScheduledIds));
    if (newScheduledIds.length > 0) {
        toast({
            title: "Timetable Set!",
            description: `You have ${newScheduledIds.length} study sessions scheduled for today.`
        })
    }
  };

  useEffect(() => {
    if (typeof window !== 'undefined' && 'Notification' in window) {
      scheduleNotifications(); // Schedule on initial load
      window.addEventListener('timetable-updated', scheduleNotifications);
    }

    return () => {
      if (typeof window !== 'undefined' && 'Notification' in window) {
        window.removeEventListener('timetable-updated', scheduleNotifications);
      }
    };
  }, []);

  return null; // This component does not render anything
}
