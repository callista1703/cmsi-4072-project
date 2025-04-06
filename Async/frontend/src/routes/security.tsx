import { createFileRoute, redirect } from "@tanstack/react-router";
import Security from "@/pages/Security";

export const Route = createFileRoute("/security")({
  component: Security,
  beforeLoad: ({ context, location }) => {
    if (context.auth.loading) return;
    if (!context.auth?.session) {
      throw redirect({
        to: "/login",
        search: { redirect: location.href },
      });
    }
  },
});

function RouteComponent() {
  return Security;
}
