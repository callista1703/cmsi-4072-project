import { Dashboard } from "@/components/Dashboard";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Courses } from "@/components/Courses";
import Calendar from "@/components/calendar/Calendar";

export default function Home() {
	return (
		<>
			<div className="flex-1 p-6 bg-white">
				<div className="flex gap-2 items-center mb-3">
					<SidebarTrigger />
					<h1 className="text-xl font-bold">Welcome!</h1>
				</div>
				<div className="grid gap-6">
					<Dashboard />
					<Calendar />
					<Courses />
				</div>
			</div>
			;
		</>
	);
}
