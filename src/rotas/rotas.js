const express = require("express");

const rotas = express();

const intermediarioUsuarioCadastrar = require("../intermediarios/usuarios/intermediarioUsuarioCadastrar");
const intermediarioUsuarioLogin = require("../intermediarios/usuarios/intermediarioUsuarioLogin");
const intermediarioUsuarioVerificarLogin = require("../intermediarios/usuarios/intermediarioUsuarioVerificarLogin");
const intermediarioUsuarioLogarAdministrador = require("../intermediarios/usuarios/intermediarioUsuarioLogarAdministrador");

const intermediarioClienteCadastrar = require("../intermediarios/clientes/intermediarioClienteCadastrar");

const intermediarioFeiraCadastrar = require("../intermediarios/feiras/intermediarioFeiraCadastrar");

const intermediarioLocacaoCadastrar = require("../intermediarios/locacoes/intermediarioLocacaoCadastrar");
const intermediarioLocacaoCobrar = require("../intermediarios/locacoes/intermediarioLocacaoCobrar");

const intermediarioBancoCadastrar = require("../intermediarios/bancos/intermediarioBancoCadastrar");

const intermediarioNaoPagoCadastrar = require("../intermediarios/naoPago/intermediarioNaoPagoCadastrar");

const intermediarioPagoCadastrar = require("../intermediarios/pago/intermediarioPagoCadastrar");

const controladorUsuarioCadastrar = require("../controladores/usuarios/controladorUsuarioCadastrar");
const controladorUsuarioLogin = require("../controladores/usuarios/controladorUsuarioLogin");

const controladorFeiraCadastrar = require("../controladores/feiras/controladorFeiraCadastrar");

const controladorClienteCadastrar = require("../controladores/clientes/controladorClienteCadastrar");

const controladorLocacaoCadastrar = require("../controladores/locacoes/controladorLocacaoCadastrar");
const controladorLocacaoCobrar = require("../controladores/locacoes/controladorLocacaoCobrar");
const controladorLocacaoSituacao = require("../controladores/locacoes/controladorLocacaoSituacao");

const controladorBancoCadastrar = require("../controladores/bancos/controladorBancoCadastrar");

const controladorNaoPagoCadastrar = require("../controladores/naoPago/controladorNaoPagoCadastrar");

const controladorPagoCadastrar = require("../controladores/pago/controladorPagoCadastrar");

const schemaUsuarrioCadastrar = require("../validacoes/usuarios/schemaUsuarioCadastrar");
const schemaUsuarioLogin = require("../validacoes/usuarios/schemaUsuarioLogin");

const schemaFeiraCadastrar = require("../validacoes/feiras/schemaFeiraCadastrar");

const schemaClienteCadastrar = require("../validacoes/clientes/schemaClienteCadastrar");

const schemaLocacaoCadastrar = require("../validacoes/locacoes/schemaLocacaoCadastrar");
const schemaLocacaoCobrar = require("../validacoes/locacoes/schemaLocacaoCobrar");

const schemaBancoCadastrar = require("../validacoes/bancos/schemaBancoCadastrar");

const schemaNaoPagoCadastrar = require("../validacoes/naoPago/schemaNaoPagoCadastrar");

const schemaPagoCadastrar = require("../validacoes/pago/schemaPagoCadastrar");


rotas.post(
    '/login',
    intermediarioUsuarioLogin(schemaUsuarioLogin),
    controladorUsuarioLogin
);

rotas.use(intermediarioUsuarioVerificarLogin);

rotas.post(
    '/cobrar',
    intermediarioLocacaoCobrar(schemaLocacaoCobrar),
    controladorLocacaoCobrar
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

rotas.post(
    '/situacao',
    controladorLocacaoSituacao
);

rotas.use(intermediarioUsuarioLogarAdministrador);

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


module.exports = rotas;