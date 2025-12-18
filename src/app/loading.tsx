import { GraduationCap } from 'lucide-react';

export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-background z-[100]">
      <div className="flex flex-col items-center gap-4">
        <div className="relative">
          <GraduationCap className="h-20 w-20 text-primary" />
          <div className="absolute inset-0 rounded-full border-4 border-primary/50 animate-ping"></div>
        </div>
        <p className="text-lg text-muted-foreground">Loading AILAC...</p>
      </div>
    </div>
  );
}
