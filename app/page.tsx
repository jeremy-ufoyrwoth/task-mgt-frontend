"use client";

import Navbar from "@/components/Navbar";
import TaskComponent from "@/components/Tasks";
import { useFetch } from "@/lib";
import { useAuthStore } from "@/store/auth.store";
import React from "react";

const Home = () => {
  const { User } = useAuthStore();

  const { data, loading, refetch } = useFetch<I_USER_TASK_FETCH>(
    `/users/${User?.id}/tasks`
  );

  const Tasks = data?.data || null;

  return (
    <main className="min-h-screen">
      <div className="m-auto w-[90%] lg:xl:w-[70%] space-y-8">
        <Navbar refetch={refetch} />

        {User ? (
          <div className="space-y-8">
            <div className="space-y-2">
              <h3 className="font-semibold">Your Tasks</h3>

              <TaskComponent
                Tasks={Tasks?.usersTasks || []}
                loading={loading}
                refetch={refetch}
              />
            </div>

            {Tasks?.usersAssignedTasks &&
              Tasks?.usersAssignedTasks?.length > 0 && (
                <div className="space-y-2">
                  <h3 className="font-semibold">Assigned Tasks</h3>

                  <TaskComponent
                    Tasks={Tasks?.usersAssignedTasks || []}
                    loading={loading}
                    refetch={refetch}
                    assignedTasks={true}
                  />
                </div>
              )}
          </div>
        ) : (
          <div className="py-8">
            <h3 className="text-center font-semibold">
              Sign In to view your tasks
            </h3>
          </div>
        )}
      </div>
    </main>
  );
};

export default Home;
