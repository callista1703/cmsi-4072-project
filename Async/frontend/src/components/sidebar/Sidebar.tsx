import { Sidebar, SidebarRail } from "@/components/ui/sidebar";
import { useRouter, useMatches } from "@tanstack/react-router";
import { useAuth } from "@/context/AuthContext";
import { SidebarMainItems } from "./SidebarMainItems";
import { SidebarFooterItems } from "./SidebarFooterItems";
import { SidebarHeaderItems } from "./SidebarHeaderItems";

export function SidebarComponent() {
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
		<Sidebar collapsible="icon" className="bg-white h-full">
			<SidebarHeaderItems />
			<SidebarMainItems currentPath={currentPath} />
			<SidebarFooterItems handleSignOut={handleSignOut} />
			<SidebarRail />
		</Sidebar>
	);
}
