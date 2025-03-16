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
	beforeLoad: ({ context, location }) => {
		if (context.auth.loading) {
			return;
		}

		// const isPublicRoute = PUBLIC_ROUTES.includes(location.pathname);
		// // console.log("THE CURRENT URL PATHNAME IS", location.pathname);

		// if (!context.auth?.session && !isPublicRoute) {
		// 	throw redirect({
		// 		to: "/login",
		// 		search: {
		// 			redirect: location.pathname,
		// 		},
		// 	});
		// }

		// // Redirect authenticated users away from login/register (but not home page)
		// if (context.auth?.session && isPublicRoute && location.pathname !== "/") {
		// 	throw redirect({
		// 		to: "/dashboard",
		// 	});
		// }
	},
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
