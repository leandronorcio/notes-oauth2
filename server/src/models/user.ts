import { db } from '../services/db';
import { User } from '../types/authTypes';

class UserModel {
  async create({ name, email, avatar }: Omit<User, 'id'>): Promise<User> {
    const query =
      'INSERT INTO "User" ("name", "email", "avatar") VALUES ($1, $2, $3) RETURNING *';
    const values = [name, email, avatar];

    try {
      const res = await db.query(query, values);
      return res.rows[0];
    } catch (error) {
      throw Error('Error creating user.');
    }
  }

  async findUnique(id: number) {
    const query = 'SELECT * FROM "User" WHERE "id" = $1';
    const values = [id];

    try {
      const res = await db.query(query, values);
      if (res.rowCount > 0) {
        return res.rows[0] as User;
      }
      return null;
    } catch (error) {
      throw Error('Error finding user.');
    }
  }
}

export default new UserModel();
