import { randomBytes, createHash } from 'crypto';
import { base64URLEncode } from './base64URLEncode';

export function generateRandomToken(bytes: number) {
  return randomBytes(bytes).toString('hex');
}

export function generateCsrfToken() {
  return generateRandomToken(16);
}

export function generatePkceTokens() {
  const codeVerifier = generateRandomToken(32);
  const codeVerifierBuffer = Buffer.from(codeVerifier);
  const codeChallenge = base64URLEncode(
    createHash('sha256').update(codeVerifierBuffer).digest()
  );

  return { codeVerifier, codeChallenge };
}
