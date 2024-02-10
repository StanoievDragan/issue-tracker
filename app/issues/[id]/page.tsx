import {notFound} from "next/navigation";
import prisma from "@/prisma/client";
import {Box, Button, Card, Flex, Grid, Heading, Text} from "@radix-ui/themes";
import IssueStatusBadge from "@/app/components/IssueStatusBadge";
import ReactMarkDown from 'react-markdown';
import delay from "delay";
import {Pencil2Icon} from "@radix-ui/react-icons";
import Link from "next/link";


interface Props {
    params: { id: string }
}

const IssueDetailPage = async ({params}: Props) => {
    if (isNaN(parseInt(params.id))) notFound();


    const issue = await prisma.issue.findUnique({
        where: {id: parseInt(params.id)}
    })

    if (!issue)
        notFound();

    await delay(2000)

    return (
        <Grid columns={{initial: '1', md: '2'}} gap={'5'}>
            <Box>
            <Heading>{issue.title}</Heading>
            <Flex className={'gap-3'} my={"2"}>
                <IssueStatusBadge status={issue.status}/>
                <Text>{issue.createdAt.toDateString()}</Text>
            </Flex>
            <Card className={'prose mt-4'}>
                <ReactMarkDown>{issue.description}</ReactMarkDown>
            </Card>
            </Box>
            <Box>
                <Button>
                    <Pencil2Icon></Pencil2Icon>
                    <Link href={`/issues/${issue.id}/edit`}>Edit Issue</Link>
                </Button>
            </Box>
        </Grid>
    );
};

export default IssueDetailPage;