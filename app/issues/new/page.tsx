import dynamic from "next/dynamic";
import {Skeleton} from "@/app/components";
import IssueFormSkeleton from "@/app/issues/_components/IssueFormSkeleton";

const IssueForm = dynamic(
    () => import('@/app/issues/_components/IssueForm'),
    {ssr: false,
    loading: () => <IssueFormSkeleton></IssueFormSkeleton>});

const NewIssuePage = () => {
    return (
        <div>
            <IssueForm></IssueForm>
        </div>
    );
};

export default NewIssuePage;