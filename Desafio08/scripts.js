document.addEventListener("DOMContentLoaded", function () {
  const inputTarefa = document.querySelector(".espaçoTare");
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

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";

    const paragrafo = document.createElement("p");
    paragrafo.textContent = texto;
    paragrafo.title = texto;

    divItem.appendChild(checkbox);
    divItem.appendChild(paragrafo);

    const divBotoes = document.createElement("div");
    divBotoes.classList.add("sectionButtom");

  
    const botaoEditar = document.createElement("a");
    botaoEditar.href = "#";
    botaoEditar.classList.add("button");
    const imgEditar = document.createElement("img");
    imgEditar.src = "./img/PencilSimple.png";
    imgEditar.alt = "editar";
    botaoEditar.appendChild(imgEditar);

  
    const botaoExcluir = document.createElement("a");
    botaoExcluir.href = "#";
    botaoExcluir.classList.add("button");
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
    paragrafo.contentEditable = true;
    paragrafo.focus();

    paragrafo.addEventListener("blur", function () {
      paragrafo.contentEditable = false;
      tarefas[index] = paragrafo.textContent.trim();
      salvarTarefas();
    });

    paragrafo.addEventListener("keydown", function (event) {
      if (event.key === "Enter") {
        event.preventDefault();
        paragrafo.blur();
      }
    });
  }

 
  botaoAdicionar.addEventListener("click", function () {
    const texto = inputTarefa.value.trim();
    if (texto) {
      tarefas.push(texto);
      salvarTarefas();
      renderizarTarefas();
      inputTarefa.value = "";
    }
  });


  renderizarTarefas();
});
