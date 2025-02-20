import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";

export const Route = createRootRoute({
	component: () => (
		<>
			<div className="w-screen h-screen">
				<Outlet />
			</div>
			<TanStackRouterDevtools />
		</>
	),
});
