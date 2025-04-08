import { useQuery } from "@tanstack/react-query";
import { Assignment } from "@/types/assignment";

async function fetchAssignments(): Promise<Assignment[]> {
	// TODO: Replace with actual API call
	const response = await fetch("/api/assignments");
	if (!response.ok) {
		throw new Error("Failed to fetch assignments");
	}
	return response.json();
}

export function useAssignments() {
	return useQuery({
		queryKey: ["assignments"],
		queryFn: fetchAssignments,
		staleTime: 1000 * 60 * 5, // data fresh for 5 minutes
	});
}
