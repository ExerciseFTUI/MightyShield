import * as RG from './constants';
import { Response, Request, NextFunction } from 'express';

/* The `defendInput` class is used to check if a given input value contains any SQL or XSS
vulnerabilities. */
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

/* The `defendMiddleware` class is a TypeScript middleware that checks for SQL injection and XSS
vulnerabilities in request bodies and parameters. */
export class defendMiddleware {
    private checkBody: boolean;
    private checkParams: boolean;

    constructor(...args: {checkBody?: boolean, checkParams?: boolean}[]){
        this.checkBody = args[0]?.checkBody ?? true;
        this.checkParams = args[0]?.checkParams ?? true;
    }

    protect(){
        return (req:Request, res:Response, next:NextFunction) => {
            let check: boolean = false;
            if(this.checkBody){
                const result = this.checkSQLandXSS(req, res, next);
                if(result){
                    check = true;
                }
            }
            if(this.checkParams){
                const result = this.checkParameter(req, res, next);
                if(result){
                    check = true;
                }
            }

            if(check){
                res.status(400).send('Bad Request');

                return;
            } else {
                next();
            }
        }
    }

    private checkSQLandXSS(req: Request, res: Response, next: NextFunction) {
        const data = req.body;
        
        for(const key in data){
            const val = data[key];
            const result = new defendInput(val).checkAll();
            
            if(result){
                return true;
            }
        }
    }

    private checkParameter(req: Request, res: Response, next: NextFunction){
        const data = req.query;
        
        for(const key in data){
            const val = data[key];
            const decodeVal = decodeURIComponent(val as string);
            const result = new defendInput(decodeVal).checkAll();
            if(result){
                return true;
            }
        }
    }
}