const express = require("express");

const rotas = express();

const teste = require("../controladores/teste/teste");

const intermediarioUsuarioCadastrar = require("../intermediarios/usuarios/intermediarioUsuarioCadastrar");

const intermediarioClienteCadastrar = require("../intermediarios/clientes/intermediarioClienteCadastrar");

const intermediarioFeiraCadastrar = require("../intermediarios/feiras/intermediarioFeiraCadastrar");

const intermediarioLocacaoCadastrar = require("../intermediarios/locacoes/intermediarioLocacaoCadastrar");

const intermediarioBancoCadastrar = require("../intermediarios/bancos/intermediarioBancoCadastrar");

const intermediarioNaoPagoCadastrar = require("../intermediarios/naoPago/intermediarioNaoPagoCadastrar");

const intermediarioPagoCadastrar = require("../intermediarios/pago/intermediarioPagoCadastrar")

const controladorUsuarioCadastrar = require("../controladores/usuarios/controladorUsuarioCadastrar");

const controladorFeiraCadastrar = require("../controladores/feiras/controladorFeiraCadastrar");

const controladorClienteCadastrar = require("../controladores/clientes/controladorClienteCadastrar");

const controladorLocacaoCadastrar = require("../controladores/locacoes/controladorLocacaoCadastrar");

const controladorBancoCadastrar = require("../controladores/bancos/controladorBancoCadastrar");

const controladorNaoPagoCadastrar = require("../controladores/naoPago/controladorNaoPagoCadastrar");

const controladorPagoCadastrar = require("../controladores/pago/controladorPagoCadastrar");

const schemaUsuarrioCadastrar = require("../validacoes/usuarios/schemaUsuarioCadastrar");

const schemaFeiraCadastrar = require("../validacoes/feiras/schemaFeiraCadastrar");

const schemaClienteCadastrar = require("../validacoes/clientes/schemaClienteCadastrar");

const schemaLocacaoCadastrar = require("../validacoes/locacoes/schemaLocacaoCadastrar");

const schemaBancoCadastrar = require("../validacoes/bancos/schemaBancoCadastrar");

const schemaNaoPagoCadastrar = require("../validacoes/naoPago/schemaNaoPagoCadastrar");

const schemaPagoCadastrar = require("../validacoes/pago/schemaPagoCadastrar");



rotas.post(
    '/usuarios',
    intermediarioUsuarioCadastrar(schemaUsuarrioCadastrar),
    controladorUsuarioCadastrar
);

rotas.post(
    '/feiras',
    intermediarioFeiraCadastrar(schemaFeiraCadastrar),
    controladorFeiraCadastrar
);

rotas.post(
    '/clientes',
    intermediarioClienteCadastrar(schemaClienteCadastrar),
    controladorClienteCadastrar
);

rotas.post(
    '/locacoes',
    intermediarioLocacaoCadastrar(schemaLocacaoCadastrar),
    controladorLocacaoCadastrar
);

rotas.post(
    '/bancos',
    intermediarioBancoCadastrar(schemaBancoCadastrar),
    controladorBancoCadastrar
);

rotas.post(
    '/naoPago',
    intermediarioNaoPagoCadastrar(schemaNaoPagoCadastrar),
    controladorNaoPagoCadastrar
);

rotas.post(
    '/pago',
    intermediarioPagoCadastrar(schemaPagoCadastrar),
    controladorPagoCadastrar
);

module.exports = rotas;