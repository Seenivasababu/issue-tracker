import Image from 'next/image'
import LatestIssues from './LatestIssue'
import IssueSummary from './IssueSummary'
import prisma from '@/prisma/client';
import { Flex } from '@radix-ui/themes'
import IssueChart from './IssueChart';

export default async function Home() {

  const open = await prisma.issue.count({
    where: { status: 'OPEN' },
  });
  const inProgress = await prisma.issue.count({
    where: { status: 'IN_PROGRESS' },
  });
  const closed = await prisma.issue.count({
    where: { status: 'CLOSED' },
  });
  return (
    <main className="">
      <Flex direction='column' gap='3'>

      
      <IssueSummary open={open} inProgress={inProgress} closed={closed}/>
      <IssueChart open={open} inProgress={inProgress} closed={closed}/>
      <LatestIssues/>
      </Flex>
    </main>
  )
}
