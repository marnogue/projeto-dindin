import { useState } from "react";
import { useNavigate } from "react-router-dom";
import EditarIcone from "../../assets/editar.svg";
import SairIcone from "../../assets/sair.svg";
import Seta from "../../assets/seta.svg";
import UsuarioIcone from "../../assets/usuario-icone.svg";
import "./styles.css";
import { getItem, clearAll } from "../../Utils/storage";
import { useHookContext } from "../../Context/UserContext";

export default function CabecalhoDetalhesCliente() {
  const [mostrarPopUp, setMostrarPopUp] = useState(false);
  const { modalEditarCadastro, setModalEditarCadastro, setAbrirPaginaDetalhesCliente } = useHookContext();
  const navigate = useNavigate();

  const nome = getItem("userName");

  const iniciaisNome = nome
    .split(" ")
    .map((n) => n[0].toUpperCase())
    .join("");

  function SairDaPagina() {
    clearAll();
    navigate("/");
  }

  return (
    <div className="principal-titulo-detalhe">
      <span className="principal-titulo-navegaçao">
        <h1 onClick={() => setAbrirPaginaDetalhesCliente(false)}>Clientes</h1>{`> Detalhes do Cliente`}
      </span>
      <div
        className="principal-usuario"
      // onClick={() => setMostrarPopUp(!mostrarPopUp)}
      >
        <div className="usuario-icone">
          <img src={UsuarioIcone} alt="icone usuario" />
          <strong>{iniciaisNome}</strong>
        </div>
        <span>{nome}</span>
        <div className="usuario-seta">
          <img
            onClick={() => setMostrarPopUp(!mostrarPopUp)}
            src={Seta}
            alt="seta"
          />
          {mostrarPopUp === true && (
            <div className="usuario-popup">
              <div onClick={() => setModalEditarCadastro(!modalEditarCadastro)}>
                <img src={EditarIcone} />
                <span>Editar</span>
              </div>
              <div onClick={SairDaPagina}>
                <img src={SairIcone} />
                <span>Sair</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
