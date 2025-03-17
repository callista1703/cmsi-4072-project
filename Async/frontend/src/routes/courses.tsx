import { createFileRoute, redirect } from "@tanstack/react-router";
import { Courses } from "@/pages/Courses";

export const Route = createFileRoute("/courses")({
	component: Courses,
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

function RouteComponent() {
	return <div>Hello "/courses"!</div>;
}
