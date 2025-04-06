import { createFileRoute, redirect } from "@tanstack/react-router";
import ProfileAppearance from "@/pages/ProfileAppearance";

export const Route = createFileRoute("/profile")({
  component: ProfileAppearance,
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
  return ProfileAppearance;
}
