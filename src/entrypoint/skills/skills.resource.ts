import {Request, Response, Router, NextFunction} from 'express';
import { check, validationResult } from 'express-validator';
import {ResponseSource} from '../../infrastructure/response';

export class SkillsResource {
    public async getResponseSkills(request: Request, response: ResponseSource) {
        console.log('Get skill list')

        response.sendOk();
    }
}

export const SkillsRouters = (router: Router, skillsResource: SkillsResource) => {
    router.get(
        '/skills',
        [
           check('skillName') 
                .not()
                .isString()
                .withMessage('Name must be provided'),
        ],
        (request: Request, response: Response, next: NextFunction) => {
            skillsResource
                .getResponseSkills(request, ResponseSource.build(response))
                .catch(next);
        }
    )
}