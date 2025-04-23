import { useState, useEffect } from "react";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { handleAddEvent, generateCalendarDays } from "@/utils/calendar";
import { CalendarCard } from "./CalendarCard";
import { Event, EventPreview } from "@/types/calendarTypes";
import { useQuery } from "@tanstack/react-query";
import { assignmentQueryOptions } from "@/queries/assignments";

const Calendar = () => {
	const [currentMonth, setCurrentMonth] = useState(new Date());
	const [selectedDate, setSelectedDate] = useState<Date>(new Date());
	const [newEvent, setNewEvent] = useState<EventPreview>({
		time: "",
		title: "",
		description: "",
	});
	const [events, setEvents] = useState<Event[]>([]);

	const { data: assignments = [] } = useQuery(assignmentQueryOptions());

	useEffect(() => {
		const assignmentEvents: Event[] = assignments.map((a) => ({
			date: a.due_date.includes("T") ? a.due_date.split("T")[0] : a.due_date,
			title: a.title ?? "",
			time: "",
			description: a.description || "",
		}));
		setEvents(assignmentEvents);
	}, [assignments]);

	const calendarDays = generateCalendarDays(currentMonth);

	return (
		<>
			<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
				<CalendarCard
					currentMonth={currentMonth}
					setCurrentMonth={setCurrentMonth}
					calendarDays={calendarDays}
					selectedDate={selectedDate}
					setSelectedDate={setSelectedDate}
					events={events}
				/>

				{/* Event Details Card */}
				<Card className="flex flex-col min-h-[600px]">
					<CardHeader>
						<CardTitle className="text-2xl">
							Selected Date: {selectedDate.toDateString()}
						</CardTitle>
					</CardHeader>
					<CardContent className="flex-1 flex flex-col">
						<div className="space-y-4">
							{/* Time Input */}
							<div>
								<label className="block text-sm font-medium text-gray-700">
									Time:
								</label>
								<input
									type="time"
									value={newEvent.time}
									onChange={(e) =>
										setNewEvent({ ...newEvent, time: e.target.value })
									}
									className="mt-1 p-2 block w-full border border-gray-300 rounded"
								/>
							</div>

							{/* Event Title Input */}
							<div>
								<label className="block text-sm font-medium text-gray-700">
									Event Title:
								</label>
								<input
									type="text"
									placeholder="Enter Event Title"
									value={newEvent.title}
									onChange={(e) =>
										setNewEvent({ ...newEvent, title: e.target.value })
									}
									className="mt-1 p-2 block w-full border border-gray-300 rounded"
								/>
							</div>

							{/* Event Description Input */}
							<div>
								<label className="block text-sm font-medium text-gray-700">
									Event Description:
								</label>
								<textarea
									placeholder="Enter Event Description"
									value={newEvent.description}
									onChange={(e) =>
										setNewEvent({ ...newEvent, description: e.target.value })
									}
									className="mt-1 p-2 block w-full border border-gray-300 rounded"
								/>
							</div>

							{/* Add Event Button */}
							<Button
								onClick={() =>
									handleAddEvent(
										newEvent, // Pass newEvent as EventPreview
										selectedDate,
										setEvents,
										setNewEvent
									)
								}
								variant="default"
								className="w-full bg-blue-900"
							>
								Add Event
							</Button>
						</div>

						{/* Scrollable Events List */}
						<div className="mt-6 space-y-4 overflow-y-auto">
							{events
								.filter(
									(event) =>
										event.date === selectedDate.toISOString().split("T")[0]
								)
								.map((event, index) => (
									<div
										key={index}
										className="p-3 border border-gray-200 rounded bg-white"
									>
										<h3 className="text-lg font-semibold text-gray-800">
											{event.title}
										</h3>
										<div className="text-sm text-gray-600 mb-1">
											{event.date}
										</div>
										<p className="text-gray-700">{event.description}</p>
									</div>
								))}
						</div>
					</CardContent>
				</Card>
			</div>
		</>
	);
};

export default Calendar;
