import { useState } from "react";
import Cabecalho from "../../components/Cabecalho";
import EditarCadastroModal from "../../components/EditarCadastroModal";
import EmDia from "../../components/EmDia";
import Inadimplentes from "../../components/Inadimplentes";
import MenuLateral from "../../components/MenuLateral";
import Pagas from "../../components/Pagas";
import Previstas from "../../components/Previstas";
import TotaisHome from "../../components/TotaisHome";
import Vencidas from "../../components/Vencidas";
import "../../styles/box-style.css";
import "../../styles/cabecalho.css";
import { useHookContext } from "../../Context/UserContext";

export default function Home() {
  const { modalEditarCadastro, setModalEditarCadastro } = useHookContext();
  return (
    <div className="container">
      {modalEditarCadastro && (
        <EditarCadastroModal setModalEditarCadastro={setModalEditarCadastro} />
      )}
      <MenuLateral />
      <div className="principal">
        <Cabecalho setModalEditarCadastro={setModalEditarCadastro} />
        <TotaisHome />
        <div className="conteudo">
          <Vencidas />
          <Previstas />
          <Pagas />
        </div>
        <div className="conteudo-maior">
          <Inadimplentes />
          <EmDia />
        </div>
      </div>
    </div>
  );
}
