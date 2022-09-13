/**
 * Subir um conteiner docker com um banco de dados MySQL
 * Fazer um CRUD.
 */

const express = require("express");
const mysql = require("mysql");
const funcoes = require("./funcoes");

app = express();
app.use(express.json());

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "123456",
    database: "teste_db",
    port: 3306
});

con.connect((err) => {
    if (err) throw err;
    console.log("Conectado ao banco de dados teste_db");
    // Criar a tabela de clientes, se não existir
    var sql = "CREATE TABLE IF NOT EXISTS clientes_tb " +
              "(id INT AUTO_INCREMENT PRIMARY KEY, nome VARCHAR(80), " +
              "login VARCHAR(30), senha VARCHAR(10), email VARCHAR(100))";
    con.query(sql, (err, result) => {
        if (err) throw err;
        console.log("Tabela de clientes criada/acessada com sucesso.");
    });
});

app.get("/", (request, response) => {
    return response.json({mensagem: "OK, recebido com sucesso!"});
});

// Gravar um cliente no banco recebido via POST
app.post("/cliente", (request, response) => {
    const { nome, login, senha, email } = request.body;
    var sql = "INSERT INTO clientes_tb (nome, login, senha, email) VALUES ('" +
              nome + "', '" + login + "', '" + senha + "', '" + email + "')";
    con.query(sql, (err, result) => {
        if (err) throw err;
        return response.json({
            mensagem: "Cliente inserido com sucesso",
            id: result.insertId
        });
    });
});

// Obter a lista de clientes cadastrados
app.get("/clientes", (request, response) => {
    var sql = "SELECT * FROM clientes_tb";
    con.query(sql, (err, result, fields) => {
        if (err) throw err;
        return response.json(result);
    });
});

app.get("/cliente/:id", (request, response) => {
    const { id } = request.params;
    var sql = "SELECT * FROM clientes_tb WHERE id = " + mysql.escape(id);
    con.query(sql, (err, result) => {
        if (err) throw err;
        if (Object.keys(result).length === 0){
            return response.json({
                mensagem: "Cliente não encontrado"
            });
        } else {
            return response.json(result);
        }
        console.log(result);
    });
});

app.put("/cliente/:id", (request, response) => {
    const { id } = request.params;
    const { nome, login, senha, email } = request.body;

    //console.log(funcoes.checarId(id, con, mysql));

    //var checarId = funcoes.checarId(id, con, mysql);

    var checarId = function() {
        if (id === undefined){
            return false;
        }
        if (isNaN(id)){
            return false;
        }
        var sql = "SELECT * FROM clientes_tb WHERE id = " + mysql.escape(id);
        con.query(sql, (err, result) => {
            if (err) throw err;
            //console.log(Object.keys(result).length);
            return (Object.keys(result).length > 0);
        });
    };

    if (!checarId()){
        return response.json({
            mensagem: "Cliente não encontrado"
        });
    }

    //console.log(request);
    // Montar o SQL de acordo com os parâmetros que vieram
    var sql = "UPDATE clientes_tb SET ";
    var vai = false;

    //console.log(nome, login, senha, email, id);

    if (funcoes.checarCampo(nome)){
        sql += "nome = " + mysql.escape(nome) + ", ";
        vai = true;
    }

    if (funcoes.checarCampo(login)){
        sql += "login = " + mysql.escape(login) + ", ";
        vai = true;
    }

    if (funcoes.checarCampo(senha)){
        sql += "senha = " + mysql.escape(senha) + ", ";
        vai = true;
    }

    if (funcoes.checarCampo(email)){
        sql += "email = " + mysql.escape(email) + ", ";
        vai = true;
    }

    if (!vai){
        return response.json({
            mensagem: "Sem campos a serem atualizados"
        });
    }

    var comando = sql.substring(0, sql.length - 2) + " WHERE id = " + mysql.escape(id);
    //console.log(comando);

    con.query(comando, (err, result) => {
        if (err) throw err;
        return response.json(result);
    });
});

app.listen(3001, () => console.log("Servidor rodando na porta 3001"));