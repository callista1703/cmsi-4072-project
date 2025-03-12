import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/home")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<div>
			Hello "/home"! You are not authenticated so you are being redirected here.
		</div>
	);
}
