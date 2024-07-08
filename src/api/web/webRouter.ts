import express, { Router } from 'express';
import path from 'path';

export const webRouter: Router = (() => {
  const router = express.Router();

  router.get('/', (_req, res) => {
    res.sendFile(path.join(__dirname, '../../../public/web/index.html'));
  });

  return router;
})();
