import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function Calendar() {
	const currentDate = new Date();
	const daysInMonth = new Date(
		currentDate.getFullYear(),
		currentDate.getMonth() + 1,
		0
	).getDate();
	const firstDayOfMonth = new Date(
		currentDate.getFullYear(),
		currentDate.getMonth(),
		1
	).getDay();

	const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

	return (
		<Card className="w-full">
			<CardHeader>
				<CardTitle>Calendar Preview</CardTitle>
			</CardHeader>
			<CardContent>
				<div className="grid grid-cols-7 gap-2 text-center">
					{["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
						<div key={day} className="font-semibold">
							{day}
						</div>
					))}
					{Array(firstDayOfMonth)
						.fill(null)
						.map((_, index) => (
							<div key={`empty-${index}`} />
						))}
					{days.map((day) => (
						<div
							key={day}
							className={`p-2 rounded-full ${
								day === currentDate.getDate()
									? "bg-primary text-primary-foreground"
									: ""
							}`}
						>
							{day}
						</div>
					))}
				</div>
			</CardContent>
		</Card>
	);
}
