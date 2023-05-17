import "./styles.css";
import menu2 from "../../assets/menu2.svg";
import menu3 from "../../assets/menu3.svg";
import barra2 from "../../assets/barra2.svg";
import barra3 from "../../assets/barra3.svg";
import OlhoFechadoIcone from "../../assets/olho-fechado.svg";
import OlhoAbertoIcone from "../../assets/olho-aberto.svg";
import SucessoIcone from "../../assets/sucesso-icone.svg";
import { useState } from "react";

import api from "../../Service/api";
import { Link } from "react-router-dom";

function Cadastro2({ nome, email }) {
  const [senha, setSenha] = useState("");
  const [confirmSenha, setConfirmSenha] = useState("");

  const [erro, setErro] = useState(false);
  const [erro2, setErro2] = useState(false);

  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [mostrarSenha2, setMostrarSenha2] = useState(false);

  const [sucesso, setSucesso] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      if (!senha || !confirmSenha) {
        setErro(true);
        return;
      }

      if (senha !== confirmSenha) {
        setErro2(true);
        return;
      }

      const response = await api.post("/usuarios", {
        nome,
        email,
        senha,
      });

      setSucesso(true);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="container_cadastro2">
      <div className="menu2">
        {sucesso ? (
          <img className="img_menu3" src={menu3} alt="menu" />
        ) : (
          <img className="img_Menu2" src={menu2} alt="menu" />
        )}
        <div className="etapas_menu2">
          <strong>Cadastre-se</strong>
          <span>Por favor, escreva seu nome e e-mail</span>
          <strong>Escolha uma senha</strong>
          <span>Escolha uma senha segura</span>
          <strong>Cadastro realizado com sucesso</strong>
          <span>E-mail e senha cadastrados com sucesso</span>
        </div>
      </div>
      <div className="cadastre2">
        {sucesso ? (
          <div className="cadastre2-sucesso">
            <div className="cadastre2-sucesso-container">
              <img src={SucessoIcone} alt="sucesso icone" />
              <span>Cadastro realizado com sucesso!</span>
            </div>
            <button className="botao-para-login" type="button">
              <Link to="/login">Ir para Login</Link>
            </button>
          </div>
        ) : (
          <form className="form_cadastre2">
            <h1>Escolha uma senha</h1>
            <label>Senha*</label>
            <div className="senha-form-cadastre2">
              <input
                name="senha"
                type={mostrarSenha ? "text" : "password"}
                placeholder="Digite sua senha"
                value={senha}
                onChange={(event) => setSenha(event.target.value)}
              />
              <img
                src={mostrarSenha ? OlhoAbertoIcone : OlhoFechadoIcone}
                alt="olhofechado"
                onClick={() => setMostrarSenha(!mostrarSenha)}
              />
            </div>
            <label>Repita a senha*</label>
            <div className="senha-form-cadastre2">
              <input
                name="confirmSenha"
                type={mostrarSenha2 ? "text" : "password"}
                placeholder="Repita sua senha"
                value={confirmSenha}
                onChange={(event) => setConfirmSenha(event.target.value)}
              />
              <img
                src={mostrarSenha2 ? OlhoAbertoIcone : OlhoFechadoIcone}
                alt="olhofechado"
                onClick={() => setMostrarSenha2(!mostrarSenha2)}
              />
            </div>
            <div className="cadastro2-erro-senha">
              <button type="submit" onClick={(event) => handleSubmit(event)}>
                Finalizar cadastro
              </button>
              {erro && (
                <span className="erroSenha">Os campos são obrigatórios!</span>
              )}
              {erro2 && (
                <span className="erroSenha">As senhas não coincidem!</span>
              )}
            </div>
            <span>
              Já possui uma conta? Faça seu
              <a href="/login">Login</a>
            </span>
          </form>
        )}
        {sucesso ? (
          <img src={barra3} alt="barra" className="barra-imagem" />
        ) : (
          <img src={barra2} alt="barra" className="barra-imagem" />
        )}
      </div>
    </div>
  );
}

export default Cadastro2;
