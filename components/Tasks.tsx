"use client";

import React from "react";
import { Checkbox } from "./ui/checkbox";
import UpdateTaskForm from "./UpdateTaskForm";
import DeleteTaskForm from "./DeleteTaskForm";
import moment from "moment";
import UpdateTaskStatus from "./UpdateTaskStatus";
import { cn } from "@/lib/utils";
import AssignUserTaskForm from "./AssignUserTask";
import { User2 } from "lucide-react";

const Tasks = ({
  Tasks,
  loading,
  refetch,
  assignedTasks,
}: {
  Tasks: T_USER_TASK[];
  loading: boolean;
  refetch: () => Promise<void>;
  assignedTasks?: boolean;
}) => {
  return (
    <div>
      {loading ? (
        <div className="py-8">
          <h3 className="text-center font-semibold">loading ...</h3>
        </div>
      ) : Tasks.length > 0 ? (
        <div className="space-y-4">
          <div className="grid grid-cols-1 lg:xl:grid-cols-2 gap-4">
            {Tasks.map((task) => (
              <div
                key={task?.id}
                className={cn(
                  "bg-slate-100 p-4 rounded-lg shadow flex items-center gap-4 hover:bg-slate-100 transition-all duration-300",
                  {
                    "bg-gray-50 hover:bg-gray-50": task.isCompleted,
                  }
                )}
              >
                <UpdateTaskStatus
                  isCompleted={task.isCompleted}
                  id={task.id}
                  refetch={refetch}
                />

                <div className="w-4/6">
                  <h3
                    className={cn("font-semibold", {
                      "line-through": task.isCompleted,
                    })}
                  >
                    {task.name}
                  </h3>
                  <p
                    className={cn("text-sm text-gray-600", {
                      "line-through": task.isCompleted,
                    })}
                  >
                    {task.description}
                  </p>

                  <div className="pt-2 flex items-center gap-4">
                    {task?.user && (
                      <div className="flex items-center gap-1">
                        <User2 className="text-gray-500 size-4" />

                        <p className="text-sm text-gray-500">{task?.user}</p>
                      </div>
                    )}

                    <p className="text-xs text-gray-500">
                      @ {moment(task.createdAt).fromNow()}
                    </p>
                  </div>
                </div>

                {!assignedTasks && (
                  <div className="w-2/6 space-y-2">
                    <AssignUserTaskForm refetch={refetch} taskId={task.id} />

                    <div className="flex items-center gap-4 justify-start">
                      {!task.isCompleted && (
                        <UpdateTaskForm
                          name={task.name}
                          description={task.description!}
                          id={task.id}
                          refetch={refetch}
                        />
                      )}

                      <DeleteTaskForm id={task.id} refetch={refetch} />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="py-8">
          <h3 className="text-center font-semibold">No tasks currently</h3>
        </div>
      )}
    </div>
  );
};

export default Tasks;
