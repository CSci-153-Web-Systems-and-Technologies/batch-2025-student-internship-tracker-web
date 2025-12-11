import { Suspense } from "react";
import { Spinner } from "@/components/ui/shadcn-io/spinner";
import TaskDetailData from "./_components/TaskDetailData"

export default async function TaskDetailPage(props: {
  params: Promise<{ task_id: string}>
}) {
  const { task_id} = await props.params;

  return (
    <Suspense fallback={<div><Spinner /></div>}>
      <TaskDetailData task_id={task_id} />
    </Suspense>
  );
}