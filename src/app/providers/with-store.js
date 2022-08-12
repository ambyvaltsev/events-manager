import { Provider } from "react-redux";
import { store } from "../../store/index";

export const withStore = (component) => () => {
  return <Provider store={store}>{component()}</Provider>;
};
