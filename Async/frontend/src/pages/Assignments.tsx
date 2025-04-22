import { useState, useEffect } from "react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { AssignmentSection } from "@/components/assignments/AssignmentSection";
import { AssignmentType } from "@/types/assignmentTypes";
import { supabase } from "@/supabaseClient";
import type { PostgrestError } from "@supabase/supabase-js";
import { useQuery } from "@tanstack/react-query";
import type { Database } from "@/types/database.types";

export const Assignments = () => {
	const [soonAssignments, setSoonAssignments] = useState<AssignmentType[]>([]);
	const [upcomingAssignments, setUpcomingAssignments] = useState<
		AssignmentType[]
	>([]);
	const [distantAssignments, setDistantAssignments] = useState<
		AssignmentType[]
	>([]);

	const {
		data: assignments = [],
		error,
		isLoading,
		isError,
	} = useQuery({
		queryKey: ["assignments"],
		queryFn: async () => {
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
		},
	});

	const sortByDueDate = (a: AssignmentType, b: AssignmentType) => {
		const dateA = new Date(a.due_date);
		const dateB = new Date(b.due_date);
		return dateA.getTime() - dateB.getTime();
	};

	useEffect(() => {
		const now = new Date();
		const sevenDaysFromNow = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
		const fourteenDaysFromNow = new Date(
			now.getTime() + 14 * 24 * 60 * 60 * 1000
		);

		setSoonAssignments(
			assignments
				.filter((assignment) => {
					const dueDate = new Date(assignment.due_date);
					return dueDate <= sevenDaysFromNow;
				})
				.sort(sortByDueDate)
		);

		setUpcomingAssignments(
			assignments
				.filter((assignment) => {
					const dueDate = new Date(assignment.due_date);
					return dueDate > sevenDaysFromNow && dueDate <= fourteenDaysFromNow;
				})
				.sort(sortByDueDate)
		);

		setDistantAssignments(
			assignments
				.filter((assignment) => {
					const dueDate = new Date(assignment.due_date);
					return dueDate > fourteenDaysFromNow;
				})
				.sort(sortByDueDate)
		);
	}, [assignments]);

	const scrollbarHideStyles = `
    .scrollbar-hide::-webkit-scrollbar {
      display: none;
    }
    .scrollbar-hide {
      -ms-overflow-style: none;
      scrollbar-width: none;
    }
  `;
	return (
		<div className="w-full overflow-x-hidden">
			<style>{scrollbarHideStyles}</style>
			<div className="flex flex-col gap-4 p-6 w-full ">
				<div className="flex gap-2 items-center mb-3">
					<SidebarTrigger />
					<h1 className="text-xl font-bold">Assignments</h1>
				</div>

				<div className="space-y-8 w-full">
					<AssignmentSection
						title="Soon"
						subtitle="Due within 7 days"
						urgency="high"
						assignments={soonAssignments}
					/>
					<AssignmentSection
						title="Upcoming"
						subtitle="Due within 14 days"
						urgency="medium"
						assignments={upcomingAssignments}
					/>
					<AssignmentSection
						title="Distant"
						subtitle="Due in the coming weeks"
						urgency="low"
						assignments={distantAssignments}
					/>
				</div>
			</div>
		</div>
	);
};

//? RLS only allows users to view their own data, so no filtering is needed in our query
