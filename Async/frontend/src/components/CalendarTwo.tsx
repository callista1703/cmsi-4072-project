"use client";

import { useState } from "react";

interface Event {
	date: string;
	time: string;
	title: string;
	description: string;
}

const CalendarTwo = () => {
	const [currentMonth, setCurrentMonth] = useState(new Date());
	const [selectedDate, setSelectedDate] = useState(new Date());
	const [events, setEvents] = useState<Event[]>([]);
	const [newEvent, setNewEvent] = useState({
		time: "",
		title: "",
		description: "",
	});

	const handlePreviousMonth = () => {
		const newMonth = new Date(currentMonth);
		newMonth.setMonth(newMonth.getMonth() - 1);
		setCurrentMonth(newMonth);
	};

	const handleNextMonth = () => {
		const newMonth = new Date(currentMonth);
		newMonth.setMonth(newMonth.getMonth() + 1);
		setCurrentMonth(newMonth);
	};

	const handleDateClick = (day: Date) => {
		setSelectedDate(day);
	};

	const handleAddEvent = () => {
		if (
			newEvent.time &&
			newEvent.title &&
			newEvent.description &&
			selectedDate
		) {
			const newEventEntry: Event = {
				date: selectedDate.toISOString().split("T")[0],
				time: newEvent.time,
				title: newEvent.title,
				description: newEvent.description,
			};

			setEvents([...events, newEventEntry]);
			setNewEvent({ time: "", title: "", description: "" });
		}
	};

	const generateCalendarDays = () => {
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
		const startOfCalendar = new Date(startOfMonth);
		startOfCalendar.setDate(startOfMonth.getDate() - startOfMonth.getDay());

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

	const calendarDays = generateCalendarDays();

	return (
		<div className="flex justify-around p-5">
			<div className="w-3/5">
				<div className="bg-white rounded-lg shadow-md p-5">
					<h1 className="text-center mb-5 text-2xl font-bold text-gray-800">
						Calendar
					</h1>
					<div className="flex justify-between items-center mb-4">
						<button
							className="bg-transparent border-none text-xl cursor-pointer text-gray-600"
							onClick={handlePreviousMonth}
						>
							{"<"}
						</button>
						<h2 className="text-xl text-gray-700">
							{currentMonth.toLocaleString("default", { month: "long" })}{" "}
							{currentMonth.getFullYear()}
						</h2>
						<button
							className="bg-transparent border-none text-xl cursor-pointer text-gray-600"
							onClick={handleNextMonth}
						>
							{">"}
						</button>
					</div>
					<div className="grid grid-cols-7 gap-1 mb-2 text-gray-600">
						{["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
							<span key={day} className="text-center">
								{day}
							</span>
						))}
					</div>
					<div className="grid grid-cols-7 gap-1">
						{calendarDays.map((day) => (
							<div
								key={day.toISOString()}
								className={`p-2 border border-gray-200 text-center cursor-pointer transition-colors duration-200
                  ${day.getMonth() === currentMonth.getMonth() ? "text-gray-800" : "text-gray-400"}
                  ${selectedDate?.toDateString() === day.toDateString() ? "bg-blue-500 text-white" : ""}
                  ${day.toDateString() === new Date().toDateString() ? "font-bold text-blue-600" : ""}
                  hover:bg-gray-100`}
								onClick={() => handleDateClick(day)}
							>
								{day.getDate()}
								{events.some(
									(event) => event.date === day.toISOString().split("T")[0]
								) && (
									<div className="w-2 h-2 bg-red-500 rounded-full mx-auto mt-1"></div>
								)}
							</div>
						))}
					</div>
				</div>
			</div>
			<div className="w-1/3 p-5 bg-gray-100 rounded-lg">
				<h2 className="text-xl mb-4 text-gray-800">
					{selectedDate
						? `Selected Date: ${selectedDate.toDateString()}`
						: "Select a date"}
				</h2>
				<div className="mb-5">
					<div className="flex items-center mb-2">
						<label className="mr-2 text-gray-700">Time:</label>
						<input
							type="time"
							value={newEvent.time}
							onChange={(e) =>
								setNewEvent({ ...newEvent, time: e.target.value })
							}
							className="p-2 border border-gray-300 rounded"
						/>
					</div>
					<div className="space-y-2">
						<input
							type="text"
							placeholder="Enter Event Title"
							value={newEvent.title}
							onChange={(e) =>
								setNewEvent({ ...newEvent, title: e.target.value })
							}
							className="w-full p-2 border border-gray-300 rounded"
						/>
						<textarea
							placeholder="Enter Event Description"
							value={newEvent.description}
							onChange={(e) =>
								setNewEvent({ ...newEvent, description: e.target.value })
							}
							className="w-full p-2 border border-gray-300 rounded"
						></textarea>
					</div>
					<button
						className="mt-2 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors duration-200"
						onClick={handleAddEvent}
					>
						Add Event
					</button>
				</div>
				<div className="space-y-2">
					{events
						.filter(
							(event) =>
								event.date === selectedDate?.toISOString().split("T")[0]
						)
						.map((event, index) => (
							<div
								key={index}
								className="p-3 border border-gray-200 rounded bg-white"
							>
								<h3 className="text-lg font-semibold text-gray-800">
									{event.title}
								</h3>
								<div className="text-sm text-gray-600 mb-1">{event.time}</div>
								<p className="text-gray-700">{event.description}</p>
							</div>
						))}
				</div>
			</div>
		</div>
	);
};

export default CalendarTwo;
