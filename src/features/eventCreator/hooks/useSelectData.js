import { useActions } from "../../../hooks/useActions";

export const useSelectData = () => {
  const { getDataFromDays, getDataFromTime, getDataFromHours, selectGuest, getDataFromGuest } = useActions();
  const selectData = (e) => {
    e.target.dataset.name === "option-time" && getDataFromTime(+e.target.textContent.split(":")[0]);
    e.target.dataset.name === "option-days" && getDataFromDays(+e.target.textContent);
    e.target.dataset.name === "option-hours" && getDataFromHours(+e.target.textContent);
    e.target.dataset.name === "option-guest" && getDataFromGuest(e.target.textContent);
    e.target.dataset.name === "option-selectedGuest" && selectGuest(e.target.textContent);
  };

  return [selectData];
};
