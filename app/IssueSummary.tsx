import { Status } from '@prisma/client';
import React from 'react';
import { Card, Flex, Link, Text } from '@radix-ui/themes';

interface Props {
  open: number;
  inProgress: number;
  closed: number;
}

const IssueSummary = ({ open, inProgress, closed }: Props) => {
  const containers: {
    label: string;
    value: number;
    status: Status;
  }[] = [
    { label: 'Open Issue', value: open, status: 'OPEN' },
    { label: 'In-progress Issues', value: inProgress, status: 'IN_PROGRESS' },
    { label: 'Closed Issues', value: closed, status: 'CLOSED' },
  ];

  return <Flex gap='4'>
   {
      containers.map(container=>(
         <Card key={container.label}>
            <Flex direction='column' gap='1'>
            <Link
              className='text-sm font-medium'
              href={`/issues/?status=${container.status}`}
            >
              {container.label}
              </Link>
              <Text size="5" className='font-bold' >{container.value}</Text>
            
            </Flex>
         </Card>
      ))
   }
  </Flex>;
};

export default IssueSummary;
