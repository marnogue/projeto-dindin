import api from "../../Service/api";
import { useEffect, useState } from "react";
import { getItem } from "../../Utils/storage";
import { useHookContext } from "../../Context/UserContext";
import { Link } from "react-router-dom"


export default function Pagas() {
    const [dados, setDados] = useState([]);
    const [numContas, setNumContas] = useState([]);
    const { verTodosPagas, setVerTodosPagas, verTodasCobrancas, setVerTodasCobrancas, setVerTodosPrevistas, setVerTodosVencidas } = useHookContext();

    function verCobrancasPagas() {
        setVerTodosPagas(true)
        setVerTodasCobrancas(false)
        setVerTodosPrevistas(false)
        setVerTodosVencidas(false)
    }

    useEffect(() => {
        try {
            async function dadosUsuario() {
                const response = await api.get("/usuarios", {
                    headers: {
                        Authorization: `Bearer ${getItem("token")}`,
                    },
                });

                const dadosCobPagas = await response.data.contasRecebidasFormatadas;
                setDados(dadosCobPagas);

                const numCobPagas = await response.data.nContasRecebidas;
                setNumContas(numCobPagas)
            }
            dadosUsuario();
        } catch (error) {
            console.log(error);
        }
    });



    return (
        <div className='conteudo-box'>
            <div className='conteudo-titulo'>
                <h1>Cobranças Pagas</h1>
                <div className='quantia verde'>{numContas}</div>
            </div>
            <div className='box-titulos'>
                <strong>Cliente</strong>
                <strong>ID da cob.</strong>
                <strong>Valor</strong>
            </div>
            <div className="conteudo-contas-home">
                {dados.map((dado) => (
                    <div className='box-info'>
                        <div className='box-usuario'>
                            <span>{dado.cliente}</span>
                            <span>{dado.id_cob}</span>
                            <span>{dado.valor}</span>
                        </div>
                    </div>
                ))}
            </div>
            <div className='box-ver-todos'>
                <Link to="/cobrancas"> <span onClick={verCobrancasPagas}
                >Ver todos</span></Link>
            </div>

        </div>

    )
}