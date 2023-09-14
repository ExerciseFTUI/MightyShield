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
    public static checkBody: boolean;
    public static checkParams: boolean;

    constructor(...args: {checkBody: boolean, checkParams: boolean}[]){
        defendMiddleware.checkBody = args[0]?.checkBody ?? false;
        defendMiddleware.checkParams = args[0]?.checkParams ?? false;
    }

    protect(){
        return (req:Request, res:Response, next:NextFunction) => {
            let check: boolean = false;
            if(defendMiddleware.checkBody){
                const result = this.checkSQLandXSS(req, res, next);
                if(result){
                    check = true;
                }
            }
            if(defendMiddleware.checkParams){
                const result = this.checkParameter(req, res, next);
                if(result){
                    check = true;
                }
            }

            if(check){
                res.status(400).json({
                    status: 'SQL Injection or XSS attack detected',
                    message: 'Bad request'
                })
            }

            next();
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
        const data = req.params;

        for(const key in data){
            const val = data[key];
            const devodeVal = decodeURIComponent(val as string);
            const result = new defendInput(devodeVal).checkAll();
            if(result){
                return true;
            }
        }
    }
}