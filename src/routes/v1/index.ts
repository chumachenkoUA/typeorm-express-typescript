import { Router } from 'express';

import auth from './auth';
import transit from './transit';
import users from './users';

const router = Router();

router.use('/auth', auth);
router.use('/transit', transit);
router.use('/users', users);

export default router;
