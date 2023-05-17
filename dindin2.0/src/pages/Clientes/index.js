import { useState } from "react";
import BuscaIcone from "../../assets/busca.svg";
import ClienteIcone from "../../assets/cliente-icone.svg";
import FiltroIcone from "../../assets/filtro.svg";
import Cabecalho from "../../components/Cabecalho";
import CadastrarClienteModal from "../../components/CadastrarClienteModal";
import EditarCadastroModal from "../../components/EditarCadastroModal";
import MenuLateral from "../../components/MenuLateral";
import Notificacao from "../../components/Notificacao";
import TabelaClientes from "../../components/TabelaClientes";
import "./style.css";
import { useHookContext } from "../../Context/UserContext";
import CadastrarCobrança from "../../components/CadastrarCobranca";
import AbaDetalheCliente from "../../components/AbaDetalheCliente";

export default function Clientes() {
  const {
    modalEditarCadastro,
    abrirModalCobrança,
    abrirPaginaDetalhesCliente,
    setAbrirPaginaDetalhesCliente,
    modalCadastrarCliente,
    setModalCadastrarCliente,
    busca,
    setBusca,
    setFiltro,
    pesquisar,
    setPesquisar
  } = useHookContext();

  function buscar() {
    setFiltro(true);
    setPesquisar(!pesquisar)
  }

  return (
    <>
      {abrirPaginaDetalhesCliente ? (
        <AbaDetalheCliente />
      ) : (
        <div className="container">
          {modalEditarCadastro && <EditarCadastroModal />}
          {modalCadastrarCliente && <CadastrarClienteModal />}
          <Notificacao />
          <MenuLateral />
          {abrirModalCobrança && <CadastrarCobrança />}
          <div className="principal">
            <Cabecalho />
            <div className="conteudo-cabecalho">
              <div className="cabecalho-clientes">
                <div className="cabecalho-esquerda">
                  <img src={ClienteIcone} alt="cliente icone" />
                  <h1>Clientes</h1>
                </div>
                <div className="cabecalho-direita">
                  <button
                    type="button"
                    onClick={() =>
                      setModalCadastrarCliente(!modalCadastrarCliente)
                    }
                  >
                    + Adicionar Cliente
                  </button>
                  <img
                    src={FiltroIcone}
                    alt="filtro"
                    className="cabecalho-filtro"
                  />
                  <div className="cabecalho-pesquisa">
                    <div className="pesquisa-blur"></div>
                    <input type="text" placeholder="Pesquisa"
                      value={busca}
                      onChange={(e) => setBusca(e.target.value)} />
                    <img src={BuscaIcone} alt="pesquisar"
                      onClick={buscar} />
                  </div>
                </div>
              </div>
              <TabelaClientes />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
