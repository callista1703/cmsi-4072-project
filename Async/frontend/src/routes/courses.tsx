import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/courses")({
	component: RouteComponent,
	beforeLoad: ({ context }) => {
		if (!context.auth?.session) {
			throw redirect({
				to: "/home",
			});
		}
	},
});

function RouteComponent() {
	return <div>Hello "/courses"!</div>;
}
