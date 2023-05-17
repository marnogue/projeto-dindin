import { useState, useEffect } from "react";
import FecharIcone from "../../assets/fechar.svg";
import { getItem } from "../../Utils/storage";
import api from "../../Service/api";
import { useHookContext } from "../../Context/UserContext";
import "./style.css"
import IconeCobrança from "../../assets/iconeCobrança.svg"
import InputMask from "react-input-mask"

export default function CadastrarCobrancaModal() {
  const { abrirModalCobrança, setAbrirModalCobrança, clienteId, nomeCliente } = useHookContext();
  const [form, setForm] = useState({
    nome: nomeCliente,
    descricao: "",
    vencimento: "",
    valor: "",
    pago: ""
  });

  const [erroNome, setErrorNome] = useState("");
  const [erroDescricao, setErrorDescricao] = useState("");
  const [erroVencimento, setErrorVencimento] = useState("");
  const [erroValor, setErrorValor] = useState("");
  const [erroStatus, setErrorStatus] = useState("");
  const [status, setStatus] = useState("")
  const [paga, setPaga] = useState(true)

  async function cadastrarCobranca(event) {
    event.preventDefault();
    event.stopPropagation();
    setErrorNome("");
    setErrorDescricao("");
    setErrorVencimento("");
    setErrorValor("");

    if (!form.nome) {
      setErrorNome('O campo nome é obrigatório');
    }
    if (!form.descricao) {
      setErrorDescricao('O campo descrição é obrigatório');
    }
    if (!form.vencimento) {
      setErrorVencimento('O campo vencimento é obrigatório');
    }
    if (!form.valor) {
      setErrorValor('O campo valor é obrigatório');
    }

    try {
      const response = await api.post(
        `/clientes/${clienteId}/cobranca`,
        {

          nome: form.nome,
          descricao: form.descricao,
          valor: form.valor,
          vencimento: form.vencimento,
          pago: paga

        },
        {
          headers: { Authorization: `Bearer ${getItem("token")}` },
        }
      )

      setForm({
        nome: "",
        descricao: "",
        vencimento: "",
        valor: "",
        pago: ""
      });

      setAbrirModalCobrança(!abrirModalCobrança)
    } catch (error) {
      console.log(error)
    }
  }

  function mudarValoresDoInput({ target }) {
    setForm({ ...form, [target.name]: target.value });
  }

  function mudarStatus(e) {
    if (e.target.id === 'paga') {
      return setPaga(true);
    }

    return setPaga(false);
  }

  return (
    <div className="container-modal">
      <div className={
        !erroNome && !erroDescricao && !erroVencimento && !erroValor && !erroStatus ?
          "modal cadastrar-cobranca" : "modal cadastrar-cobranca-erro"}>
        <div className="modal-titulo-cobranca">
          <img
            src={FecharIcone}
            alt="fechar"
            onClick={() => setAbrirModalCobrança(!abrirModalCobrança)}
            className="modal-fechar-icone"
          />
          <div className="modal-titulo-esquerda">
            <img src={IconeCobrança} alt="cliente icone" />
            <h1>Cadastro de Cobrança</h1>
          </div>
        </div>
        <form className="form-cadastrar-cobranca" onSubmit={cadastrarCobranca}>
          <label>Nome*</label>
          <input
            name="nome"
            type="text"
            placeholder="Digite o nome"
            value={nomeCliente}
            onChange={mudarValoresDoInput}
            className={erroNome && "erro"}
          />

          {erroNome && <span className="spanErro">{erroNome}</span>}

          <label>Descrição*</label>
          <textarea
            id="descricao"
            name="descricao"
            type="text"
            placeholder="Digite a descrição"
            value={form.descricao}
            onChange={mudarValoresDoInput}
            className={
              !erroDescricao && "erro" ?
                'container-descricao' : 'container-descricao erro'}
          />
          {erroDescricao && <span className="spanErro">{erroDescricao}</span>}

          <div className="form-inputs-juntos-cobranca">
            <div className="form-label-juntos" style={{ width: "235px", marginRight: "24px" }}>
              <label htmlFor="vencimento">Vencimento:*</label>
              <InputMask
                mask="99/99/9999"
                name="vencimento"
                placeholder="Data de vencimento"
                value={form.vencimento}
                onChange={mudarValoresDoInput}
                className={erroVencimento && "erro"}
              />

              {erroVencimento && <span className="spanErro">{erroVencimento}</span>}

            </div>
            <div className="form-label-juntos" style={{ width: "235px" }}>
              <label htmlFor="valor">Valor:*</label>
              <input
                name="valor"
                placeholder="Digite o valor"
                value={form.valor}
                onChange={mudarValoresDoInput}
                className={erroValor && "erro"}
              />
              {erroValor && <span className="spanErro">{erroValor}</span>}
            </div>
          </div>
          <div className="status-cobranca">

            <label>Status*</label>
            <div className='inputRadio'>
              <div onClick={mudarValoresDoInput} id='paga' className='divRadio'>
                <input
                  id='paga'
                  checked={paga}
                  className={`radio ${paga ? 'check' : 'notchecked'}`} type='radio' name='status'
                  onChange={mudarStatus}
                /> Cobrança Paga
              </div>
              <div onClick={mudarValoresDoInput} id='pendente' className='divRadio'>
                <input
                  id='pendente'
                  checked={!paga}
                  className={`radio ${!paga ? 'check' : 'notchecked'}`} type='radio' name='status'
                  onChange={mudarStatus}
                /> Cobrança Pendente
              </div>
            </div>
          </div>

          <div className="modal-botoes">
            <button
              type="button"
              onClick={() => setAbrirModalCobrança(!abrirModalCobrança)}
            >
              Cancelar
            </button>
            <button type="submit">Aplicar</button>
          </div>
        </form>
      </div>
    </div>
  );
}