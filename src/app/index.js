import { Header } from "../components/header/Header";
import { AppRoutes } from "../components/appRoutes/AppRoutes";
import { withProviders } from "./providers";
import "./index.scss";

const App = () => {
  return (
    <div className="App">
      <>
        <Header />
        <AppRoutes />
      </>
    </div>
  );
}

export default withProviders(App);


