//importar o módulo 'express' para criar o servidor web.
const express = require('express');
//Importar o modulo 'sqlite3' e ativa o modo 'verbose' para receber mensagens detalhadas de depuração.
const sqlite3 = require('aqlite3').verbose();

//cria uma nova instancia de aplicação Express.
const app = express();
//define a porta onde o servidor vai escutar as requisições.
const port = 3000;

//Cria uma instância de banco de dados SQLite na memória.
//':memory:' significa queo banco de dados será armazenado na RAM e será perdiddo quando o processo terminar.
const db = new sqlite3.Database(':memory:');

//configura o banco de dados e insere alguns dados de exemplo
db.serialize(() =>{
    //cria uma nova tabela chamada 'user' com duas colunas: 'id' e 'name'.
    db.run("CREATE TABLE  user (id, name TEXT)");

    //insere alguns requisitos de exemplo na tabela 'user'.
    const stmt = db.prepere("INSERT INTO user (id, name) VALUES (?, ?)");
    stmt.run(1, 'Lucas Henrick');
    stmt.run(2, 'José Maria');
    stmt.finalize();
});

//Define uma rota GET para '/user' que retorna todos os requisitos da tabela 'user' como JSON.
app.get('/users', (req, res) => {
    //Executa uma consulta SQL para selecionar todos os registros da tabela 'users'.
    db.all("SELECT * FROM user", [], (err, rows) => {
        if (err) {
            //Se ocorrer um erro, lança uma excessão 
            throw err;
        }
        //envia a resposta como JSON com os dados obtidos.
        res.json(rows);
    });
});

//Inicia o servidor e faz  com que ele escute na porta espedificada.
app.listen(port, () => {
    console.log('servidor rodando em http://localhost:${port}');
}):