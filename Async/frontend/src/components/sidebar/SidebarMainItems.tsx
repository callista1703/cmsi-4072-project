import {
	SidebarContent,
	SidebarGroup,
	SidebarGroupLabel,
	SidebarMenu,
	SidebarMenuItem,
	SidebarMenuButton,
} from "../ui/sidebar";
import { Link } from "@tanstack/react-router";
import {
	Home,
	BookOpen,
	Calendar,
	NotebookText,
	UserPen,
	ShieldHalf,
	LogOut,
} from "lucide-react";

type SidebarMainItemsProps = {
	currentPath: string;
};

export const SidebarMainItems = ({ currentPath }: SidebarMainItemsProps) => {
	return (
		<SidebarContent className="bg-white">
			<SidebarGroup>
				<SidebarGroupLabel>Core</SidebarGroupLabel>
				<SidebarMenu>
					<SidebarMenuItem>
						<SidebarMenuButton asChild isActive={currentPath === "/dashboard"}>
							<Link to="/dashboard" className="cursor-pointer ">
								<Home />
								<span>Dashboard</span>
							</Link>
						</SidebarMenuButton>
					</SidebarMenuItem>
					<SidebarMenuItem>
						<SidebarMenuButton
							asChild
							isActive={currentPath.startsWith("/courses")}
						>
							<Link to="/courses" className="cursor-pointer">
								<BookOpen />
								<span>Courses</span>
							</Link>
						</SidebarMenuButton>
					</SidebarMenuItem>
					<SidebarMenuItem>
						<SidebarMenuButton
							asChild
							isActive={currentPath === "/assignments"}
						>
							<Link to="/assignments" className="cursor-pointer">
								<NotebookText />
								<span>Assignments</span>
							</Link>
						</SidebarMenuButton>
					</SidebarMenuItem>
					<SidebarMenuItem>
						<SidebarMenuButton asChild isActive={currentPath === "/calendar"}>
							<Link to="/calendar" className="cursor-pointer ">
								<Calendar />
								<span>Calendar</span>
							</Link>
						</SidebarMenuButton>
					</SidebarMenuItem>
					{/* Added Discussions Link */}
					<SidebarMenuItem>
						<SidebarMenuButton asChild isActive={currentPath === "/discussion"}>
							<Link to="/discussion" className="cursor-pointer">
								<LogOut />
								<span>Discussions</span>
							</Link>
						</SidebarMenuButton>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarGroup>
			<SidebarGroup>
				<SidebarGroupLabel>Settings</SidebarGroupLabel>
				<SidebarMenu>
					<SidebarMenuItem>
						<SidebarMenuButton asChild isActive={currentPath === "/profile"}>
							<Link to="/profile" className="cursor-pointer">
								<UserPen />
								<span>Profile</span>
							</Link>
						</SidebarMenuButton>
					</SidebarMenuItem>
					<SidebarMenuItem>
						<SidebarMenuButton asChild isActive={currentPath === "/security"}>
							<Link to="/security" className="cursor-pointer">
								<ShieldHalf />
								<span>Security</span>
							</Link>
						</SidebarMenuButton>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarGroup>
		</SidebarContent>
	);
};
