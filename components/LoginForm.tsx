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
import { LoginFormValidation } from "@/lib/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "./ui/input";
import { toast } from "sonner";
import { loginUser } from "@/lib/actions/auth.actions";
import { Loader2 } from "lucide-react";
import { useAuthStore } from "@/store/auth.store";

const LoginForm = () => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const { setUser } = useAuthStore();

  const form = useForm<z.infer<typeof LoginFormValidation>>({
    resolver: zodResolver(LoginFormValidation),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const errors = form.formState.errors;

  const handleSubmit = async ({
    email,
    password,
  }: z.infer<typeof LoginFormValidation>) => {
    try {
      setLoading(true);

      if (!email) throw new Error("Email is required");
      if (!password) throw new Error("Password is required");

      const res = await loginUser({ email, password });

      if (res.error) throw new Error(res.error);

      if (!res.data?.success) throw new Error(res.data?.message);

      const user = res.data?.data as I_LOGIN_FETCH;

      setUser({ token: user.token, ...user.user });

      toast.success("Login successful");

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
        <Button variant={"outline"}>Login</Button>
      </DialogTrigger>

      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center">Login</DialogTitle>
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
                name="email"
                disabled={loading}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="example@email.com" {...field} />
                    </FormControl>

                    <FormMessage className="text-sm text-red-500">
                      {errors.email?.message}
                    </FormMessage>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                disabled={loading}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" {...field} />
                    </FormControl>

                    <FormMessage className="text-sm text-red-500">
                      {errors.password?.message}
                    </FormMessage>
                  </FormItem>
                )}
              />

              <div className="py-2 flex justify-end">
                <Button disabled={loading}>
                  {loading ? (
                    <Loader2 className="size-4 animate-spin" />
                  ) : (
                    "Login"
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

export default LoginForm;
