import React, { useState } from "react";
import { Checkbox } from "./ui/checkbox";
import { toast } from "sonner";
import { updateTaskStatus } from "@/lib/actions/task.actions";
import { useAuthStore } from "@/store/auth.store";
import { Loader2 } from "lucide-react";

const UpdateTaskStatus = ({
  isCompleted,
  id,
  refetch,
}: {
  isCompleted: boolean;
  id: string;
  refetch(): Promise<void>;
}) => {
  const [loading, setLoading] = useState(false);

  const { User } = useAuthStore();

  const handleChange = async (status: boolean) => {
    try {
      setLoading(true);

      const res = await updateTaskStatus({
        isCompleted: status,
        id: id,
        token: User?.token,
      });

      if (res.error) throw new Error(res.error);

      if (!res.data?.success) throw new Error(res.data?.message);

      toast.success("Task status updated successful");

      await refetch();
    } catch (error) {
      console.log(error);

      toast.error("Failed to update task status");
    }
  };

  return (
    <div>
      {loading ? (
        <Loader2 className="animate-spin size-4" />
      ) : (
        <Checkbox defaultChecked={isCompleted} onCheckedChange={handleChange} />
      )}
    </div>
  );
};

export default UpdateTaskStatus;
