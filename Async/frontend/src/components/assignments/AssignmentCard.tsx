import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { CalendarDays, BookOpen, Clock } from "lucide-react";
import { AssignmentType } from "@/types/assignmentTypes";

type AssignmentCardProps = {
	assignment: AssignmentType;
};

export function AssignmentCard({ assignment }: AssignmentCardProps) {
	const dueDate = new Date(assignment.due_date);

	const daysUntilDue = Math.ceil(
		(dueDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
	);

	const formatDate = (date: Date) => {
		return date.toLocaleDateString("en-US", {
			weekday: "long",
			month: "short",
			day: "numeric",
		});
	};

	return (
		<Card className="min-w-xs inline-flex flex-col box-border h-full hover:shadow-lg border border-transparent hover:border-muted transition-shadow cursor-pointer">
			<CardHeader>
				<CardTitle className="text-md whitespace-nowrap">
					{assignment.title}
				</CardTitle>
				<CardDescription className="flex items-center gap-2">
					<BookOpen className="h-4 w-4" />
					CLSS201
				</CardDescription>
			</CardHeader>
			{/* <CardContent className="flex flex-grow items-center">
				<p className="text-sm text-muted-foreground">
					{assignment.description}
				</p>
			</CardContent> */}
			<CardFooter className="flex flex-col items-start justify-center space-y-2 pt-6 border-t">
				<div className="flex items-center gap-2 text-sm">
					<CalendarDays className="h-4 w-4 text-muted-foreground" />
					<span>{formatDate(dueDate)}</span>
				</div>
				<div className="flex items-center gap-2 text-sm">
					<Clock className="h-4 w-4 text-muted-foreground" />
					<span>
						{daysUntilDue === 0 ? (
							<span className="text-red-500 font-medium">Due today</span>
						) : daysUntilDue === 1 ? (
							<span className="text-red-500 font-medium">Due tomorrow</span>
						) : daysUntilDue < 0 ? (
							<span className="text-red-500 font-medium">
								Overdue by {Math.abs(daysUntilDue)} days
							</span>
						) : (
							<span>
								Due in <strong>{daysUntilDue}</strong> days
							</span>
						)}
					</span>
				</div>
			</CardFooter>
		</Card>
	);
}
