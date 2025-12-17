import { TimetableClient } from '@/components/timetable/timetable-client';

export default function TimetablePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-headline font-bold tracking-tight">
          AI Timetable Generator
        </h1>
        <p className="text-muted-foreground">
          Craft your perfect study day with a personalized schedule.
        </p>
      </div>
      <TimetableClient />
    </div>
  );
}
