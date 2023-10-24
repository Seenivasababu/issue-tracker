'use client';
import React, { useState } from 'react';
import { TextField, Button, Callout, Text } from '@radix-ui/themes';
import SimpleMDE from 'react-simplemde-editor';
import 'easymde/dist/easymde.min.css';
import { useForm, Controller } from 'react-hook-form';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { createIssueScheme } from '@/app/validationSchema';
import {z} from 'zod'

type IssueForm = z.infer<typeof createIssueScheme>

const NewIssuePage = () => {
  const { register, control, handleSubmit,formState:{errors} } = useForm<IssueForm>({
    resolver : zodResolver(createIssueScheme)
  });
  const router = useRouter();
  const [error, setError] = useState('');

  return (
    <div className='max-w-xl '>
      {error && (
        <Callout.Root color="red" className='mb-5'>
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      <form
        className="space-y-4"
        onSubmit={handleSubmit(async (data) => {
          try {
            await axios.post('/api/issues', data);
            router.push('/issues');
          } catch (error) {
            setError('An unexpected error occured');
          }
        })}
      >
        <TextField.Root>
          <TextField.Input placeholder="Title" {...register('title')} />
        </TextField.Root>
        {errors.title && <Text color='red' as='p'>{errors.title.message}</Text>}
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <SimpleMDE placeholder="Description" {...field} />
          )}
        />
        {errors.description && <Text color='red' as='p'>{errors.description.message}</Text>}

        <Button> Submit New Issue</Button>
      </form>
    </div>
  );
};

export default NewIssuePage;
