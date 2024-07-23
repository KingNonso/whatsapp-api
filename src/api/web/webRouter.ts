import express, { Router } from 'express';

export const webRouter: Router = (() => {
  const router = express.Router();

  router.get('/', (_req, res) => {
    res.render('index');
  });

  return router;
})();
