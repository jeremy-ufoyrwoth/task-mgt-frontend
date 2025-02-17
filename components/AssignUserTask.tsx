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
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { set, useForm } from "react-hook-form";
import { z } from "zod";
import { AssignUserTaskFormValidation } from "@/lib/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "./ui/input";
import { toast } from "sonner";
import { Loader2, Plus } from "lucide-react";
import { useAuthStore } from "@/store/auth.store";
import { assignUserTask, createNewTask } from "@/lib/actions/task.actions";
import { Textarea } from "./ui/textarea";
import { useRouter } from "next/navigation";
import { useFetch } from "@/lib";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const AssignUserTaskForm = ({
  refetch,
  taskId,
}: {
  refetch(): Promise<void>;
  taskId: string;
}) => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const { data: users, loading: fetchingUsers } = useFetch<{
    success: boolean;
    data: {
      id: string;
      name: string;
      email: string;
    }[];
  }>(`/users`);

  const Users = users?.data || [];

  const { User } = useAuthStore();

  const form = useForm<z.infer<typeof AssignUserTaskFormValidation>>({
    resolver: zodResolver(AssignUserTaskFormValidation),
    defaultValues: {
      userId: "",
    },
  });

  const errors = form.formState.errors;

  const handleSubmit = async ({
    userId,
  }: z.infer<typeof AssignUserTaskFormValidation>) => {
    try {
      setLoading(true);

      if (!userId) throw new Error("User is required");

      const res = await assignUserTask({
        userId,
        taskId,
        token: User?.token,
      });

      if (res.error) throw new Error(res.error);

      if (!res.data?.success) throw new Error(res.data?.message);

      const task = res.data?.data as I_CREATE_TASK_FETCH;

      toast.success("Task assigned successful");

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
        <Button>Assign Task</Button>
      </DialogTrigger>

      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center">Assign task</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>

        <div className="py-2">
          <Form {...form}>
            <form
              className="space-y-4"
              onSubmit={form.handleSubmit(handleSubmit)}
            >
              <FormField
                control={form.control}
                name="userId"
                disabled={loading || fetchingUsers}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Select
                        {...field}
                        onValueChange={(value) => field.onChange(value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select user" />
                        </SelectTrigger>

                        <SelectContent>
                          {Users.filter((user) => user.id !== User?.id).map(
                            (user) => (
                              <SelectItem key={user.id} value={user.id}>
                                {user.name}
                              </SelectItem>
                            )
                          )}
                        </SelectContent>
                      </Select>
                    </FormControl>

                    <FormMessage className="text-sm text-red-500">
                      {errors.userId?.message}
                    </FormMessage>
                  </FormItem>
                )}
              />

              <div className="py-2 flex justify-end">
                <Button disabled={loading || fetchingUsers}>
                  {loading ? (
                    <Loader2 className="size-4 animate-spin" />
                  ) : (
                    "Assign Task"
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AssignUserTaskForm;
