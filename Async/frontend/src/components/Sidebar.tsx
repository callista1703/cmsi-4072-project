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
import { Link } from "@tanstack/react-router";

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
							<Link
								to="/dashboard"
								className="cursor-pointer flex items-center"
							>
								<Home className="mr-6 h-4 w-4" />
								<span>Dashboard</span>
							</Link>
						</SidebarMenuButton>
					</SidebarMenuItem>
					<SidebarMenuItem>
						<SidebarMenuButton className="ml-3">
							<Link to="/courses" className="cursor-pointer flex items-center">
								<BookOpen className="mr-6 h-4 w-4" />
								<span>Courses</span>
							</Link>
						</SidebarMenuButton>
					</SidebarMenuItem>
					<SidebarMenuItem>
						<SidebarMenuButton className="ml-3">
							<Link to="/calendar" className="cursor-pointer flex items-center">
								<Calendar className="mr-6 h-4 w-4" />
								<span>Calendar</span>
							</Link>
						</SidebarMenuButton>
					</SidebarMenuItem>
					<SidebarMenuItem>
						<SidebarMenuButton className="ml-3">
							<Link to="/messages" className="cursor-pointer flex items-center">
								<MessageSquare className="mr-6 h-4 w-4" />
								<span>Messages</span>
							</Link>
						</SidebarMenuButton>
					</SidebarMenuItem>
					<SidebarMenuItem>
						<SidebarMenuButton className="ml-3">
							<Link to="/settings" className="cursor-pointer flex items-center">
								<Settings className="mr-6 h-4 w-4" />
								<span>Settings</span>
							</Link>
						</SidebarMenuButton>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarContent>
		</ShadcnSidebar>
	);
}
