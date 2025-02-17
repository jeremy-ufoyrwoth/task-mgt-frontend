"use client";

import { useAuthStore } from "@/store/auth.store";
import React from "react";
import { Button } from "./ui/button";
import LoginForm from "./LoginForm";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { LogOut, Plus } from "lucide-react";
import LogOutForm from "./LogOutForm";
import RegisterForm from "./RegisterForm";
import CreateTaskForm from "./CreateTaskForm";

const Navbar = ({ refetch }: { refetch(): Promise<void> }) => {
  const { User } = useAuthStore();

  return (
    <header className="pb-4 pt-8">
      <nav className="p-6 flex justify-between items-left md:items-center lg:xl:items-center bg-slate-50 rounded-2xl shadow flex-col md:flex-row lg:xl:flex-row space-y-2">
        <h3 className="font-bold text-lg uppercase">Task Manager</h3>

        <div>
          {User ? (
            <div className="flex items-center gap-4">
              <CreateTaskForm refetch={refetch} />

              <h3>|</h3>

              <DropdownMenu>
                <DropdownMenuTrigger>
                  <div className="flex items-center gap-2">
                    <Avatar>
                      <AvatarImage src="" />
                      <AvatarFallback className="font-bold">
                        {User.name.split(" ")[0].slice(0, 1).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>

                    <h3>{User.name.split(" ")[0]}</h3>
                  </div>
                </DropdownMenuTrigger>

                <DropdownMenuContent>
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuLabel className="font-light text-gray-500">
                    {User.name}
                  </DropdownMenuLabel>
                  <DropdownMenuLabel className="font-light text-gray-500">
                    {User.email}
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <LogOutForm />
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <LoginForm />
              <RegisterForm />
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
