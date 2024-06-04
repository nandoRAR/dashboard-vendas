import { Routes, Route } from "react-router-dom";
import { PrivateRoutes } from "./privateRoutes";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import AddClient from "../pages/AddCliente";
import Cliente from "../pages/Cliente";
import ChartPage from "../pages/ChartPage";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<PrivateRoutes />}>
        <Route path="/" element={<Dashboard />}/>
      </Route>
      <Route path="/addCliente" element={<PrivateRoutes />}>
        <Route path="/addCliente" element={<AddClient />}/>
      </Route>
      <Route path="/cliente/:id" element={<PrivateRoutes />}>
        <Route path="/cliente/:id" element={<Cliente />}/>
      </Route>
      <Route path="/graficos/" element={<PrivateRoutes />}>
        <Route path="/graficos/" element={<ChartPage />}/>
      </Route>
    </Routes>
  );
};
