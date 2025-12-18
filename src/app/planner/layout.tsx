
import { AppShell } from '@/components/layout/app-shell';

export default function PlannerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AppShell>{children}</AppShell>;
}
