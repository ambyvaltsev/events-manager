import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export const useGetEvent = () => {
  const [event, setEvent] = useState({});

  const { id } = useParams();

  const events = useSelector((state) => state.events.entities.events);

  useEffect(() => {
    const selectedEvent = events.find((event) => event.id === +id);
    setEvent(selectedEvent);
  }, [events]);
  return event;
};
