import { createFileRoute, redirect } from "@tanstack/react-router";
import CalendarTwo from "../components/CalendarTwo.tsx";

export const Route = createFileRoute("/calendar")({
	component: RouteComponent,
	beforeLoad: ({ context, location }) => {
		if (context.auth.loading) {
			return;
		}
		if (!context.auth?.session) {
			throw redirect({
				to: "/login",
				search: {
					// redirect: "/calendar",
					redirect: location.href,
				},
			});
		}
	},
});

function RouteComponent() {
	return <CalendarTwo />;
}
