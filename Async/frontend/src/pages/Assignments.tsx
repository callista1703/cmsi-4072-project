import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { CalendarDays, BookOpen, Clock, Circle } from "lucide-react";
import { useState, useEffect } from "react";
import { SidebarTrigger } from "@/components/ui/sidebar";

// Sample assignment data
const sampleAssignments = [
	{
		id: 1,
		title: "Research Paper: Modern Architecture",
		course: "ARC101",
		dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // 2 days from now
		priority: "high",
		description: "5-page research paper on modern architectural movements",
	},
	{
		id: 2,
		title: "Problem Set 3: Linear Algebra",
		course: "MATH240",
		dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days from now
		priority: "medium",
		description: "Complete problems 1-20 in chapter 4",
	},
	{
		id: 3,
		title: "Group Project: Market Analysis",
		course: "BUS330",
		dueDate: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000), // 10 days from now
		priority: "high",
		description: "Analyze market trends for assigned industry sector",
	},
	{
		id: 4,
		title: "Lab Report: Chemical Reactions",
		course: "CHEM201",
		dueDate: new Date(Date.now() + 12 * 24 * 60 * 60 * 1000), // 12 days from now
		priority: "medium",
		description: "Document and analyze results from last week's lab experiment",
	},
	{
		id: 5,
		title: "Final Project: Web Application",
		course: "CS350",
		dueDate: new Date(Date.now() + 20 * 24 * 60 * 60 * 1000), // 20 days from now
		priority: "high",
		description: "Build a full-stack web application with documentation",
	},
	{
		id: 6,
		title: "Term Paper: Global Economics",
		course: "ECON400",
		dueDate: new Date(Date.now() + 25 * 24 * 60 * 60 * 1000), // 25 days from now
		priority: "medium",
		description: "10-page analysis of current global economic trends",
	},
	// Additional assignments for the "Soon" section
	{
		id: 7,
		title: "Essay: Shakespeare Analysis",
		course: "ENG220",
		dueDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000), // 1 day from now
		priority: "high",
		description: "Critical analysis of themes in Hamlet",
	},
	{
		id: 8,
		title: "Quiz Preparation: Cell Biology",
		course: "BIO101",
		dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // 2 days from now
		priority: "medium",
		description: "Study chapters 5-7 for in-class quiz",
	},
	{
		id: 9,
		title: "Presentation: Renewable Energy",
		course: "ENV300",
		dueDate: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000), // 4 days from now
		priority: "high",
		description: "10-minute presentation on a renewable energy source",
	},
	{
		id: 10,
		title: "Code Review: Python Project",
		course: "CS210",
		dueDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), // 5 days from now
		priority: "low",
		description: "Peer review of classmate's Python project",
	},
	{
		id: 11,
		title: "Reading Response: Political Theory",
		course: "POL202",
		dueDate: new Date(Date.now() + 6 * 24 * 60 * 60 * 1000), // 6 days from now
		priority: "medium",
		description: "2-page response to assigned readings",
	},
	{
		id: 12,
		title: "Problem Set: Quantum Physics",
		course: "PHYS401",
		dueDate: new Date(Date.now() + 6 * 24 * 60 * 60 * 1000), // 6 days from now
		priority: "high",
		description: "Solve problems 15-30 from chapter 8",
	},
	{
		id: 13,
		title: "Discussion Post: Ethics in Business",
		course: "BUS220",
		dueDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000), // 1 day from now
		priority: "low",
		description: "Respond to discussion prompt and reply to two classmates",
	},
];

// Assignment type definition
type Assignment = {
	id: number;
	title: string;
	course: string;
	dueDate: Date;
	priority: "low" | "medium" | "high";
	description: string;
};

type UrgencyLevel = "high" | "medium" | "low";

const urgencyColors: Record<UrgencyLevel, { bg: string; text: string }> = {
	high: { bg: "rgb(239 68 68)", text: "rgb(239 68 68)" },    // red-500
	medium: { bg: "rgb(234 179 8)", text: "rgb(234 179 8)" },  // yellow-500
	low: { bg: "rgb(34 197 94)", text: "rgb(34 197 94)" },     // green-500
};

export const Assignments = () => {
	const [assignments, setAssignments] = useState<Assignment[]>(
		sampleAssignments as Assignment[]
	);
	const [soonAssignments, setSoonAssignments] = useState<Assignment[]>([]);
	const [upcomingAssignments, setUpcomingAssignments] = useState<Assignment[]>(
		[]
	);
	const [distantAssignments, setDistantAssignments] = useState<Assignment[]>(
		[]
	);
	useEffect(() => {
		const now = new Date();
		const sevenDaysFromNow = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
		const fourteenDaysFromNow = new Date(
			now.getTime() + 14 * 24 * 60 * 60 * 1000
		);

		setSoonAssignments(
			assignments.filter((assignment) => assignment.dueDate <= sevenDaysFromNow)
		);

		setUpcomingAssignments(
			assignments.filter(
				(assignment) =>
					assignment.dueDate > sevenDaysFromNow &&
					assignment.dueDate <= fourteenDaysFromNow
			)
		);

		setDistantAssignments(
			assignments.filter(
				(assignment) => assignment.dueDate > fourteenDaysFromNow
			)
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
		<div className="w-full max-w-full overflow-x-hidden">
			<style>{scrollbarHideStyles}</style>
			<div className="flex flex-col gap-4 py-6 w-full px-6">
				<div className="flex gap-2 items-center mb-3">
					<SidebarTrigger />
					<h1 className="text-3xl font-bold">Assignments</h1>
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

function AssignmentSection({
	title,
	subtitle,
	assignments,
	urgency,
}: {
	title: string;
	subtitle: string;
	assignments: Assignment[];
	urgency: UrgencyLevel;
}) {
	return (
		<section className="p-6 rounded-lg border bg-card shadow-sm overflow-hidden max-w-full">
			<div className="mb-4">
				<div className="flex items-center gap-2">
					<Circle 
						size={12} 
						fill={urgencyColors[urgency].bg} 
						color={urgencyColors[urgency].text} 
					/>
					<h2 className="text-2xl font-semibold">{title}</h2>
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
							<div key={assignment.id} className="flex-none w-[300px]">
								<AssignmentCard assignment={assignment} />
							</div>
						))}
					</div>
				</div>
			)}
		</section>
	);
}

function AssignmentCard({ assignment }: { assignment: Assignment }) {
	const daysUntilDue = Math.ceil(
		(assignment.dueDate.getTime() - new Date().getTime()) /
			(1000 * 60 * 60 * 24)
	);

	const formatDate = (date: Date) => {
		return date.toLocaleDateString("en-US", {
			weekday: "short",
			month: "short",
			day: "numeric",
		});
	};

	return (
		<>
			<Card className="h-full flex flex-col">
				<CardHeader>
					<div className="flex justify-between items-start">
						<CardTitle className="text-lg">{assignment.title}</CardTitle>
					</div>
					<CardDescription className="flex items-center gap-1">
						<BookOpen className="h-4 w-4" />
						{assignment.course}
					</CardDescription>
				</CardHeader>
				<CardContent className="flex-grow">
					<p className="text-sm text-muted-foreground">
						{assignment.description}
					</p>
				</CardContent>
				<CardFooter className="flex flex-col items-start space-y-2 pt-2 border-t">
					<div className="flex items-center gap-1 text-sm">
						<CalendarDays className="h-4 w-4 text-muted-foreground" />
						<span>{formatDate(assignment.dueDate)}</span>
					</div>
					<div className="flex items-center gap-1 text-sm">
						<Clock className="h-4 w-4 text-muted-foreground" />
						<span>
							{daysUntilDue === 0 ? (
								<span className="text-red-500 font-medium">Due today</span>
							) : daysUntilDue === 1 ? (
								<span className="text-red-500 font-medium">Due tomorrow</span>
							) : (
								<span>
									Due in <strong>{daysUntilDue}</strong> days
								</span>
							)}
						</span>
					</div>
				</CardFooter>
			</Card>
		</>
	);
}
