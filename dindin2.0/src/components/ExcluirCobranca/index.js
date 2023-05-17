import "./style.css";
import alerta from "../../assets/alerta-modal-excluir.svg"
import { useHookContext } from "../../Context/UserContext";
import api from "../../Service/api";
import { getItem } from "../../Utils/storage";

export default function ExcluirCobranca() {
  const { Id_cob, abrirModalDeletarCobranca, setAbrirModalDeletarCobranca } = useHookContext()

  async function useDeletarCobranca() {
    await api.delete(`/cobranca/${Id_cob}`

      , {
        headers: { Authorization: `Bearer ${getItem("token")}` }

      })
    return setAbrirModalDeletarCobranca(!abrirModalDeletarCobranca)
  }

  return (
    <div className="div-modal-excluir">
      <div className="modal-excluir">
        <div className="img-modal-excluir">
          <img src={alerta} alt="imagem alerta deletar" />
        </div>
        <div className="pergunta-modal-excluir">
          <h1>Tem certeza que deseja excluir essa cobrança?</h1>
        </div>
        <div className="btns-modal-excluir">
          <button className="btn-excluir nao" onClick={() => setAbrirModalDeletarCobranca(!abrirModalDeletarCobranca)}>Não</button>
          <button className="btn-excluir sim" onClick={useDeletarCobranca}>Sim</button>
        </div>
      </div>
    </div>
  )
}