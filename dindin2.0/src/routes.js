import Clientes from "./pages/Clientes";
import Home from "./pages/Home";
import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import Cadastro1 from "./pages/Cadastro1";
import Cadastro2 from "./pages/Cadastro2";
import Login from "./pages/Login";
import DetalheDoCliente from "./pages/Detalhe-do-Cliente";
import Cobrancas from "./pages/Cobranças";
import { getItem } from "./Utils/storage";
import { Contexto } from "./Context/UserContext";

function RotasProtegidas({ redirectTo }) {
  const autenticado = getItem("token");

  return autenticado ? <Outlet /> : <Navigate to={redirectTo} />;
}

export default function RotasPrincipais() {
  return (
    <Contexto>
      <Routes>
        <Route path="/">
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
        </Route>

        <Route path="/cadastro" element={<Cadastro1 />} />
        <Route path="/cadastro-senha" element={<Cadastro2 />} />

        <Route element={<RotasProtegidas redirectTo="/" />}>
          <Route path="/home" element={<Home />} />
          <Route path="/clientes" element={<Clientes />} />
          <Route path="/cobrancas" element={<Cobrancas />} />
          <Route path="/detalhe-cliente" element={<DetalheDoCliente />} />
        </Route>
      </Routes>
    </Contexto>
  );
}
