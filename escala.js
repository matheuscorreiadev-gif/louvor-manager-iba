const form = document.getElementById("formEscala");
const listaEscalas = document.getElementById("listaEscalas");
const membrosCheckbox = document.getElementById("membrosCheckbox");

// Carregar membros como checkbox
function carregarMembros() {
  const membros = JSON.parse(localStorage.getItem("membros")) || [];

  membrosCheckbox.innerHTML = "";

  membros.forEach((membro, index) => {
    const div = document.createElement("div");

    div.innerHTML = `
      <input type="checkbox" id="membro${index}" value="${membro.nome}">
      <label for="membro${index}">
        ${membro.nome} - ${membro.funcao}
      </label>
    `;

    membrosCheckbox.appendChild(div);
  });
}

carregarMembros();

// Salvar escala
form.addEventListener("submit", function(e) {
  e.preventDefault();

  const mes = document.getElementById("mes").value;
  const data = document.getElementById("data").value;
  const tipoCulto = document.getElementById("tipoCulto").value;

  const membrosSelecionados = [];

  const checkboxes = membrosCheckbox.querySelectorAll("input[type='checkbox']");

  checkboxes.forEach(checkbox => {
    if (checkbox.checked) {
      membrosSelecionados.push(checkbox.value);
    }
  });

  if (membrosSelecionados.length === 0) {
    alert("Selecione pelo menos um membro.");
    return;
  }

  const novaEscala = {
    mes,
    data,
    tipoCulto,
    membros: membrosSelecionados
  };

  const escalas = JSON.parse(localStorage.getItem("escalas")) || [];
  escalas.push(novaEscala);

  localStorage.setItem("escalas", JSON.stringify(escalas));

  form.reset();
  listarEscalas();
});

// Listar escalas
function listarEscalas(filtro = null) {
  const escalas = JSON.parse(localStorage.getItem("escalas")) || [];

  listaEscalas.innerHTML = "";

  const escalasFiltradas = filtro
    ? escalas.filter(e => e.mes === filtro)
    : escalas;

  escalasFiltradas.forEach((escala, index) => {
    const div = document.createElement("div");
    div.classList.add("card-escala");

    div.innerHTML = `
      <p><strong>Mês:</strong> ${escala.mes}</p>
      <p><strong>Data:</strong> ${escala.data}</p>
      <p><strong>Culto:</strong> ${escala.tipoCulto}</p>
      <p><strong>Membros:</strong> ${escala.membros.join(", ")}</p>
      <button onclick="removerEscala(${index})">Excluir</button>
      <button onclick="gerarWhatsApp(${index})">Gerar Texto WhatsApp</button>
      <hr>
    `;

    listaEscalas.appendChild(div);
  });
}

function filtrarEscalas() {
  const mesFiltro = document.getElementById("filtroMes").value;
  listarEscalas(mesFiltro);
}

function gerarWhatsApp(index) {
  const escalas = JSON.parse(localStorage.getItem("escalas")) || [];
  const escala = escalas[index];

  const texto = `
📅 ESCALA MINISTÉRIO DE LOUVOR
Igreja Batista Aliança

🗓 Data: ${escala.data}
🎵 Culto: ${escala.tipoCulto}

👥 Escalados:
${escala.membros.map(m => "- " + m).join("\n")}

Que Deus abençoe a todos!
  `;

  navigator.clipboard.writeText(texto)
    .then(() => alert("Texto copiado! Cole no WhatsApp."))
    .catch(() => alert("Erro ao copiar."));
}

function removerEscala(index) {
  const escalas = JSON.parse(localStorage.getItem("escalas")) || [];
  escalas.splice(index, 1);
  localStorage.setItem("escalas", JSON.stringify(escalas));
  listarEscalas();
}

listarEscalas();