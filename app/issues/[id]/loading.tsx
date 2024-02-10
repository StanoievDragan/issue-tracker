import {Box, Card, Flex} from "@radix-ui/themes";
import {Skeleton} from '@/app/components';


const LoadingIssueDetailPage = () => {
    return (
        <Box className={'max-w-xl'}>
            <Skeleton></Skeleton>
            <Flex className={'gap-3'} my={"2"}>
                <Skeleton width={'5rem'}></Skeleton>
                <Skeleton width={'8rem'}></Skeleton>
            </Flex>
            <Card className={'prose mt-4'}>
                <Skeleton count={3}></Skeleton>
            </Card>
        </Box>
    );
};

export default LoadingIssueDetailPage;