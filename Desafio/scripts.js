document.addEventListener("DOMContentLoaded", function () {
  const inputTarefa = document.querySelector(".espacoTare");
  const botaoAdicionar = document.querySelector(".addTask");
  const lista = document.querySelector(".listaTask");

  let tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];

  function salvarTarefas() {
    localStorage.setItem("tarefas", JSON.stringify(tarefas));
  }

  function criarTarefa(texto, index) {
    const li = document.createElement("li");
    li.classList.add("task");

    const divItem = document.createElement("div");
    divItem.classList.add("item");

    const paragrafo = document.createElement("p");
    paragrafo.textContent = texto;
    paragrafo.title = texto;

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.addEventListener("change", function () {
      paragrafo.style.textDecoration = checkbox.checked ? "line-through" : "none";
    });

    divItem.appendChild(checkbox);
    divItem.appendChild(paragrafo);

    const divBotoes = document.createElement("div");
    divBotoes.classList.add("sectionButtom");

    const botaoEditar = document.createElement("a");
    botaoEditar.href = "#";
    botaoEditar.classList.add("buttonEdit");
    const imgEditar = document.createElement("img");
    imgEditar.src = "./img/PencilSimple.png";
    imgEditar.alt = "editar";
    botaoEditar.appendChild(imgEditar);

    const botaoExcluir = document.createElement("a");
    botaoExcluir.href = "#";
    botaoExcluir.classList.add("buttonDelete");
    const imgExcluir = document.createElement("img");
    imgExcluir.src = "./img/Trash.png";
    imgExcluir.alt = "Apagar";
    botaoExcluir.appendChild(imgExcluir);

    divBotoes.appendChild(botaoEditar);
    divBotoes.appendChild(botaoExcluir);

    li.appendChild(divItem);
    li.appendChild(divBotoes);

    botaoEditar.addEventListener("click", function () {
      editarTarefa(paragrafo, index);
    });

    botaoExcluir.addEventListener("click", function () {
      tarefas.splice(index, 1);
      salvarTarefas();
      renderizarTarefas();
    });

    return li;
  }

  function renderizarTarefas() {
    lista.innerHTML = "";
    tarefas.forEach((texto, index) => {
      const tarefa = criarTarefa(texto, index);
      lista.appendChild(tarefa);
    });
  }

  function editarTarefa(paragrafo, index) {
    const textoOriginal = paragrafo.textContent;
    paragrafo.contentEditable = true;
    paragrafo.focus();

    function finalizarEdicao() {
      const textoEditado = paragrafo.textContent.trim();

      if (textoEditado === "") {
        paragrafo.textContent = textoOriginal;
      } else {
        tarefas[index] = textoEditado;
        salvarTarefas();
      }

      paragrafo.contentEditable = false;
      paragrafo.removeEventListener("blur", onBlur);
      paragrafo.removeEventListener("keydown", onKeyDown);
    }

    function onBlur() {
      finalizarEdicao();
    }

    function onKeyDown(event) {
      if (event.key === "Enter") {
        event.preventDefault();
        finalizarEdicao();
        paragrafo.blur();
      } else if (event.key === "Escape") {
        paragrafo.textContent = textoOriginal;
        paragrafo.contentEditable = false;
        paragrafo.removeEventListener("blur", onBlur);
        paragrafo.removeEventListener("keydown", onKeyDown);
      }
    }

    paragrafo.addEventListener("blur", onBlur);
    paragrafo.addEventListener("keydown", onKeyDown);
  }

  function adicionarTarefa() {
    const texto = inputTarefa.value.trim();
    if (texto) {
      tarefas.push(texto);
      salvarTarefas();
      renderizarTarefas();
      inputTarefa.value = "";
    }
  }

  botaoAdicionar.addEventListener("click", adicionarTarefa);

  inputTarefa.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      adicionarTarefa();
    }
  });

  renderizarTarefas();
});
