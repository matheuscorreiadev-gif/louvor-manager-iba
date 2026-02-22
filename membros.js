let membros = JSON.parse(localStorage.getItem("membros")) || [];

function cadastrarMembro() {
    const nome = document.getElementById("nome").value;
    const funcao = document.getElementById("funcao").value;

    if (nome === "" || funcao === "") {
        alert("Preencha todos os campos.");
        return;
    }

    const novoMembro = {
        nome: nome,
        funcao: funcao
    };

    membros.push(novoMembro);
    localStorage.setItem("membros", JSON.stringify(membros));

    document.getElementById("nome").value = "";
    document.getElementById("funcao").value = "";

    listarMembros();
}

function listarMembros() {
    const lista = document.getElementById("listaMembros");
    lista.innerHTML = "";

    membros.forEach((membro, index) => {
        const item = document.createElement("li");
        item.innerHTML = `${membro.nome} - ${membro.funcao}`;
        lista.appendChild(item);
    });
}

listarMembros();