const request = require("supertest");
const funcoesGenericas = require("../suporte/funcoes_genericas");
const 
 = require("../fixture/json_usuarios");
const { beforeEach } = require("node:test");
const rota = "http://localhost:3000";
const rotaUsers = "http://localhost:3000/users";

describe('Suite de testes da api users...', () => {

    const json_arquivo_cadastro_usuario_tres = {
        nome: "Flávia",
        telefone: "51997056160",
        email: "fladdvigmail.com",
        senha: "1234",
    };
    let idUsuario;

    it('beforeAll', async () => {
        let idParaDeletar = 15;
        const responseConsulta = await request(rota)
            .get('/users');

        if (responseConsulta.body.id !== null) {
            console.log('valor do id para deletar', responseConsulta.body.id);
            //idParaDeletar= responseConsulta.body.id;
            let response = await request(rota).delete(`/users/${idParaDeletar++}`);
            response = await request(rota).delete(`/users/${idParaDeletar++}`);
            response = await request(rota).delete(`/users/${idParaDeletar++}`);
            response = await request(rota).delete(`/users/${idParaDeletar++}`);
            response = await request(rota).delete(`/users/${idParaDeletar++}`);
            response = await request(rota).delete(`/users/${idParaDeletar++}`);
            response = await request(rota).delete(`/users/${idParaDeletar++}`);
            response = await request(rota).delete(`/users/${idParaDeletar++}`);
            response = await request(rota).delete(`/users/${idParaDeletar++}`);
            response = await request(rota).delete(`/users/${idParaDeletar++}`);
        }
    });

    it('Consulta todos os usuários... deve retornar status 200', async () => {
        const response = await request(rota)
            .get('/users');
        expect(response.status).toBe(200);
        console.log(response.body);
    });

    it('Consulta todos as atividades... deve retornar status 200', async () => {
        const response = await request(rota)
            .get('/activities');
        expect(response.status).toBe(200);
        console.log(response.body);
    });

    //it.only para executar apenas um teste
    it('Deve cadastrar um novo usuário e deve retornar status 201', async () => {
        const response = await request(rota)
            .post('/users')
            .send(jsonUsuario.json_arquivo_cadastro_usuario);
        console.log(response.body);
        expect(response.body).toHaveProperty("id");
        idUsuario = response.body.id;
        console.log("Usuário cadastradfo: ", idUsuario);
        expect(response.status).toBe(201);
        console.log(response.body);
    });

    it('Tentativa de cadastrar um novo usuário com e-mail que já existe... de deve retornar messagem de erro', async () => {
        const response = await request(rota)
            .post('/users')
            .send(jsonUsuario.json_arquivo_cadastro_usuario);
        //   expect(response.body).toBedefined();
        expect(response.status).toBe(422);
        //  expect(response.status).contains("E-mail já está em uso");
        console.log(response.status);
        console.log(response.body);
    });

    it('Criação de usuário com dados inválidos, deve retornar 422 e deve retornar messagem de erro', async () => {
        const response = await request(rota)
            .post('/users/')
            .send(jsonUsuario.json_arquivo_sem_conteudo);
        expect(response.body);
        expect(response.status).toBe(422);
        //  expect(response.status).contains("E-mail já está em uso");
        console.log(response.body);
    });

    it('Deve consultar um usuário cadastrado anteriormente, e logar o registro do usuário cadastrado com o retornado', async () => {
        const response = await request(rota)
            .get(`/users/${idUsuario}`);
        expect(response.status).toBe(200);
        console.log(response.body);
        console.log(response.status);
    });
});