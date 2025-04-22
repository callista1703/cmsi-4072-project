import { handleDateClick } from "../../utils/calendar";
import { CalendarCellsProps } from "@/types/calendarTypes";

export const CalendarCells = ({
	calendarDays,
	currentMonth,
	selectedDate,
	setSelectedDate,
	events,
}: CalendarCellsProps) => {
	return (
		<div className="grid grid-cols-7 gap-3">
			{calendarDays.map((day) => {
				const isCurrentMonth = day.getMonth() === currentMonth.getMonth();
				const isSelected = selectedDate?.toDateString() === day.toDateString();
				const isToday = day.toDateString() === new Date().toDateString();

				return (
					<div
						key={day.toISOString()}
						onClick={() => handleDateClick(day, setSelectedDate)}
						className={`
                              flex flex-col items-center justify-center p-2 text-center h-18 cursor-pointer transition-colors duration-200 rounded-md
                              ${isCurrentMonth ? "text-gray-800" : "text-gray-400"}
                              ${isSelected ? "bg-blue-900 text-white" : "bg-gray-50 hover:bg-gray-100"}
                              ${isToday && !isSelected ? "font-bold underline" : ""}
                            `}
					>
						{day.getDate()}
						{/* Event Indicator */}
						{events.some(
							(event) => event.date === day.toISOString().split("T")[0]
						) && (
							<div className="w-2 h-2 bg-red-500 rounded-full mx-auto mt-1"></div>
						)}
					</div>
				);
			})}
		</div>
	);
};
