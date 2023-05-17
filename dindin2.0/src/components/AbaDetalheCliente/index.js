import "./styles.css";
import CabeçalhoDetalhesCliente from "../CabeçalhoDetalhesCliente";
import MenuLateral from "../MenuLateral";
import IconeCliente from "../../assets/icone-cliente.svg";
import { useHookContext } from "../../Context/UserContext";
import editarcliente from "../../assets/icone-editar-cliente.svg";
import setasSobeDesce from "../../assets/setasSobeDesce.svg";
import deletarCobrança from "../../assets/deletarCobrança.svg";
import editarCobrança from "../../assets/editarCobrança.svg";
import api from "../../Service/api";
import { useEffect, useState } from "react";
import { getItem } from "../../Utils/storage";
import CadastrarCobrancaModal from "../CadastrarCobranca";
import EditarCadastroClienteModal from "../EditarCadastroClienteModal";
import EditarCadastroModal from "../../components/EditarCadastroModal";
import { formatCPF, formatPhone, formatZipCode } from "react-data-formatter";
import ModalDetalhesCobrancas from "../ModalDetalhesCobrancas";

export default function AbaDetalheCliente() {
  const { abrirDetalhesCobrancas, setPegarInfosCobranca, setAbrirDetalhesCobrancas, clienteId, abrirModalEditarCliente, setAbrirModalEditarCliente, modalEditarCadastro, setAbrirModalCobrança, abrirModalCobrança } = useHookContext();
  const [cliente, setCliente] = useState({});
  const [contas, setContas] = useState([]);

  async function detalharCliente() {
    const response = await api.get(`/clientes/${clienteId}`, {
      headers: {
        Authorization: `Bearer ${getItem("token")}`,
      },
    });

    const cliente = response.data.rows[0];
    setCliente(cliente);
    const contas = response.data.contas;
    setContas(contas);
  }
  useEffect(() => {
    detalharCliente();
  }, [abrirModalEditarCliente, abrirModalCobrança]);

  async function abrirDetalhesCobrancasModal(event, conta) {
    event.preventDefault();
    event.stopPropagation();
    const contaFormatada = {
      ...conta,
      descrição: conta.descricao,
      data_de_venc: conta.validade,
      id_cob: conta.id,
      cliente: cliente.nome,
      status: conta.status
    }

    setPegarInfosCobranca(contaFormatada)
    setAbrirDetalhesCobrancas(true)
  }

  return (

    (<div className="container-cliente">
      {abrirDetalhesCobrancas && <ModalDetalhesCobrancas />}
      {abrirModalEditarCliente && (<EditarCadastroClienteModal />)}
      {modalEditarCadastro && <EditarCadastroModal />}
      {abrirModalCobrança && <CadastrarCobrancaModal />}
      <div className="menu-cliente">
        <MenuLateral />
      </div >
      <div className="conteudo-cliente">
        <CabeçalhoDetalhesCliente />
        <div className="dados-cliente-selecionado">
          <div className="nome-cliente-selecionado">
            <img src={IconeCliente} />
            <h1>{cliente.nome}</h1>
          </div>
          <div className="dados-do-cliente">
            <div className="dados-pessoais-cliente">
              <div className="titulo-dados-pessoais">
                <h1>Dados do cliente</h1>
                <button onClick={() => setAbrirModalEditarCliente(!abrirModalEditarCliente)}>
                  <img src={editarcliente} />
                  Editar Cliente
                </button>
              </div>
              <div className="dados-contato-cliente">
                <div className="dados-contato">
                  <strong>email</strong>
                  <span>{cliente.email}</span>
                </div>
                <div className="dados-contato">
                  <strong>telefone</strong>
                  <span>{formatPhone(cliente.telefone)}</span>
                </div>
                <div className="dados-contato">
                  <strong>CPF</strong>
                  <span>{formatCPF(cliente.cpf)}</span>
                </div>
                <div></div>
                <div></div>
                <div></div>
              </div>
              <div className="dados-residenciais">
                <div className="dados-endereço">
                  <strong>Endereço</strong>
                  <span>{cliente.logradouro}</span>
                </div>
                <div className="dados-endereço">
                  <strong>Bairro</strong>
                  <span>{cliente.bairro}</span>
                </div>
                <div className="dados-endereço">
                  <strong>Complemento</strong>
                  <span>{cliente.complemento}</span>
                </div>
                <div className="dados-endereço">
                  <strong>CEP</strong>
                  <span>{formatZipCode(cliente.cep)}</span>
                </div>
                <div className="dados-endereço">
                  <strong>Cidade</strong>
                  <span>{cliente.cidade}</span>
                </div>
                <div className="dados-endereço">
                  <strong>UF</strong>
                  <span>{cliente.estado}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="cobranças-do-cliente">
            <div className="detalhes-cobranças-cliente">
              <div className="título-cobranças-cliente">
                <h1>Cobranças do Cliente</h1>
                <button onClick={() => setAbrirModalCobrança(!abrirModalCobrança)}>+ Nova Cobrança</button>
              </div>
              <div className="tabela-cobranças">
                <div className="topo-tabela-cobranças-cliente">
                  <strong className="strong-tabela">
                    <img src={setasSobeDesce} alt="seta" />
                    ID Cob.
                  </strong>
                  <strong className="strong-tabela">
                    <img src={setasSobeDesce} alt="seta" />
                    Data de venc.
                  </strong>
                  <strong>Valor</strong>
                  <strong>Status</strong>
                  <strong>Descrição</strong>
                </div>
                <div className="tabela-cobranca-detalhe-cliente">
                  {contas.map((conta) => (
                    <div className="corpo-tabela-cobranças-cliente">
                      <span className="cliente-pointer" onClick={(event) => abrirDetalhesCobrancasModal(event, conta)}>{conta.id}</span>
                      <span>{conta.validade}</span>
                      <span>{conta.valor}</span>
                      {conta.status === 'Paga' && <span className="marcador-emdia">Paga</span>}
                      {conta.status === 'Pendente' && <span className="marcador-pendente">Pendente</span>}
                      {conta.status === 'Vencida' && <span className="marcador-inadimplente">Vencida</span>}
                      <span className="descriçao-cobrança">
                        {conta.descricao}
                      </span>
                      <div className="iconesEditar-Deletar">
                        <img src={editarCobrança} alt="editar" />
                        <img src={deletarCobrança} alt="deletar" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    )

  )
}




