const request = require('supertest');
const rotaUsers = 'http://localhost:3000';
const { faker } = require('@faker-js/faker');
const jsonUsuarioPayload = require("../../fixture/json_usuarios_payload");

describe('', () => {

    beforeAll(async () => {
        const response = await request(rotaUsers)
            .post('/users')
            .send(jsonUsuarioPayload.payloadUsuario);

        //validacao do status code
        expect(response.statusCode).toBe(201);
        //validacao dos campos enviados x retornado 
        expect(response.body).toHaveProperty('nome', jsonUsuarioPayload.payloadUsuario.nome);
        expect(response.body).toHaveProperty('telefone', jsonUsuarioPayload.payloadUsuario.telefone);
        expect(response.body).toHaveProperty('email', jsonUsuarioPayload.payloadUsuario.email);
        //verificcando se a senha não está no retorno
        expect(response.body).not.toHaveProperty('senha');
        expect(response.body.senha).toBeUndefined();
        console.log('Cdastro de usuário randomico', response.body);
    })
    it('Cadastrondo um usuário sem senha verificar mensagem de erro.', async () => {
        const response = await request(rotaUsers)
            .post('/users')
            .send(jsonUsuarioPayload.payloadUsuarioSemSenha);

        //validacao do status code
        expect(response.statusCode).toBe(422);
        //validação mensagem de erro
        expect(response.body.error).toBe('Os seguintes campos são obrigatórios: senha');
    })
    it('Cadastrondo um usuário sem email verificar mensagem de erro.', async () => {
        const response = await request(rotaUsers)
            .post('/users')
            .send(jsonUsuarioPayload.payloadUsuarioSemEmail);

        //validacao do status code
        expect(response.statusCode).toBe(422);
        //validação mensagem de erro
        expect(response.body.error).toBe('Os seguintes campos são obrigatórios: email');
    })
    it('Cadastrondo um usuário sem telefone verificar mensagem de erro.', async () => {
        const response = await request(rotaUsers)
            .post('/users')
            .send(jsonUsuarioPayload.payloadUsuarioSemTelefone);

        //validacao do status code
        expect(response.statusCode).toBe(422);
        //validação mensagem de erro
        expect(response.body.error).toBe('Os seguintes campos são obrigatórios: telefone');
    })
    it('Cadastrondo um usuário sem nome verificar mensagem de erro.', async () => {
        const response = await request(rotaUsers)
            .post('/users')
            .send(jsonUsuarioPayload.payloadUsuarioSemNome);

        //validacao do status code
        expect(response.statusCode).toBe(422);
        //validação mensagem de erro
        expect(response.body.error).toBe('Os seguintes campos são obrigatórios: nome');
    })
    it('Validar a deleção de um usuário.', async () => {
        //Incluir usuário que será deletado
        const responsePost = await request(rotaUsers)
            .post('/users')
            .send(jsonUsuarioPayload.payloadUsuarioParaDeletar);
        expect(responsePost.statusCode).toBe(201);
        let idUsuario = responsePost.body.id;
        //Consultar o registro
        let responseGet = await request(rotaUsers)
            .get(`/users/${idUsuario}`);
        expect(responseGet.statusCode).toBe(200);
        //Deletar o registro
        const response = await request(rotaUsers)
            .delete(`/users/${idUsuario}`);
        expect(response.statusCode).toBe(204);
        //Consultar se o registro não existe
        responseGet = await request(rotaUsers)
            .get(`/users/${idUsuario}`);
        expect(responseGet.statusCode).toBe(404);
    })
    it('Validar a alteração de um usuário.', async () => {
        //Incluir usuário que será alterado
        const responsePost = await request(rotaUsers)
            .post('/users')
            .send(jsonUsuarioPayload.payloadUsuarioParaAlterar);
        expect(responsePost.statusCode).toBe(201);
        const idUsuario = responsePost.body.id;
        //Consultar o registro
        let responseGet = await request(rotaUsers)
            .get(`/users/${idUsuario}`);
        expect(responseGet.statusCode).toBe(200);
        //validacao dos campos enviados x retornado 
        expect(responseGet.body).toHaveProperty('nome', jsonUsuarioPayload.payloadUsuarioParaAlterar.nome);
        expect(responseGet.body).toHaveProperty('telefone', jsonUsuarioPayload.payloadUsuarioParaAlterar.telefone);
        expect(responseGet.body).toHaveProperty('email', jsonUsuarioPayload.payloadUsuarioParaAlterar.email);
        //Alterar o registro
        const responsePut = await request(rotaUsers)
            .put(`/users/${idUsuario}`)
            .send(jsonUsuarioPayload.payloadUsuarioAlterado);
        expect(responsePut.statusCode).toBe(201);
        //Consultar se o registro foi alterado
        responseGet = await request(rotaUsers)
            .get(`/users/${idUsuario}`);
        expect(responseGet.statusCode).toBe(200);
        expect(responseGet.body).toHaveProperty('nome', jsonUsuarioPayload.payloadUsuarioAlterado.nome);
        expect(responseGet.body).toHaveProperty('telefone', jsonUsuarioPayload.payloadUsuarioAlterado.telefone);
        //Não permite alterar o campo email
        expect(responseGet.body).toHaveProperty('email', jsonUsuarioPayload.payloadUsuarioParaAlterar.email);
    })
})