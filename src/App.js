import { BrowserRouter } from "react-router-dom";
import { PrimeReactProvider } from "primereact/api";
import { AppRoutes } from "./routes/Routes";
import { AuthEmailProvider } from "./contexts/authEmail";
import NavBar from "./components/partials/NavBar";
import "./App.css";

function App() {
  return (
    <AuthEmailProvider>
      <PrimeReactProvider>
        <BrowserRouter>
          <NavBar />
          <AppRoutes />
        </BrowserRouter>
      </PrimeReactProvider>
    </AuthEmailProvider>
  );
}

export default App;
