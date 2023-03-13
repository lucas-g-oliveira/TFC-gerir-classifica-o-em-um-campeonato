import * as express from 'express';
import userRoutes from './api/controllers/routes/UserRoutes';
import matcheRoutes from './api/controllers/routes/MatcheRoutes';
import teamRoutes from './api/controllers/routes/TeamRoutes';
import leaderboardsRoutes from './api/controllers/routes/LeaderbordesRoutes';

class App {
  public app: express.Express;

  constructor() {
    this.app = express();

    this.config();

    // Não remover essa rota
    this.app.get('/', (req, res) => res.json({ ok: true }));
  }

  private config():void {
    const accessControl: express.RequestHandler = (_req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT,PATCH');
      res.header('Access-Control-Allow-Headers', '*');
      next();
    };

    this.app.use(express.json());
    this.app.use(accessControl);
  }

  private initRoutes(): void {
    this.app.use(matcheRoutes);
    this.app.use(teamRoutes);
    this.app.use(userRoutes);
    this.app.use(leaderboardsRoutes);
  }

  public start(PORT: string | number):void {
    this.app.listen(PORT, () => console.log(`Running on port ${PORT}`));
    this.initRoutes();
  }
}

export { App };

// Essa segunda exportação é estratégica, e a execução dos testes de cobertura depende dela
export const { app } = new App();
