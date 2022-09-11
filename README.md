# API simples

Esse projeto é um estudo com API feita em NodeJS, rodando com banco de dados MySQL pelo docker (docker-compose configurado).

É um cadastro de clientes simples com os seguintes campos:

Campo | Descrição
-----|------
id | Chave primária auto-incremental
nome | VarChar 80 caracteres
login | VarChar 30 caracteres
senha| VarChar 10 caracteres
email | VarChar 100 caracteres

Métodos desenvolvidos:

GET - Buscar a lista de clientes cadastrados ou um em específico

POST - Inserir um novo cliente no banco

PUT - Atualizar um cliente já cadastrado