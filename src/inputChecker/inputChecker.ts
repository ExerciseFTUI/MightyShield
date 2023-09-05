import * as RG from './constants';
import { Response, Request, NextFunction } from 'express';

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

export class defendMiddleware {
    checkBody: boolean = false;
    checkParams: boolean = false;

    constructor(checkBody: boolean, checkParams: boolean){
        this.checkBody = checkBody;
        this.checkParams = checkParams;
    }

    check(req: Request, res: Response, next: NextFunction, checkBody: boolean, checkParams: boolean){
        if(checkBody){
            this.checkSQLandXSS(req, res, next);
        }
        if(checkParams){
            this.checkParameter(req, res, next);
        }
        next();
    }

    private checkSQLandXSS(req: Request, res: Response, next: NextFunction){
        const data = req.body;

        for(let key in data){
            if(typeof data[key] === 'string'){
                const test = new defendInput(data[key]);
                if(test.checkAll()){
                    return res.status(403).send('SQL injection or XSS attack detected');
                }
            }
        }
    }

    private checkParameter(req: Request, res: Response, next: NextFunction){
        const data = req.params;

        for(let key in data){
            const val = data[key];
            const decodeVal = decodeURIComponent(val as string);
            const test = new defendInput(decodeVal);
            if(test.checkAll()){
                return res.status(403).send('Forbidden');
            }
        }
    }
}