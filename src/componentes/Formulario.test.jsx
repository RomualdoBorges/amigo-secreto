import { fireEvent, render, screen, act } from "@testing-library/react";
import React from "react";
import Formulario from "./Formulario";
import { RecoilRoot } from "recoil";

describe("o comportamento do Formulario.tsx", () => {
  test("quando o input está vazio, novos participantes não podem ser adicionados", () => {
    render(
      <RecoilRoot>
        <Formulario />
      </RecoilRoot>
    );
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

  test("adicionar um participante caso existe um nome preenchido", () => {
    render(
      <RecoilRoot>
        <Formulario />
      </RecoilRoot>
    );
    // encontrar no DOM o input
    const input = screen.getByPlaceholderText(
      "Insira os nomes dos participantes"
    );
    // encontrar o botão
    const botao = screen.getByRole("button");

    // inserir um valor no input
    fireEvent.change(input, {
      target: {
        value: "Ana Caratina",
      },
    });

    // clicar no botão de submeter
    fireEvent.click(botao);

    // garantir que o input esteja com o foco ativo
    expect(input).toHaveFocus();

    // garantir que o input não tenha um valor
    expect(input).toHaveValue("");
  });

  test("nomes duplicados não podem ser adicionados na lista", () => {
    render(
      <RecoilRoot>
        <Formulario />
      </RecoilRoot>
    );
    const input = screen.getByPlaceholderText(
      "Insira os nomes dos participantes"
    );
    const botao = screen.getByRole("button");
    fireEvent.change(input, {
      target: {
        value: "Ana Caratina",
      },
    });
    fireEvent.click(botao);
    fireEvent.change(input, {
      target: {
        value: "Ana Caratina",
      },
    });
    fireEvent.click(botao);

    const mensagemDeErro = screen.getByRole("alert");

    expect(mensagemDeErro.textContent).toBe(
      "Nomes duplicados não são permitidos!"
    );
  });

  test("a mensagem de erro deve sumir após timers", () => {
    jest.useFakeTimers();
    render(
      <RecoilRoot>
        <Formulario />
      </RecoilRoot>
    );
    const input = screen.getByPlaceholderText(
      "Insira os nomes dos participantes"
    );
    const botao = screen.getByRole("button");
    fireEvent.change(input, {
      target: {
        value: "Ana Caratina",
      },
    });
    fireEvent.click(botao);
    fireEvent.change(input, {
      target: {
        value: "Ana Caratina",
      },
    });
    fireEvent.click(botao);

    let mensagemDeErro = screen.queryByRole("alert");

    expect(mensagemDeErro).toBeInTheDocument();

    // esperar N segundos
    act(() => {
      jest.runAllTimers();
    });

    mensagemDeErro = screen.queryByRole("alert");
    expect(mensagemDeErro).toBeNull();
  });
});
