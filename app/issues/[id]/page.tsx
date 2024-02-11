import {notFound} from "next/navigation";
import prisma from "@/prisma/client";
import {Box, Flex, Grid} from "@radix-ui/themes";
import delay from "delay";
import EditIssueButton from "@/app/issues/[id]/EditIssueButton";
import IssueDetails from "@/app/issues/[id]/IssueDetails";
import DeleteIssueButton from "@/app/issues/[id]/DeleteIssueButton";
import {getServerSession} from "next-auth";
import authOptions from "@/app/api/auth/authOptions";
import AssigneeSelect from "@/app/issues/[id]/AssigneeSelect";


interface Props {
    params: { id: string }
}

const IssueDetailPage = async ({params}: Props) => {
    const session = await getServerSession(authOptions)

    if (isNaN(parseInt(params.id))) notFound();


    const issue = await prisma.issue.findUnique({
        where: {id: parseInt(params.id)}
    })

    if (!issue)
        notFound();



    return (
        <Grid columns={{initial: '1', md: '5'}} gap={'5'}>
            <Box className={'md:col-span-4'}>
                <IssueDetails issue={issue}></IssueDetails>
            </Box>
            {session && (
                <Box>
                <Flex direction={'column'} gap={'4'}>
                    <AssigneeSelect issue={issue}></AssigneeSelect>
                    <EditIssueButton issueId={issue.id}></EditIssueButton>
                    <DeleteIssueButton issueId={issue.id}></DeleteIssueButton>
                </Flex>
            </Box>
            )}
        </Grid>
    );
};

export default IssueDetailPage;