import { Routes, Route, BrowserRouter } from "react-router-dom";
import { Header } from "./components/header/Header";
import { WeekView } from "./features/events/components/weekView/WeekView";
import { MonthView } from "./features/events/components/monthView/MonthView";
import { Main } from "./features/events/components/main/Main";
import { EventInnerView } from "./features/events/components/eventInnerView/EventInnerView";
import { Auth } from "./features/auth/Auth";
import { PageNotFound } from "./components/pageNotFound/PageNotFound";

function App() {
  return (
    <div className="App">
      <BrowserRouter basename="/events-manager">
        <Header />
        <Routes>
          <Route path="/" element={<Main />}>
            <Route index element={<WeekView />} />
            <Route path="month" element={<MonthView />} />
          </Route>
          <Route path="event/:id" element={<EventInnerView />} />
          <Route path="auth" element={<Auth />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
