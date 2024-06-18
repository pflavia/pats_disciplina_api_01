const require = require('supertest');
const funcoesGenerais = require('../suporte/funcoesGenerais');
const jsonUsuarios = require('../fixtures/json_usuarios');
const app = require('../app');
const { json_arquivo_cadastro_usuario } = require('../fixture/json_usuarios');
const rota = "http://localhost:3000/";
const rotaUsers = "http://localhost:3000/users";

describe('Suite de testes da api users...', () => {

    const json_local_arquivo_cadastro_usuario = {
        nome: "Flávia Novo 2",
        telefone: "(51) 99988-5522",
        email: "flaviNovo2@gmail.com",
        senha: "1234"
    }
    const json_local_arquivo_sem_conteudo = {

    }

    it('Consulta todos os usuários... deve retornar status 200', async () => {
        funcoesGenerais.teste1();
        const response = await require(rota)
            .get('/users');
        expect(response.status).toBe(200);
        console.log(response.body);
    });

    it('Consulta todos os usuários... deve retornar status 200', async () => {
        const response = await require(rota)
            .get('/activities');
        expect(response.status).toBe(200);
        console.log(response.body);
    });

//it.only para executar apenas um teste
    it('Deve cadastrar um novo usuário e deve retornar status 200', async () => {
        const response = await require(rota)
            .post('/users')
            .send(json_arquivo_cadastro_usuario);
        expect(response.status).toBe(200);
        expect(response.status).EqualTo(json_arquivo_cadastro_usuario);
        console.log(response.body);
    });

    it('Tentativa de cadastrar um novo usuário com e-mail que já existe... de deve retornar messagem de erro', async () => {
        const response = await require(rota)
            .post('/users')
            .send(json_arquivo_cadastro_usuario);
        expect(response.status).toBe(422);
        expect(response.status).contains("E-mail já está em uso");
        console.log(response.body);
    });
});