import { Event, EventPreview } from "@/types/calendarTypes";

export const handlePreviousMonth = (
	currentMonth: Date,
	setCurrentMonth: React.Dispatch<React.SetStateAction<Date>>
) => {
	const newMonth = new Date(currentMonth);
	newMonth.setMonth(newMonth.getMonth() - 1);
	setCurrentMonth(newMonth);
};

export const handleNextMonth = (
	currentMonth: Date,
	setCurrentMonth: React.Dispatch<React.SetStateAction<Date>>
) => {
	const newMonth = new Date(currentMonth);
	newMonth.setMonth(newMonth.getMonth() + 1);
	setCurrentMonth(newMonth);
};

export const handleDateClick = (
	day: Date,
	setSelectedDate: React.Dispatch<React.SetStateAction<Date>>
) => {
	setSelectedDate(day);
};

export const handleAddEvent = (
	newEvent: EventPreview,
	selectedDate: Date,
	setEvents: React.Dispatch<React.SetStateAction<Event[]>>,
	setNewEvent: React.Dispatch<React.SetStateAction<EventPreview>>
) => {
	if (newEvent.time && newEvent.title && newEvent.description && selectedDate) {
		const newEventEntry: Event = {
			date: selectedDate.toISOString().split("T")[0],
			time: newEvent.time,
			title: newEvent.title,
			description: newEvent.description,
		};
		setEvents((prevEvents) => [...prevEvents, newEventEntry]);
		setNewEvent({ time: "", title: "", description: "" });
	}
};

// Generate calendar days based on current month
export const generateCalendarDays = (currentMonth: Date) => {
	const startOfMonth = new Date(
		currentMonth.getFullYear(),
		currentMonth.getMonth(),
		1
	);
	const endOfMonth = new Date(
		currentMonth.getFullYear(),
		currentMonth.getMonth() + 1,
		0
	);

	// Start from Sunday of the first week
	const startOfCalendar = new Date(startOfMonth);
	startOfCalendar.setDate(startOfMonth.getDate() - startOfMonth.getDay());

	// End on Saturday of the last week
	const endOfCalendar = new Date(endOfMonth);
	endOfCalendar.setDate(endOfMonth.getDate() + (6 - endOfMonth.getDay()));

	const days = [];
	for (
		let day = new Date(startOfCalendar);
		day <= endOfCalendar;
		day.setDate(day.getDate() + 1)
	) {
		days.push(new Date(day));
	}
	return days;
};
