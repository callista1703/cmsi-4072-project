import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function Dashboard() {
	return (
		<Card className="w-full">
			<CardHeader className="flex gap-2">
				<CardTitle>Dashboard</CardTitle>
			</CardHeader>
			<CardContent>
				<div className="grid gap-4 md:grid-cols-3">
					<DashboardItem title="Upcoming Assignments" value="3" />
					<DashboardItem title="Unread Messages" value="2" />
					<DashboardItem title="Next Class" value="Math 101 at 2:00 PM" />
				</div>
			</CardContent>
		</Card>
	);
}

function DashboardItem({ title, value }: { title: string; value: string }) {
	return (
		<div className="bg-muted p-4 rounded-lg">
			<h3 className="font-semibold text-sm text-muted-foreground mb-2">
				{title}
			</h3>
			<p className="text-2xl font-bold">{value}</p>
		</div>
	);
}
