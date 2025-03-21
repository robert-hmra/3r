import os
import json

# 📂 Defina o diretório onde estão as imagens
DIRETORIO_BASE = "/Users/henriquerobert/Documents/GitHub/3r/imagens/produtos/"  # Altere para o caminho correto se necessário

# Dicionário para armazenar as pastas e imagens
estrutura = {}

# Percorre todas as pastas e subpastas
for raiz, _, arquivos in os.walk(DIRETORIO_BASE):
    imagens = [arquivo for arquivo in arquivos if arquivo.lower().endswith((".jpg", ".png", ".jpeg", ".webp"))]

    if imagens:  # Se houver imagens na pasta, adicionamos ao JSON
        caminho_formatado = raiz.replace(" ", "_")  # Substitui espaços por "_"
        estrutura[caminho_formatado] = imagens

# Salvar em um arquivo JSON
caminho_json = os.path.join(os.getcwd(), "pastas-imagens.json")  # Salva no mesmo diretório do script

with open(caminho_json, "w", encoding="utf-8") as f:
    json.dump(estrutura, f, indent=4, ensure_ascii=False)

print(f"✅ JSON gerado com sucesso! Arquivo salvo em: {caminho_json}")

#||||||||||||||||||||||||||||||||||
#vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv

#EXECUTAR COM python3 gerar_json.py