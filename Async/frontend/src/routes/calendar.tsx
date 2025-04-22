import { createFileRoute, redirect } from "@tanstack/react-router";
import { CalendarPage } from "../pages/CalendarPage";

export const Route = createFileRoute("/calendar")({
	component: CalendarPage,
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
