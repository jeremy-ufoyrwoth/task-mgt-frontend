import React, { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";

import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { useAuthStore } from "@/store/auth.store";
import { deleteTask } from "@/lib/actions/task.actions";

const DeleteTaskForm = ({
  refetch,
  id,
}: {
  refetch(): Promise<void>;
  id: string;
}) => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const { User } = useAuthStore();

  const handleSubmit = async () => {
    try {
      setLoading(true);

      if (!id) throw new Error("Failed to delete task");

      const res = await deleteTask({
        id: id,
        token: User?.token,
      });

      if (res.error) throw new Error(res.error);

      if (!res.data?.success) throw new Error(res.data?.message);

      toast.success("Task deleted successful");

      await refetch();

      setOpen(false);

      setLoading(false);
    } catch (error: any) {
      setLoading(false);

      console.log(error);

      toast.error(error?.message || "Unexpected error");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <Button size={"sm"} variant={"destructive"}>
          Delete
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Are you sure</DialogTitle>
          <DialogDescription>
            This will completely remove the task. This action cannot be undone
          </DialogDescription>
        </DialogHeader>

        <div className="py-2 flex justify-end">
          <Button
            disabled={loading}
            variant={"destructive"}
            onClick={handleSubmit}
          >
            {loading ? (
              <Loader2 className="size-4 animate-spin" />
            ) : (
              "Delete Task"
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteTaskForm;
