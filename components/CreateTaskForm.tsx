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
import { CreateTaskFormValidation } from "@/lib/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "./ui/input";
import { toast } from "sonner";
import { Loader2, Plus } from "lucide-react";
import { useAuthStore } from "@/store/auth.store";
import { createNewTask } from "@/lib/actions/task.actions";
import { Textarea } from "./ui/textarea";
import { useRouter } from "next/navigation";

const CreateTaskForm = ({ refetch }: { refetch(): Promise<void> }) => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const { User } = useAuthStore();

  const form = useForm<z.infer<typeof CreateTaskFormValidation>>({
    resolver: zodResolver(CreateTaskFormValidation),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  const errors = form.formState.errors;

  const handleSubmit = async ({
    name,
    description,
  }: z.infer<typeof CreateTaskFormValidation>) => {
    try {
      setLoading(true);

      if (!name) throw new Error("Name is required");

      const res = await createNewTask({
        name,
        description,
        userId: User?.id,
        token: User?.token,
      });

      if (res.error) throw new Error(res.error);

      if (!res.data?.success) throw new Error(res.data?.message);

      const task = res.data?.data as I_CREATE_TASK_FETCH;

      toast.success("Task created successful");

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
        <Button>
          <Plus className="size-4" /> New Task
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center">Add new task</DialogTitle>
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
                name="name"
                disabled={loading}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="take a walk" {...field} />
                    </FormControl>

                    <FormMessage className="text-sm text-red-500">
                      {errors.name?.message}
                    </FormMessage>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                disabled={loading}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="walk for 2hours straight"
                        {...field}
                      />
                    </FormControl>

                    <FormMessage className="text-sm text-red-500">
                      {errors.description?.message}
                    </FormMessage>
                  </FormItem>
                )}
              />

              <div className="py-2 flex justify-end">
                <Button disabled={loading}>
                  {loading ? (
                    <Loader2 className="size-4 animate-spin" />
                  ) : (
                    "Add Task"
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

export default CreateTaskForm;
