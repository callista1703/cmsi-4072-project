export interface Event {
	date: string;
	time: string;
	title: string;
	description: string;
}

export type EventPreview = Omit<Event, "date">;

export interface CalendarCardProps {
	currentMonth: Date;
	setCurrentMonth: React.Dispatch<React.SetStateAction<Date>>;
	calendarDays: Date[];
	selectedDate: Date;
	setSelectedDate: React.Dispatch<React.SetStateAction<Date>>;
	events: Event[];
}

export type CalendarCellsProps = Omit<CalendarCardProps, "setCurrentMonth">;
