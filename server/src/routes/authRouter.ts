import express from 'express';
import { githubAuth, githubAuthCallback } from '../controllers/auth/github';
import { googleAuth, googleAuthCallback } from '../controllers/auth/google';
import { verifyCsrfToken } from '../middlewares/verifyCsrfToken';

const router = express.Router();

router.get('/github', githubAuth);
router.get('/github/callback', verifyCsrfToken, githubAuthCallback);
router.get('/google', googleAuth);
router.get('/google/callback', verifyCsrfToken, googleAuthCallback);

export { router as authRouter };
