import { Pool } from 'pg';

// Make sure that the environment variables are configured correctly
export const db = new Pool();

// db.on('acquire', () => {
//   console.log('pool acquired');
// });

// db.on('release', () => {
//   console.log('pool released');
// });
