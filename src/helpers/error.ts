export class ISError {
    constructor(private message:any) {
        this.message = message;
    }

    error(){
        return this.message
    }
}