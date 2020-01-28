 import {isEmpty} from '../helpers/helpers'
 import {ISError} from '../helpers/error';
import {PLANOTYPES} from './types'
export  class CotationModel {
    coberturaSelecionada:[];
    tomadorId:string;
    dataInicio:string;
    dataExpiracao:string;
    produtorId:string;
    fraccionamentoId:string;
    duracaoTipoContratoId:string;
    viagem:[];

    constructor() {
        this.coberturaSelecionada = [];
        this.tomadorId = '';
        this.produtorId = '';
        this.fraccionamentoId = '';
        this.dataInicio = '';
        this.dataExpiracao = '';
        this.duracaoTipoContratoId = '';
        this.viagem = [];
    }
}


class Cotation {
    constructor(private model:CotationModel) {
        this.model = model;
    }

    onInsert(type:string):any{
        const v = new ISError('MOBILE')
        return this.required(this.model,type)
    }

    private required(model:CotationModel,type:string):any{
        const {
            coberturaSelecionada,
            dataExpiracao,
            dataInicio,
            duracaoTipoContratoId,
            fraccionamentoId,
            produtorId,
            tomadorId,
            viagem
        } = model;
            
        if(isEmpty(coberturaSelecionada)) return new ISError('cobertura Selecionada')
        if(isEmpty(tomadorId)) return new ISError('tomadorId');
        if(isEmpty(produtorId)) return new ISError('produtorId');
        if(isEmpty(dataExpiracao)) return new ISError('dataExpiracao');
        if(isEmpty(dataInicio)) return new ISError('dataInicio');
        if(isEmpty(fraccionamentoId)) return new ISError('fraccionamentoId');
        if(isEmpty(duracaoTipoContratoId)) return new ISError('duracaoTipoContratoId');
        if(type === PLANOTYPES.VIAGEM)
           if(isEmpty(viagem)) return new ISError('A propriedade "Viagem" do Modelo da Cotação está vazio ou não existe...');
        
        return true;
    }
    
}

export default Cotation;