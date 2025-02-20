import { createFileRoute } from "@tanstack/react-router";
import CalendarTwo from "../components/CalendarTwo.tsx";

export const Route = createFileRoute("/calendar")({
	component: RouteComponent,
});

function RouteComponent() {
	return <CalendarTwo />;
}
