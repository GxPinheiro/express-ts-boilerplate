import express from "express";
import * as bodyParser from 'body-parser';
// const PORT = process.env.PORT || 3000;

import {
    CharactersRouters,
    CharactersResource
} from './entrypoint';
import {createContainer, InjectionMode, asClass} from 'awilix';

export default new class App {
    public express: express.Express;

    private containerDI = createContainer({
        injectionMode: InjectionMode.CLASSIC,
    })

    constructor() {
        this.express = express();
        this.dependencyInjection();
        this.routes();
        this.start();
    }

    public start(): void {
        console.log('starting.....')
        const port = 3000;
        this.express.set('port', port);

        this.express.listen(port, () => {
            const startingMessage = `Thing starting. Listening on port ${port}`;
            console.log(startingMessage);
        })
    }

    private dependencyInjection(): void {
        this.containerDI.register({
            charactersResource: asClass(CharactersResource)
        })
    }

    private routes(): void {
        const router = express.Router();

        CharactersRouters(router, this.containerDI.resolve('charactersResource'));

        this.express.use(router);
    }
}