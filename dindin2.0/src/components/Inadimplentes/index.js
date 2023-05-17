import InadimplenteIcone from '../../assets/inadimplente-icone.svg';
import api from "../../Service/api";
import { useEffect, useState } from "react";
import { getItem } from "../../Utils/storage";
import { Link } from "react-router-dom";
import { useHookContext } from "../../Context/UserContext";

export default function Inadimplentes() {
    const [dados, setDados] = useState([]);
    const [numContas, setNumContas] = useState([]);
    const { setVerTodosClientes, setVerTodosInadimplentes, setVerTodosEmDia } = useHookContext();

    function verClientesInadimplentes() {
        setVerTodosClientes(false);
        setVerTodosEmDia(false);
        setVerTodosInadimplentes(true);
    }


    useEffect(() => {
        try {
            async function dadosUsuario() {
                const response = await api.get("/usuarios", {
                    headers: {
                        Authorization: `Bearer ${getItem("token")}`,
                    },
                });

                const clientesInadimplentes = await response.data.clientesInadimplentes.rows;
                setDados(clientesInadimplentes);

                const numClientesInadimplentes = await response.data.clientesInadimplentes.rowCount;
                setNumContas(numClientesInadimplentes)
            }
            dadosUsuario();
        } catch (error) {
            console.log(error);
        }
    });
    return (
        <div className='conteudo-box-maior' style={{ marginRight: '35px' }}>
            <div className='conteudo-titulo'>
                <div className='conteudo-titulo-direita'>
                    <img src={InadimplenteIcone} />
                    <h1>Clientes Inadimplentes</h1>
                </div>
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
                            <span>{dado.nome}</span>
                            <span>{dado.id_cob}</span>
                            <span>{dado.valor}</span>
                        </div>
                    </div>
                ))}
            </div>
            <div className='box-ver-todos'>
                <Link to="/clientes"> <span onClick={verClientesInadimplentes}
                >Ver todos</span></Link>
            </div>
        </div>
    )
}