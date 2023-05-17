import { useState, useEffect } from "react";

import EditarCobranca from "../../assets/editarCobrança.svg";
import DeletarCobranca from "../../assets/deletarCobrança.svg";
import api from "../../Service/api";
import { getItem } from "../../Utils/storage";
import { useHookContext } from "../../Context/UserContext";

export default function CardPagas({ ordenacaoNome, ordenacaoId }) {
    const [cobrancas, setCobrancas] = useState([]);
    const { setVerTodosVencidas, setVerTodasCobrancas, setVerTodosPagas, setVerTodosPrevistas } = useHookContext();

    useEffect(() => {
        try {
            async function listarCobrancas() {
                const response = await api.get("/usuarios", {
                    headers: {
                        Authorization: `Bearer ${getItem("token")}`,
                    },
                });

                const responseData = await response.data.contasRecebidasFormatadas;

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
    }, [ordenacaoNome, ordenacaoId]);

    return (
        <>
            {cobrancas.map((cobranca) => (
                <div className="conteudo-tabela-cobranca" key={cobranca.id}>
                    <span>{cobranca.cliente}</span>
                    <span>{cobranca.id_cob}</span>
                    <span>{cobranca.valor}</span>
                    <span>{cobranca.data_de_venc}</span>
                    <span className="marcador-emdia">Paga</span>
                    <div className="cobranca-descricao-tabela">
                        <span className="span-tabela-cobranca">{cobranca.descrição}</span>
                        <div className="imagens-editar-cobranca">
                            <img src={EditarCobranca} alt="editar cobrança" />
                            <img src={DeletarCobranca} alt="deletar cobrança" />
                        </div>
                    </div>
                </div>
            ))}
        </>
    );
}