// Selecionar elementos do DOM
const form = document.getElementById('certificado-form');
const listaCertificados = document.getElementById('lista-certificados');

// Carregar certificados do LocalStorage
let certificados = JSON.parse(localStorage.getItem('certificados')) || [];

// Função para salvar certificados no LocalStorage
function salvarCertificados() {
  localStorage.setItem('certificados', JSON.stringify(certificados));
}

// Função para renderizar certificados na tela
function renderizarCertificados() {
  if (!listaCertificados) return; // Evita erros na página inicial
  listaCertificados.innerHTML = '';
  certificados.forEach((certificado, index) => {
    const li = document.createElement('li');
    li.innerHTML = `
      <div>
        <strong>${certificado.titulo}</strong> <br>
        ${certificado.instituicao} - ${certificado.data} <br>
        <a href="${certificado.arquivo}" target="_blank">Ver Arquivo</a>
      </div>
      <button onclick="removerCertificado(${index})">Excluir</button>
    `;
    listaCertificados.appendChild(li);
  });
}

// Função para adicionar certificado
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const titulo = document.getElementById('titulo').value;
    const instituicao = document.getElementById('instituicao').value;
    const data = document.getElementById('data').value;
    const arquivoInput = document.getElementById('arquivo');
    const arquivo = arquivoInput.files[0];

    if (arquivo) {
      const reader = new FileReader();
      reader.onload = function (event) {
        const novoCertificado = {
          titulo,
          instituicao,
          data,
          arquivo: event.target.result, // Armazena o arquivo como Base64
        };

        certificados.push(novoCertificado);
        salvarCertificados();
        renderizarCertificados();
        form.reset();
      };
      reader.readAsDataURL(arquivo);
    }
  });
}

// Função para remover certificado
function removerCertificado(index) {
  certificados.splice(index, 1);
  salvarCertificados();
  renderizarCertificados();
}

// Função para voltar à página inicial
function voltar() {
  window.location.href = "index.html";
}

// Renderizar certificados ao carregar a página
renderizarCertificados();
