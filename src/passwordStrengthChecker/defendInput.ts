import * as RG from './constants';

export class defendInput{
    value: string;

    constructor(value: string){
        this.value = value;
    }

    sqlCheck(){
        return RG.RG_SQL1.test(this.value) || RG.RG_SQL2.test(this.value) || RG.RG_SQL3.test(this.value) || RG.RG_SQL4.test(this.value) || RG.RG_SQL5.test(this.value);
    }

    xssCheck(){
        return RG.RG_XSS1.test(this.value) || RG.RG_XSS2.test(this.value) || RG.RG_XSS3.test(this.value) || RG.RG_XSS4.test(this.value);
    }

    checkAll(){
        return this.sqlCheck() || this.xssCheck();
    }
}