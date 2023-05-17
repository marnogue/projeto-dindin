import { useEffect, useState } from "react";
import ChecadoIcone from "../../assets/checada-notificacao.svg";
import FecharIconeNotificacao from "../../assets/fechar-notificacao.svg";
import "./style.css";
import { useHookContext } from "../../Context/UserContext";

export default function Notificacao() {
  const { mostrarNotificacao, setMostrarNotificacao, modalCadastrarCliente } = useHookContext();

  function abrirNotificacao() {
    if (!modalCadastrarCliente) {
      setTimeout(() => {
        setMostrarNotificacao(!mostrarNotificacao);
      }, 4000);
    }
  }

  // useEffect(() => {

  // }, []);

  return (
    <>
      {mostrarNotificacao && (
        <div className="container-notificacao">
          <div className="conteudo-notificacao-esquerda">
            <img src={ChecadoIcone} alt="checado icone" />
            <span>Cadastro concluído com sucesso</span>
          </div>
          <img
            src={FecharIconeNotificacao}
            alt="fechar notificacao"
            className="fechar-notificacao-icone"
            onClick={() => abrirNotificacao()}
          />
        </div>
      )}
    </>
  );
}
