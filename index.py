import requests
from bs4 import BeautifulSoup
import pandas as pd  # Biblioteca para estruturar os dados

# URL do site que deseja extrair os produtos
url = "https://exemplo.com/categoria-produtos"

# Fazendo a requisição para obter o HTML da página
headers = {"User-Agent": "Mozilla/5.0"}
response = requests.get(url, headers=headers)
soup = BeautifulSoup(response.text, "html.parser")

# Criando lista para armazenar os dados
produtos_lista = []

# Encontrando os produtos na página
produtos = soup.find_all("div", class_="produto")

for produto in produtos:
    nome = produto.find("h2", class_="product-name").text.strip()
    imagem = produto.find("img")["src"]
    
    produtos_lista.append({"Nome": nome, "Imagem": imagem})

# Criando DataFrame para visualizar melhor os dados
df = pd.DataFrame(produtos_lista)

# Exibir resultados de forma organizada no terminal
print(df)
