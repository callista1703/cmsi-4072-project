import { Outlet } from "@tanstack/react-router";
import { Sidebar } from "@/components/Sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";

export function AuthenticatedLayout() {
	return (
		<div className="w-screen h-screen flex bg-white overflow-y-auto">
			<SidebarProvider>
				<Sidebar />
				<Outlet />
			</SidebarProvider>
		</div>
	);
}
