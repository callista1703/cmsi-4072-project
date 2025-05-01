import React, { useState, useEffect } from "react";
import {
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LogOut } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/supabaseClient";


type AvatarRow = { avatar_url: string | null };

export const SidebarFooterItems: React.FC<{
  handleSignOut: () => Promise<void>;
}> = ({ handleSignOut }) => {
  const { session, loading } = useAuth();
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);

  if (loading || !session) return null;
  const user = session.user;
  const uid = user.id;
  const firstName = (user.user_metadata as any).firstName || "";
  const lastName = (user.user_metadata as any).lastName || "";
  const email = user.email || "";
  const initials =
    ((firstName?.[0] ?? "") + (lastName?.[0] ?? "")).toUpperCase() || "?";

  useEffect(() => {
    supabase
      .from("Users")
      .select("avatar_url")
      .eq("id", uid)
      .single<AvatarRow>()
      .then(({ data, error }) => {
        if (error) {
          console.error("❌ fetch avatar_url error:", error.message);
        } else if (data?.avatar_url) {
          setAvatarUrl(data.avatar_url);
        }
      });
  }, [uid]);

  return (
    <SidebarFooter className="bg-white">
      <SidebarMenu>
        <SidebarMenuItem>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton size="lg" className="cursor-pointer flex items-center">
                <Avatar>
                  {avatarUrl ? (
                    <AvatarImage src={avatarUrl} alt="Your avatar" />
                  ) : (
                    <AvatarFallback>{initials}</AvatarFallback>
                  )}
                </Avatar>
                <div className="ml-2 flex-1 text-left text-sm leading-tight">
                  <span className="block truncate font-semibold">
                    {firstName} {lastName}
                  </span>
                  <span className="block truncate text-xs">{email}</span>
                </div>
              </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" side="right">
              <DropdownMenuGroup>
                <DropdownMenuItem
                  onClick={handleSignOut}
                  className="cursor-pointer flex items-center gap-2"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Sign Out</span>
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarFooter>
  );
};
