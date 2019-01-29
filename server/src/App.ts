import * as express from 'express';
import * as path from 'path';

class App {
    public express

    constructor () {
        this.express = express();
        this.mountRoutes();
    }

    private mountRoutes (): void {
        const router = express.Router();
        router.get('/', (req, res) => {
            res.render('index');
        });
        
        // view engine setup
        this.express.set('views', path.join(__dirname, '../../client/dist'));
        this.express.use(express.static(path.join(__dirname, '../../client/dist')));
        this.express.set('view engine', 'ejs');
        this.express.use('/', router);
    }
}

export default new App().express;