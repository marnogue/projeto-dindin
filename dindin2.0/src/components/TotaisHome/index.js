import './style.css';
import PagasIcon from '../../assets/pagas.svg';
import VencidasIcon from '../../assets/vencidas.svg';
import PrevistasIcon from '../../assets/previstas.svg';
import api from "../../Service/api";
import { useEffect, useState } from "react";
import { getItem } from "../../Utils/storage";

export default function TotaisHome() {
    const [cobrancasPagas, setCobrancasPagas] = useState([]);
    const [cobrancasVencidas, setCobrancasVencidas] = useState([]);
    const [cobrancasPrevistas, setCobrancasPrevistas] = useState([]);

    async function dadosUsuario() {
        const response = await api.get(`/usuarios`, {
            headers: {
                Authorization: `Bearer ${getItem("token")}`,
            },
        });

        const cobrancasPagas = response.data.somaContasRecebidas;
        setCobrancasPagas(cobrancasPagas);
        const cobrancasVencidas = response.data.somaContasVencidas;
        setCobrancasVencidas(cobrancasVencidas);
        const cobrancasPrevistas = response.data.somaContasAReceber;
        setCobrancasPrevistas(cobrancasPrevistas);

    }
    useEffect(() => {
        dadosUsuario();
    }, []);

    return (
        <div className='detalhes'>
            <div className='detalhe-pago' style={{ marginRight: '35px' }}>
                <img src={PagasIcon} alt='pagas icon' />
                <div className='info-detalhe'>
                    <span>Cobranças Pagas</span>
                    <strong>{cobrancasPagas}</strong>
                </div>
            </div>
            <div className='detalhe-vencido' style={{ marginRight: '35px' }}>
                <img src={VencidasIcon} alt='vencidas icon' />
                <div className='info-detalhe'>
                    <span>Cobranças Vencidas</span>
                    <strong>{cobrancasVencidas}</strong>
                </div>
            </div>
            <div className='detalhe-previsto'>
                <img src={PrevistasIcon} alt='previstas icon' />
                <div className='info-detalhe'>
                    <span>Cobranças Previstas</span>
                    <strong>{cobrancasPrevistas}</strong>
                </div>
            </div>
        </div>
    )
}