import { db } from '../services/db';

class NoteModel {
  async create(userId: number) {
    const query = 'INSERT INTO "Note" ("userId") VALUES ($1) RETURNING id';
    const values = [userId];

    const res = await db.query(query, values);
    return res.rows[0].id as number;
  }

  async listAll(userId: number) {
    const query = 'SELECT * FROM "Note" WHERE "userId" = $1 ORDER BY "id" DESC';
    const values = [userId];

    const res = await db.query(query, values);
    return res.rows;
  }

  async findUnique(userId: number, noteId: number) {
    const query = 'SELECT * FROM "Note" WHERE "userId" = $1 AND "id" = $2';
    const values = [userId, noteId];

    const res = await db.query(query, values);
    return res.rowCount === 1 ? res.rows[0] : null;
  }

  async verifyOwnership(userId: number, noteId: number) {
    const query =
      'SELECT COUNT(*) AS count FROM "Note" WHERE "userId" = $1 AND "id" = $2';
    const values = [userId, noteId];

    const res = await db.query(query, values);
    return res.rows[0].count > 0;
  }

  async update(noteId: number, title: string | null, content: string | null) {
    const query =
      'UPDATE "Note" SET "title" = $1, "content" = $2, "updatedAt" = $3 WHERE "id" = $4 RETURNING *';
    const values = [title, content, new Date(), noteId];

    const res = await db.query(query, values);
    return res.rows[0];
  }

  async delete(noteId: number) {
    const query = 'DELETE FROM "Note" WHERE id = $1 RETURNING id';
    const values = [noteId];

    const res = await db.query(query, values);
    return res.rows[0].id;
  }
}

export default new NoteModel();
