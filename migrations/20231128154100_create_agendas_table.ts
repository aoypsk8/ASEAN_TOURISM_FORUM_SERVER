import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("agendas", function (table) {
    table.increments("agendaid").primary();
    table.string("date").notNullable();
    table.string("month").notNullable();
    table.string("year").notNullable();
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("agendas");
}
