import db from '../../config/db.js';
import { sql } from 'drizzle-orm';

const clearDb = async () => {
  const query = sql.raw(`SELECT table_name
      FROM information_schema.tables
      WHERE table_schema = 'public'
        AND table_type = 'BASE TABLE';
    `);

  const tables = (await db.execute(query)).rows;

  if (!tables.length) {
    console.log('no tables found 🙄');
    return;
  }

  console.log('starting to delete tables...🚀');
  for (const table of tables) {
    console.log('deleting table 🗑️ ', table.table_name);
    const query = sql.raw(`DROP TABLE IF EXISTS "${table.table_name}" CASCADE`);
    await db.execute(query);
  }

  console.log('done 👌');
};

clearDb();
