import React from 'react';
import {Status, Issue} from "@prisma/client";
import {Badge} from "@radix-ui/themes";

const statusMap: Record<Status, {label: String, color: 'red' | 'green' | 'violet'}> = {
    OPEN: {label: 'Open', color: 'red'},
    IN_PROGRESS: {label: 'In Progress', color: 'violet'},
    CLOSED: {label: 'Closed', color: 'green'}

}
const IssueStatusBadge = ({status}: { status: Status }) => {
    return (
        <Badge color={statusMap[status].color}>
            {statusMap[status].label}
        </Badge>
    );
};

export default IssueStatusBadge;