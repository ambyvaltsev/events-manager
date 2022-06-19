import { useEffect, useState } from "react";

export const useCheckCompletedEvents = (events) => {
  const [completedEvents, setCompletedEvents] = useState([]);

  useEffect(() => {
    if (events) {
      let completed = events.filter(
        (event) =>
          new Date(event.year, event.month, event.date, event.time) <
          new Date() && !event.isPostponed
      );
      setCompletedEvents(completed);
    }
  }, [events]);

  return completedEvents
};
