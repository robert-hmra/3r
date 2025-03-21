// 📌 Pegando os parâmetros da URL
const params = new URLSearchParams(window.location.search);
const titleProduto = params.get("nome"); 
const preco = params.get("preco");
const imagemPrincipal = params.get("imagem");
const produtoID = params.get("produtoID"); 
// 📌 Preenchendo os elementos do HTML com os dados do produto
document.getElementById("titleProduto").textContent = titleProduto;
document.getElementById("preco").textContent = "R$ " + preco;
document.getElementById("imagem").src = imagemPrincipal;
document.getElementById("imagem").alt = titleProduto;

// 📌 Obtendo o diretório base das imagens (removendo o nome do arquivo da URL)
const pastaImagens = imagemPrincipal
    .substring(0, imagemPrincipal.lastIndexOf("/"))
    .replace(/\s/g, "_") // Substitui espaços por "_"
    .replace(/\/$/, "");


// 📌 Função para carregar imagens do JSON
function carregarImagens() {
    fetch("../pastas-imagens.json") // Carrega o JSON que contém a estrutura das imagens
        .then(response => {
            if (!response.ok) {
                throw new Error("Erro ao carregar JSON");
            }
            return response.json();
        })
        .then(dados => {
            if (dados[pastaImagens]) {  // Verifica se a pasta existe no JSON

                const divImagens = document.getElementById("imagens-extras");
                divImagens.innerHTML = ""; // Limpa as imagens antigas

                // 📌 Percorre todas as imagens da pasta e insere no HTML
                dados[pastaImagens].forEach(imagem => {
                    const divColAuto = document.createElement("div");
                    divColAuto.classList.add("col-auto");

                    // Cria o elemento de imagem
                    const imgElement = document.createElement("img");
                    imgElement.src = `${pastaImagens}/${imagem}`;
                    imgElement.alt = `${titleProduto}`;
                    imgElement.classList.add("imagem-galeria");
                    imgElement.style.width = "50px"; // Ajuste de tamanho
                    imgElement.style.objectFit = "cover"; // Ajuste de tamanho

                    // Atualiza a imagem principal quando a miniatura for clicada
                    imgElement.onclick = () => {
                        exibirImagemNaDiv(imgElement.src);
                    };

                    // Adiciona a imagem dentro da div
                    divColAuto.appendChild(imgElement);

                    // Adiciona a div na seção de imagens
                    divImagens.appendChild(divColAuto);
                });
            } else {
                console.warn("⚠️ Nenhuma imagem extra encontrada para este produto.");
            }
        })
        .catch(error => console.error("❌ Erro ao carregar imagens:", error));
}

// 📌 Função para exibir a imagem na div principal
function exibirImagemNaDiv(src) {
    // Seleciona a imagem principal
    const imgDestaque = document.getElementById("imagem");

    if (imgDestaque) {
        imgDestaque.src = src; // Atualiza o src com a imagem clicada
    } else {
        console.error("❌ A tag <img> dentro de #imagemDestaque não foi encontrada!");
    }
}

// 📌 Chamar a função ao carregar a página
window.onload = carregarImagens;
