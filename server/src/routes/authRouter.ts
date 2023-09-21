import express from 'express';
import { githubAuth, githubAuthCallback } from '../controllers/auth/github';

const router = express.Router();

router.get('/github', githubAuth);
router.get('/github/callback', githubAuthCallback);

export { router as authRouter };
