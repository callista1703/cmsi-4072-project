import { supabase } from "@/supabaseClient";
import type { PostgrestError } from "@supabase/supabase-js";
import type { UseQueryOptions } from "@tanstack/react-query";
import type { Database } from "@/types/database.types";

type AssignmentRow = Database["public"]["Tables"]["Assignments"]["Row"];

export const assignmentQueryKey = ["assignments"] as const;

const fetchAssignments = async (): Promise<AssignmentRow[]> => {
	// First get the user's enrollments
	const { data: enrollments, error: enrollmentsError } = await supabase
		.from("Enrollments")
		.select("course_id");

	if (enrollmentsError) throw enrollmentsError;
	if (!enrollments?.length) return [];

	// Then get assignments for those courses
	const { data: assignments, error: assignmentsError } = await supabase
		.from("Assignments")
		.select("*")
		.in(
			"course_id",
			enrollments.map((e) => e.course_id)
		)
		.order("due_date", { ascending: true });

	if (assignmentsError) throw assignmentsError;

	return assignments;
};

export function assignmentQueryOptions(): UseQueryOptions<
	AssignmentRow[],
	PostgrestError
> {
	return {
		queryKey: assignmentQueryKey,
		queryFn: () => fetchAssignments(),
	};
}
