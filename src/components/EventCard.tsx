import { FC, useState } from "react";
import Image from "next/image";
import { EventType } from "../app/views/Schedule";
import { EventTypeIcon, getBadgeClasses } from "@/constants/eventTypes";
import Event from "./Event";
import { IoClose } from "react-icons/io5";
import { BerlinDate } from "@/utils/BerlinDate";

interface EventCardProps {
  event: EventType & {
    currentDate: string;
  };
}

const EventCard: FC<EventCardProps> = ({ event }) => {
  const [showEventDetails, setShowEventDetails] = useState(false);

  // Format dates for display
  const startDate = new BerlinDate(event.startDate);
  const endDate = new BerlinDate(event.endDate);

  const formatDay = (date: BerlinDate) => {
    return date.getDate();
  };

  // Create date range string
  let dateRange = "";

  // Check if it's a single day event
  const isSameDay =
    startDate.getDate() === endDate.getDate() &&
    startDate.getMonth() === endDate.getMonth() &&
    startDate.getFullYear() === endDate.getFullYear();

  if (isSameDay) {
    // Single day event
    const month = startDate.toLocaleDateString("en-US", { month: "long" });
    dateRange = `${formatDay(startDate)} ${month}`;
  } else if (startDate.getMonth() === endDate.getMonth()) {
    // Multi-day event in the same month
    const month = startDate.toLocaleDateString("en-US", { month: "long" });
    dateRange = `${formatDay(startDate)}-${formatDay(endDate)} ${month}`;
  } else {
    // Different months case
    const startMonth = startDate.toLocaleDateString("en-US", { month: "long" });
    const endMonth = endDate.toLocaleDateString("en-US", { month: "long" });
    dateRange = `${formatDay(startDate)} ${startMonth} - ${formatDay(endDate)} ${endMonth}`;
  }

  return (
    <>
      <div
        className="bg-gray-900 rounded-lg border border-gray-800 hover:border-gray-700 transition-colors h-full flex flex-col cursor-pointer"
        onClick={() => setShowEventDetails(true)}
      >
        <div className="p-4 flex flex-col h-full">
          {/* Logo Section */}
          <div className="flex justify-center mb-4">
            {event.logo?.[0]?.url ? (
              <div className="w-16 h-16 md:w-24 md:h-24 relative">
                <Image
                  src={event.logo[0].url}
                  alt={event.eventName}
                  className="object-contain"
                  fill
                  sizes="(max-width: 768px) 100vw, 128px"
                />
              </div>
            ) : (
              <div className="w-32 h-32 bg-gray-800 rounded-lg flex items-center justify-center">
                <span className="text-gray-400 text-lg">No Image</span>
              </div>
            )}
          </div>

          {/* Event Title */}
          <h3
            className={`font-bold text-white mb-2 line-clamp-3 text-center ${
              event.eventName.length > 30 ? "text-base" : "text-xl"
            }`}
          >
            {event.eventName}
          </h3>

          {/* Date Range */}
          <div className="text-gray-400 text-center mb-3">{dateRange}</div>

          {/* Event Types */}
          <div className="flex flex-wrap gap-1 justify-center">
            {event.eventTypes.slice(0, 2).map((type) => (
              <span
                key={type}
                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getBadgeClasses(
                  type
                )}`}
              >
                <EventTypeIcon type={type} />
                <span className="ml-1">{type}</span>
              </span>
            ))}
            {event.eventTypes.length > 2 && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border border-gray-700 bg-gray-800 text-gray-300">
                +{event.eventTypes.length - 2}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Modal */}
      {showEventDetails && (
        <div
          className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50"
          onClick={() => setShowEventDetails(false)}
        >
          <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setShowEventDetails(false)}
              className="absolute right-2 top-2 z-10 p-2 hover:bg-gray-800/50 rounded-full transition-colors sm:hidden"
            >
              <IoClose className="w-6 h-6 text-gray-400 hover:text-white" />
            </button>
            <Event
              event={{
                ...event,
                dailySchedule: event.dailySchedule,
                totalDays: event.totalDays,
                dateDisplay: dateRange,
              }}
              listView={true}
              uncollapsible={true}
              hideCalendar={true}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default EventCard;
