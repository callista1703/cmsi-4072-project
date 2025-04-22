import { AssignmentCard } from "./AssignmentCard";
import { Circle } from "lucide-react";
import { AssignmentType } from "@/types/assignmentTypes";

type UrgencyLevel = "high" | "medium" | "low";

type AssignmentSectionProps = {
	title: string;
	subtitle: string;
	assignments: AssignmentType[];
	urgency: UrgencyLevel;
};

const urgencyColors: Record<UrgencyLevel, { bg: string; text: string }> = {
	high: { bg: "rgb(239 68 68)", text: "rgb(239 68 68)" }, // red-500
	medium: { bg: "rgb(234 179 8)", text: "rgb(234 179 8)" }, // yellow-500
	low: { bg: "rgb(34 197 94)", text: "rgb(34 197 94)" }, // green-500
};

export const AssignmentSection = ({
	title,
	subtitle,
	assignments,
	urgency,
}: AssignmentSectionProps) => {
	return (
		<section className="p-6 rounded-lg border bg-sidebar shadow-sm overflow-hidden max-w-full">
			<div className="mb-4">
				<div className="flex items-center gap-2">
					<Circle
						size={12}
						fill={urgencyColors[urgency].bg}
						color={urgencyColors[urgency].text}
					/>
					<h2 className="text-xl font-semibold">{title}</h2>
				</div>
				<p className="text-muted-foreground">{subtitle}</p>
			</div>

			{assignments.length === 0 ? (
				<p className="text-muted-foreground italic">
					No assignments in this period
				</p>
			) : (
				<div className="w-full">
					<div className="flex overflow-x-auto pb-4 space-x-4 scrollbar-hide">
						{assignments.map((assignment) => (
							<AssignmentCard assignment={assignment} />
						))}
					</div>
				</div>
			)}
		</section>
	);
};
