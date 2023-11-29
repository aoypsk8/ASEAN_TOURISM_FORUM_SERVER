import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("feeds", function (table) {
    table.increments("feedid").primary();
    table.string("title").nullable();
    table.string("description", 1000).nullable();
    table.string("images").nullable();
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("feeds");
}
