
import { AppShell } from '@/components/layout/app-shell';

export default function QuizLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AppShell>{children}</AppShell>;
}
