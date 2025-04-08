import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { supabase } from "@/supabaseClient"; // Adjust the import path as necessary
import { useState, useEffect } from "react";
import { Database } from "types/database.types";
import { PostgrestError } from "@supabase/supabase-js";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Circle } from "lucide-react";

type Course = Database["public"]["Tables"]["Courses"]["Row"];
type EnrollmentWithCourse = {
	course_id: string;
	Courses: Course;
};

export const Courses = () => {
	const [courses, setCourses] = useState<Course[]>([]);
	const [error, setError] = useState<PostgrestError | null>(null);
	const [loading, setLoading] = useState(true);
	const [userId, setUserId] = useState<string | null>(null);

	useEffect(() => {
		const getUser = async () => {
			const {
				data: { user },
			} = await supabase.auth.getUser();
			if (user) {
				setUserId(user.id);
			}
		};

		getUser();
	}, []);

	useEffect(() => {
		if (!userId) return;

		const fetchEnrolledCourses = async () => {
			try {
				console.log("Fetching courses for user:", userId);
				const { data, error } = await supabase
					.from("Enrollments")
					.select(
						`
						course_id,
						Courses!inner (
							course_id,
							*
						)
					`
					)
					// .eq('user_id', userId) <--- RLS policy only allows users to view their own data
					.order("created_at", { ascending: true, referencedTable: "Courses" });

				if (error) {
					// console.error('Supabase error:', error);
					setError(error);
					return;
				}

				console.log("Raw data:", data);

				// Transform the data to get just the courses
				const enrolledCourses = (data as EnrollmentWithCourse[])
					.map((enrollment) => {
						// console.log('Processing enrollment:', enrollment);
						return enrollment.Courses;
					})
					.filter((course): course is Course => course !== null);

				// console.log('Transformed courses:', enrolledCourses);

				setCourses(enrolledCourses);
			} catch (err) {
				console.error("Error fetching courses:", err);
				setError(err as PostgrestError);
			} finally {
				setLoading(false);
			}
		};

		fetchEnrolledCourses();
	}, [userId]);

	if (loading) return <div>Loading...</div>;
	if (error) return <div>Error: {error.message}</div>;
	console.log(courses);

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
						<Card
							key={course.course_id}
							className="overflow-hidden transition-shadow hover:shadow-md"
						>
							<CardHeader className="bg-muted p-4">
								<CardTitle className="text-lg">{course.name}</CardTitle>
							</CardHeader>
							<CardContent className="p-4">
								<p className="text-sm text-muted-foreground mb-2">
									{course.description}
								</p>
							</CardContent>
						</Card>
					))}
				</div>
			</div>
		</>
	);
};
