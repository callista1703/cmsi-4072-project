import { supabase } from "@/supabaseClient";
import type { PostgrestError } from "@supabase/supabase-js";
import type { UseQueryOptions } from "@tanstack/react-query";

export type CourseRow = {
  course_id: string;
  name: string | null;
  description: string | null;
  instructor_id: string | null;
  created_at: string;
  code: string;
};

export const courseQueryKey = (courseId: string) =>
  (["courses", courseId] as const);
export const allCoursesQueryKey = (["enrolledCourses"] as const);

async function fetchCourseById(courseId: string): Promise<CourseRow> {
  const { data, error } = await supabase
    .from("Courses")
    .select("*")
    .eq("course_id", courseId)
    .single();

  if (error || !data) {
    throw error ?? new Error("Course not found");
  }

  return {
    course_id: data.course_id,
    name: data.name,
    description: data.description,
    instructor_id: data.instructor_id,
    created_at: data.created_at,
    code: (data as any).code,
  };
}

export async function fetchEnrolledCourses(): Promise<CourseRow[]> {
  const { data, error } = await supabase
    .from("Enrollments")
    .select("Courses!inner(*)");

  if (error || !data) {
    throw error ?? new Error("Could not load enrolled courses");
  }

  return (data as any[]).map(row => {
    const c = row.Courses;
    return {
      course_id: c.course_id,
      name: c.name,
      description: c.description,
      instructor_id: c.instructor_id,
      created_at: c.created_at,
      code: c.code,
    };
  });
}

export function courseQueryOptions(
  courseId: string
): UseQueryOptions<CourseRow, PostgrestError> {
  return {
    queryKey: courseQueryKey(courseId),
    queryFn: () => fetchCourseById(courseId),
  };
}

export function allCoursesQueryOptions(): UseQueryOptions<
  CourseRow[],
  PostgrestError
> {
  return {
    queryKey: allCoursesQueryKey,
    queryFn: fetchEnrolledCourses,
  };
}
