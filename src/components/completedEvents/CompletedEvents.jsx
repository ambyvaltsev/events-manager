import { CompletedEvent } from "./CompletedEvent";
import s from "./CompletedEvents.module.scss";

export const CompletedEvents = ({ completedEvents }) => {
  return (
    <div className={s.container}>
      <div className={s.content}>
        <h1 className={s.title}>Attention</h1>
        <p className={s.text}>These events are over</p>
        <div className={s.events}>
          {completedEvents.map((event, index) => (
            <CompletedEvent key={event.locations[0]} event={event} index={index + 1} />
          ))}
        </div>
      </div>
    </div>
  );
};
