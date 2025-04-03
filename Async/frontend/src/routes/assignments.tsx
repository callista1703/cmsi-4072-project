import { createFileRoute, redirect } from "@tanstack/react-router";
import { Assignments } from "@/pages/Assignments";

export const Route = createFileRoute("/assignments")({
	component: Assignments,
	beforeLoad: ({ context, location }) => {
		if (context.auth.loading) {
			return;
		}

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


