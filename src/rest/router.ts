import associatedRouter from '../modules/associated/associated.controller';
import checkRouter from '../modules/checks/checks.controller';

import { Router } from 'express';

const appRouter = Router();

appRouter.use('/checks', checkRouter);
appRouter.use('/associated', associatedRouter);

export { appRouter };
