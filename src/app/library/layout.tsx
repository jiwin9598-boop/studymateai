
import { AppShell } from '@/components/layout/app-shell';

export default function LibraryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AppShell>{children}</AppShell>;
}
