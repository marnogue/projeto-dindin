import "./style.css";
import CobrancaIcone from "../../assets/cobranca.svg";
import Cabeca from "../../assets/cabeca.svg";
import Corpo from "../../assets/corpo.svg";
import Xmenor from "../../assets/xMenor.svg";
import Xmenor2 from "../../assets/xMenor2.svg";
import Vector from "../../assets/Vector.svg";
import Barrax from "../../assets/barraX.svg";
import Barrax2 from "../../assets/barraX2.svg";
import { useState, useEffect } from "react";
import { useHookContext } from "../../Context/UserContext";
import { formatCPF, formatPhone } from "react-data-formatter";

export default function Pesquisar({ responseData }) {
  const [clientes, setClientes] = useState([]);
  const idClientes = [];

  const resultadoNaoEncontrado = 'Nenhum resultado foi encontrado!';
  const verifiqueEscrita = 'Verifique se a escrita está correta';

  const {
    abrirModalCobrança,
    setAbrirModalCobrança,
    abrirPaginaDetalhesCliente,
    setAbrirPaginaDetalhesCliente,
    modalCadastrarCliente,
    setClienteId,
    setNomeCliente,
    busca,
    filtro,
    mensagem,
    setMensagem,
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

      async function listarClientes(responseData) {

        if (filtro) {

          if (busca === '') {
            setMensagem(false);
            return setClientes(responseData)
          }

          if (busca.includes('@')) {
            const buscaFeita = responseData.filter((cliente) => {
              return cliente.email === busca
            })

            if (buscaFeita.length === 0) {
              return setMensagem(true)
            }

            setMensagem(false);
            return setClientes(buscaFeita);
          }

          if (/^\d+$/.test(busca)) {
            const buscaFeita = responseData.filter((cliente) => {
              return cliente.cpf === busca
            })

            if (buscaFeita.length === 0) {
              return setMensagem(true)
            }

            setMensagem(false);
            return setClientes(buscaFeita);

          }

          const buscaFeita = responseData.filter((cliente) => {
            return cliente.nome === busca
          })

          if (buscaFeita.length === 0) {
            return setMensagem(true)
          } else {
            setMensagem(false);
            return setClientes(buscaFeita);
          }

        }

      }
      listarClientes(responseData);

    } catch (error) {
      console.log(error);
    }
  }, [modalCadastrarCliente, filtro, pesquisar]);

  return (
    <div className="conteudo-tabela-cliente">

      {mensagem ? <>
        <div className="nao-encontrado">
          <div className="imagem-nao-encontrado">

            <div className="imagem-perfil">
              <img src={Cabeca} className="imagem-cabeca"></img>
              <img src={Corpo} className="imagem-corpo"></img>
              <img src={Xmenor} className="imagem-xmenor"></img>
              <img src={Xmenor2} className="imagem-xmenor2"></img>
            </div>

            <div className="">
              <img src={Vector} className="imagem-vector"></img>
              <img src={Barrax} className="imagem-barrax"></img>
              <img src={Barrax2} className="imagem-barrax2"></img>
            </div>

          </div>
          <div className="mensagem">
            <span className="mensagem-nao-encontrado">{resultadoNaoEncontrado}</span>
            <span className="mensagem-verifique">{verifiqueEscrita}</span>
          </div>
        </div>
      </>

        : clientes.map((cliente) => (

          <>
            {!idClientes.includes(cliente.id) && idClientes.push(cliente.id) &&
              <div className="clientes-usuarios" key={cliente.id}>
                <span className="cliente-pointer" onClick={() => clienteSelecionado(cliente.id, cliente.nome)}>
                  {cliente.nome}
                </span>
                <span>{formatCPF(cliente.cpf)}</span>
                <span>{cliente.email}</span>
                <span>{formatPhone(cliente.telefone)}</span>
                {cliente.status ? (
                  <div>
                    <span className="marcador-emdia">Em dia</span>
                  </div>
                ) : (
                  <div>
                    <span className="marcador-inadimplente">Inadimplente</span>
                  </div>
                )}
                <div className="botao-cobranca">
                  <img
                    src={CobrancaIcone}
                    alt="cobrança"
                    onClick={() => adicionarCobranca(cliente.id, cliente.nome)}
                  />
                  <span>Cobrança</span>
                </div>
              </div>}

          </>
        ))}

    </div>
  );
}
