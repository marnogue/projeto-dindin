import { useState } from "react";
import "./style.css";
import api from "../../Service/api";
import { useNavigate } from "react-router-dom";
import { setItem } from "../../Utils/storage";
import OlhoAbertoIcone from "../../assets/olho-aberto.svg";
import OlhoFechadoIcone from "../../assets/olho-fechado.svg";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState(false);
  const [erro2, setErro2] = useState(false);
  const [verSenha, setVersenha] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    event.stopPropagation();
    try {
      if (!email || !senha) {
        setErro(true);
        return;
      } else {
        setErro(false);
      }

      const { data } = await api.post("/login", {
        email,
        senha,
      });

      setItem("token", data.token);
      setItem("userName", data.usuario.nome);
      setItem("userId", data.usuario.id);

      navigate("/home");
    } catch (error) {
      console.log(error);

      setErro2(error.response.data === "Email e senha não confere");
    }
  }

  return (
    <main>
      <div className="lateral">
        <div className="lateral-titulo">
          <h1>Gerencie todos os pagamentos da sua empresa em um só lugar.</h1>
        </div>
      </div>

      <div className="formulario-login">
        <h2>Faça seu login!</h2>

        <form onSubmit={handleSubmit}>
          <label className="label-email-login">E-mail</label>
          <input
            name="email"
            type="email"
            placeholder="Digite seu e-mail"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />

          <div className="senha-login">
            <label>Senha</label>
            <a href="">Esqueceu a senha?</a>
          </div>

          <input
            name="senha"
            type={verSenha ? "text" : "password"}
            placeholder="Digite sua senha"
            value={senha}
            onChange={(event) => setSenha(event.target.value)}
          />
          <img
            className="imagem-olho-login"
            src={verSenha ? OlhoAbertoIcone : OlhoFechadoIcone}
            onClick={() => setVersenha(!verSenha)}
          />
          <button type="submit">Entrar</button>
        </form>
        {erro && (
          <span className="erro-login">E-mail e senha são obrigatórios!</span>
        )}
        {erro2 && (
          <span className="erro-login">Email e/ou senha incorretos!</span>
        )}
        <p>
          Ainda não possui uma conta? <a href="/cadastro">Cadastre-se</a>
        </p>
      </div>
    </main>
  );
}

export default Login;
