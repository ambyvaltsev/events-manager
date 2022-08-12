import s from "./weekEvents.module.scss";
import { time } from "../../utils/date_arrays";
import { EventItem } from "./components/eventItem/EventItem";
import { useSelector } from "react-redux";
import { Navigator } from "../../components/navigator/Navigator";
import { useDataForGrid, useWeekDates } from "./hooks";
import { useMatchMedia } from "../../hooks/useMatchMedia";

export const WeekEvents = () => {
  const { ticker, events, exceptions } = useSelector((state) => state.events.entities);
  const isAuth = useSelector((state) => state.auth.entities.isAuth);
  const { isTablet } = useMatchMedia();
  const { weekDates, update } = useWeekDates(ticker);
  const dataForGrid = useDataForGrid(weekDates);
  return (
    <main className={s.container}>
      <Navigator isWeek date={weekDates} update={update} value={7} />
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
                for (let event of events) {
                  if (event.locations.map((e) => e.split("/")[0]).includes(data)) {
                    let index = event.locations.findIndex((item) => item.split("/")[0] === data);
                    let column = event.locations[index].split("/")[1];
                    let row = event.hours;
                    return (
                      <EventItem
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
                if (!exceptions.includes(data)) {
                  return <div key={data} className={s.event} data-date={data}></div>;
                }
              })
            : dataForGrid.map((data) => <div key={data} className={s.event} data-date={data}></div>)}
        </div>
      </div>
    </main>
  );
};
