import { createFileRoute, redirect } from "@tanstack/react-router";
import { Settings } from "@/pages/Settings.tsx";

export const Route = createFileRoute("/settings")({
	component: Settings,
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
	return Settings;
}
