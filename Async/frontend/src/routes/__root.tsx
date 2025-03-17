import {
	createRootRouteWithContext,
	useRouter,
	useRouteContext,
	redirect,
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { QueryClient } from "@tanstack/react-query";
import { AuthState } from "@/context/AuthContext";
import { PublicLayout } from "@/layouts/public";
import { AuthenticatedLayout } from "@/layouts/authenticated";
import { useAuth } from "@/context/AuthContext";

export interface MyRouterContext {
	queryClient: QueryClient;
	auth: ReturnType<typeof useAuth>;
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
	component: RootRoute,
});

const PUBLIC_ROUTES = ["/", "/login", "/register"];

function RootRoute() {
	const router = useRouter();
	const auth = useAuth(); // Use the auth hook directly
	const isPublicRoute = PUBLIC_ROUTES.includes(router.state.location.pathname);
	const shouldShowPublicLayout = isPublicRoute || !auth?.session;

	return (
		<>
			{shouldShowPublicLayout ? <PublicLayout /> : <AuthenticatedLayout />}
			<TanStackRouterDevtools position="top-right" />
		</>
	);
}
