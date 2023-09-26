import express from 'express';
import { githubAuth, githubAuthCallback } from '../controllers/auth/github';
import { googleAuth, googleAuthCallback } from '../controllers/auth/google';
import { verifyCsrfToken } from '../middlewares/verifyCsrfToken';
import {
  facebookbAuth,
  facebookbAuthCallback,
} from '../controllers/auth/facebook';
import { refresh } from '../controllers/auth/refresh';

const router = express.Router();

router.get('/github', githubAuth);
router.get('/github/callback', verifyCsrfToken, githubAuthCallback);
router.get('/google', googleAuth);
router.get('/google/callback', verifyCsrfToken, googleAuthCallback);
router.get('/facebook', facebookbAuth);
router.get('/facebook/callback', verifyCsrfToken, facebookbAuthCallback);
router.get('/refresh', refresh);

export { router as authRouter };
