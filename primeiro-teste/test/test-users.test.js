const require = require('supertest');
const app = require('../app');
const rota = "http://localhost:3000/";
const rotaUsers = "http://localhost:3000/users";

describe('Suite de testes da api users...', () => {
    it('Consulta todos os usuários... deve retornar status 200', async () => {
        const response = await require(rota).get('/users');
        expect(response.status).toBe(200);
    });
});