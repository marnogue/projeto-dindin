import "./styles.css";
import menu1 from "../../assets/menu1.svg";
import barra1 from "../../assets/barra1.svg";
import { useState } from "react";
import { useNavigate } from "react-router-dom/dist";

import Cadastro2 from "../Cadastro2";
import { useHookContext } from "../../Context/UserContext";

function Cadastro1() {
  const navigate = useNavigate();

  const [continuarCadastro, setContinuarCadastro] = useState(false);

  const [localNome, setLocalNome] = useState("");
  const [localEmail, setLocalEmail] = useState("");

  const [erro, setErro] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();

    if (!localNome || !localEmail) {
      setErro(true);
      return;
    }

    setContinuarCadastro(true);
    setLocalNome(localNome);
    setLocalEmail(localEmail);
    // navigate("/cadastro-senha");
  }

  return (
    <>
      {continuarCadastro ? (
        <Cadastro2 nome={localNome} email={localEmail} />
      ) : (
        <div className="container_cadastro1">
          <div className="menu1">
            <img className="img_Menu1" src={menu1} alt="menu" />
            <div className="etapas_menu1">
              <strong>Cadastre-se</strong>
              <span>Por favor, escreva seu nome e e-mail</span>
              <strong>Escolha uma senha</strong>
              <span>Escolha uma senha segura</span>
              <strong>Cadastro realizado com sucesso</strong>
              <span>E-mail e senha cadastrados com sucesso</span>
            </div>
          </div>
          <div className="cadastre1">
            <form className="form_cadastre1">
              <h1>Adicione seus dados</h1>
              <label>Nome*</label>
              <input
                name="nome"
                type="text"
                placeholder="Digite seu nome"
                value={localNome}
                onChange={(event) => setLocalNome(event.target.value)}
              />
              <label>E-mail*</label>
              <input
                name="email"
                type="email"
                placeholder="Digite seu e-mail"
                value={localEmail}
                onChange={(event) => setLocalEmail(event.target.value)}
              />
              <div>
                <button onClick={(event) => handleSubmit(event)}>
                  Continuar
                </button>
                {erro && <span>Os campos são obrigatórios!</span>}
                <span>
                  Já possui uma conta? Faça seu
                  <a href="/login">Login</a>
                </span>
              </div>
            </form>
            <img src={barra1} alt="barra" />
          </div>
        </div>
      )}
    </>
  );
}

export default Cadastro1;
