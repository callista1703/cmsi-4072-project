import { SidebarTrigger } from "@/components/ui/sidebar";
import Calendar from "@/components/Calendar";

export const CalendarPage = () => {
	return (
		<div className="flex flex-col gap-4 p-6">
			<div className="flex gap-2 items-center">
				<SidebarTrigger />
				<h1 className="text-xl font-bold">Calendar</h1>
			</div>
			<Calendar />
		</div>
	);
};
