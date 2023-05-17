import { useState } from "react";
import { useNavigate } from "react-router-dom";
import EditarIcone from "../../assets/editar.svg";
import SairIcone from "../../assets/sair.svg";
import Seta from "../../assets/seta.svg";
import UsuarioIcone from "../../assets/usuario-icone.svg";
import "../../styles/cabecalho.css";
import { getItem, clearAll } from "../../Utils/storage";
import { useLocation } from "react-router-dom";
import { useHookContext } from "../../Context/UserContext";

export default function Cabecalho() {
  const [mostrarPopUp, setMostrarPopUp] = useState(false);
  const { modalEditarCadastro, setModalEditarCadastro } = useHookContext();
  const navigate = useNavigate();

  const { pathname } = useLocation();

  const tituloCabecalho = {
    home: "Resumo das Cobranças",
    clientes: "Clientes",
    cobrancas: "Cobranças",
  }[pathname.replace("/", "")];

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
    <div className="principal-titulo">
      <h1
        className={
          pathname.includes("home")
            ? "principal-titulo-maior"
            : "principal-titulo-menor"
        }
      >
        {tituloCabecalho}
      </h1>
      <div className="principal-usuario">
        <div className="usuario-icone">
          <img src={UsuarioIcone} alt="icone usuario" />
          <strong>{iniciaisNome}</strong>
        </div>
        <span>{nome}</span>
        <div className="usuario-seta">
          <img
            src={Seta}
            alt="seta"
            onClick={() => setMostrarPopUp(!mostrarPopUp)}
          />
          {mostrarPopUp === true && (
            <div className="usuario-popup">
              <div onClick={() => setModalEditarCadastro(true)}>
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
