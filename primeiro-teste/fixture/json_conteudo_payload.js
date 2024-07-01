const { faker } = require('@faker-js/faker');
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

module.exports = {
    payloadConteudoParaIncluir,
    payloadConteudoAlterado,
    payloadConteudoParaConsultar,
    payloadConteudoParaDeletar,
    payloadConteudoParaAlterar,
    payloadConteudoSemTitulo,
    payloadConteudoSemDescricao,
    payloadConteudoSemTipoConteudo,
    payloadConteudoSemConteudo,
    payloadConteudoSemTodos
}