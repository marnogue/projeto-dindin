import { useContext, useState } from "react";
import { createContext } from "react";

const UserContext = createContext({});

export function Contexto({ children }) {
  const [abrirModalCobrança, setAbrirModalCobrança] = useState(false);
  const [modalCadastrarCliente, setModalCadastrarCliente] = useState(false);
  const [modalEditarCadastro, setModalEditarCadastro] = useState(false);
  const [abrirPaginaDetalhesCliente, setAbrirPaginaDetalhesCliente] =
    useState(false);
  const [modalCadastrarCobranca, setModalCadastrarCobranca] = useState(false);
  const [nome, setNome] = useState("");
  const [clienteId, setClienteId] = useState("");
  const [nomeCliente, setNomeCliente] = useState("");
  const [abrirModalEditarCliente, setAbrirModalEditarCliente] = useState(false);
  const [mostrarNotificacao, setMostrarNotificacao] = useState(false);
  const [verTodosPagas, setVerTodosPagas] = useState(false);
  const [verTodosPrevistas, setVerTodosPrevistas] = useState(false);
  const [verTodosVencidas, setVerTodosVencidas] = useState(false);
  const [verTodasCobrancas, setVerTodasCobrancas] = useState(false);
  const [abrirModalDetalheCobranca, setAbrirModalDetalheCobranca] = useState(false);
  const [abrirModalDeletarCobranca, setAbrirModalDeletarCobranca] = useState(false);
  const [verTodosClientes, setVerTodosClientes] = useState(false);
  const [verTodosInadimplentes, setVerTodosInadimplentes] = useState(false);
  const [verTodosEmDia, setVerTodosEmDia] = useState(false);
  const [abrirDetalhesCobrancas, setAbrirDetalhesCobrancas] = useState(false);
  const [PegarInfosCobranca, setPegarInfosCobranca] = useState("");
  const [filtro, setFiltro] = useState(false);
  const [busca, setBusca] = useState("");
  const [mensagem, setMensagem] = useState(false);
  const [pesquisar, setPesquisar] = useState(false);
  const [Id_cob, setId_cob] = useState("");

  return (
    <UserContext.Provider
      value={{
        abrirModalCobrança,
        setAbrirModalCobrança,
        nome,
        setNome,
        modalCadastrarCliente,
        setModalCadastrarCliente,
        modalEditarCadastro,
        setModalEditarCadastro,
        abrirPaginaDetalhesCliente,
        setAbrirPaginaDetalhesCliente,
        modalCadastrarCobranca,
        setModalCadastrarCobranca,
        clienteId,
        setClienteId,
        nomeCliente,
        setNomeCliente,
        abrirModalEditarCliente,
        setAbrirModalEditarCliente,
        mostrarNotificacao,
        setMostrarNotificacao,
        verTodosPagas,
        setVerTodosPagas,
        verTodosPrevistas,
        setVerTodosPrevistas,
        verTodosVencidas,
        setVerTodosVencidas,
        verTodasCobrancas,
        setVerTodasCobrancas,
        abrirModalDetalheCobranca,
        setAbrirModalDetalheCobranca,
        abrirModalDeletarCobranca,
        setAbrirModalDeletarCobranca,
        verTodosClientes,
        setVerTodosClientes,
        verTodosInadimplentes,
        setVerTodosInadimplentes,
        verTodosEmDia,
        setVerTodosEmDia,
        abrirDetalhesCobrancas,
        setAbrirDetalhesCobrancas,
        PegarInfosCobranca,
        setPegarInfosCobranca,
        filtro,
        setFiltro,
        busca,
        setBusca,
        mensagem,
        setMensagem,
        pesquisar,
        setPesquisar,
        Id_cob,
        setId_cob
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useHookContext() {
  return useContext(UserContext);
}
