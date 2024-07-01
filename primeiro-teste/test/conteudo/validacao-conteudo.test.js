const request = require('supertest');
//require('dotenv').config();
/*
const {
    URLS,
    HEADERS
} = require('../../suporte/configEnv')
*/
const { faker } = require('@faker-js/faker');
const rota = process.env.URL_ROTA || 'http://localhost:3000';
const jsonConteudoPayload = require("../../fixture/json_conteudo_payload");
const { beforeEach } = require('node:test');

describe('Suite de testes para validar campos obrigatório e mensagens de retorno)', () => {
    afterAll(async () => {
        const response = await request(rota)
            .get('/conteudos');
        for (let i = 0; i < response.body.length; i++) {
            await request(rota).delete(`/conteudos/${response.body[i].id}`);
        }
    })
    it('Teste 05, Cadastro de um conteudo sem titulo verificar mensagem de erro.', async () => {
        const responsePost = await request(rota)
            .post('/conteudos')
            .send(jsonConteudoPayload.payloadConteudoSemTitulo);
        //validacao do status code
        expect(responsePost.statusCode).toBe(422);
        //validacao da mensagem de retorno
        expect(responsePost.body).toHaveProperty("error", "Os seguintes campos são obrigatórios: titulo");
    })
    it('Teste 06, Cadastro de um conteudo sem descricao verificar mensagem de erro.', async () => {
        const responsePost = await request(rota)
            .post('/conteudos')
            .send(jsonConteudoPayload.payloadConteudoSemDescricao);
        //validacao do status code
        expect(responsePost.statusCode).toBe(422);
        //validacao da mensagem de retorno
        expect(responsePost.body).toHaveProperty("error", "Os seguintes campos são obrigatórios: descricao");
    })
    it('Teste 07, Cadastro de um conteudo sem tipoConteudo verificar mensagem de erro.', async () => {
        const responsePost = await request(rota)
            .post('/conteudos')
            .send(jsonConteudoPayload.payloadConteudoSemTipoConteudo);
        //validacao do status code
        expect(responsePost.statusCode).toBe(422);
        //validacao da mensagem de retorno
        expect(responsePost.body).toHaveProperty("error", "Os seguintes campos são obrigatórios: tipoConteudo");
    })
    it('Teste 08, Cadastro de um conteudo sem conteudo verificar mensagem de erro.', async () => {
        const responsePost = await request(rota)
            .post('/conteudos')
            .send(jsonConteudoPayload.payloadConteudoSemConteudo);
        //validacao do status code
        expect(responsePost.statusCode).toBe(422);
        //validacao da mensagem de retorno
        expect(responsePost.body).toHaveProperty("error", "Os seguintes campos são obrigatórios: conteudo");
    })
    it('Teste 09, Cadastro de um conteudo sem dados verificar mensagem de erro.', async () => {
        const responsePost = await request(rota)
            .post('/conteudos')
            .send(jsonConteudoPayload.payloadConteudoSemTodos);
        //validacao do status code
        expect(responsePost.statusCode).toBe(422);
        //validacao da mensagem de retorno
        expect(responsePost.body).toHaveProperty('error', 'Os seguintes campos são obrigatórios: titulo, descricao, tipoConteudo, conteudo');
    })

    it('Teste 10, Consulta sem resultado.', async () => {
        const response = await request(rota)
            .get('/conteudos');
        for (let i = 0; i < response.body.length; i++) {
            await request(rota).delete(`/conteudos/${response.body[i].id}`);
        }
        const responseGet = await request(rota)
            .get('/conteudos');
        //validacao do status code
        expect(responseGet.statusCode).toBe(200);
        //validacao do tamanho do retorno
        expect(responseGet.body.length).toBe(0);
    })

    it('Teste 11, Tentativa de consulta conteudo não existente.', async () => {
        const response = await request(rota)
            .get('/conteudos');
        for (let i = 0; i < response.body.length; i++) {
            await request(rota).delete(`/conteudos/${response.body[i].id}`);
        }
        const responseGet = await request(rota)
            .get('/conteudos/1');
        //validacao do status code
        expect(responseGet.statusCode).toBe(404);
      //validação da mensagem de retorno
        expect(responseGet.body).toHaveProperty("error", "O conteúdo com o ID: 1 não foi encontrado.");
    })
    it('Teste 12, Tentativa de deletar conteudo não existente.', async () => {
        const response = await request(rota)
            .get('/conteudos');
        for (let i = 0; i < response.body.length; i++) {
            await request(rota).delete(`/conteudos/${response.body[i].id}`);
        }
        const responseDel = await request(rota)
            .delete('/conteudos/1');
        //validação do status code
        expect(responseDel.statusCode).toBe(404);
        //validação da mensagem de retorno
        expect(responseDel.body).toHaveProperty("error", "Erro ao excluir o conteúdo, o conteúdo não foi encontrado.");
    })
    it('Teste 13, Tentativa de alterar conteudo não existente.', async () => {
        const response = await request(rota)
            .get('/conteudos');
        for (let i = 0; i < response.body.length; i++) {
            await request(rota).delete(`/conteudos/${response.body[i].id}`);
        }
        const responsePut = await request(rota)
            .put('/conteudos/1')
            .send(jsonConteudoPayload.payloadConteudoAlterado);
        //validação do status code
        expect(responsePut.statusCode).toBe(404);
        //validação da mensagem de retorno
        expect(responsePut.body).toHaveProperty("error", "O contedúdo que você está tentando alterar não existe na base de dados. ID INFORMADO: 1");
    })
    it('Teste 14, Tentativa de alterar sem infomrar os campos obrigatórios', async () => {
        const response = await request(rota)
            .get('/conteudos');
        for (let i = 0; i < response.body.length; i++) {
            await request(rota).delete(`/conteudos/${response.body[i].id}`);
        }
        const responsePut = await request(rota)
            .put('/conteudos/1')
            .send(jsonConteudoPayload.payloadConteudoSemTodos);
        //validação do status code
        expect(responsePut.statusCode).toBe(422);
        //validação da mensagem de retorno
        expect(responsePut.body).toHaveProperty("error", "Os seguintes campos são obrigatórios: titulo, descricao, tipoConteudo, conteudo");
    })
    it('Teste 15, Tentativa de alterar sem infomrar titulo', async () => {
        const response = await request(rota)
            .get('/conteudos');
        for (let i = 0; i < response.body.length; i++) {
            await request(rota).delete(`/conteudos/${response.body[i].id}`);
        }
        const responsePut = await request(rota)
            .put('/conteudos/1')
            .send(jsonConteudoPayload.payloadConteudoSemTitulo);
        //validação do status code
        expect(responsePut.statusCode).toBe(422);
        //validação da mensagem de retorno
        expect(responsePut.body).toHaveProperty("error", "Os seguintes campos são obrigatórios: titulo");
    })
    it('Teste 16, Tentativa de alterar sem infomrar descricao', async () => {
        const response = await request(rota)
            .get('/conteudos');
        for (let i = 0; i < response.body.length; i++) {
            await request(rota).delete(`/conteudos/${response.body[i].id}`);
        }
        const responsePut = await request(rota)
            .put('/conteudos/1')
            .send(jsonConteudoPayload.payloadConteudoSemDescricao);
        //validação do status code
        expect(responsePut.statusCode).toBe(422);
        //validação da mensagem de retorno
        expect(responsePut.body).toHaveProperty("error", "Os seguintes campos são obrigatórios: descricao");
    })
    it('Teste 17, Tentativa de alterar sem infomrar tipoConteudo', async () => {
        const response = await request(rota)
            .get('/conteudos');
        for (let i = 0; i < response.body.length; i++) {
            await request(rota).delete(`/conteudos/${response.body[i].id}`);
        }
        const responsePut = await request(rota)
            .put('/conteudos/1')
            .send(jsonConteudoPayload.payloadConteudoSemTipoConteudo);
        //validação do status code
        expect(responsePut.statusCode).toBe(422);
        //validação da mensagem de retorno
        expect(responsePut.body).toHaveProperty("error", "Os seguintes campos são obrigatórios: tipoConteudo");
    })
    
    it('Teste 18, Tentativa de alterar sem infomrar conteudo', async () => {
        const response = await request(rota)
            .get('/conteudos');
        for (let i = 0; i < response.body.length; i++) {
            await request(rota).delete(`/conteudos/${response.body[i].id}`);
        }
        const responsePut = await request(rota)
            .put('/conteudos/1')
            .send(jsonConteudoPayload.payloadConteudoSemConteudo);
        //validação do status code
        expect(responsePut.statusCode).toBe(422);
        //validação da mensagem de retorno
        expect(responsePut.body).toHaveProperty("error", "Os seguintes campos são obrigatórios: conteudo");
    })
})