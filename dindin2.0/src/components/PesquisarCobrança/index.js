import { useState, useEffect } from "react";
import "./styles.css";
import EditarCobranca from "../../assets/editarCobrança.svg";
import DeletarCobranca from "../../assets/deletarCobrança.svg";
import api from "../../Service/api";
import { getItem } from "../../Utils/storage";
import { useHookContext } from "../../Context/UserContext";
import Cabeca from "../../assets/cabeca.svg";
import Corpo from "../../assets/corpo.svg";
import Xmenor from "../../assets/xMenor.svg";
import Xmenor2 from "../../assets/xMenor2.svg";
import Vector from "../../assets/Vector.svg";
import Barrax from "../../assets/barraX.svg";
import Barrax2 from "../../assets/barraX2.svg";

export default function PesquisarCobranca({ responseData }) {
  const [cobrancas, setCobrancas] = useState([]);
  const { setAbrirModalDetalheCobranca,
    abrirModalDetalheCobranca, setAbrirModalDeletarCobranca,
    abrirModalDeletarCobranca, setAbrirDetalhesCobrancas,
    setPegarInfosCobranca, filtro, pesquisar,
    busca, mensagem, setMensagem } = useHookContext();

  const resultadoNaoEncontrado = 'Nenhum resultado foi encontrado!';
  const verifiqueEscrita = 'Verifique se a escrita está correta';

  async function abrirDetalhesCobrancasModal(event, cobranca) {
    event.preventDefault();
    event.stopPropagation();

    setPegarInfosCobranca(cobranca)
    setAbrirDetalhesCobrancas(true)
  }

  useEffect(() => {
    try {
      async function listarCobrancas(responseData) {

        if (busca === '') {
          setMensagem(false);
          return setCobrancas(responseData)
        }

        if (/^\d+$/.test(busca)) {
          const buscaFeita = responseData.filter((cobranca) => {
            return cobranca.id_cob === parseInt(busca)
          })

          if (buscaFeita.length === 0) {
            return setMensagem(true)
          }

          setMensagem(false);
          return setCobrancas(buscaFeita);

        }

        const buscaFeita = responseData.filter((cobranca) => {
          return cobranca.cliente === busca
        })

        if (buscaFeita.length === 0) {
          return setMensagem(true)
        } else {
          setMensagem(false);
          return setCobrancas(buscaFeita);
        }

      }
      listarCobrancas(responseData);
    } catch (error) {
      console.log(error);
    }
  }, [filtro, pesquisar]);


  return (
    <>
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

        : cobrancas.map((cobranca) => (
          <div className="conteudo-tabela-cobranca" key={cobranca.id}>
            <span >{cobranca.cliente}</span>
            <span className="cliente-pointer" onClick={(event) => abrirDetalhesCobrancasModal(event, cobranca)}>{cobranca.id_cob}</span>
            <span>{cobranca.valor}</span>
            <span>{cobranca.data_de_venc}</span>
            {cobranca.status === 'Paga' && <span className="marcador-emdia">Paga</span>}
            {cobranca.status === 'Pendente' && <span className="marcador-pendente">Pendente</span>}
            {cobranca.status === 'Vencida' && <span className="marcador-inadimplente">Vencida</span>}
            <div className="cobranca-descricao-tabela">
              <span className="span-tabela-cobranca">{cobranca.descrição}</span>
              <div className="imagens-editar-cobranca">
                <img
                  src={EditarCobranca}
                  alt="editar cobrança"
                  onClick={() => setAbrirModalDetalheCobranca(!abrirModalDetalheCobranca)}
                />
                <img src={DeletarCobranca}
                  onClick={() => setAbrirModalDeletarCobranca(!abrirModalDeletarCobranca)}
                  alt="deletar cobrança" />
              </div>
            </div>
          </div>
        ))}
    </>
  );
}