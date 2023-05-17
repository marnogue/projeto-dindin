import FecharIcone from "../../assets/fechar.svg";
import { useHookContext } from "../../Context/UserContext";
import "./style.css"
import IconeCobrança from "../../assets/iconeCobrança.svg"


export default function ModalDetalhesCobrancas() {
    const { PegarInfosCobranca: cobranca, setAbrirDetalhesCobrancas } = useHookContext()

    return (
        <div className="container-modal-fundo">
            <div className="modal-detalhes-cobranca">
                <div className="cabecalho-detalhes-cobranca">
                    <div className="modal-titulo-cobranca">
                        <img
                            src={FecharIcone}
                            alt="fechar"
                            onClick={() => setAbrirDetalhesCobrancas(null)}
                            className="modal-fechar-icone"
                        />
                        <div className="modal-titulo-esquerda">
                            <img src={IconeCobrança} alt="cobranca icone" />
                            <h1>Detalhe da Cobrança</h1>
                        </div>
                    </div>

                </div>
                <div className="corpo-detalhes-cobranca">
                    <div className="nome">
                        <h2 className="fixo">Nome</h2>
                        <h2 className="variavel">{cobranca.cliente}</h2>
                    </div>
                    <div className="descricao">
                        <h2 className="fixo">Descrição</h2>
                        <h2 className="variavel">{cobranca.descrição}</h2>
                    </div>
                    <div className="vencimento-e-valor">
                        <div className="vencimento">
                            <h2 className="fixo">Vencimento</h2>
                            <h2 className="variavel">{cobranca.data_de_venc}</h2>
                        </div>
                        <div className="valor">
                            <h2 className="fixo">Valor</h2>
                            <h2 className="variavel">{cobranca.valor}</h2>
                        </div>
                    </div>
                    <div className="Id-e-Status">
                        <div className="IdCobranca">
                            <h2 className="fixo">ID Cobrança</h2>
                            <h2 className="variavel">{cobranca.id_cob}</h2>
                        </div>
                        <div className="Status">
                            <h2 className="fixo">Status</h2>
                            {cobranca.status === 'Paga' && <h2 className="marcador-emdia">Paga</h2>}
                            {cobranca.status === 'Pendente' && <h2 className="marcador-pendente">Pendente</h2>}
                            {cobranca.status === 'Vencida' && <h2 className="marcador-inadimplente">Vencida</h2>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}