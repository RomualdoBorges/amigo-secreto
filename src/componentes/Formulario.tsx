import React from "react";
import { useAdicionarParticipante } from "../state/hook/useAdicionarParticipante";
import { useMensagemDeErro } from "../state/hook/useMensagemDeErro";
import "./Formulario.css";

const Formulario = () => {
  const [nome, setNome] = React.useState("");

  const inputRef = React.useRef<HTMLInputElement>(null);

  const adicionaNaLista = useAdicionarParticipante();

  const mensagemDeErro = useMensagemDeErro();

  const adicionarParticipante = (evento: React.FormEvent<HTMLFormElement>) => {
    evento.preventDefault();
    adicionaNaLista(nome);
    setNome("");
    inputRef.current?.focus();
  };

  return (
    <form onSubmit={adicionarParticipante}>
      <div className="grupo-input-btn">
        <input
          ref={inputRef}
          value={nome}
          onChange={(evento) => setNome(evento.target.value)}
          type="text"
          placeholder="Insira os nomes dos participantes"
        />
        <button disabled={!nome}>Adicionar</button>
      </div>
      {mensagemDeErro && (
        <p className="alerta erro" role="alert">
          {mensagemDeErro}
        </p>
      )}
    </form>
  );
};

export default Formulario;
