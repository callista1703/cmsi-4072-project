import { createFileRoute, redirect } from "@tanstack/react-router";
import { Courses } from "@/pages/Courses";
import { allCoursesQueryKey, fetchEnrolledCourses } from "@/queries/courses";

export const Route = createFileRoute("/courses/")({
	loader: async ({ context: { queryClient } }) => {
		await queryClient.prefetchQuery({
			queryKey: allCoursesQueryKey,
			queryFn: fetchEnrolledCourses,
		});
	},
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
