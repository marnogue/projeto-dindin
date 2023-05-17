import { useState, useEffect } from "react";
import "./styles.css";
import EditarCobranca from "../../assets/editarCobrança.svg";
import DeletarCobranca from "../../assets/deletarCobrança.svg";
import api from "../../Service/api";
import { getItem } from "../../Utils/storage";
import { useHookContext } from "../../Context/UserContext";
import PesquisarCobranca from "../PesquisarCobrança";

export default function CardCobrancas({ ordenacaoNome, ordenacaoId }) {
  const [cobrancas, setCobrancas] = useState([]);
  const { filtro, pesquisar, setNomeCliente, setAbrirModalDetalheCobranca, setId_cob, abrirModalDetalheCobranca, setAbrirModalDeletarCobranca, abrirModalDeletarCobranca, setAbrirDetalhesCobrancas, setPegarInfosCobranca } = useHookContext();

  function contaSelecionada(Id_cob, clienteNome) {
    setAbrirModalDetalheCobranca(!abrirModalDetalheCobranca);
    setId_cob(Id_cob);
    setNomeCliente(clienteNome);
  }

  function deletarContaSelecionada(Id_cob) {
    setAbrirModalDeletarCobranca(!abrirModalDeletarCobranca);
    setId_cob(Id_cob);
  }

  useEffect(() => {
    try {
      async function listarCobrancas() {
        const response = await api.get("/cobranca", {
          headers: {
            Authorization: `Bearer ${getItem("token")}`,
          },
        });

        const responseData = await response.data;

        if (ordenacaoId && !ordenacaoNome) {
          return setCobrancas(responseData.sort((a, b) => {
            const nomeA = a.id_cob
            const nomeB = b.id_cob

            if (nomeA < nomeB) {
              return -1;
            }
            if (nomeA > nomeB) {
              return 1;
            }

            return 0;

          }));

        } else if (!ordenacaoId && !ordenacaoNome) {
          return setCobrancas(responseData.sort((a, b) => {
            const nomeA = a.id_cob
            const nomeB = b.id_cob

            if (nomeA < nomeB) {
              return 1;
            }
            if (nomeA > nomeB) {
              return -1;
            }

            return 0;

          }));
        } else if (!ordenacaoId && ordenacaoNome) {
          return setCobrancas(responseData.sort((a, b) => {
            const nomeA = a.cliente.toUpperCase();
            const nomeB = b.cliente.toUpperCase();

            if (nomeA < nomeB) {
              return -1;
            }
            if (nomeA > nomeB) {
              return 1;
            }

            return 0;
          }));
        } else {
          return setCobrancas(responseData.sort((a, b) => {
            const nomeA = a.cliente.toUpperCase();
            const nomeB = b.cliente.toUpperCase();

            if (nomeA < nomeB) {
              return 1;
            }
            if (nomeA > nomeB) {
              return -1;
            }

            return 0;
          }));
        }

        setCobrancas(responseData);
      }
      listarCobrancas();
    } catch (error) {
      console.log(error);
    }
  }, [ordenacaoNome, ordenacaoId, filtro, pesquisar, abrirModalDetalheCobranca, abrirModalDeletarCobranca]);

  async function abrirDetalhesCobrancasModal(event, cobranca) {
    event.preventDefault();
    event.stopPropagation();

    setPegarInfosCobranca(cobranca)
    setAbrirDetalhesCobrancas(true)
  }



  return (
    <>
      {filtro ? <> <PesquisarCobranca responseData={cobrancas} /> </>
        :
        cobrancas.map((cobranca) => (
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
                  onClick={() => contaSelecionada(cobranca.id_cob, cobranca.cliente)}
                />
                <img src={DeletarCobranca}
                  onClick={() => deletarContaSelecionada(cobranca.id_cob)}
                  alt="deletar cobrança" />
              </div>
            </div>
          </div>
        ))}
    </>
  );
}