
import { AppShell } from '@/components/layout/app-shell';

export default function TimetableLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AppShell>{children}</AppShell>;
}
