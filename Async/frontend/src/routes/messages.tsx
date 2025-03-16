import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/messages")({
	component: RouteComponent,
	beforeLoad: ({ context }) => {
		if (!context.auth?.session) {
			throw redirect({
				to: "/",
			});
		}
	},
});

function RouteComponent() {
	return <div>Hello "/messages"!</div>;
}
