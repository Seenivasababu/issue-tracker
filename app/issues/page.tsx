import React from 'react';
import { Button, Table, TableColumnHeaderCell } from '@radix-ui/themes';
import Link from 'next/link';
import prisma from '@/prisma/client';
import IssueStatusBadge from '../components/IssueStatusBadge';
import IssueStatusFilter from './IssueStatusFilter';
import { Status, Issue } from '@prisma/client';
import NextLink from 'next/link';
import { ArrowUpIcon } from '@radix-ui/react-icons';

interface Props {
  searchParams: { status: Status , orderBy: keyof Issue};
}

const IssuePage = async ({ searchParams }: Props) => {
  const columns: {
    label: string;
    value: keyof Issue;
    className?: string;
  }[] = [
    {
      label: 'Issue',
      value: 'title',
    },
    {
      label: 'Status',
      value: 'status',
      className: 'hidden md:table-cell',
    },
    {
      label: 'Created',
      value: 'createdAt',
      className: 'hidden md:table-cell',
    },
  ];
  const statuses = Object.values(Status);
  const status = statuses.includes(searchParams.status)
    ? searchParams.status
    : undefined;
  const where = { status };

  const issues = await prisma.issue.findMany({
    where,
  });

  return (
    <div>
      <div className="flex mb-5 space-x-3">
        <IssueStatusFilter />
        <Button>
          <Link href="issues/new">New Issue</Link>
        </Button>
      </div>
      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            {columns.map((column) => (
              <TableColumnHeaderCell key={column.value}>
                <NextLink
                  href={{
                    query: { ...searchParams, orderBy: column.value },
                  }}
                >
                  {column.label}
                </NextLink>
                {column.value === searchParams.orderBy && <ArrowUpIcon className="inline"/>}
              </TableColumnHeaderCell>
            ))}
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {issues.map((issue) => (
            <Table.Row key={issue.id}>
              <Table.Cell>
                <Link href={`/issues/${issue.id}`}> {issue.title} </Link>
                {issue.title}
                <div className="block md:hidden">
                  <IssueStatusBadge status={issue.status} />{' '}
                </div>
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                <IssueStatusBadge status={issue.status} />
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                {issue.createdAt.toDateString()}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </div>
  );
};

export default IssuePage;
