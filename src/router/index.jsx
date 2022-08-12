import { Route } from "react-router-dom";
import { Auth, Events, WeekEvents, MonthEvents, Event } from "../pages";

export const mapRoutes = (routes) => {
  function mapFunc(routes) {
    return routes.map((route, index) => {
      return (<Route key={index} path={route.path} element={route.element}>
        {route.child ? mapFunc(route.child) : null}
      </Route>)
    });
  }
  return mapFunc(routes);
};

export const routes = [
  { path: "auth", element: <Auth/> },
  {
    path: "/",
    element: <Events/>,
    child: [
      { path: "/", element: <WeekEvents/> },
      { path: "month", element: <MonthEvents />},
    ],
  },
  { path: "event/:id", element: <Event/> },
  { path: "*" },
];
