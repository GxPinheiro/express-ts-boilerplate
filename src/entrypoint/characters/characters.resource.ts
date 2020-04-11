import {Request, Response, Router, NextFunction} from 'express';
import { check, validationResult } from 'express-validator';
import {ResponseSource} from '../../infrastructure/response';

export class CharactersResource {
    public async getResponseCharacters(request: Request, response: ResponseSource) {
        console.log('Characters name is Fluf')

        response.sendOk();
    }
}

export const CharactersRouters = (router: Router, charactersResource: CharactersResource) => {
    router.get(
        '/characters',
        [
           check('name') 
                .not()
                .isString()
                .withMessage('Name must be provided'),
        ],
        (request: Request, response: Response, next: NextFunction) => {
            charactersResource
                .getResponseCharacters(request, ResponseSource.build(response))
                .catch(next);
        }
    )
}