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

type SidebarFooterItemsProps = {
	handleSignOut: () => Promise<void>;
};

export const SidebarFooterItems = ({
	handleSignOut,
}: SidebarFooterItemsProps) => {
	return (
		<SidebarFooter className="bg-white">
			<SidebarMenu>
				<SidebarMenuItem>
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<SidebarMenuButton size={"lg"} className="cursor-pointer">
								<Avatar>
									<AvatarImage />
									<AvatarFallback>JD</AvatarFallback>{" "}
									{/* Placeholder for user initials */}
								</Avatar>
								<div className="grid flex-1 text-left text-sm leading-tight">
									<span className="truncate font-semibold">{"username"}</span>
									<span className="truncate text-xs">{"user email"}</span>
								</div>
							</SidebarMenuButton>
						</DropdownMenuTrigger>
						<DropdownMenuContent align="end" side="right">
							<DropdownMenuGroup>
								<DropdownMenuItem
									onClick={handleSignOut}
									className="cursor-pointer"
								>
									<LogOut />
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
