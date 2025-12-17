
'use client';

import { useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { PlusCircle, Trash2, Loader2, Clock } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { createTimetableAction } from '@/lib/actions';
import { useToast } from '@/hooks/use-toast';
import { Skeleton } from '@/components/ui/skeleton';
import { Slider } from '../ui/slider';

const timetableFormSchema = z.object({
    subjects: z
        .array(
        z.object({
            value: z.string().min(1, { message: 'Subject cannot be empty.' }),
        })
        )
        .min(1, { message: 'At least one subject is required.' }),
    studyTime: z.object({
        start: z.string().regex(/^(0[1-9]|1[0-2]):[0-5][0-9] (AM|PM)$/, 'Invalid time format. Use HH:MM AM/PM'),
        end: z.string().regex(/^(0[1-9]|1[0-2]):[0-5][0-9] (AM|PM)$/, 'Invalid time format. Use HH:MM AM/PM'),
    }),
    breakPreferences: z.object({
        duration: z.number().min(5).max(60),
        frequency: z.number().min(1).max(5),
    }),
});

type TimetableFormValues = z.infer<typeof timetableFormSchema>;

export function TimetableClient() {
  const [timetable, setTimetable] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<TimetableFormValues>({
    resolver: zodResolver(timetableFormSchema),
    defaultValues: {
      subjects: [{ value: 'Mathematics' }, { value: 'History' }],
      studyTime: {
        start: '09:00 AM',
        end: '05:00 PM',
      },
      breakPreferences: {
        duration: 15,
        frequency: 2,
      }
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'subjects',
  });

  async function onSubmit(values: TimetableFormValues) {
    setIsLoading(true);
    setTimetable(null);

    const input = {
      ...values,
      subjects: values.subjects.map((s) => s.value),
    };

    const result = await createTimetableAction(input);

    if (result.success && result.data) {
      setTimetable(result.data.timetable);
       if (typeof window !== 'undefined') {
        localStorage.setItem('timetable', result.data.timetable);
        window.dispatchEvent(new Event('timetable-updated'));
      }
    } else {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: result.error,
      });
    }

    setIsLoading(false);
  }

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
      <Card className="lg:col-span-1">
        <CardHeader>
          <CardTitle>Your Preferences</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="subjects"
                render={() => (
                  <FormItem>
                    <FormLabel>Subjects</FormLabel>
                    <div className="space-y-2">
                      {fields.map((field, index) => (
                        <div key={field.id} className="flex items-center gap-2">
                          <FormField
                            control={form.control}
                            name={`subjects.${index}.value`}
                            render={({ field }) => (
                              <FormItem className="flex-grow">
                                <FormControl>
                                  <Input placeholder="e.g., Physics" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            onClick={() => remove(index)}
                            disabled={fields.length <= 1}
                          >
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        </div>
                      ))}
                    </div>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => append({ value: '' })}
                    >
                      <PlusCircle className="mr-2 h-4 w-4" />
                      Add Subject
                    </Button>
                    <FormMessage>{form.formState.errors.subjects?.message}</FormMessage>
                  </FormItem>
                )}
              />

              <div className="space-y-4">
                <FormLabel>Study Window</FormLabel>
                <div className="grid grid-cols-2 gap-4">
                    <FormField
                    control={form.control}
                    name="studyTime.start"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Start Time</FormLabel>
                            <FormControl>
                                <Input placeholder="09:00 AM" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                    />
                    <FormField
                    control={form.control}
                    name="studyTime.end"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>End Time</FormLabel>
                            <FormControl>
                                <Input placeholder="05:00 PM" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                    />
                </div>
              </div>
              
              <div className="space-y-4">
                <FormLabel>Break Preferences</FormLabel>
                <FormField
                    control={form.control}
                    name="breakPreferences.duration"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Break Duration: {field.value} minutes</FormLabel>
                            <FormControl>
                                <Slider
                                    min={5}
                                    max={60}
                                    step={5}
                                    value={[field.value]}
                                    onValueChange={(vals) => field.onChange(vals[0])}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                 <FormField
                    control={form.control}
                    name="breakPreferences.frequency"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Break after {field.value} session(s)</FormLabel>
                            <FormControl>
                                <Slider
                                    min={1}
                                    max={5}
                                    step={1}
                                    value={[field.value]}
                                    onValueChange={(vals) => field.onChange(vals[0])}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
              </div>

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : null}
                Generate Timetable
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle>Your Personalized Timetable</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading && (
            <div className="space-y-4">
              <Skeleton className="h-8 w-1/2" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-8 w-1/3 mt-4" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
            </div>
          )}
          {timetable ? (
            <div
              className="prose prose-sm dark:prose-invert max-w-none markdown-content"
              dangerouslySetInnerHTML={{ __html: timetable.replace(/\n/g, '<br />') }}
            />
          ) : !isLoading && (
            <div className="flex h-64 items-center justify-center rounded-lg border border-dashed">
              <div className="text-center text-muted-foreground">
                <Clock className="mx-auto h-12 w-12" />
                <p className="mt-4">Your generated timetable will appear here.</p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
