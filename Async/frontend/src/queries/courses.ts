import { supabase } from "@/supabaseClient";
import type { PostgrestError } from "@supabase/supabase-js";
import type { UseQueryOptions } from "@tanstack/react-query";
import type { Database } from "@/types/database.types";

type CourseRow = Database["public"]["Tables"]["Courses"]["Row"];

export const courseQueryKey = (courseId: string) =>
	["courses", courseId] as const;

export const allCoursesQueryKey = ["enrolledCourses"] as const;

async function fetchCourseById(courseId: string): Promise<CourseRow> {
	const { data, error } = await supabase
		.from("Courses")
		.select("*")
		.eq("course_id", courseId)
		.single();

	if (error || !data) {
		throw error ?? new Error("Course not found");
	}
	return data;
}

export async function fetchEnrolledCourses(): Promise<CourseRow[]> {
	const { data, error } = await supabase
		.from("Enrollments")
		.select("course_id, Courses!inner(*)")
		.order("created_at", {
			ascending: true,
			referencedTable: "Courses",
		});

	if (error || !data) {
		throw error ?? new Error("Could not load enrolled courses");
	}

	const enrolledCourses = data
		.map((enrollment) => {
			return enrollment.Courses;
		})
		.filter((course): course is CourseRow => course !== null);

	return enrolledCourses;
}

export function courseQueryOptions(
	courseId: string
): UseQueryOptions<CourseRow, PostgrestError> {
	return {
		queryKey: courseQueryKey(courseId),
		queryFn: () => fetchCourseById(courseId),
	};
}

export function allCoursesQueryOptions(): UseQueryOptions<CourseRow[]> {
	return {
		queryKey: allCoursesQueryKey,
		queryFn: () => fetchEnrolledCourses(),
	};
}

//? RLS only allows users to view their own data, so no filtering is needed in our query
