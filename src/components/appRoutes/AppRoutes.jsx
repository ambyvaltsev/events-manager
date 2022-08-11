import { Routes } from "react-router-dom";
import { routes, mapRoutes } from "../../router";

export const AppRoutes = () => {
  return (
    <>
      <Routes> {mapRoutes(routes)}</Routes>
    </>
  );
};
