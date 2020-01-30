"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var helpers_1 = require("../../helpers/helpers");
var error_1 = require("../../helpers/error");
var types_1 = require("../../services/types");
var CotationModel = /** @class */ (function () {
    function CotationModel() {
        this.coberturaSelecionada = [];
        this.tomadorId = '';
        this.produtorId = '';
        this.fraccionamentoId = '';
        this.dataInicio = '';
        this.dataExpiracao = '';
        this.duracaoTipoContratoId = '';
        this.viagem = [];
    }
    return CotationModel;
}());
exports.CotationModel = CotationModel;
var Cotation = /** @class */ (function () {
    function Cotation(model) {
        this.model = model;
        this.model = model;
    }
    Cotation.prototype.onInsert = function (type) {
        var v = new error_1.ISError('MOBILE');
        return this.required(this.model, type);
    };
    Cotation.prototype.required = function (model, type) {
        var coberturaSelecionada = model.coberturaSelecionada, dataExpiracao = model.dataExpiracao, dataInicio = model.dataInicio, duracaoTipoContratoId = model.duracaoTipoContratoId, fraccionamentoId = model.fraccionamentoId, produtorId = model.produtorId, tomadorId = model.tomadorId, viagem = model.viagem;
        if (helpers_1.isEmpty(coberturaSelecionada))
            return new error_1.ISError('cobertura Selecionada');
        if (helpers_1.isEmpty(tomadorId))
            return new error_1.ISError('tomadorId');
        if (helpers_1.isEmpty(produtorId))
            return new error_1.ISError('produtorId');
        if (helpers_1.isEmpty(dataExpiracao))
            return new error_1.ISError('dataExpiracao');
        if (helpers_1.isEmpty(dataInicio))
            return new error_1.ISError('dataInicio');
        if (helpers_1.isEmpty(fraccionamentoId))
            return new error_1.ISError('fraccionamentoId');
        if (helpers_1.isEmpty(duracaoTipoContratoId))
            return new error_1.ISError('duracaoTipoContratoId');
        if (type === types_1.PLANOTYPES.VIAGEM)
            if (helpers_1.isEmpty(viagem))
                return new error_1.ISError('A propriedade "Viagem" do Modelo da Cotação está vazio ou não existe...');
        return true;
    };
    return Cotation;
}());
exports.default = Cotation;
