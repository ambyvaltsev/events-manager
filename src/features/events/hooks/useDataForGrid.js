import { useState, useEffect } from "react";
import { time } from "../../../utils/date_arrays";

const getDataForGrid = (week) => {
  return time.reduce((acc, cur) => {
    for (let i = 0; i < 7; i++) {
      let cell = `${cur.split(":")[0]}-${i + 1}-${week[i].date}-${week[i].month}-${week[i].year}`;
      acc.push(cell);
    }
    return acc;
  }, []);
};

export const useDataForGrid = (week) => {
  const [dataForGrid, setDataForGrid] = useState(getDataForGrid(week));

  useEffect(() => {
    setDataForGrid(getDataForGrid(week));
  }, [week]);

  return dataForGrid;
};
