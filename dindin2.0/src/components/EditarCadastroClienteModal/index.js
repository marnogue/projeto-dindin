import { useState, useEffect } from "react";
import ClienteIcone from "../../assets/cliente-icone.svg";
import FecharIcone from "../../assets/fechar.svg";
import "../../styles/modal-style.css";
import { getItem } from "../../Utils/storage";
import api from "../../Service/api";
import { useHookContext } from "../../Context/UserContext";
import InputMask from "react-input-mask";

export default function EditarCadastroClienteModal() {
  const { abrirModalEditarCliente, setAbrirModalEditarCliente, clienteId } = useHookContext();
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
    estado: "",
  });

  async function preencherDadosCliente() {

    const response = await api.get(`clientes/${clienteId}`,
      { headers: { Authorization: `Bearer: ${getItem("token")}` } });

    const { nome, email, cpf, telefone, cep, logradouro, complemento, bairro, cidade, estado } = await response.data.rows[0];

    setForm({
      nome,
      email,
      cpf,
      telefone,
      cep,
      logradouro,
      complemento,
      bairro,
      cidade,
      estado
    })

  }

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
      await api.put(
        `/clientes/${clienteId}`,
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
        estado: "",
      });

      setAbrirModalEditarCliente(!abrirModalEditarCliente);

    } catch ({
      response: {
        data: { mensagem }
      },
    }
    ) {
      console.log(mensagem);
      if (mensagem === "O email não é válido.") {
        setErrorEmail(mensagem);
      }

      if (mensagem === 'Já existe um cliente com este e-mail/CPF') {
        setErrorEmail(mensagem);
        setErrorCpf(mensagem);
      }

    }
  }

  function mudarValoresDoInput({ target }) {
    setForm({ ...form, [target.name]: target.value });
  }

  useEffect(() => {
    preencherDadosCliente();
  }, [abrirModalEditarCliente]);

  return (
    <div className="container-modal">
      <div className={
        !erroNome && !erroEmail && !erroCpf && !erroTelefone ?
          "modal cadastrar-cliente" : "modal cadastrar-cliente-erro"}>
        <div className="modal-titulo">
          <img
            src={FecharIcone}
            alt="fechar"
            onClick={() => setAbrirModalEditarCliente(!abrirModalEditarCliente)}
            className="modal-fechar-icone"
          />
          <div className="modal-titulo-esquerda">
            <img src={ClienteIcone} alt="cliente icone" />
            <h1>Editar Cliente</h1>
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
                name="CEP"
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
              onClick={() => setAbrirModalEditarCliente(!abrirModalEditarCliente)}
            >
              Cancelar
            </button>
            <button type="submit">Aplicar</button>
          </div>
        </form>
      </div>
    </div >
  );
}
