import { RequestHandler } from 'express';
import { verifyJwt } from '../utils/verifyJwt';

export const verifyLogin: RequestHandler = async (req, res, next) => {
  const authHeader = req.headers['authorization'];

  if (authHeader) {
    if (authHeader.startsWith('Bearer ')) {
      // Extract the token part after "Bearer "
      const token = authHeader.slice(7); // 7 is the length of "Bearer "

      try {
        // Verify if the token is valid
        const payload = verifyJwt(token);

        // Set the `id` of the user so that the next middleware can access it
        res.locals.userId = payload.sub;
      } catch (error) {
        // Return a 401 when the JWT verification fails
        return res.status(401).json({ error: 'Access token is not valid' });
      }
    } else {
      // If the header doesn't start with "Bearer ", it's invalid
      return res.status(401).json({ error: 'Invalid token format' });
    }
  } else {
    // If there is no Authorization header, return a 401 Unauthorized response
    return res.status(401).json({ error: 'Authorization header is missing' });
  }

  // Call next() to continue processing the request
  next();
};
