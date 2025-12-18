'use client';

import { useState } from 'react';
import { useAuth } from '@/firebase';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { GraduationCap, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

function GoogleIcon(props: React.ComponentProps<'svg'>) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid" viewBox="0 0 256 262" {...props}>
            <path fill="#4285F4" d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.686H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c22.688-21.438 35.891-53.92 35.891-91.018z" />
            <path fill="#34A853" d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.186-.645 1.911C46.37 223.783 84.594 261.1 130.55 261.1z" />
            <path fill="#FBBC05" d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.695.438C5.044 86.627 0 107.533 0 130.55s5.044 43.923 13.565 58.798l42.716-33.026z" />
            <path fill="#EB4335" d="M130.55 50.479c24.514 0 41.05 10.582 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 84.594 0 46.37 37.317 13.565 71.751l42.716 33.026c10.445-31.477 39.746-54.25 74.269-54.25z" />
        </svg>
    );
}

export function LoginForm() {
  const auth = useAuth();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      toast({
        title: 'Sign In Successful',
        description: 'Welcome back!',
      });
    } catch (error: any) {
      console.error(error);
      toast({
        variant: 'destructive',
        title: 'Sign In Failed',
        description: error.message || 'An unknown error occurred.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-sm">
      <CardHeader className="text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
            <GraduationCap className="h-8 w-8" />
        </div>
        <CardTitle className="text-2xl font-headline">Welcome to StudyMate AI</CardTitle>
        <CardDescription>Sign in to access your personalized study dashboard.</CardDescription>
      </CardHeader>
      <CardContent>
        <Button onClick={handleGoogleSignIn} disabled={isLoading} className="w-full">
          {isLoading ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <GoogleIcon className="mr-2 h-4 w-4" />
          )}
          Sign in with Google
        </Button>
      </CardContent>
    </Card>
  );
}
