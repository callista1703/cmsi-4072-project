import { getRouteApi } from "@tanstack/react-router";
import { PostgrestError } from "@supabase/supabase-js";
import { useQuery } from "@tanstack/react-query";
import { courseQueryOptions } from "@/queries/courses";

const routeApi = getRouteApi("/courses/$courseId");

export const CoursePage = () => {
	// Get the courseId from the route params
	const { courseId } = routeApi.useParams();

	const {
		data: course,
		isLoading,
		isError,
		error,
	} = useQuery(courseQueryOptions(courseId));

	if (isLoading)
		return (
			<div className="p-8 flex justify-center">Loading course details...</div>
		);

	if (isError)
		return (
			<div className="p-8">Error: {(error as PostgrestError).message}</div>
		);

	if (!course) {
		return <div>Course not found</div>;
	}

	return <div>this is course {course.name}</div>;
};
