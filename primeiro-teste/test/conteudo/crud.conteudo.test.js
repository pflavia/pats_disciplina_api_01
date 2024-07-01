const request = require('supertest');
const { faker } = require('@faker-js/faker');
const rota = process.env.URL_ROTA || 'http://localhost:3000';
const jsonConteudoPayload = require("../../fixture/json_conteudo_payload");
const { afterEach } = require('node:test');

describe('Suite de testes crud (post, get, put, delete Conteudo)', () => {
    const payloadConteudoParaIncluir = {
        titulo: faker.word.words(5),
        descricao: faker.word.words(20),
        tipoConteudo: faker.word.words(1),
        conteudo: faker.word.words(60)
    };
    const payloadConteudoAlterado = {
        titulo: faker.word.words(5),
        descricao: faker.word.words(20),
        tipoConteudo: faker.word.words(1),
        conteudo: faker.word.words(60)
    };
    const payloadConteudoParaConsultar = {
        titulo: faker.word.words(5),
        descricao: faker.word.words(20),
        tipoConteudo: faker.word.words(1),
        conteudo: faker.word.words(60)
    };
    const payloadConteudoParaDeletar = {
        titulo: faker.word.words(5),
        descricao: faker.word.words(20),
        tipoConteudo: faker.word.words(1),
        conteudo: faker.word.words(60)
    };
    const payloadConteudoParaAlterar = {
        titulo: faker.word.words(5),
        descricao: faker.word.words(20),
        tipoConteudo: faker.word.words(1),
        conteudo: faker.word.words(60)
    };
    const payloadConteudoSemTitulo = {
        descricao: faker.word.words(20),
        tipoConteudo: faker.word.words(1),
        conteudo: faker.word.words(60)
    };
    const payloadConteudoSemDescricao = {
        titulo: faker.word.words(5),
        tipoConteudo: faker.word.words(1),
        conteudo: faker.word.words(60)
    };
    const payloadConteudoSemTipoConteudo = {
        titulo: faker.word.words(5),
        descricao: faker.word.words(20),
        conteudo: faker.word.words(60)
    };
    const payloadConteudoSemConteudo = {
        titulo: faker.word.words(5),
        descricao: faker.word.words(20),
        tipoConteudo: faker.word.words(1)
    };
    const payloadConteudoSemTodos = {
    }

    afterAll(async () => {
        const response = await request(rota)
            .get('/conteudos')
        for (let i = 0; i < response.body.length; i++) {
            await request(rota).delete(`/conteudos/${response.body[i].id}`);
        }
    })
    it('Teste 01. Cadastrondo um conteúdo com sucesso e verificar statusCode de retorno.', async () => {
        //Você deverá cadastrar um novo conteúdo e verificar que o conteúdo está devidamente retornando os dados esperados e o statusCode de sucesso esperado.
        const responsePost = await request(rota)
            .post('/conteudos')
            .send(payloadConteudoParaIncluir);

        //validacao do status code
        expect(responsePost.statusCode).toBe(201);

        //validacao dos campos enviados x retornado 
        expect(responsePost.body).toHaveProperty('titulo', payloadConteudoParaIncluir.titulo);
        expect(responsePost.body).toHaveProperty('descricao', payloadConteudoParaIncluir.descricao);
        expect(responsePost.body).toHaveProperty('tipoConteudo', payloadConteudoParaIncluir.tipoConteudo);
        expect(responsePost.body).toHaveProperty('conteudo', payloadConteudoParaIncluir.conteudo);

        //verificcando se o id está no retorno
        let idConteudo = responsePost.body.id;
        if (idConteudo == undefined || idConteudo == null) {
            expect('Deve retornar um id').toBe('');
        }
    })
    it('Teste 02. Consultar o conteúdo cadastrado com sucesso e verificar statusCode de retorno.', async () => {
        //Você deverá realizar a consulta desse conteúdo em que acabou de cadastrar, e verificar se realmente está sendo retornado o conteúdo desejado com os dados desejados.
        const responsePost = await request(rota)
            .post('/conteudos')
            .send(payloadConteudoParaConsultar);
        expect(responsePost.statusCode).toBe(201);
        //Pegar o id do conteúdo cadastrado para usar na consulta
        let idConteudo = responsePost.body.id;
        //validacao da consulta
        const responseGet = await request(rota)
            .get('/conteudos/' + idConteudo);
        //validacao do status code
        expect(responseGet.statusCode).toBe(200);

        //validacao dos campos da consulta 
        expect(responseGet.body).toHaveProperty('titulo', payloadConteudoParaConsultar.titulo);
        expect(responseGet.body).toHaveProperty('descricao', payloadConteudoParaConsultar.descricao);
        expect(responseGet.body).toHaveProperty('tipoConteudo', payloadConteudoParaConsultar.tipoConteudo);
        expect(responseGet.body).toHaveProperty('conteudo', payloadConteudoParaConsultar.conteudo);
        //verificcando se a data do cadastro do conteúdo está no retorno
        let dataCadastro = responseGet.body.dataCadastro;
        if (dataCadastro == undefined || dataCadastro == null) {
            expect('Deve retornar uma data de cadastroid').toBe('');
        }
    })
    it('Teste 03. Alterar o conteúdo de um item existente com sucesso e verificar statusCode de retorno.', async () => {
        //Você deverá alterar o conteúdo consultado anteriormente, e em seguida validar se realmente os dados foram alterados.
        const responsePost = await request(rota)
            .post('/conteudos')
            .send(payloadConteudoParaAlterar);
        expect(responsePost.statusCode).toBe(201);
        //Pegar o id do conteúdo cadastrado para usar na alteração
        let idConteudo = responsePost.body.id;
        //validacao da alteração
        const responsePut = await request(rota)
            .put('/conteudos/' + idConteudo)
            .send(payloadConteudoAlterado);
        //validacao do status code
        expect(responsePut.statusCode).toBe(201);

        //validacao dos campos alterados 
        expect(responsePut.body).toHaveProperty('titulo', payloadConteudoAlterado.titulo);
        expect(responsePut.body).toHaveProperty('descricao', payloadConteudoAlterado.descricao);
        expect(responsePut.body).toHaveProperty('tipoConteudo', payloadConteudoAlterado.tipoConteudo);
        expect(responsePut.body).toHaveProperty('conteudo', payloadConteudoAlterado.conteudo);
        //verificcando se o id está no retorno
        let idConteudoAlteracao = responsePut.body.id;
        if (idConteudoAlteracao == undefined || idConteudoAlteracao == null) {
            expect('Deve retornar um id').toBe('');
        }
    })
    it('Teste 04. Deletar o conteúdo de um item existente com sucesso e verificar statusCode de retorno.', async () => {
        //Por fim, você deverá remover o conteúdo e garantir que o mesmo foi removido e não existe mais para consulta.
        const responsePost = await request(rota)
            .post('/conteudos')
            .send(payloadConteudoParaConsultar);
        expect(responsePost.statusCode).toBe(201);
        //Pegar o id do conteúdo cadastrado para usar na exclusão
        let idConteudo = responsePost.body.id;
        //validacao da exclusão
        const responseDel = await request(rota)
            .del('/conteudos/' + idConteudo);
        //validacao do status code
        expect(responseDel.statusCode).toBe(200);
        //validação da mensagem de retorno
        expect(responseDel.body).toHaveProperty("message", "O conteúdo foi removido com sucesso!");

        //verificcando se o item foi removido corretamente
        const responseGet = await request(rota)
            .get('/conteudos/' + idConteudo);
        expect(responseGet.statusCode).toBe(404);
    })
})