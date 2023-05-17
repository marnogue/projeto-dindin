import "./style.css";
import { NavLink } from "react-router-dom";
import { useHookContext } from "../../Context/UserContext";

export default function MenuLateral() {
  const { abrirPaginaDetalhesCliente, setAbrirPaginaDetalhesCliente, setVerTodasCobrancas,
    verTodasCobrancas, setVerTodosPagas, setVerTodosPrevistas,
    setVerTodosVencidas, setVerTodosClientes, setVerTodosInadimplentes,
    setVerTodosEmDia, setFiltro, setBusca, setMensagem } = useHookContext()
  function mostrarTodasCobrancas() {
    setVerTodasCobrancas(true);
    setVerTodosPagas(false);
    setVerTodosPrevistas(false);
    setVerTodosVencidas(false);
    setBusca('');
    setFiltro(false);
    setMensagem(false);
  }


  function verTodosClientes() {
    setVerTodosClientes(true);
    setVerTodosEmDia(false);
    setVerTodosInadimplentes(false);
    setBusca('');
    setFiltro(false);
    setMensagem(false);
  }

  function verHome() {
    setFiltro(false);
    setMensagem(false);
  }

  return (
    <nav className="menu-lateral">
      <ul>
        <NavLink
          to="/home"
          className={({ isActive }) => isActive && "selecionado"}
          onClick={verHome}
        >
          <li>
            <svg
              width="49"
              height="48"
              viewBox="0 0 49 48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M14 38.5004H34.9999C37.2091 38.5004 38.9999 36.7096 38.9999 34.5004V19.5005L24.4999 9.50049L10 19.5005V34.5004C10 36.7096 11.7909 38.5004 14 38.5004Z"
                stroke="#343447"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M19.999 31.4985C19.999 29.2893 21.79 27.4985 23.999 27.4985H24.999C27.2082 27.4985 28.999 29.2893 28.999 31.4985V38.4985H19.999V31.4985Z"
                stroke="#343447"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            Home
          </li>
        </NavLink>
        <NavLink
          to="/clientes"
          className={({ isActive }) => isActive && "selecionado"}
          onClick={verTodosClientes}
        >
          <li>
            <svg
              width="49"
              height="48"
              viewBox="0 0 49 48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              onClick={() => setAbrirPaginaDetalhesCliente(false)}
            >
              <path
                d="M12.0638 38.5H26.937C28.066 38.5 28.9544 37.5634 28.7294 36.457C28.1084 33.4024 26.0798 28 19.5004 28C12.921 28 10.8925 33.4024 10.2714 36.457C10.0464 37.5634 10.9348 38.5 12.0638 38.5Z"
                stroke="#343447"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M32 28C36.1576 28 37.8604 32.2958 38.5478 35.392C38.919 37.064 37.5666 38.5 35.8538 38.5H34"
                stroke="#343447"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M19.5 20.5C22.5376 20.5 25 18.0376 25 15C25 11.9624 22.5376 9.5 19.5 9.5C16.4624 9.5 14 11.9624 14 15C14 18.0376 16.4624 20.5 19.5 20.5Z"
                stroke="#343447"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M30 20.5C33.0376 20.5 35 18.0376 35 15C35 11.9624 33.0376 9.5 30 9.5"
                stroke="#343447"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            Clientes
          </li>
        </NavLink>
        <NavLink
          to="/cobrancas"
          className={({ isActive }) => isActive && "selecionado"}
          onClick={mostrarTodasCobrancas}
        >
          <li>
            <svg
              width="49"
              height="48"
              viewBox="0 0 49 48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M16 38.5H33C35.2092 38.5 37 36.7092 37 34.5V18L28.5 9.5H16C13.7909 9.5 12 11.2909 12 13.5V34.5C12 36.7092 13.7909 38.5 16 38.5Z"
                stroke="#343447"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M36.5 18.5H28V10"
                stroke="#343447"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            Cobrança
          </li>
        </NavLink>
      </ul>
    </nav>
  );
}
