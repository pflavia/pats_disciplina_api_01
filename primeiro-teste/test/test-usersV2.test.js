const request = require('supertest');
const rotaUsers = 'http://localhost:3000';
const {faker} = require('@faker-js/faker');
const jsonUsuarioPayload = require("../fixture/json_usuarios_payload");

describe('',()=>{

    it('Cadastrondo um usuário, e consultando o retorno dos campos, se foram os enviados.', async()=>{
        const response = await request(rotaUsers)
        .post('/users')
        .send(jsonUsuarioPayload.payloadUsuario);

        //validacao do status code
        expect(response.statusCode).toBe(201);
        //validacao dos campos enviados x retornado 
        expect(response.body).toHaveProperty('nome',jsonUsuarioPayload.payloadUsuario.nome);
        expect(response.body).toHaveProperty('telefone',jsonUsuarioPayload.payloadUsuario.telefone);
        expect(response.body).toHaveProperty('email',jsonUsuarioPayload.payloadUsuario.email);
        //verificcando se a senha não está no retorno
        expect(response.body).not.toHaveProperty('senha');
        expect(response.body.senha).toBeUndefined();
        console.log('Cdastro de usuário randomico',response.body);
    })
    it('Cadastrondo um usuário sem senha verificar mensagem de erro.', async()=>{ 
        const response = await request(rotaUsers)
        .post('/users')
        .send(jsonUsuarioPayload.payloadUsuarioSemSenha);

        //validacao do status code
        expect(response.statusCode).toBe(422);
        //validação mensagem de erro
        expect(response.body.error).toBe('Os seguintes campos são obrigatórios: senha');
    })
    it('Cadastrondo um usuário sem email verificar mensagem de erro.', async()=>{
                  const response = await request(rotaUsers)
            .post('/users')
            .send(jsonUsuarioPayload.payloadUsuarioSemEmail);
    
            //validacao do status code
            expect(response.statusCode).toBe(422);
            //validação mensagem de erro
            expect(response.body.error).toBe('Os seguintes campos são obrigatórios: email');
        })
        it('Cadastrondo um usuário sem telefone verificar mensagem de erro.', async()=>{
              const response = await request(rotaUsers)
                .post('/users')
                .send(jsonUsuarioPayload.payloadUsuarioSemTelefone);
        
                //validacao do status code
                expect(response.statusCode).toBe(422);
                //validação mensagem de erro
                expect(response.body.error).toBe('Os seguintes campos são obrigatórios: telefone');
            })
            it('Cadastrondo um usuário sem nome verificar mensagem de erro.', async()=>{
                  const response = await request(rotaUsers)
                    .post('/users')
                    .send(jsonUsuarioPayload.payloadUsuarioSemNome);
            
                    //validacao do status code
                    expect(response.statusCode).toBe(422);
                    //validação mensagem de erro
                    expect(response.body.error).toBe('Os seguintes campos são obrigatórios: nome');
                })
})