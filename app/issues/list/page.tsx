import React from 'react';
import { Table } from '@radix-ui/themes';
import { IssueStatusBadge, Link } from '@/app/components';
import prisma from "@/prisma/client";
import { Issue, Status } from "@prisma/client";
import NextLink from "next/link";
import {ArrowDownIcon, ArrowUpIcon} from "@radix-ui/react-icons";
import IssueActions from "@/app/issues/list/IssueActions";

interface Props {
    searchParams: { status: Status; orderBy: keyof Issue; page: string; order?: 'asc' | 'desc' };
}


const IssuesPage = async ({ searchParams }: Props) => {
    const columns: {
        label: string;
        value: keyof Issue;
        className?: string;
    }[] = [
        { label: 'Issue', value: 'title' },
        { label: 'Status', value: 'status', className: "hidden md:table-cell" },
        { label: 'Created', value: 'createdAt', className: "hidden md:table-cell" }
    ];

    const statuses = Object.values(Status);
    const status = statuses.includes(searchParams.status) ? searchParams.status : undefined;

    const orderBy = columns
        .map(column => column.value)
        .includes(searchParams.orderBy)
        ? { [searchParams.orderBy]: searchParams.order === 'asc' ? 'desc' : 'asc' }
        : undefined;

    const where = { status };

    const issues = await prisma.issue.findMany({
        where,
        orderBy,
    });

    return (
        <div>
            <IssueActions></IssueActions>
            <Table.Root variant={'surface'}>
                <Table.Header>
                    <Table.Row>
                        {columns.map(column => (
                            <Table.ColumnHeaderCell key={column.value} className={column.className}>
                                <NextLink href={{
                                    query: { ...searchParams, orderBy: column.value, order: (searchParams.orderBy === column.value && searchParams.order === 'asc') ? 'desc' : 'asc' }
                                }}>
                                    {column.label}
                                    {column.value === searchParams.orderBy && (
                                        <>
                                            {searchParams.order === 'asc' ? (
                                                <ArrowUpIcon className={"inline"} />
                                            ) : (
                                                <ArrowDownIcon className={"inline"} />
                                            )}
                                        </>
                                    )}
                                </NextLink>
                            </Table.ColumnHeaderCell>
                        ))}
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {issues.map(issue => (
                        <Table.Row key={issue.id}>
                            <Table.Cell>
                                <Link href={`/issues/${issue.id}`}>
                                    {issue.title}
                                </Link>
                                <div className={'block md:hidden'}><IssueStatusBadge status={issue.status} /></div>
                            </Table.Cell>
                            <Table.Cell className={'hidden md:table-cell'}><IssueStatusBadge
                                status={issue.status} /></Table.Cell>
                            <Table.Cell className={'hidden md:table-cell'}>{issue.createdAt.toDateString()}</Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table.Root>
        </div>
    );
};

export const dynamic = 'force-dynamic';

export default IssuesPage;
