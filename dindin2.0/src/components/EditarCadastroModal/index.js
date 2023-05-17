import { useEffect, useState } from "react";
import FecharIcone from "../../assets/fechar.svg";
import "../../styles/modal-style.css";
import SucessoIcone from "../../assets/sucesso-icone.svg";
import OlhoIconeFechado from "../../assets/olho-fechado.svg";
import OlhoIconeAberto from "../../assets/olho-aberto.svg";
import api from "../../Service/api";
import { getItem } from "../../Utils/storage";
import { useHookContext } from "../../Context/UserContext";
import InputMask from "react-input-mask";

export default function EditarCadastroModal() {
  const { setModalEditarCadastro, EditarCadastroModal } = useHookContext();
  const [cadastroRealizado, setCadastroRealizado] = useState(false);
  const [erro, setErro] = useState(false);
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [mostrarSenha2, setMostrarSenha2] = useState(false);
  const [form, setForm] = useState({
    nome: "",
    email: "",
    cpf: "",
    telefone: "",
    novaSenha: "",
    confirmarSenha: "",
  });

  function mudarValoresDoInput(event) {
    const value = event.target.value;
    setForm({ ...form, [event.target.name]: value });
  }

  async function preencherDadosUsuario() {

    const response = await api.get('/usuarioLogado/',
      { headers: { Authorization: `Bearer: ${getItem("token")}` } });

    const { nome, email, cpf, telefone } = await response.data.rows[0];

    setForm({
      nome,
      email,
      cpf,
      telefone,
      novaSenha: '',
      confirmarSenha: '',
    })

  }

  const [erroNome, setErrorNome] = useState("");
  const [erroEmail, setErrorEmail] = useState("");
  const [erroSenha, setErrorSenha] = useState("");
  const [erroCpf, setErrorCpf] = useState("");
  const [erroTelefone, setErrorTelefone] = useState("");

  async function alterarDadosUsuario(event) {
    event.preventDefault();
    event.stopPropagation();
    setErrorNome("");
    setErrorEmail("");
    setErrorSenha("");
    setErrorCpf("");
    setErrorTelefone("");

    if (!form.nome) {
      setErrorNome('O campo nome é obrigatório');
    }

    if (!form.email) {
      setErrorEmail('O Campo email é obrigatório');
    }

    if (!form.novaSenha || !form.confirmarSenha) {
      setErrorSenha('É obrigatório inserir nova senha e confirmar');
    }

    if (form.novaSenha !== form.confirmarSenha) {
      return setErrorSenha('Senhas não conferem');
    }

    if (form.cpf) {
      const cpfSemPontos = form.cpf.replace(/[^\d]+/g, "");
      if (cpfSemPontos.length < 11) {
        return setErrorCpf('Insira um cpf válido');
      }
    }
    if (form.telefone) {
      const telefoneSemPontos = form.telefone.replace(/[^\d]+/g, "");
      if (telefoneSemPontos.length < 11) {
        return setErrorTelefone('Insira um telefone válido');
      }
    }

    try {

      await api.put(
        "/usuarios",
        {
          nome: form.nome,
          email: form.email,
          cpf: form.cpf,
          telefone: form.telefone,
          senha: form.novaSenha,
        },
        {
          headers: {
            Authorization: `Bearer: ${getItem("token")}`,
          },
        }
      );

      setForm({
        nome: "",
        email: "",
        cpf: "",
        telefone: "",
        novaSenha: "",
        confirmarSenha: ""
      })

      setModalEditarCadastro(!EditarCadastroModal);

    } catch ({ error,
      response: {
        data: { mensagem }
      },
    }) {
      if (mensagem === "O e-mail informado já está sendo utilizado por outro usuário.") {
        return setErrorEmail(mensagem);
      }
    }
  }

  useEffect(() => {
    if (cadastroRealizado) {
      setTimeout(() => {
        setCadastroRealizado(false);
        setModalEditarCadastro(false);
      }, 1500);
    }
  });

  useEffect(() => {
    preencherDadosUsuario();
  }, [EditarCadastroModal]);

  return (
    <div className="container-modal">
      {cadastroRealizado ? (
        <div className="cadastro-sucesso">
          <img src={SucessoIcone} alt="sucesso icone" />
          <span>Cadastro alterado com sucesso!</span>
        </div>
      ) : (
        <div className="modal editar-cadastro">
          <div className="modal-titulo editar-cadastro-titulo ">
            <img
              src={FecharIcone}
              alt="fechar"
              onClick={() => setModalEditarCadastro(false)}
              className="modal-fechar-icone"
            />
            <h1>Editar seu cadastro</h1>
          </div>
          <form
            className="form-editar-cadastro"
            onSubmit={alterarDadosUsuario}
          >
            <label>Nome*</label>
            <input
              name="nome"
              type="text"
              placeholder="Digite seu nome"
              value={form.nome}
              onChange={mudarValoresDoInput}
              className={erroNome && "erro"}
            />

            {erroNome && <span className="spanErro">{erroNome}</span>}

            <label>E-mail*</label>
            <input
              name="email"
              type="email"
              placeholder="Digite seu e-mail"
              value={form.email}
              onChange={mudarValoresDoInput}
              className={erroEmail && "erro"}
            />
            {erroEmail && <span className="spanErro">{erroEmail}</span>}
            <div className="form-inputs-juntos">
              <div style={{ width: "178px", marginRight: "24px" }}>
                <label htmlFor="cpf">CPF</label>
                <InputMask
                  mask="999.999.999-99"
                  style={{ width: "178px" }}
                  name="cpf"
                  placeholder="Digite seu CPF"
                  value={form.cpf}
                  onChange={mudarValoresDoInput}
                  className={erroCpf && "erro"}
                />
                {erroCpf && <span className="spanErro">{erroCpf}</span>}
              </div>
              <div style={{ width: "178px" }}>
                <label htmlFor="telefone">Telefone</label>
                <InputMask
                  mask="(99) 9 9999-9999"
                  style={{ width: "178px" }}
                  name="telefone"
                  placeholder="Digite seu telefone"
                  value={form.telefone}
                  onChange={mudarValoresDoInput}
                  className={erroTelefone && "erro"}
                />
                {erroTelefone && <span className="spanErro">{erroTelefone}</span>}
              </div>
            </div>
            <label>Nova Senha*</label>
            <div className="senha-icone">
              <input
                name="novaSenha"
                type={mostrarSenha ? "text" : "password"}
                value={form.novaSenha}
                onChange={mudarValoresDoInput}
                className={erroSenha && "erro"}
              />
              <img
                className="mostrar-senha-editar-usuario"
                src={mostrarSenha ? OlhoIconeAberto : OlhoIconeFechado}
                onClick={() => setMostrarSenha(!mostrarSenha)}
              />
            </div>
            {erroSenha && <span className="spanErro">{erroSenha}</span>}
            <label>Confirmar Senha*</label>
            <div className="senha-icone">
              <input
                name="confirmarSenha"
                type={mostrarSenha2 ? "text" : "password"}
                value={form.confirmarSenha}
                onChange={mudarValoresDoInput}
                className={erroSenha && "erro"}
              />
              <img
                className="mostrar-senha-editar-usuario"
                src={mostrarSenha2 ? OlhoIconeAberto : OlhoIconeFechado}
                alt="senha icone"
                onClick={() => setMostrarSenha2(!mostrarSenha2)}
              />
            </div>
            {erroSenha && <span className="spanErro">{erroSenha}</span>}
            <button
              className="botao-editar-usuario"
              type="submit"
            >
              Aplicar
            </button>
            {erro && <span>Preencha todos os campos obrigatórios(*)</span>}
          </form>
        </div>
      )}
    </div>
  );
}
