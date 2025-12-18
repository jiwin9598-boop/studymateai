
import { AppShell } from '@/components/layout/app-shell';

export default function TutorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AppShell>{children}</AppShell>;
}
