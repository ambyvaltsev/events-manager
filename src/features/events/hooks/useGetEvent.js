import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export const useGetEvent = () => {
  const [event, setEvent] = useState({});

  const { id } = useParams();

  const events = useSelector((state) => state.events.entities.events);

  useEffect(() => {
    /* const selectedEvent = events.find((event) => event.id.split("-")[1] === id); */
    const selectedEvent = events.find((event) =>
      event.exceptions.some((excep) => excep.split("-").slice(2).join(".") === id)
    );
    setEvent(selectedEvent);
  }, [events]);
  return event;
};
