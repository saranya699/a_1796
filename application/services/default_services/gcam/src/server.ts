import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import { WinstonLogger } from './config/Winstonlogger';
import { Routes } from './routes/routes'
import mongoose = require('mongoose');
import { SeedService } from './seed';

const PORT = 8007;

class App {
    public app = express();
    public routerPrv: Routes = new Routes();
    public logger: WinstonLogger = new WinstonLogger();
    public mongoUrl: string = process.env.MONGO_DB_URL;


    constructor() {
        this.config();
        this.routerPrv.routes(this.app);
        this.mongoSetup();
        this.mongoSeedData();
        this.SeedData();
        
       
       }

    private config(): void {
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.app.use(express.static("public"));
        this.app.use(cors({ credentials: true, origin: true }));

    }

    private mongoSetup(): void {
        mongoose.Promise = global.Promise;
        mongoose.connect(this.mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });
    }


    private mongoSeedData(): void {
        let seedData = new SeedService();
        seedData.create();
    }


 
    private SeedData(): void {
        let seedData = new SeedService();
        seedData.post();
    }



private SeedData(): void {
        console.log('route a file into seed create');
        let seedData = new SeedService();
        seedData.post();
    }


}

new App().app.listen(PORT, () => {
    console.log('Express server listening on port  ' + PORT);
})