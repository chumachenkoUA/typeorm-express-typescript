import { Router } from 'express';

import { BaseCrudController } from 'controllers/transit';
import { checkJwt } from 'middleware/checkJwt';
import { checkRole } from 'middleware/checkRole';

type BuildCrudRouterOptions = {
  idPattern?: string;
};

export const buildCrudRouter = (
  controller: BaseCrudController<any, any, any>,
  options: BuildCrudRouterOptions = {},
) => {
  const router = Router();
  const idPattern = options.idPattern ?? '[0-9]+';

  router.post('/', [checkJwt, checkRole(['ADMINISTRATOR'])], controller.create);
  router.get('/', [checkJwt, checkRole(['ADMINISTRATOR'])], controller.findAll);
  router.get(`/:id(${idPattern})`, [checkJwt, checkRole(['ADMINISTRATOR'], true)], controller.findOne);
  router.patch(`/:id(${idPattern})`, [checkJwt, checkRole(['ADMINISTRATOR'], true)], controller.update);
  router.delete(`/:id(${idPattern})`, [checkJwt, checkRole(['ADMINISTRATOR'], true)], controller.delete);

  return router;
};
