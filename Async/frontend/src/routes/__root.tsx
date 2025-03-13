import {
	// createRootRoute,
	createRootRouteWithContext,
	Outlet,
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { Sidebar } from "@/components/Sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { QueryClient } from "@tanstack/react-query";
import { AuthState } from "@/context/AuthContext";
interface MyRouterContext {
	queryClient: QueryClient;
	auth: AuthState | null;
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
	component: () => (
		<>
			<div className="w-screen h-screen flex bg-white overflow-y-auto">
				<SidebarProvider>
					<Sidebar />

					<Outlet />
				</SidebarProvider>
				<TanStackRouterDevtools position="top-right" />
			</div>
		</>
	),
});
