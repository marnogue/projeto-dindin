import MenuLateral from "../../components/MenuLateral";
import Cabecalho from "../../components/Cabecalho";
import "./styles.css";
import TabelaCobrancas from "../../components/TabelaCobranças";
import filtroCobranças from "../../assets/filtroCobranças.svg";
import iconeCobrança from "../../assets/iconeCobrança.svg";
import lupa from "../../assets/busca.svg";
import { useHookContext } from "../../Context/UserContext";
import EditarCadastroModal from "../../components/EditarCadastroModal";
import EditarCobranca from "../../components/EditarCobranca";
import ExcluirCobranca from "../../components/ExcluirCobranca";
import ModalDetalhesCobrancas from "../../components/ModalDetalhesCobrancas";

export default function Cobrancas() {
  const { abrirDetalhesCobrancas, modalEditarCadastro,
    abrirModalDetalheCobranca, abrirModalDeletarCobranca, busca,
    setBusca,
    setFiltro,
    pesquisar,
    setPesquisar } = useHookContext();

  function buscar() {
    setFiltro(true);
    setPesquisar(!pesquisar)
  }

  return (
    <>
      <div className="container-cobranças">
        {abrirDetalhesCobrancas && <ModalDetalhesCobrancas />}
        {abrirModalDetalheCobranca && <EditarCobranca />}
        {modalEditarCadastro && <EditarCadastroModal />}
        {abrirModalDeletarCobranca && <ExcluirCobranca />}
        <div className="menu-cobranças">
          <MenuLateral />
        </div>
        <div className="principal-cobranças">
          <Cabecalho />
          <div className="topo-título-cobrança">
            <div className="título-cobrança">
              <img src={iconeCobrança} alt="ícone cobrança" />
              <h1>Cobranças</h1>
            </div>
            <div className="pesquisa-cobranças">
              <img src={filtroCobranças} alt="filtro" />
              <input
                type="text"
                placeholder="Pesquisa"
                value={busca}
                onChange={(e) => setBusca(e.target.value)}
              />
              <img src={lupa} alt="buscar" className="buscar-cobrança"
                onClick={buscar} />
            </div>
          </div>
          <div>
            <TabelaCobrancas />
          </div>
        </div>
      </div>
    </>
  );
}
