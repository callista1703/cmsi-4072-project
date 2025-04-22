import { StrictMode, useEffect } from "react";
import "./index.css";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import ReactDOM from "react-dom/client";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import { AuthProvider, AuthState, useAuth } from "@/context/AuthContext";
import { routeTree } from "./routeTree.gen";
import { MyRouterContext } from "./routes/__root";

const queryClient = new QueryClient();

const router = createRouter({
	routeTree,
	context: {
		queryClient: queryClient,
		auth: {
			session: null,
			signUpNewUser: async () => ({ success: false, error: new Error() }),
			signOutUser: async () => {},
			signInUser: async () => ({ success: false, error: new Error() }),
			loading: true,
		},
	},
	defaultPreload: "intent",
});

// Register the router instance for type safety
declare module "@tanstack/react-router" {
	interface Register {
		router: typeof router;
	}
}

function InnerApp() {
	const auth = useAuth();

	useEffect(() => {
		// Always update the router context when auth changes, not just when not loading
		const newContext: MyRouterContext = {
			queryClient: queryClient,
			auth: auth,
		};

		// Update the router with the new context
		router.update({
			context: newContext,
		});
	}, [auth]);

	// Don't render the app until authentication is loaded
	if (auth.loading) {
		return (
			<div className="w-screen h-screen flex items-center justify-center">
				Loading...
			</div>
		);
	}

	return <RouterProvider router={router} context={{ auth, queryClient }} />;
}

const rootElement = document.getElementById("root")!;
if (!rootElement.innerHTML) {
	const root = ReactDOM.createRoot(rootElement);
	root.render(
		<StrictMode>
			<QueryClientProvider client={queryClient}>
				<AuthProvider>
					<InnerApp />
				</AuthProvider>
			</QueryClientProvider>
		</StrictMode>
	);
}
