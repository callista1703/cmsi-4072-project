import {
	Home,
	BookOpen,
	Calendar,
	MessageSquare,
	Settings,
} from "lucide-react";
import {
	Sidebar as ShadcnSidebar,
	SidebarContent,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "@/components/ui/sidebar";

export function Sidebar() {
	return (
		<ShadcnSidebar className="w-52 border-r">
			<SidebarHeader className="p-6">
				<h2 className="text-2xl font-bold text-left">Async</h2>
			</SidebarHeader>
			<SidebarContent>
				<SidebarMenu>
					<SidebarMenuItem>
						<SidebarMenuButton className="ml-3">
							<Home className="mr-3 h-5 w-5" />
							<span>Dashboard</span>
						</SidebarMenuButton>
					</SidebarMenuItem>
					<SidebarMenuItem>
						<SidebarMenuButton className="ml-3">
							<BookOpen className="mr-3 h-5 w-5" />
							<span>Courses</span>
						</SidebarMenuButton>
					</SidebarMenuItem>
					<SidebarMenuItem>
						<SidebarMenuButton className="ml-3">
							<Calendar className="mr-3 h-5 w-5" />
							<span>Calendar</span>
						</SidebarMenuButton>
					</SidebarMenuItem>
					<SidebarMenuItem>
						<SidebarMenuButton className="ml-3">
							<MessageSquare className="mr-3 h-5 w-5" />
							<span>Messages</span>
						</SidebarMenuButton>
					</SidebarMenuItem>
					<SidebarMenuItem>
						<SidebarMenuButton className="ml-3">
							<Settings className="mr-3 h-5 w-5" />
							<span>Settings</span>
						</SidebarMenuButton>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarContent>
		</ShadcnSidebar>
	);
}
