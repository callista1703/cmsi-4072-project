import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/settings")({
	component: RouteComponent,
	beforeLoad: ({ context }) => {
		if (context.auth.loading) {
			return;
		}

		if (!context.auth?.session) {
			throw redirect({
				to: "/",
				search: {
					redirect: "/settings",
				},
			});
		}
	},
});

function RouteComponent() {
	return <div>Hello "/settings"!</div>;
}
