
import { ProfileClient } from '@/components/profile/profile-client';

export default function ProfilePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-headline font-bold tracking-tight">
          Your Profile
        </h1>
        <p className="text-muted-foreground">
          Manage your subjects and track your academic progress.
        </p>
      </div>
      <ProfileClient />
    </div>
  );
}
