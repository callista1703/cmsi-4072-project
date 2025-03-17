import { createFileRoute, redirect } from "@tanstack/react-router";
import Home from "@/pages/Dashboard";

export const Route = createFileRoute("/dashboard")({
	component: Home,
	beforeLoad: ({ context, location }) => {
		if (context.auth.loading) {
			return;
		}
		// console.log(
		// 	"THE CURRENT SESSION ACCORDING TO ROUTER IS",
		// 	context.auth?.session
		// );
		if (!context.auth?.session) {
			throw redirect({
				to: "/login",
				search: {
					redirect: location.href,
				},
			});
		}
	},
});
