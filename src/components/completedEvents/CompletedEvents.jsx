import { CompletedEvent } from "./CompletedEvent";
import s from "./CompletedEvents.module.scss";

export const CompletedEvents = ({ completedEvents }) => {
  return (
    <div className={s.container}>
      <div className={s.content}>
        <h3 className={s.text}>These events have expired</h3>
        <div className={s.events}>
          {completedEvents.map((event, index) => (
            <CompletedEvent key={event.locations[0]} event={event} index={index + 1} />
          ))}
        </div>
      </div>
    </div>
  );
};
