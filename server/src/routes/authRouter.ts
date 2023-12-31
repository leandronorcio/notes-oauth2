import express from 'express';
import { githubAuth } from '../controllers/auth/github';
import { googleAuth } from '../controllers/auth/google';
import { verifyCsrfToken } from '../middlewares/verifyCsrfToken';
import { facebookbAuth } from '../controllers/auth/facebook';
import { refresh } from '../controllers/auth/refresh';
import { login } from '../middlewares/login';
import { oAuthCallback } from '../middlewares/oAuthCallback';
import { logout } from '../controllers/auth/logout';

const router = express.Router();

router.get('/github', githubAuth);
router.get('/github/callback', verifyCsrfToken, oAuthCallback, login);
router.get('/google', googleAuth);
router.get('/google/callback', verifyCsrfToken, oAuthCallback, login);
router.get('/facebook', facebookbAuth);
router.get('/facebook/callback', verifyCsrfToken, oAuthCallback, login);
router.post('/refresh', refresh);
router.get('/refresh/logout', logout);

export { router as authRouter };
