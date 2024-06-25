const { faker } = require('@faker-js/faker');
const payloadUsuario = {
    nome: faker.person.fullName(),
    telefone: faker.phone.number('+55 (##) ####-####'),
    email: faker.internet.email(),
    senha: faker.internet.password()
};
const payloadUsuarioAlterado = {
    nome: faker.person.fullName(),
    telefone: faker.phone.number('+55 (##) ####-####'),
    email: faker.internet.email(),
    senha: faker.internet.password()
};
const payloadUsuarioParaDeletar = {
    nome: faker.person.fullName(),
    telefone: faker.phone.number('+55 (##) ####-####'),
    email: faker.internet.email(),
    senha: faker.internet.password()
};
const payloadUsuarioParaAlterar = {
    nome: faker.person.fullName(),
    telefone: faker.phone.number('+55 (##) ####-####'),
    email: faker.internet.email(),
    senha: faker.internet.password()
};
const payloadUsuarioSemSenha = {
    nome: faker.person.fullName(),
    telefone: faker.phone.number('+55 (##) ####-####'),
    email: faker.internet.email(),

};
const payloadUsuarioSemEmail = {
    nome: faker.person.fullName(),
    telefone: faker.phone.number('+55 (##) ####-####'),
    senha: faker.internet.password()
};
const payloadUsuarioSemTelefone = {
    nome: faker.person.fullName(),
    email: faker.internet.email(),
    senha: faker.internet.password()
};
const payloadUsuarioSemNome = {
    telefone: faker.phone.number('+55 (##) ####-####'),
    email: faker.internet.email(),
    senha: faker.internet.password()
};
const payloadUsuarioSemTodos = {
}
module.exports = {
    payloadUsuario,
    payloadUsuarioAlterado,
    payloadUsuarioParaDeletar,
    payloadUsuarioParaAlterar,
    payloadUsuarioSemSenha,
    payloadUsuarioSemEmail,
    payloadUsuarioSemTelefone,
    payloadUsuarioSemNome,
    payloadUsuarioSemTodos
}