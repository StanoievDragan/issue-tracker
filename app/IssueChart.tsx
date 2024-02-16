'use client'
import React from 'react';
import {Card} from "@radix-ui/themes";
import {ResponsiveContainer, BarChart, XAxis, YAxis, Bar} from "recharts";

interface Props {
    open: number;
    inProgress: number;
    closed: number;
}

const IssueChart = ({open, inProgress, closed}: Props) => {
    const data = [
        {label: "Open", value: open},
        {label: "In Progress", value: inProgress},
        {label: "Closed", value: closed},
    ]

    const error = console.error; // temporary solution for default props
    console.error = (...args: any) => {
        if (/defaultProps/.test(args[0])) return;
        error(...args);
    };

    return (
        <Card>
            <ResponsiveContainer width={"100%"} height={300}>
                <BarChart data={data}>
                    <XAxis dataKey={"label"}></XAxis>
                    <YAxis></YAxis>
                    <Bar dataKey={"value"} barSize={60} style={{fill: 'var(--accent-9)'}}></Bar>
                </BarChart>
            </ResponsiveContainer>
        </Card>
    );
};

export default IssueChart;