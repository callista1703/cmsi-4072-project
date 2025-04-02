"use client";

import { useState } from "react";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface Event {
  date: string;
  time: string;
  title: string;
  description: string;
}

const CalendarTwo = () => {
  // Automatically select today's date on load
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
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
    if (newEvent.time && newEvent.title && newEvent.description && selectedDate) {
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

  // Generate calendar days based on current month
  const generateCalendarDays = () => {
    const startOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1);
    const endOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0);

    // Start from Sunday of the first week
    const startOfCalendar = new Date(startOfMonth);
    startOfCalendar.setDate(startOfMonth.getDate() - startOfMonth.getDay());

    // End on Saturday of the last week
    const endOfCalendar = new Date(endOfMonth);
    endOfCalendar.setDate(endOfMonth.getDate() + (6 - endOfMonth.getDay()));

    const days = [];
    for (let day = new Date(startOfCalendar); day <= endOfCalendar; day.setDate(day.getDate() + 1)) {
      days.push(new Date(day));
    }
    return days;
  };

  const calendarDays = generateCalendarDays();

  return (
    <div className="p-5">
      {/* Two-column layout: Calendar (left) and Event Details (right) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar Card */}
        <Card className="lg:col-span-2 flex flex-col min-h-[600px]">
          <CardHeader>
            <CardTitle className="text-2xl">Calendar</CardTitle>
          </CardHeader>
          <CardContent className="flex-1">
            {/* Month Navigation */}
            <div className="flex justify-between items-center mb-4">
              <button className="text-gray-600 text-xl" onClick={handlePreviousMonth}>
                &lt;
              </button>
              <h2 className="text-xl font-bold">
                {currentMonth.toLocaleString("default", { month: "long" })}{" "}
                {currentMonth.getFullYear()}
              </h2>
              <button className="text-gray-600 text-xl" onClick={handleNextMonth}>
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
            <div className="grid grid-cols-7 gap-1">
              {calendarDays.map((day) => {
                const isCurrentMonth = day.getMonth() === currentMonth.getMonth();
                const isSelected = selectedDate?.toDateString() === day.toDateString();
                const isToday = day.toDateString() === new Date().toDateString();

                return (
                  <div
                    key={day.toISOString()}
                    onClick={() => handleDateClick(day)}
                    className={`
                      p-2 text-center cursor-pointer transition-colors duration-200 rounded-md
                      ${isCurrentMonth ? "text-gray-800" : "text-gray-400"}
                      ${isSelected ? "bg-gray-800 text-white" : "bg-gray-50 hover:bg-gray-100"}
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
          </CardContent>
        </Card>

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
                onClick={handleAddEvent}
                variant="default"
                className="w-full"
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
                    <div className="text-sm text-gray-600 mb-1">{event.time}</div>
                    <p className="text-gray-700">{event.description}</p>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CalendarTwo;
