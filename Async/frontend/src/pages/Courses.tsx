import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

interface Class {
	id: string;
	code: string;
	name: string;
	instructor: string;
	time: string;
}

const classes: Class[] = [
	{
		id: "1",
		code: "MATH101",
		name: "Introduction to Calculus",
		instructor: "Dr. Smith",
		time: "Mon, Wed, Fri 10:00 AM - 11:30 AM",
	},
	{
		id: "2",
		code: "ENG202",
		name: "Advanced Composition",
		instructor: "Prof. Johnson",
		time: "Tue, Thu 2:00 PM - 3:30 PM",
	},
	{
		id: "3",
		code: "HIST150",
		name: "World History",
		instructor: "Dr. Brown",
		time: "Mon, Wed 1:00 PM - 2:30 PM",
	},
	{
		id: "4",
		code: "CHEM201",
		name: "Organic Chemistry",
		instructor: "Dr. Lee",
		time: "Tue, Thu 9:00 AM - 10:30 AM",
	},
	{
		id: "5",
		code: "CS301",
		name: "Data Structures",
		instructor: "Prof. Garcia",
		time: "Mon, Wed, Fri 3:00 PM - 4:30 PM",
	},
];

export const Courses = () => {
	return (
		<>
			<div className="flex flex-col gap-4 pt-6">
				<h1 className="text-2xl font-bold">Courses - Spring 2025</h1>
				<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
					{classes.map((cls) => (
						<Card className="overflow-hidden transition-shadow hover:shadow-md">
							<CardHeader className="bg-muted p-4">
								<CardTitle className="text-lg">
									{cls.code}: {cls.name}
								</CardTitle>
							</CardHeader>
							<CardContent className="p-4">
								<p className="text-sm text-muted-foreground mb-2">
									Instructor: {cls.instructor}
								</p>
								<p className="text-sm text-muted-foreground">{cls.time}</p>
							</CardContent>
						</Card>
					))}
				</div>
			</div>
		</>
	);
};
