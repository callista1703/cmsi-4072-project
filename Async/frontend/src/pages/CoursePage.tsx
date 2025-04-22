import { getRouteApi } from "@tanstack/react-router";
import { PostgrestError } from "@supabase/supabase-js";
import { useQuery } from "@tanstack/react-query";
import { courseQueryOptions } from "@/queries/courses";
import { Skeleton } from "@/components/ui/skeleton";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { MessageSquareMore, BookCopy, GraduationCap } from "lucide-react";

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
			<div className="p-8  text-5xl flex justify-center">
				<Skeleton className="h-96 w-1/2" />
			</div>
		);

	if (isError)
		return (
			<div className="p-8">Error: {(error as PostgrestError).message}</div>
		);

	if (!course) {
		return <div>Course not found</div>;
	}

	return (
		<div className="flex flex-col  p-6 w-full ">
			<div className="flex gap-2 items-center mb-3">
				<SidebarTrigger className="justify-start" />
				<h1 className="text-xl font-bold">{course.name}</h1>
			</div>
			<div className="flex gap-6 pb-2 border-b text-sm">
				<div className="flex gap-2 items-center">
					<BookCopy size={14} />
					<h1>Content</h1>
				</div>
				<div className="flex gap-2 items-center">
					<MessageSquareMore size={14} />
					<h1>Discussions</h1>
				</div>
				<div className="flex gap-2 items-center">
					<GraduationCap size={14} />
					<h1>Grades</h1>
				</div>
			</div>
		</div>
	);
};
