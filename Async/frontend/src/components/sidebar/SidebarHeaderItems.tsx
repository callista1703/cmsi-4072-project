import {
	SidebarHeader,
	SidebarMenu,
	SidebarMenuItem,
	SidebarMenuButton,
} from "../ui/sidebar";
import { PuzzleIcon } from "lucide-react";

export const SidebarHeaderItems = () => {
	return (
		<SidebarHeader className="bg-white">
			<SidebarMenu>
				<SidebarMenuItem>
					<SidebarMenuButton size="lg">
						<div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-blue-900 text-sidebar-primary-foreground">
							<PuzzleIcon />
						</div>
						<h1 className="font-semibold">Async</h1>
					</SidebarMenuButton>
				</SidebarMenuItem>
			</SidebarMenu>
		</SidebarHeader>
	);
};
