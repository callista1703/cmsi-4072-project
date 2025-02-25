import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { Sidebar } from "@/components/Sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";

export const Route = createRootRoute({
	component: () => (
		<>
			<div className="w-screen h-screen flex bg-white overflow-y-auto">
				<SidebarProvider>
					<Sidebar />

					<Outlet />
				</SidebarProvider>
				<TanStackRouterDevtools />
			</div>
		</>
	),
});
