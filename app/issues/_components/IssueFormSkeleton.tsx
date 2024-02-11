import React from 'react';
import {Skeleton} from "@/app/components";
import {Box} from "@radix-ui/themes";

const IssueFormSkeleton = () => {
    return (
        <Box className={"max-w-xl"}>
            <Skeleton height={'2rem'}></Skeleton>
            <Skeleton height={'20rem'}></Skeleton>
        </Box>
    );
};

export default IssueFormSkeleton;