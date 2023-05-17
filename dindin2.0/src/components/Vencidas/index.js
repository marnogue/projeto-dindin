import api from "../../Service/api";
import { useEffect, useState } from "react";
import { getItem } from "../../Utils/storage";
import { useHookContext } from "../../Context/UserContext";
import { Link } from "react-router-dom"

export default function Vencidas() {
    const [dados, setDados] = useState([]);
    const [numContas, setNumContas] = useState([])
    const { setVerTodosPagas, setVerTodasCobrancas, setVerTodosPrevistas, setVerTodosVencidas } = useHookContext();

    function verCobrancasVencidas() {
        setVerTodosPagas(false)
        setVerTodasCobrancas(false)
        setVerTodosPrevistas(false)
        setVerTodosVencidas(true)
    }

    useEffect(() => {
        try {
            async function dadosUsuario() {
                const response = await api.get("/usuarios", {
                    headers: {
                        Authorization: `Bearer ${getItem("token")}`,
                    },
                });

                const dadosCobVencidas = await response.data.contasVencidasFormatadas;
                setDados(dadosCobVencidas);

                const numCobVenc = await response.data.nContasVencidas;
                setNumContas(numCobVenc)
            }
            dadosUsuario();
        } catch (error) {
            console.log(error);
        }
    });

    return (
        <div className='conteudo-box' style={{ marginRight: '35px' }}>
            <div className='conteudo-titulo'>
                <h1>Cobranças Vencidas</h1>
                <div className='quantia vermelho'>{numContas}</div>
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
                <Link to="/cobrancas"> <span onClick={verCobrancasVencidas}
                >Ver todos</span></Link>
            </div>
        </div>
    )
}