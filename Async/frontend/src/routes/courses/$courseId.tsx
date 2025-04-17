import { createFileRoute, redirect } from "@tanstack/react-router";
import { CoursePage } from "@/pages/CoursePage";

export const Route = createFileRoute("/courses/$courseId")({
	component: CoursePage,
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
