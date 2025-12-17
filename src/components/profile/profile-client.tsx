
'use client';

import { useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { PlusCircle, Trash2, Loader2, Save } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Separator } from '../ui/separator';

const profileFormSchema = z.object({
  subjects: z
    .array(
      z.object({
        name: z.string().min(1, { message: 'Subject name cannot be empty.' }),
        mark: z.coerce
          .number()
          .min(0, { message: 'Mark must be at least 0.' })
          .max(100, { message: 'Mark cannot exceed 100.' }),
      })
    )
    .min(1, { message: 'At least one subject is required.' }),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

// Mock data, later we'll replace this with a global state
const initialSubjects = [
    { name: 'Math', mark: 85 },
    { name: 'History', mark: 72 },
    { name: 'Science', mark: 91 },
    { name: 'Literature', mark: 65 },
    { name: 'Coding', mark: 78 },
];


export function ProfileClient() {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      subjects: initialSubjects,
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'subjects',
  });

  async function onSubmit(values: ProfileFormValues) {
    setIsLoading(true);
    
    // Here you would typically save the data to a backend or global state
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log(values);

    toast({
      title: 'Profile Saved',
      description: 'Your subjects and marks have been updated.',
    });
    
    setIsLoading(false);
  }

  return (
    <Card>
        <CardHeader>
          <CardTitle>Your Subjects</CardTitle>
          <CardDescription>
            Add your subjects and current marks (out of 100) to see them on your dashboard.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="space-y-4">
                {fields.map((field, index) => (
                  <div key={field.id} className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start">
                    <FormField
                      control={form.control}
                      name={`subjects.${index}.name`}
                      render={({ field }) => (
                        <FormItem className="md:col-span-2">
                          <FormLabel>Subject</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g., Physics" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`subjects.${index}.mark`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Mark (%)</FormLabel>
                          <div className="flex items-center gap-2">
                            <FormControl>
                                <Input type="number" placeholder="e.g., 88" {...field} />
                            </FormControl>
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
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                ))}
              </div>
              <Separator />
              <div className="flex justify-between">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => append({ name: '', mark: 0 })}
                >
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Add Subject
                </Button>
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : <Save className="mr-2 h-4 w-4" />}
                  Save Changes
                </Button>
              </div>
              <FormMessage>{form.formState.errors.subjects?.message}</FormMessage>
            </form>
          </Form>
        </CardContent>
      </Card>
  );
}
