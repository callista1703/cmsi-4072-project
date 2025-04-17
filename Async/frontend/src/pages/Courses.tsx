import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PostgrestError } from "@supabase/supabase-js";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { allCoursesQueryOptions } from "@/queries/courses";

export const Courses = () => {
	const {
		data: courses = [],
		isLoading,
		isError,
		error,
	} = useQuery(allCoursesQueryOptions());

	if (isLoading) return <div>Loading...</div>;

	if (isError)
		return (
			<div className="p-8">Error: {(error as PostgrestError).message}</div>
		);

	return (
		<>
			<div className="flex flex-col gap-4 pt-6 w-full px-6">
				<div className="flex justify-between ">
					<div className="flex gap-2 items-center mb-3">
						<SidebarTrigger />
						<h1 className="text-xl font-bold">Courses</h1>
					</div>
					<Button variant="default" className="bg-blue-900">
						Join Course
					</Button>
				</div>
				<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
					{courses.map((course) => (
						<Link
							to="/courses/$courseId"
							params={{ courseId: course.course_id }}
							key={course.course_id}
						>
							<Card className="overflow-hidden transition-shadow hover:shadow-xl border border-transparent hover:border-blue-900">
								<CardHeader className="bg-muted p-4">
									<CardTitle className="text-lg">{course.name}</CardTitle>
								</CardHeader>
								<CardContent className="p-4">
									<p className="text-sm text-muted-foreground mb-2">
										{course.description}
									</p>
								</CardContent>
							</Card>
						</Link>
					))}
				</div>
			</div>
		</>
	);
};
