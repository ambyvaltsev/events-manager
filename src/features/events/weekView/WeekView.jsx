import s from "./WeekView.module.scss";
import { time } from "../../../utils/date_arrays";
import { EventOuterView } from "../../../components/eventOuterView/EventOuterView";
import { useSelector } from "react-redux";
import { NextPrevBtns } from "../../../components/nextPrevBtns/NextPrevBtns";
import { useDataForGrid } from "./useDataForGrid";
import { useMatchMedia } from "../../../hooks/useMatchMedia";
import { useWeekDates } from "./useDatesForWeek";
import { useCheckCompletedEvents } from "./useCheckCompletedEvents";
import { CompletedEvents } from "../../../components/completedEvents/CompletedEvents";

export const WeekView = () => {
  const ticker = useSelector((state) => state.events.entities.ticker);
  const isAuth = useSelector((state) => state.auth.entities.isAuth);
  const { isTablet } = useMatchMedia();
  const events = useSelector((state) => state.events.entities);
  const { weekDates, update } = useWeekDates(ticker);
  const dataForGrid = useDataForGrid(weekDates);
  const completedEvents = useCheckCompletedEvents(events.events);
  return (
    <main className={s.container}>
      <NextPrevBtns isWeek date={weekDates} update={update} value={7} />
      <div className={s.weekDays}>
        {isTablet
          ? weekDates.map((day) => (
              <div className={s.weekDay} key={day.date}>
                <div>{`${day.weekDay.slice(0, 2)}, `}</div>
                <div>{day.date}</div>
              </div>
            ))
          : weekDates.map((day) => (
              <div className={s.weekDay} key={day.date}>
                <div>{`${day.weekDay}, `}</div>
                <div>{day.date}</div>
              </div>
            ))}
      </div>
      <div className={s.board}>
        <div className={s.time}>
          {time.map((hour) => (
            <div key={hour} className={s.hour}>
              {hour}
            </div>
          ))}
        </div>
        <div className={s.events}>
          {isAuth
            ? dataForGrid.map((data) => {
                for (let event of events.events) {
                  if (event.locations.map((e) => e.split("/")[0]).includes(data)) {
                    let index = event.locations.findIndex((item) => item.split("/")[0] === data);
                    let column = event.locations[index].split("/")[1];
                    let row = event.hours;
                    return (
                      <EventOuterView
                        event={event}
                        key={data}
                        title={event.title}
                        text={event.text}
                        style={{
                          gridColumn: `span ${column}`,
                          gridRow: `span ${row}`,
                        }}
                      />
                    );
                  }
                }
                if (!events.exceptions.includes(data)) {
                  return <div key={data} className={s.event} data-date={data}></div>;
                }
              })
            : dataForGrid.map((data) => <div key={data} className={s.event} data-date={data}></div>)}
        </div>
      </div>

      {completedEvents.length > 0 && <CompletedEvents completedEvents={completedEvents} />}
    </main>
  );
};
