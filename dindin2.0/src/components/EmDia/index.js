import EmDiaIcone from '../../assets/em-dia-icone.svg';
import api from "../../Service/api";
import { useEffect, useState } from "react";
import { getItem } from "../../Utils/storage";
import { useHookContext } from '../../Context/UserContext';
import { Link } from "react-router-dom"

export default function EmDia() {
    const [dados, setDados] = useState([]);
    const [numContas, setNumContas] = useState([]);
    const { setVerTodosClientes, setVerTodosInadimplentes, setVerTodosEmDia } = useHookContext();

    function verClientesEmDia() {
        setVerTodosClientes(false);
        setVerTodosEmDia(true);
        setVerTodosInadimplentes(false);
    }

    useEffect(() => {
        try {
            async function dadosUsuario() {
                const response = await api.get("/usuarios", {
                    headers: {
                        Authorization: `Bearer ${getItem("token")}`,
                    },
                });

                const clientesEmDia = await response.data.clientesRecebidos.rows;
                setDados(clientesEmDia);

                const numClientesEmDia = await response.data.clientesRecebidos.rowCount;
                setNumContas(numClientesEmDia)
            }
            dadosUsuario();
        } catch (error) {
            console.log(error);
        }
    });
    return (
        <div className='conteudo-box-maior'>
            <div className='conteudo-titulo'>
                <div className='conteudo-titulo-direita'>
                    <img src={EmDiaIcone} />
                    <h1>Clientes em dia</h1>
                </div>
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
                            <span>{dado.nome}</span>
                            <span>{dado.id_cob}</span>
                            <span>{dado.valor}</span>
                        </div>
                    </div>
                ))}
            </div>
            <div className='box-ver-todos'>
                <Link to="/clientes"> <span onClick={verClientesEmDia}
                >Ver todos</span></Link>
            </div>
        </div>
    )
}