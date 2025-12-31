
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { BrainCircuit, CalendarCheck, FileQuestion, Clock } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const features = [
  {
    name: 'AI Tutor',
    description: 'Get instant, personalized help with complex topics. Our AI tutor is available 24/7 to answer your questions.',
    icon: BrainCircuit,
    image: PlaceHolderImages.find(img => img.id === 'physics-video'),
  },
  {
    name: 'Adaptive Quizzes',
    description: 'Test your knowledge with quizzes that adapt to your skill level, helping you identify strengths and weaknesses.',
    icon: FileQuestion,
    image: PlaceHolderImages.find(img => img.id === 'calculus-notes'),
  },
  {
    name: 'Study Planner',
    description: 'Generate a personalized study plan based on your exams, subjects, and available time. Stay organized and on track.',
    icon: CalendarCheck,
    image: PlaceHolderImages.find(img => img.id === 'literature-summary'),
  },
  {
    name: 'Timetable Generator',
    description: 'Create the perfect daily schedule. Our AI balances your study sessions, subjects, and breaks for maximum productivity.',
    icon: Clock,
    image: PlaceHolderImages.find(img => img.id === 'history-article'),
  },
];


export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Image src="/logo.svg" alt="AILAC Logo" width={32} height={32} className="text-primary" />
          <h1 className="text-2xl font-headline font-bold">AILAC</h1>
        </div>
        <Button asChild>
          <Link href="/dashboard">Get Started</Link>
        </Button>
      </header>

      <main className="flex-1">
        <section className="py-20 md:py-32 bg-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl md:text-6xl font-headline font-bold mb-4">
              Your Personal AI Study Partner
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Struggling to keep up? AILAC creates personalized study plans, generates adaptive quizzes, and provides instant tutoring to help you achieve academic success.
            </p>
            <Button size="lg" asChild>
              <Link href="/dashboard">Start Learning for Free</Link>
            </Button>
          </div>
        </section>

        <section className="py-20 md:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h3 className="text-3xl md:text-4xl font-headline font-bold">Everything You Need to Succeed</h3>
              <p className="text-muted-foreground mt-2">All your study tools, powered by AI, in one place.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature) => (
                <Card key={feature.name} className="flex flex-col text-center items-center">
                  <CardHeader>
                    <div className="mx-auto bg-primary/10 p-3 rounded-full">
                       <feature.icon className="h-8 w-8 text-primary" />
                    </div>
                    <CardTitle>{feature.name}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <p className="text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
        
        <section className="bg-background py-20">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <h3 className="text-3xl md:text-4xl font-headline font-bold mb-4">Ready to Ace Your Exams?</h3>
                <p className="text-muted-foreground mb-8">Stop struggling and start studying smarter today.</p>
                <Button size="lg" asChild>
                    <Link href="/dashboard">Get Started Now</Link>
                </Button>
            </div>
        </section>
      </main>

      <footer className="py-6 border-t">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} AILAC. All rights reserved.</p>
          <p className="text-xs mt-2">Designed by Jiwin</p>
        </div>
      </footer>
    </div>
  );
}
