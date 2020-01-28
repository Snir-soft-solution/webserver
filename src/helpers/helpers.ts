export const RoundValues = (num:number, dec:number) => {

    if ((typeof num !== 'number') || (typeof dec !== 'number'))
        return false;

    var num_sign = num >= 0 ? 1 : -1;

    return (Math.round((num * Math.pow(10, dec)) + (num_sign * 0.0001)) / Math.pow(10, dec)).toFixed(dec).replace('.', ',');
}
/**
 * 
 * @param {any} x
 */
export const NumberWithCommas = (x:string) => {
return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

export const CodeGenerator = () => {
var _code = "";
var type = "abcdefghijklmnopqsrtuvwxyz123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
for (var i = 0; i < 10; i++) {
    var pos = Math.floor(Math.random() * type.length);
    _code += type.charAt(pos);
}
return _code;
}

export const isEmpty = (input: any ):boolean => !input || Object.keys(input).length === 0;

export const isEqualToZero = (input: number) => input === 0;

