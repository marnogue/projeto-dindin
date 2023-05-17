import "./style.css";
import CardClientes from "../CardClientes";
import { useHookContext } from "../../Context/UserContext";
import CardClientesInadimplentes from "../CardClientesInadimplentes";
import CardClientesEmDia from "../CardClientesEmDia";
import setasSobeDesce from "../../assets/setasSobeDesce.svg";
import { useState } from "react";

export default function TabelaClientes() {
  const { verTodosClientes, verTodosInadimplentes, verTodosEmDia } = useHookContext();
  const [ordenacao, setOrdenacao] = useState(true);

  function ordenarClientes() {

    setOrdenacao(!ordenacao);

  }

  return (
    <div className="tabela-clientes">
      <div className="clientes-titulos">
        <strong> <img className="ordenacao" src={setasSobeDesce} alt="setas" onClick={ordenarClientes} /> Cliente</strong>
        <strong>CPF</strong>
        <strong>E-mail</strong>
        <strong>Telefone</strong>
        <strong>Status</strong>
        <strong>Criar Cobrança</strong>
      </div>
      {verTodosClientes && <CardClientes ordenacao={ordenacao} />}
      {verTodosInadimplentes && <CardClientesInadimplentes ordenacao={ordenacao} />}
      {verTodosEmDia && <CardClientesEmDia ordenacao={ordenacao} />}
    </div>
  );
}
