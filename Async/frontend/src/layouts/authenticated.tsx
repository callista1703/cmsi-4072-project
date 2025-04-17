import { Outlet } from "@tanstack/react-router";
import { SidebarComponent } from "@/components/sidebar/Sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";

export function AuthenticatedLayout() {
	return (
		<div className="w-screen h-screen flex bg-white overflow-y-auto">
			<SidebarProvider>
				<SidebarComponent />
				<Outlet />
			</SidebarProvider>
		</div>
	);
}
