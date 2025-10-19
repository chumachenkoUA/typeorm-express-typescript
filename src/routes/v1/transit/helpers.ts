import { RequestHandler, Router } from 'express';

import { BaseCrudController } from 'controllers/transit';
import { checkJwt } from 'middleware/checkJwt';
import { checkRole } from 'middleware/checkRole';

type CrudAction = 'create' | 'findAll' | 'findOne' | 'update' | 'delete';

type BuildCrudRouterOptions = {
  idPattern?: string;
  middlewares?: Partial<Record<CrudAction, RequestHandler[]>>;
};

export const buildCrudRouter = (
  controller: BaseCrudController<any, any, any>,
  options: BuildCrudRouterOptions = {},
) => {
  const router = Router();
  const idPattern = options.idPattern ?? '[0-9]+';
  const middlewares = options.middlewares ?? {};

  const extra = (action: CrudAction): RequestHandler[] => middlewares[action] ?? [];

  router.post('/', checkJwt, checkRole(['ADMINISTRATOR']), ...extra('create'), controller.create);
  router.get('/', checkJwt, checkRole(['ADMINISTRATOR']), ...extra('findAll'), controller.findAll);
  router.get(
    `/:id(${idPattern})`,
    checkJwt,
    checkRole(['ADMINISTRATOR'], true),
    ...extra('findOne'),
    controller.findOne,
  );
  router.patch(
    `/:id(${idPattern})`,
    checkJwt,
    checkRole(['ADMINISTRATOR'], true),
    ...extra('update'),
    controller.update,
  );
  router.delete(
    `/:id(${idPattern})`,
    checkJwt,
    checkRole(['ADMINISTRATOR'], true),
    ...extra('delete'),
    controller.delete,
  );

  return router;
};
