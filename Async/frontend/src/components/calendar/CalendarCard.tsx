import { Card, CardContent } from "@/components/ui/card";
import { CalendarCells } from "./CalendarCells";
import { handlePreviousMonth, handleNextMonth } from "@/utils/calendar";
import { CalendarCardProps } from "@/types/calendarTypes";

export const CalendarCard = ({
	currentMonth,
	setCurrentMonth,
	calendarDays,
	selectedDate,
	setSelectedDate,
	events,
}: CalendarCardProps) => {
	return (
		<Card className="lg:col-span-2 flex flex-col h-full">
			<CardContent className="flex-1">
				{/* Month Navigation */}
				<div className="flex justify-between items-center my-6">
					<button
						className="text-gray-600 text-xl cursor-pointer"
						onClick={() => handlePreviousMonth(currentMonth, setCurrentMonth)}
					>
						&lt;
					</button>
					<h2 className="text-xl font-bold">
						{currentMonth.toLocaleString("default", { month: "long" })}{" "}
						{currentMonth.getFullYear()}
					</h2>
					<button
						className="text-gray-600 text-xl cursor-pointer"
						onClick={() => handleNextMonth(currentMonth, setCurrentMonth)}
					>
						&gt;
					</button>
				</div>

				{/* Days of the Week */}
				<div className="grid grid-cols-7 gap-1 text-gray-600 font-semibold mb-2">
					{["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
						<div key={day} className="text-center">
							{day}
						</div>
					))}
				</div>

				{/* Calendar Dates */}
				<CalendarCells
					calendarDays={calendarDays}
					currentMonth={currentMonth}
					selectedDate={selectedDate}
					setSelectedDate={setSelectedDate}
					events={events}
				/>
			</CardContent>
		</Card>
	);
};
