const fs = require("fs/promises");
const path = require("path");
const db = require("./database");

const splitSqlStatements = (sql) =>
  sql
    .split(/;\s*(?:\r?\n|$)/)
    .map((statement) => statement.trim())
    .filter(Boolean);

const runSchema = async () => {
  const schemaPath = path.resolve(__dirname, "schema.sql");
  const schema = await fs.readFile(schemaPath, "utf8");
  const statements = splitSqlStatements(schema);

  for (const statement of statements) {
    await db.execute(statement);
  }

  console.log(`Applied ${statements.length} schema statement(s)`);
};

runSchema()
  .catch((error) => {
    console.error("Failed to apply schema:", error.message);
    process.exitCode = 1;
  })
  .finally(() => db.closeDatabaseConnection());
