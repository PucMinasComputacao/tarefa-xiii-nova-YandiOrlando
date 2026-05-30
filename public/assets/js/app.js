const API_URL = "http://localhost:3000";

async function carregarCarousel() {
  const carousel = document.getElementById("carousel-content");
  if (!carousel) return;

  const response = await fetch(`${API_URL}/desenvolvedores`);
  const desenvolvedores = await response.json();
  const destaques = desenvolvedores.filter(dev => dev.destaque);

  destaques.forEach((dev, index) => {
    carousel.innerHTML += `
      <div class="carousel-item ${index === 0 ? 'active' : ''}">
        <div class="carousel-bg" style="background-image:url('${dev.imagem}')">
          <div class="carousel-overlay">
            <div class="carousel-content">
              <h2>${dev.nome}</h2>
              <p>${dev.descricao}</p>
              <a href="detalhes.html?id=${dev.id}" class="btn-custom">Ver detalhes</a>
            </div>
          </div>
        </div>
      </div>
    `;
  });
}

async function carregarCards() {
  const container = document.getElementById("cards-container");
  if (!container) return;

  const response = await fetch(`${API_URL}/desenvolvedores`);
  const desenvolvedores = await response.json();

  desenvolvedores.forEach(dev => {
    container.innerHTML += `
      <div class="col-lg-4 col-md-6 mb-4">
        <div class="card-custom">
          <div class="card-img-bg" style="background-image:url('${dev.imagem}')"></div>
          <div class="card-content">
            <h5>${dev.nome}</h5>
            <p>${dev.descricao}</p>
            <a href="detalhes.html?id=${dev.id}" class="btn-custom">Saiba mais</a>
          </div>
        </div>
      </div>
    `;
  });
}

async function carregarDetalhes() {
  const detalhes = document.getElementById("detalhes-container");
  if (!detalhes) return;

  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");

  if (!id) {
    detalhes.innerHTML = "<p>ID não informado. Volte para a página inicial.</p>";
    return;
  }

  const response = await fetch(`${API_URL}/desenvolvedores/${id}`);

  if (response.status === 404) {
    detalhes.innerHTML = "<p>Desenvolvedor não encontrado.</p>";
    return;
  }

  const dev = await response.json();

  detalhes.innerHTML = `
    <div class="details-wrapper">
      <div class="row g-0">
        <div class="col-lg-6">
          <div class="details-img" style="background-image:url('${dev.imagem}')"></div>
        </div>
        <div class="col-lg-6">
          <div class="details-content">
            <h2>${dev.nome}</h2>
            <p>${dev.conteudo}</p>
            <p><strong>País:</strong> ${dev.pais}</p>
            <p><strong>ID:</strong> ${dev.id}</p>
            <p><strong>Categoria:</strong> Desenvolvedor de Jogos</p>
            <p><strong>Status:</strong> Figura Influente da Indústria</p>
          </div>
        </div>
      </div>
    </div>
  `;

  const obrasContainer = document.getElementById("atracoes-container");

  dev.obras.forEach(obra => {
    obrasContainer.innerHTML += `
      <div class="col-lg-4 col-md-6 mb-4">
        <div class="atracao-card">
          <div class="atracao-img" style="background-image:url('${obra.imagem}')"></div>
          <div class="atracao-content">
            <h5>${obra.nome}</h5>
            <p>${obra.descricao}</p>
          </div>
        </div>
      </div>
    `;
  });
}

carregarCarousel();
carregarCards();
carregarDetalhes();