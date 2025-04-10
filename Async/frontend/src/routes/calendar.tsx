import { createFileRoute, redirect } from "@tanstack/react-router";
import Calendar from "../components/Calendar.tsx";

export const Route = createFileRoute("/calendar")({
	component: Calendar,
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
