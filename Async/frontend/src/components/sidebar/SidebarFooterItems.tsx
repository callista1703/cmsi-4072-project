import React from "react";
import {
	SidebarFooter,
	SidebarMenu,
	SidebarMenuItem,
	SidebarMenuButton,
} from "@/components/ui/sidebar";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LogOut } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export const SidebarFooterItems: React.FC<{
	handleSignOut: () => Promise<void>;
  }> = ({ handleSignOut }) => {
	const { session, loading } = useAuth();
  
	if (loading || !session) return null;
  
	const user = session.user;
	const firstName: string = (user.user_metadata as any).firstName || "";
	const lastName: string = (user.user_metadata as any).lastName || "";
	const email = user.email || "";
	const initials = `${firstName[0] ?? ""}${lastName[0] ?? ""}`.toUpperCase() || "?";
  
	return (
	  <SidebarFooter className="bg-white">
		<SidebarMenu>
		  <SidebarMenuItem>
			<DropdownMenu>
			  <DropdownMenuTrigger asChild>
				<SidebarMenuButton size="lg" className="cursor-pointer flex items-center">
				  <Avatar>
					<AvatarFallback>{initials}</AvatarFallback>
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
  