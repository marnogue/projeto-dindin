import { useState } from "react";
import ClienteIcone from "../../assets/cliente-icone.svg";
import FecharIcone from "../../assets/fechar.svg";
import "../../styles/modal-style.css";
import { getItem } from "../../Utils/storage";
import api from "../../Service/api";
import { useHookContext } from "../../Context/UserContext";
import InputMask from "react-input-mask";

export default function CadastrarClienteModal() {
  const { modalCadastrarCliente, setModalCadastrarCliente, setMostrarNotificacao, mostrarNotificacao } = useHookContext();
  const [form, setForm] = useState({
    nome: "",
    email: "",
    cpf: "",
    telefone: "",
    cep: "",
    logradouro: "",
    complemento: "",
    bairro: "",
    cidade: "",
    estado: ""
  });

  const [erroNome, setErrorNome] = useState("");
  const [erroEmail, setErrorEmail] = useState("");
  const [erroCpf, setErrorCpf] = useState("");
  const [erroTelefone, setErrorTelefone] = useState("");

  async function cadastrarCliente(event) {
    event.preventDefault();
    event.stopPropagation();
    setErrorNome("");
    setErrorEmail("");
    setErrorCpf("");
    setErrorTelefone("");

    if (!form.nome) {
      setErrorNome('O campo nome é obrigatório');
    }
    if (!form.email) {
      setErrorEmail('O Campo email é obrigatório');
    }
    if (!form.cpf) {
      setErrorCpf('O Campo cpf é obrigatório');
    }
    if (!form.telefone) {
      setErrorTelefone('O Campo telefone é obrigatório');
    }

    const cpfSemPontos = form.cpf.replace(/[^\d]+/g, "");
    const telefoneSemPontos = form.telefone.replace(/[^\d]+/g, "");

    if (cpfSemPontos.length < 11) {
      setErrorCpf('Insira um cpf válido');
    }

    if (telefoneSemPontos.length < 11) {
      setErrorTelefone('Insira um telefone válido');
    }

    try {
      await api.post(
        "/clientes",
        {
          ...form,
          cpf: cpfSemPontos,
          telefone: telefoneSemPontos
        },
        {
          headers: { Authorization: `Bearer ${getItem("token")}` },
        }
      );

      setForm({
        nome: "",
        email: "",
        cpf: "",
        telefone: "",
        cep: "",
        logradouro: "",
        complemento: "",
        bairro: "",
        cidade: "",
        estado: ""
      });

      setModalCadastrarCliente(!modalCadastrarCliente);
    } catch ({ error,
      response: {
        data: { mensagem }
      },
    }
    ) {

      if (mensagem === 'O email já existe') {
        return setErrorEmail(mensagem);
      }

      if (mensagem === 'Email inválido.') {
        return setErrorEmail(mensagem);
      }

      if (mensagem === 'Cpf inválido.') {
        return setErrorCpf(mensagem);
      }

      if (mensagem === "O cpf já existe") {
        return setErrorCpf(mensagem);
      }

    }
  }

  function mudarValoresDoInput({ target }) {
    setForm({ ...form, [target.name]: target.value });
  }

  return (
    <div className="container-modal">
      <div className={
        !erroNome && !erroEmail && !erroCpf && !erroTelefone ?
          "modal cadastrar-cliente" : "modal cadastrar-cliente-erro"}>
        <div className="modal-titulo">
          <img
            src={FecharIcone}
            alt="fechar"
            onClick={() => setModalCadastrarCliente(!modalCadastrarCliente)}
            className="modal-fechar-icone"
          />
          <div className="modal-titulo-esquerda">
            <img src={ClienteIcone} alt="cliente icone" />
            <h1>Cadastro do Cliente</h1>
          </div>
        </div>
        <form className="form-cadastrar-cliente" onSubmit={cadastrarCliente}>
          <label>Nome*</label>

          <input
            name="nome"
            type="text"
            placeholder="Digite o nome"
            value={form.nome}
            onChange={mudarValoresDoInput}
            className={erroNome && "erro"}
          />

          {erroNome && <span className="spanErro">{erroNome}</span>}

          <label>E-mail*</label>
          <input
            id='email'
            name="email"
            type="text"
            placeholder="Digite o e-mail"
            value={form.email}
            onChange={mudarValoresDoInput}
            className={erroEmail && "erro"}
          />
          {erroEmail && <span className="spanErro">{erroEmail}</span>}

          <div className="form-inputs-juntos">
            <div className="form-label-juntos" style={{ width: "235px", marginRight: "24px" }}>
              <label htmlFor="cpf">CPF:*</label>
              <InputMask
                mask="999.999.999-99"
                name="cpf"
                placeholder="Digite o CPF"
                value={form.cpf}
                onChange={mudarValoresDoInput}
                className={erroCpf && "erro"}
              />

              {erroCpf && <span className="spanErro">{erroCpf}</span>}

            </div>
            <div className="form-label-juntos" style={{ width: "224px" }}>
              <label htmlFor="telefone">Telefone:*</label>
              <InputMask
                mask="(99) 9 9999-9999"
                name="telefone"
                placeholder="Digite o telefone"
                value={form.telefone}
                onChange={mudarValoresDoInput}
                className={erroTelefone && "erro"}
              />
              {erroTelefone && <span className="spanErro">{erroTelefone}</span>}
            </div>
          </div>
          <label>Endereço</label>
          <input
            name="logradouro"
            type="text"
            placeholder="Digite o endereço"
            value={form.logradouro}
            onChange={mudarValoresDoInput}
          />
          <label>Complemento</label>
          <input
            name="complemento"
            type="text"
            placeholder="Digite o complemento"
            value={form.complemento}
            onChange={mudarValoresDoInput}
          />
          <div className="form-inputs-juntos">
            <div className="form-label-juntos" style={{ width: "228px", marginRight: "24px" }}>
              <label>CEP:</label>
              <InputMask
                mask="99999-999"
                name="cep"
                type="text"
                placeholder="Digite o CEP"
                value={form.cep}
                onChange={mudarValoresDoInput}
              />
            </div>
            <div className="form-label-juntos" style={{ width: "235px" }}>
              <label>Bairro:</label>
              <input
                name="bairro"
                type="text"
                placeholder="Digite o bairro"
                value={form.bairro}
                onChange={mudarValoresDoInput}
              />
            </div>
          </div>
          <div className="form-inputs-juntos">
            <div className="form-label-juntos" style={{ width: "300px", marginRight: "24px" }}>
              <label>Cidade</label>
              <input
                name="cidade"
                type="text"
                placeholder="Digite a cidade"
                value={form.cidade}
                onChange={mudarValoresDoInput}
              />
            </div>
            <div className="form-label-juntos" style={{ width: "160px" }}>
              <label>UF</label>
              <input
                name="estado"
                type="text"
                placeholder="Digite a UF"
                value={form.estado}
                onChange={mudarValoresDoInput}
              />
            </div>
          </div>

          <div className="modal-botoes">
            <button
              type="button"
              onClick={() => setModalCadastrarCliente(!modalCadastrarCliente)}
            >
              Cancelar
            </button>
            <button type="submit"
              onClick={() => setMostrarNotificacao(!mostrarNotificacao)}>Aplicar</button>
          </div>
        </form>
      </div>
    </div >
  );
}
