      
 
      // Função para calcular o frete
      function calcularFrete(cepDestino) {
        const cepOrigem = "71571817"; // CEP de origem (Brasília)

        // Parâmetros padrão
        const peso = 1; // Peso em kg
        const comprimento = 20; // Comprimento em cm
        const altura = 5; // Altura em cm
        const largura = 15; // Largura em cm

        try {
            // 🔢 Capturar os 5 primeiros dígitos dos CEPs para calcular a diferença real
            let regiaoOrigem = parseInt(cepOrigem.substring(0, 5)); // Usar os primeiros 5 números
            let regiaoDestino = parseInt(cepDestino.substring(0, 5)); // Usar os primeiros 5 números

            // 📏 Estimativa de distância realista
            let distancia = Math.abs(regiaoDestino - regiaoOrigem); // Subtrair os primeiros 5 números dos CEPs

            // Multiplicar para simular a distância real (usando uma média de ~10 km por unidade no número do CEP)
            let fatorConversao = 10; // Aproximadamente 10 km por unidade de diferença no CEP
            distancia = distancia * fatorConversao;

            if (distancia < 50) distancia = 50; // Evitar valores muito baixos

            // 📦 Simulação SEDEX
            let valorSedex = (peso * 3.5) + (distancia * 0.01) + 6 ; // Aumento de R$ 3
            let prazoSedex = Math.ceil(distancia / 600); // Aproximadamente 600 km/dia

            // 📦 Simulação PAC
            let valorPac = (peso * 2.8) + (distancia * 0.015) + 9 ; // Aumento de R$ 3
            let prazoPac = Math.ceil(distancia / 400);

            // 🚚 Simulação Jadlog
            let valorJadlog = (peso * 3.0) + (distancia * 0.018) + 7 ; // Aumento de R$ 3
            let prazoJadlog = Math.ceil(distancia / 500);

            // Atualizando o conteúdo do parágrafo com os valores calculados
            const text = document.querySelector(".resultado-cauculo");
            text.innerHTML = `
                📦 SEDEX: R$ ${valorSedex.toFixed(2)} (Prazo: ${prazoSedex} dias)<br>
                📦 PAC: R$ ${valorPac.toFixed(2)} (Prazo: ${prazoPac} dias)<br>
                🚚 Jadlog: R$ ${valorJadlog.toFixed(2)} (Prazo: ${prazoJadlog} dias)
            `;


        } catch (error) {
            console.error("Erro ao calcular o frete:", error);
            alert("Erro ao calcular o frete. Tente novamente.");
        }
    }
    // Função que será chamada quando o botão "ver detalhes" do produto for clicado

    
    
    
    // Função que será chamada quando o botão for clicado
document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll(".btn-descricao-produto").forEach(botao => {
        botao.addEventListener("click", function() {
            const card = this.closest(".card");
            const nome = card.querySelector(".card-body .card-category").textContent;
            const preco = card.querySelector(".card-body .card-text").textContent.replace("Preço: R$ ", "").replace(".", "");
            const imagem = card.querySelector(".card-img-top").src;

            // Gerando o nome do produto para passar como parâmetro
            const nomeProduto = nome.replace(/\s+/g, '-').toLowerCase(); // Formato para URLert
            const produtoID = "1230"; // O ID do produto
            window.location.href = `../pages/detalhes.html?nome=${encodeURIComponent(nome)}&preco=${encodeURIComponent(preco)}&imagem=${imagem}&produto=${encodeURIComponent(nomeProduto)}&produtoID=${encodeURIComponent(produtoID)}`;
        });
    });
    // Função para redirecionar para a página de descrição do produto ao clicar na imagem
    document.querySelectorAll(".card-img-top").forEach(img => {
        img.addEventListener("click", function() {
            const produtoID = img.getAttribute("data-id"); // Certifique-se de que cada imagem tenha um data-id
            if (produtoID) {
                window.location.href = `pages/detalhes.html?produtoID=${produtoID}`;
            } else {
                console.error("Produto ID não encontrado.");
            }
        });
    });
    const button = document.querySelector("button");
    button.addEventListener("click", function() {
        const cepDestino = document.getElementById("cep").value;
        if (cepDestino && cepDestino.length === 8) { // Validando o CEP
            calcularFrete(cepDestino);
        } else {
            alert("Por favor, insira um CEP válido!");
        }
    });
    // Seleciona todos os .card-group dentro do container com id="best-sellers"
    var container = document.getElementById("best-sellers");
    var grupos = container.querySelectorAll(".card-group"); // Todos os card-groups dentro de #best-sellers
    var btn = document.querySelector(".btn-hide-show"); // Único botão de controle
    var estado = 0; // Estado inicial
    
    // Oculta todos os card-groups, exceto o primeiro
    grupos.forEach((grupo, index) => {
        if (index > 0) {
            grupo.style.display = "none";
        }
    });

    btn.addEventListener("click", function () {
        // Conta quantos grupos estão visíveis
        let gruposVisiveis = Array.from(grupos).filter(g => g.style.display !== "none").length;
    
        if (estado === 0) {
            // Exibir o próximo grupo oculto, se existir
            if (gruposVisiveis < grupos.length) {
                // Exibe o próximo grupo
                grupos[gruposVisiveis].style.display = "flex";
                // Verifica se todos os grupos estão visíveis
                if (gruposVisiveis + 1 === grupos.length) {
                    btn.innerHTML = 'Ver menos <i class="bi bi-arrow-bar-up"></i>';
                    estado = 2; // Passa para o estado de "Ver menos"
                } else {
                    btn.innerHTML = 'Ver mais <i class="bi bi-arrow-bar-down"></i>';
                    estado = 0; // Continua no estado de "Ver mais"
                }
            }
        } 
        else if (estado === 2) {
            // Ocultar o último grupo visível
            if (gruposVisiveis > 1) {
                // Oculta o último grupo visível
                grupos[gruposVisiveis - 1].style.display = "none";
                // Se houver apenas o primeiro grupo visível, muda para "Ver mais"
                if (gruposVisiveis - 1 === 1) {
                    btn.innerHTML = 'Ver mais <i class="bi bi-arrow-bar-down"></i>';
                    estado = 0; // Passa para o estado de "Ver mais"
                } else {
                    btn.innerHTML = 'Ver menos <i class="bi bi-arrow-bar-up"></i>';
                    estado = 2; // Mantém no estado de "Ver menos"
                }
            }
        }
    });

    
    var dropdowns = document.querySelectorAll(".dropdown-submenu > a");
    dropdowns.forEach(function (dropdown) {
        dropdown.addEventListener("click", function (e) {
            e.preventDefault();
            e.stopPropagation();

            let submenu = this.nextElementSibling;
            if (submenu.style.display === "block") {
                submenu.style.display = "none";
            } else {
                if (window.innerWidth > 768) {
                    // Em telas grandes, submenu abre ao lado
                    submenu.style.display = "block";
                    submenu.style.position = "absolute";
                    submenu.style.left = "100%";
                    submenu.style.top = "0px";
                } else {
                    // Em telas pequenas, submenu abre abaixo
                    submenu.style.display = "block";
                    submenu.style.position = "absolute";
                    submenu.style.left = "0";
                    submenu.style.top = "auto";
                }
            }
        });
    });

    let whatsappNumber = "61994107771"; // Seu número do WhatsApp
    document.querySelectorAll(".mini-banner").forEach((minibanner) => {
        let productName = minibanner.querySelector("h2").innerText;
        let message = encodeURIComponent(`Olá, venho pela loja online! Tenho interesse no produto: ${productName} 🤩, o produto está disponível?`);
        let whatsappLink = `https://wa.me/${whatsappNumber}?text=${message}`;

        minibanner.querySelector(".whatsapp-link").href = whatsappLink;
    });

    document.querySelectorAll(".card-body").forEach((card) => {
        let productName = card.querySelector(".card-title").innerText;
        let productValor = card.querySelector(".card-text").innerText;
        let message = encodeURIComponent(`Olá, venho pela loja online! Tenho interesse no produto: ${productName} 🤩, de valor: ${productValor} o produto está disponível?`);
        let whatsappLink = `https://wa.me/${whatsappNumber}?text=${message}`;

        card.querySelector(".whatsapp-link").href = whatsappLink;
    });
});
