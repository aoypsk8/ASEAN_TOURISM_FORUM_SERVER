import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("checkin", function (table) {
    table.increments("checkinid").primary();
    table.string("userid").notNullable();
    table.string("description", 1000).notNullable();
    table.time("start_time").notNullable();
    table.time("end_time").notNullable();
    table.string("location", 1000).notNullable();
    table.timestamps(true, true);

    // Adding foreign key constraint
    table.integer("agendaid").notNullable().unsigned();
    table.foreign("agendaid").references("agendas.agendaid"); // Adjust the reference based on your actual schema
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("checkin");
}
