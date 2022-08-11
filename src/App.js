import { BrowserRouter } from "react-router-dom";
import { Header } from "./components/header/Header";
import { AppRoutes } from "./components/appRoutes/AppRoutes";
function App() {
  return (
    <div className="App">
      <BrowserRouter basename="/events-manager">
        <Header />
        <AppRoutes />
      </BrowserRouter>
    </div>
  );
}

export default App;
