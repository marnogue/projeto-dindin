import "./styles.css";
import { useHookContext } from "../../Context/UserContext";
import CadastrarClienteModal from "../../components/CadastrarClienteModal";
import MenuLateral from "../../components/MenuLateral";
import CabecalhoDetalhesCliente from "../../components/CabeçalhoDetalhesCliente";

export default function DetalheDoCliente() {
  const { modalCadastrarCliente } = useHookContext();
  return (
    <div className="container">
      {modalCadastrarCliente && <CadastrarClienteModal />}
      <MenuLateral />
      <div className="principal">
        <CabecalhoDetalhesCliente />
      </div>
    </div>
  );
}
