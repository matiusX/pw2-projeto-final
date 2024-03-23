import { Request, Response, NextFunction } from 'express';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import { Schema } from 'joi';

const validate = (schema: Schema) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const {error} = schema.validate(req.body, {
            abortEarly: false
        });
        if (error){
            return res.status(StatusCodes.BAD_REQUEST).json(ReasonPhrases.BAD_REQUEST);
        } 
        next();
    }
}

export default validate;
