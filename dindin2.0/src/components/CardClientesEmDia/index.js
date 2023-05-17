import '../CardClientes/style.css'
import CobrancaIcone from "../../assets/cobranca.svg";
import { useState, useEffect } from "react";
import api from "../../Service/api";
import { getItem } from "../../Utils/storage";
import { Link } from "react-router-dom";
import { useHookContext } from "../../Context/UserContext";
import { formatCPF, formatPhone } from "react-data-formatter";
import Pesquisar from "../Pesquisar";

export default function CardClientesEmDia({ ordenacao }) {
  const [clientes, setClientes] = useState([]);
  const idClientes = [];
  const {
    abrirModalCobrança,
    setAbrirModalCobrança,
    abrirPaginaDetalhesCliente,
    setAbrirPaginaDetalhesCliente,
    modalCadastrarCliente,
    setClienteId,
    setNomeCliente,
    filtro,
    pesquisar
  } = useHookContext();

  function clienteSelecionado(clienteId, clienteNome) {
    setAbrirPaginaDetalhesCliente(!abrirPaginaDetalhesCliente);
    setClienteId(clienteId);
    setNomeCliente(clienteNome);
  }

  function adicionarCobranca(clienteId, clienteNome) {
    setAbrirModalCobrança(!abrirModalCobrança);
    setClienteId(clienteId);
    setNomeCliente(clienteNome);
  }

  useEffect(() => {
    try {
      async function listarClientes() {
        const response = await api.get("/usuarios", {
          headers: {
            Authorization: `Bearer ${getItem("token")}`,
          },
        });

        const responseData = await response.data.clientesRecebidos.rows;

        if (ordenacao) {
          return setClientes(responseData.sort((a, b) => {
            const nomeA = a.nome.toUpperCase();
            const nomeB = b.nome.toUpperCase();

            if (nomeA < nomeB) {
              return -1;
            }
            if (nomeA > nomeB) {
              return 1;
            }

            return 0;
          }));
        }

        if (!ordenacao) {
          return setClientes(responseData.sort((a, b) => {

            const nomeA = a.nome.toUpperCase();
            const nomeB = b.nome.toUpperCase();

            if (nomeA < nomeB) {
              return 1;
            }
            if (nomeA > nomeB) {
              return -1;
            }

            return 0;

          }));
        }

        setClientes(responseData);
      }

      listarClientes();
    } catch (error) {
      console.log(error);
    }
  }, [modalCadastrarCliente, ordenacao, filtro, pesquisar]);

  return (
    <div className="conteudo-tabela-cliente">

      {filtro ?
        <Pesquisar responseData={clientes} />

        : clientes.map((cliente) => (
          <>
            {
              !idClientes.includes(cliente.id) && idClientes.push(cliente.id) &&
              < div className="clientes-usuarios" key={cliente.id} >
                <span className="cliente-pointer" onClick={() => clienteSelecionado(cliente.id, cliente.nome)}>
                  {cliente.nome}
                </span>
                <span>{formatCPF(cliente.cpf)}</span>
                <span>{cliente.email}</span>
                <span>{formatPhone(cliente.telefone)}</span>
                <div >
                  <span className="marcador-emdia">Em dia</span>
                </div>

                <div className="botao-cobranca">
                  <img
                    src={CobrancaIcone}
                    alt="cobrança"
                    onClick={() => adicionarCobranca(cliente.id, cliente.nome)}
                  />
                  <span>Cobrança</span>
                </div>
              </div>
            }

          </>

        ))
      }
    </div >
  );
}
