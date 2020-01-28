import {MOBILE,WEBAPP,WEBISTE,COTACAOTEMPLATE} from './platforms'
import {CotationModel} from '../services/cotation'
export class  Validation {
    constructor(private platform:string) {
        this.platform = platform;
    }

    validateModel(model:CotationModel):object{
        
        switch (this.platform) {
            case MOBILE:
                return this.asMobile(model)
            case WEBISTE:
                return this.asWebSite(model)
            case WEBAPP:
                return this.asWebApp(model)
            default:
                return {}
    
        }
    }


    private asMobile(model:CotationModel):object{
        this.cValidate.MOBILE(model)
        return model
    }

    private asWebSite(model:object):object{
        
        return model
    }

    private asWebApp(model:object):object{
        return {}
    }

    error(err:object){
        return {...err}
    }

    /**
     * Validation as Cotation
     */
    private get cValidate(){
        return {
            MOBILE:(model: CotationModel)=>{

            },
            WEBISTE,
            WEBAPP
        }
    }

    private Mobile(){

    }
}