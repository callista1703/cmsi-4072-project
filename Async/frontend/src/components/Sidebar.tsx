import {
	Home,
	BookOpen,
	Calendar,
	MessageSquare,
	Settings,
	Circle,
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
		<ShadcnSidebar className="w-52 border-r bg-white h-full">
			<SidebarHeader className="p-6 bg-white">
				<h2 className="text-2xl font-bold text-left">Async</h2>
			</SidebarHeader>
			<SidebarContent className="bg-white">
				<SidebarMenu className="h-full">
					<SidebarMenuItem>
						<SidebarMenuButton asChild className="ml-3 w-[90%] gap-0">
							<Link to="/" className="cursor-pointer">
								<Home className="mr-4 h-4 w-4" />
								<span>Home</span>
							</Link>
						</SidebarMenuButton>
					</SidebarMenuItem>
					<SidebarMenuItem>
						<SidebarMenuButton asChild className="ml-3 w-[90%] gap-0">
							<Link to="/courses" className="cursor-pointer">
								<BookOpen className="mr-4 h-4 w-4" />
								<span>Courses</span>
							</Link>
						</SidebarMenuButton>
					</SidebarMenuItem>
					<SidebarMenuItem>
						<SidebarMenuButton asChild className="ml-3 w-[90%] gap-0">
							<Link to="/calendar" className="cursor-pointer ">
								<Calendar className="mr-4 h-4 w-4" />
								<span>Calendar</span>
							</Link>
						</SidebarMenuButton>
					</SidebarMenuItem>
					<SidebarMenuItem>
						<SidebarMenuButton asChild className="ml-3 w-[90%] gap-0">
							<Link to="/messages" className="cursor-pointer">
								<MessageSquare className="mr-4 h-4 w-4" />
								<span>Messages</span>
							</Link>
						</SidebarMenuButton>
					</SidebarMenuItem>
					<SidebarMenuItem>
						<SidebarMenuButton asChild className="ml-3 w-[90%] gap-0">
							<Link to="/settings" className="cursor-pointer">
								<Settings className="mr-4 h-4 w-4" />
								<span>Settings</span>
							</Link>
						</SidebarMenuButton>
					</SidebarMenuItem>
					<SidebarMenuItem>
						<SidebarMenuButton asChild className="ml-3 w-[90%] gap-0">
							<Link to="/login" className="cursor-pointer">
								<Settings className="mr-4 h-4 w-4" />
								<span>Temp Login Link</span>
							</Link>
						</SidebarMenuButton>
					</SidebarMenuItem>
					<div className="flex items-center gap-2 mt-auto pb-6 ml-3">
						<Circle size={45} fill="grey" />
						<h3 className="text-sm">@username</h3>
					</div>
				</SidebarMenu>
			</SidebarContent>
		</ShadcnSidebar>
	);
}
