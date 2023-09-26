import { db } from '../services/db';
import { Account, OAuthProviders } from '../types/authTypes';

class AccountModel {
  async create({ provider, providerAccountId, userId }: Omit<Account, 'id'>) {
    const query =
      'INSERT INTO "Account" ("provider", "providerAccountId", "userId") VALUES ($1, $2, $3) RETURNING *';
    const values = [provider, providerAccountId, userId];

    try {
      const res = await db.query(query, values);
      return res.rows[0];
    } catch (error) {
      throw Error('Error creating account.');
    }
  }

  async findUnique(
    oauthProvider: OAuthProviders,
    providerAccountId: string | number
  ) {
    const query =
      'SELECT * FROM "Account" WHERE "provider" = $1 AND "providerAccountId" = $2';
    const values = [oauthProvider, providerAccountId];

    try {
      const res = await db.query(query, values);
      if (res.rowCount > 0) {
        return res.rows[0] as Account;
      }
      return null;
    } catch (error) {
      throw Error('Error finding account.');
    }
  }
}

export default new AccountModel();
