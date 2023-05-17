import "./styles.css";
import setasSobeDesce from "../../assets/setasSobeDesce.svg";
import CardCobrancas from "../CardCobrancas";
import CardPagas from "../CardPagas";
import { useHookContext } from "../../Context/UserContext";
import CardPrevistas from "../CardPrevistas";
import CardVencidas from "../CardVencidas";
import { useState } from "react";

export default function TabelaCobrancas() {
  const { verTodosPagas, setVerTodosPagas, verTodosPrevistas, setVerTodosPrevistas, verTodasCobrancas, verTodosVencidas } = useHookContext();
  const [ordenacaoNome, setOrdenacaoNome] = useState(false);
  const [ordenacaoId, setOrdenacaoId] = useState(true);

  function ordenarCobrancaNome() {
    setOrdenacaoNome(!ordenacaoNome);
    setOrdenacaoId(false);
  }

  function ordenarCobrancaId() {
    setOrdenacaoId(!ordenacaoId);
    setOrdenacaoNome(false);
  }

  return (
    <div className="tabela-cobrancas">
      <div className="cobranca-titulos">
        <strong>
          <img className="ordenacao" src={setasSobeDesce} alt="setas" onClick={ordenarCobrancaNome} /> Cliente
        </strong>
        <strong>
          <img className="ordenacao" src={setasSobeDesce} alt="setas" onClick={ordenarCobrancaId} />
          ID Cob.
        </strong>
        <strong>Valor</strong>
        <strong className="strong-data-de-vencimento">Data de Venc.</strong>
        <strong>Status</strong>
        <strong className="cobrança-descriçao">Descrição</strong>
      </div>
      <div className="cobrancas-todos-clientes">
        {verTodasCobrancas && <CardCobrancas ordenacaoNome={ordenacaoNome} ordenacaoId={ordenacaoId} />}
        {verTodosPagas && <CardPagas ordenacaoNome={ordenacaoNome} ordenacaoId={ordenacaoId} />}
        {verTodosPrevistas && <CardPrevistas ordenacaoNome={ordenacaoNome} ordenacaoId={ordenacaoId} />}
        {verTodosVencidas && <CardVencidas ordenacaoNome={ordenacaoNome} ordenacaoId={ordenacaoId} />}
      </div>
    </div>
  );
}
