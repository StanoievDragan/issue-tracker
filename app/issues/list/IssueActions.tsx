import React from 'react';
import {Button, Flex} from "@radix-ui/themes";
import Link from "next/link";
import IssueStatusFilter from "@/app/issues/list/IssueStatusFilter";

const IssueActions = () => {
    return (
        <Flex mb={"5"} justify={"between"}>
            <IssueStatusFilter></IssueStatusFilter>
            <Button>
                <Link href={"/issues/new"}>New issue</Link>
            </Button>
        </Flex>
    );
};

export default IssueActions;