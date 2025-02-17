import React, { useState } from "react";
import { DropdownMenuItem } from "./ui/dropdown-menu";
import { Loader2, LogOutIcon } from "lucide-react";
import { useAuthStore } from "@/store/auth.store";
import { toast } from "sonner";

const LogOutForm = () => {
  const [loading, setLoading] = useState(false);

  const { LogOut } = useAuthStore();

  const handleLogout = async () => {
    try {
      setLoading(true);

      await LogOut();

      toast.success("Logged out successfully");

      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  return (
    <DropdownMenuItem
      className="flex items-center gap-4"
      onClick={handleLogout}
    >
      {loading ? (
        <Loader2 className="size-4 animate-spin" />
      ) : (
        <>
          <LogOutIcon className="size-4" />

          <h3>Log Out</h3>
        </>
      )}
    </DropdownMenuItem>
  );
};

export default LogOutForm;
