import { Route } from "react-router-dom";
import { AuthPage, EventsPage, WeekPage, MonthPage, EventPage } from "../pages";

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
  { path: "auth", element: <AuthPage/> },
  {
    path: "/",
    element: <EventsPage/>,
    child: [
      { path: "/", element: <WeekPage/> },
      { path: "month", element: <MonthPage />},
    ],
  },
  { path: "event/:id", element: <EventPage/> },
  { path: "*" },
];
