import { render, screen } from "@testing-library/react";
import React from "react";
import Formulario from "./Formulario";

// Jest

test("quando o input está vazio, novos participantes não podem ser adicionados", () => {
  render(<Formulario />);

  // encontrar no DOM o input
  const input = screen.getByPlaceholderText(
    "Insira os nomes dos participantes"
  );
  // encontrar o botão
  const botao = screen.getByRole("button");

  // garantir que o inpu esteja no documento
  expect(input).toBeInTheDocument();
  // garantir que o botao esteja desabilitado
  expect(botao).toBeDisabled();
});