import {
	Home,
	BookOpen,
	Calendar,
	NotebookText,
	UserPen,
	CircleSlash,
	ShieldHalf,
	MessageSquare,
} from "lucide-react";
import {
	Sidebar as ShadcnSidebar,
	SidebarContent,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarRail,
	SidebarFooter,
	SidebarGroup,
	SidebarGroupLabel,
} from "@/components/ui/sidebar";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
	Link,
	useRouter,
	useNavigate,
	useMatches,
} from "@tanstack/react-router";
import { useAuth } from "@/context/AuthContext";

export function Sidebar() {
	const { signOutUser } = useAuth();
	const router = useRouter();
	const matches = useMatches();
	const currentPath = matches[matches.length - 1]?.pathname || "";

	const handleSignOut = async () => {
		try {
			await signOutUser();
			router.navigate({ to: "/login" });
			console.log("signed out successfully");
		} catch (error) {
			console.error("an error occurred while signing out", error);
		}
	};

	return (
		<ShadcnSidebar collapsible="icon" className="bg-white h-full">
			<SidebarHeader className="bg-white">
				<SidebarMenu>
					<SidebarMenuItem>
						<SidebarMenuButton size="lg">
							<div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-muted-foreground text-sidebar-primary-foreground">
								<CircleSlash />
							</div>
							<h1 className="font-semibold">Async</h1>
						</SidebarMenuButton>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarHeader>
			<SidebarContent className="bg-white">
				<SidebarGroup>
					<SidebarGroupLabel>Core</SidebarGroupLabel>
					<SidebarMenu>
						<SidebarMenuItem>
							<SidebarMenuButton
								asChild
								isActive={currentPath === "/dashboard"}
							>
								<Link to="/dashboard" className="cursor-pointer ">
									<Home />
									<span>Dashboard</span>
								</Link>
							</SidebarMenuButton>
						</SidebarMenuItem>
						<SidebarMenuItem>
							<SidebarMenuButton asChild isActive={currentPath === "/courses"}>
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
									<MessageSquare />
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

			<SidebarFooter className="bg-white">
				<SidebarMenu>
					<SidebarMenuItem>
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<SidebarMenuButton size={"lg"} className="cursor-pointer">
									<Avatar>
										<AvatarImage />
										<AvatarFallback>IC</AvatarFallback>
									</Avatar>
									<div className="grid flex-1 text-left text-sm leading-tight">
										<span className="truncate font-semibold">
											{"username"}
										</span>
										<span className="truncate text-xs">
											{"user email"}
										</span>
									</div>
								</SidebarMenuButton>
							</DropdownMenuTrigger>
							<DropdownMenuContent align="end" side="right">
								<DropdownMenuGroup>
									<DropdownMenuItem
										onClick={handleSignOut}
										className="cursor-pointer"
									>
										Sign Out
									</DropdownMenuItem>
								</DropdownMenuGroup>
							</DropdownMenuContent>
						</DropdownMenu>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarFooter>
			<SidebarRail />
		</ShadcnSidebar>
	);
}